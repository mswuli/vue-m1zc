<template>
	<div class="PayObligate">
		<div class="header">
			<span class="iconfont" @click="toPayOrder">&#xe606;</span>
			快捷支付预留信息
		</div>

		<ul class="menuBar">
			<li :class="{activeBar: active == 0}" @click="meunAct(0)">储蓄卡	</li>
			<li :class="{activeBar: active == 1}" @click="meunAct(1)">信用卡</li>
		</ul>

		<ul class="menuList" v-if="active == 0">
			<li>
				<span>银行卡号：</span>
				<input type="text" placeholder="请填写银行卡号" v-model="b_acctno" >
			</li>
			<li>
				<span>身份证号码：</span>
				<input type="text" placeholder="请填写身份证号码"  v-model="b_idno">
			</li>
			<li>
				<span>持卡人姓名：</span>
				<input type="text" placeholder="请填写持卡人姓名"  v-model="b_acctname">
			</li>
			<li>
				<span>银行预留手机号：</span>
				<input type="text" placeholder="填写银行预留手机号"  v-model="b_mobile">
			</li>
			<li>
				<span>短信：</span>
				<input type="text" placeholder="请输入验证码"  v-model="b_smscode">
				<span class="getMsg" @click="qingqmsg">{{verify}}</span>
			</li>

			<li class="butt">
                <p>
                	<span>《收银台用户协议》</span>
                	<span>《身份信息保密协议》</span>
                </p>
                
				<div class="bt" @click="tijbongding">绑定银行卡</div>
			</li>
		</ul>

		<ul class="menuList" v-if="active == 1">
			<li>
				<span>银行卡号：</span>
				<input type="text" placeholder="请填写银行卡号"  v-model="b_acctno">
			</li>
			<li>
				<span>身份证号码：</span>
				<input type="text" placeholder="请填写身份证号码"  v-model="b_idno">
			</li>
			<li>
				<span>持卡人姓名：</span>
				<input type="text" placeholder="请填写持卡人姓名"  v-model="b_acctname">
			</li>
            
		<!-- 	<li>
				<span>有效期：</span>
				<input type="text" placeholder="请填写持卡有效期" readonly @click="showDatePicker" v-model="b_validdate">
			</li> -->
            <li>
            		<span class="youxttl">有效期：</span>
                    <ul class="jiushi">
                        <div class="abaoput clearfix"><input class="okuan" type="text" placeholder="月份" v-model="b_yue">
                        <span>月</span></div>
                        <div class="abaoput clearfix"><input class="okuan"  type="text" placeholder="年份" v-model="b_nian">
                        <span>年</span></div>
                    </ul>
            		
            	</li>
            
            <li>
            	<span>CVV2(卡安全码)：</span>
            	<input type="text" placeholder="请填写 cvv2 安全码 "   v-model="b_cvv2">
            </li>
            
			<li>
				<span>银行预留手机号：</span>
				<input type="text" placeholder="填写银行预留手机号" v-model="b_mobile">
			</li>
			<li>
				<span>短信：</span>
				<input type="text" placeholder="请输入验证码"  v-model="b_smscode">
				<span class="getMsg" @click="qingqmsg">{{verify}}</span>
			</li>

			<li class="butt">
				<p>
					<span>《收银台用户协议》</span>
					<span>《身份信息保密协议》</span>
				</p>
				<div @click="tijbongding">绑定银行卡</div>
			</li>
		</ul>

	</div>
</template>

<script>
    
    import qs from 'qs'
    import axios from "axios";
    
    
	export default {
		name: 'PayObligate',

		data() {
			return {
				verify: "获取验证码",
				active: 0,
				isGo: true,
				isGos: true,
				msg1: "",  //有效期
                
                b_accttype:["00","02"],/////00为储蓄卡，02 为信用卡  类型
                b_acctno:"",  //////卡号  银行卡号
                b_idno:'',      /////   身份证号
                b_acctname:'',  /////    持卡人姓名
                b_mobile:'',     /////   银行预留手机号
                b_smscode:'',   /////    验证码
                b_validdate:"",  /////   有效期月份+年份（字符串，月份在前，年份在后）
                b_yue:"",        /////   有效期月份
                b_nian:"",       /////    有效期年份
                b_cvv2:"",       /////    卡安全码
                b_thpinfo:"",    /////    第一次为空，之后为前一次返回的thpinfo 
                
                qflag:true,    //////请求验证的标示，true 为第一次请求，false 为非第一次请求
                
              
			}
		},
		methods: {
			//
			toPayOrder() {
				this.$router.push({path:'/PayOrder',query:{
                        order_sn:this.$route.query.order_sn,
                        order_id:this.$route.query.order_id,
                    }});
               
			},
			//切换选项
			meunAct(a) {
				this.active = a;
			},
			//银行卡
			verifyMsgs() {

				if (this.isGos) {
					this.isGos = false
					let s = 10
					const v = setInterval(() => {
						s--;
						this.verify = s + "秒重发";

						if (s == 0) {
							clearInterval(v);
							this.isGos = true;
							this.verify = "获取验证码";
						}
					}, 1000)
					//调用短信验证码接口

				}
			},
         
            qingqmsg(){
              
                var objcan = this.getqucanshu();
               if(!this.isGos||!this.cangetmsg()){
                   return false;
               };
               
               this.verifyMsgs();

                var _this = this;
                var otoken= localStorage.token;
                var qurl1 = this.$store.state.Yi + "index/sign/signApply";//////第一次请求地址
                var qurl2 = this.$store.state.Yi + "index/sign/signSms" ;//////第二次请求地址
                var qurl="";
                if(this.qflag){
                    qurl=qurl1
                }else{
                     qurl=qurl2
                };
              
                objcan.token = otoken;
    
                axios.post(qurl,qs.stringify(objcan)).then(function(res){
                  
                   if(res.data.error!=1999){
                      _this.b_thpinfo =res.data.thpinfo;
                    }
                 
                   _this.qflag = false;
                   // if(res.data.error=="1999"){
                       _this.$createToast({
                       	txt: res.data.errmsg,
                       	type: 'info',
                       	time: 2500,
                       }).show();
                   // }
                });
                 
            },
            
            getqucanshu(){
                var obj ={};
                obj.accttype =this.b_accttype[this.active];
                obj.acctno = this.b_acctno;
                obj.idno = this.b_idno;
                obj.acctname = this.b_acctname;
                obj.mobile = this.b_mobile;
                obj.smscode = this.b_smscode;
                obj.validdate = this.b_validdate= this.b_yue + this.b_nian;
                obj.cvv2 = this.b_cvv2;
                obj.thpinfo = this.b_thpinfo||'';
             return obj;
            },

			//获取验证码贷记卡
			verifyMsg() {
				if (this.isGo) {
					this.isGo = false
					let s = 60
					const v = setInterval(() => {
						s--;
						this.verify = s + "秒重发";

						if (s == 0) {
							clearInterval(v);
							this.isGo = true;
							this.verify = "获取验证码";
						}
					}, 1000)
					//调用短信验证码接口
				}
			},
			//选择日期
			showDatePicker() {
				if (!this.datePicker) {
					this.datePicker = this.$createDatePicker({
						title: '选择有效期',
						min: new Date(1900, 1, 1),
						max: new Date(),
						value: new Date(),
						startColumn: 'year',
						columnCount: 2,
						onSelect: this.selectHandle,
						onCancel: this.cancelHandle
					})
				}

				this.datePicker.show()
			},
			selectHandle(date, selectedVal, selectedText) {
				this.b_validdate = selectedText.join('/')
			},
            
            checkisdenglu(){
                 var otoken= localStorage.token;
                 if(typeof otoken =="undefined"){
                      this.showdenglu();
                      return ;
                }
            },
            showdenglu() {
              var _this=this;
              const toast = this.$createToast({
             	txt: '您还未登录,请先登录！',
             	type: 'warn',
             	time: 2500,
              mask:true,
              $events: {
                  timeout: () => {
                    _this.$router.push({path: "/AccountLogin"});
                  }
                }
             }).show()
            },
            
            cangetmsg(owhere){
                var objarr={};
                var omark = 100;
                objarr[0] = "银行卡号为空，请填写卡号";
                objarr[1] = "身份证号码为空，请填写身份证号";
                objarr[2] = "身份证号码错误，请重新填写";
                objarr[3] = "持卡人姓名为空，请填写持卡人";
                
                objarr[4] = "有效期为空，请填写有效期";
                objarr[5] = "CVV2 安全码为空，请填写安全码";
                
                objarr[6] = "手机号为空，请填写手机号";
                objarr[7] = "手机号码不正确，请填写正确的手机号";
                
                objarr[8] =  "验证码为空，请填写验证码";
                                
                // b_acctno:"",     //////卡号  银行卡号
                // b_idno:'',       /////   身份证号
                // b_acctname:'',   /////    持卡人姓名
               
                // b_validdate:"",  /////   有效期月份+年份（字符串，月份在前，年份在后）
                // b_cvv2:"",       /////    卡安全码
                 // b_mobile:'',    /////   银行预留手机号
                // b_smscode:'',    /////    验证码
                              
               if(this.active==0){  //////储蓄卡
                   if($.trim(this.b_acctno).length==0){   ////卡号为空
                      omark=0;
                  }else if($.trim(this.b_idno.length)==0){   /////身份证号为空
                       omark=1;
                  }
                  else if(!this.IdentityCodeValid(this.b_idno)){   /////身份证号码不对
                       omark=2;
                  }
                  else if($.trim(this.b_acctname).length==0){   /////持卡人姓名为空
                       omark=3;
                  }else if($.trim(this.b_mobile).length==0){    //////手机号为空
                          omark=6;
                  }else if(!this.checkPhonetel(this.b_mobile)){  ///////手机号不正确
                          omark=7;
                  };
                  if(owhere==1){     ///////检测验证码是否为空
                      if($.trim(this.b_smscode).length==0){
                              omark=8;
                      };  
                  }
               }else if(this.active==1){   //////信用卡
                   if($.trim(this.b_acctno).length==0){  ////卡号为空
                       omark=0;
                   }else if($.trim(this.b_idno.length)==0){ /////身份证号为空
                        omark=1;
                   }
                   else if(!this.IdentityCodeValid(this.b_idno)){   /////身份证号码不对
                        omark=2;
                   }
                   else if($.trim(this.b_acctname).length==0){   /////持卡人姓名为空
                        omark=3;
                   }else if($.trim(this.b_validdate).length==0){  //////有效期为空
                        omark=4; 
                   }else if($.trim(this.b_cvv2).length==0){       ///////安全码为空
                           omark=5;
                   }else if($.trim(this.b_mobile).length==0){    ///////手机号为空
                           omark=6;
                   }else if(!this.checkPhonetel(this.b_mobile)){   //////手机号不正确
                           omark=7;
                   };
                    if(owhere==1){     ///////检测验证码是否为空
                       if($.trim(this.b_smscode).length==0){
                               omark=8;
                       };  
                   }
               }
               
               if(omark!=100){
                   const toast = this.$createToast({
                    type:"info",
                    txt: objarr[omark],
                    time: 1000
                  }).show()
                   return false ;
               }else if(omark==100){
                   return true;
               }

            },
           ////////身份证检验
           IdentityCodeValid(code) {
            code = $.trim(code);
            var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海 ",
            32: "江苏 ",
            33: "浙江 ",
            34: "安徽 ",
            35: "福建 ",
            36: "江西 ",
            37: "山东 ",
            41: "河南 ",
            42: "湖北 ",
            43: "湖南 ",
            44: "广东 ",
            45: "广西 ",
            46: "海南 ",
            50: "重庆 ",
            51: "四川 ",
            52: "贵州 ",
            53: "云南 ",
            54: "西藏 ",
            61: "陕西 ",
            62: "甘肃 ",
            63: "青海 ",
            64: "宁夏 ",
            65: "新疆 ",
            71: "台湾 ",
            81: "香港 ",
            82: "澳门 ",
            91: "国外 "
        };
        var tip = "";
        var pass = true;
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
       
            return pass;
        },
        //////将字符串中的空格去掉
       delkongge(str) {
            var res = /\s*/ig;
            return str.replace(res, "");
        },
       ///////检测手机号
      checkPhonetel(ottel) {
              ottel = $.trim(ottel);
                if (!(/^1[345678]\d{9}$/.test(ottel))) {
                    return false;
                } else {
                    return true;
                }
            },
         tijbongding(){
             var _this = this;
             if( !this.cangetmsg(1)){
                 return false;
             }
             /////
            // this.toast.show();  //显示遮罩
          var otoast =  this.$createToast({
                txt: '正在发送中....',
                mask: true
              }).show();
           var otoken= localStorage.token;
           var ocanb = this.getqucanshu();
           ocanb.token = otoken;  
           var tijurl = this.$store.state.Yi + "index/sign/signConfirm";
           axios.post(tijurl,qs.stringify(ocanb)).then(function(res){
               otoast.hide();  //显示遮罩
         
               _this.$createToast({
               	txt: res.data.errmsg,
               	type: 'info',
               	time: 2500,
                onTimeout: () => {
                    if(res.data.error=="0000"){  /////绑定成功,则跳转到支付页面
                         _this.$router.push({path:"/PayOrder",query:{
                            order_id:_this.$route.query.order_id,
                            order_sn:_this.$route.query.order_sn
                        }})
                    }
 
                 }
               }).show()
            });
           }
           
           
		},
        mounted(){
            this.checkisdenglu();
        }
	}
</script>

<style scoped="scoped">
 
    input.okuan{
        width:25%;

        font-size: 12px;
    }
    div.abaoput{
        border: 1px solid #eee;
        border-radius: 3px;
        width:38%;
        display:inline-block;
        height:70%;
        margin-right:0.20rem
    }
    div.abaoput input,
       div.abaoput span{
           float:left;
           height:100%;
       }
    div.abaoput input{
               width:70%;
               text-indent: 0.20rem;
           }
    div.abaoput span{
               width:20%;
               line-height:0.64rem;
           }
	.PayObligate .header {
		font-size: .3rem;
		height: .9rem;
		line-height: .9rem;
		position: relative;
		border-bottom: #eaeaea 1px solid;
		background-color: #fff;
	}

	.PayObligate .header span {
		position: absolute;
		left: 0;
		width: .8rem;
		text-align: center;
	}

	.PayObligate .menuBar {
		width: 96%;
		margin-left: 2%;
		text-align: center;
		border: 1px solid #565f71;
		box-sizing: border-box;
		border-radius: 3px;
		display: flex;
		overflow: hidden;
		background-color: #fff;
	}

	.PayObligate .menuBar li {
		flex: 1;
		font-size: .28rem;
		color: #565f71;
		padding: .2rem;
		border-right: 1px solid #565f71;
	}

	.PayObligate .menuBar li:last-child {
		border-right: none;
	}

	.PayObligate .menuBar .activeBar {
		background-color: #565f71;
		color: #fff;
	}

	.PayObligate .menuList {
		margin: 0 .2rem;
	}

	.PayObligate .menuList li {
		position: relative;
		display: flex;
		height: .9rem;
		line-height: .9rem;
		border-bottom: #eaeaea 1px solid;
	}

	.PayObligate .menuList li>span {
		flex: 1.4;
		text-align: left;
	}

	.PayObligate .menuList li>input {
		flex: 2;
		text-align: left;
	}
    .PayObligate .menuList li>ul.jiushi {
    	flex: 2;
    	text-align: left;
        display:flex;
         align-items:  center
         
    }

	.PayObligate .menuList li input::-webkit-input-placeholder {
		color: #8e9bb1;
		font-size: .24rem;
	}

	.PayObligate .menuList li .getMsg {
		position: absolute;
		height: .52rem;
		width: 1.5rem;
		background-color: #222;
		border-radius: .1rem;
		right: 0;
		top: .19rem;
		font-size: .24rem;
		text-align: center;
		line-height: .52rem;
		color: #eee;
	}

	.PayObligate .menuList .butt {
		display: inline;
	}

	.PayObligate .menuList .butt p {
		margin-top: 2rem;
		font-size: .24rem;
		color: #999;
	}

	.PayObligate .menuList .butt div {
		height: .9rem;
		line-height: .9rem;
		margin: .1rem .2rem 0 .2rem;
		color: #fff;
		font-size: .32rem;
		border-radius: .1rem;
		background-color: #e5000c;
	}

	/* .PayObligate .menuList .butt .bt {
		margin-top: 3.92rem;
	} */
</style>
