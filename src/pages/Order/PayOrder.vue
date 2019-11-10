<template>
	<div class="PayOrder">
		<div class="header">
			<span class="iconfont" @click="tosbrestep">&#xe606;</span>
			支付首页
		</div>

		<div class="title">
			<h3>￥<span>{{odata.order_amount}}</span></h3>
			<p>{{oname}}</p>
		</div>

		<div class="bankpay" @click="paybankshow">
			<div>
				<span class="iconfont">&#xe612;</span>
				快捷支付
			</div>
			<span v-show="!paybank" class="iconfont">&#xe65f;</span>
			<span v-show="paybank" class="iconfont active">&#xe65e;</span>
		</div>

		<ul class="bank" v-show="paybank">
			<li @click="checkedcurbank(item.bankname)" v-for="item in banklist" v-if="banklist.length>0">

          <div class="bankli" :style="{backgroundImage:'url(' + item.logoimgurl + ')'}"></div>

			   <span v-show="!item.ischecked" class="iconfont">&#xe692;</span>
                <span v-show="item.ischecked" class="iconfont active">&#xe626;</span>


			</li>
			<li @click="toPayObligate">
				<div>
					<span class="iconfont">&#xe7fc;</span>
					添加银行卡
				</div>
			</li>
		</ul>

	<!-- 	<ul class="pay">
			<li @click="weixinactive">
				<div>
					<span class="iconfont" style="color: #22b190;">&#xe65a;</span>
					微信支付
				</div>
				<span v-show="!weixin" class="iconfont">&#xe692;</span>
				<span v-show="weixin" class="iconfont active">&#xe626;</span>


			</li>
			<li @click="zhifubactive">
				<div>
					<span class="iconfont" style="color: #4d90dd;">&#xe64c;</span>
					支付宝支付
				</div>
				<span v-show="!zhifub" class="iconfont">&#xe692;</span>
				<span v-show="zhifub" class="iconfont active">&#xe626;</span>

			</li>
		</ul> -->

		<p class="msg">请您在提交订单后30分钟内完成支付，逾期订单会自动取消</p>
		<div v-if="isqueren" class="butt" @click="pay">确定支付</div>
	</div>
</template>

<script>

     import axios from 'axios'
     import qs from 'qs'
     var opicurl="http://m.1zhanche.com/static/index/img/banklogo/"


	export default{
		name: 'PayOrder',
		data(){
			return{
				paybank: false,
				weixin: false,
				zhifub: false,
                isqueren:false,
                odata:{},
                oname:'',
                banklist:[],
			}
		},
		methods:{
			//支付
            pay(){
                var opayment = '';
                if(this.weixin){
                    opayment = "wxpay";
                }else if(this.zhifub){
                     opayment = "alipay";
                }
                if(this.weixin||this.zhifub){
                    //////这里的路径是错的，需要跳到支付宝和微信页面
                    // this.$router.push({path:'/PayShortcut',query:{
                    //     payment:opayment,
                    //     orderSn:this.$route.query.order_sn,
                    //     orderId:this.$route.query.order_id
                    // }});
                };
			},
              turntopaypage(str){
                this.$router.push({path:'/PayShortcut',query:{
                        orderSn:this.$route.query.order_sn,
                        orderId:this.$route.query.order_id,
                        bankname:str
                    }})
            },

            tosbrestep(){
                this.$router.push({path:"/Mall"});
            },

			//展开快捷支付
			paybankshow(){
                var _this = this;
                var ogetbannkurl= this.$store.state.Yi + 'index/sign/signBank'
				this.paybank = !this.paybank;
                var otoken= localStorage.token;
                // if(paybank){

                   axios.post(ogetbannkurl,qs.stringify({
                       token:otoken,
                   })).then(function(res){


                     // _this.middlelist = JSON.parse(JSON.stringify(res.data)) ;

                     _this.getblimgurl(res.data);
                          // console.log(  _this.middlelist );
                   })

			},

			//添加银行卡
			toPayObligate(){

				this.$router.push({path:'/PayObligate',query:{
                     order_id:this.$route.query.order_id,
                     order_sn:this.$route.query.order_sn
                }});
			},

            //选择微信
			weixinactive(){
				this.weixin = true;
                this.isqueren = true;
                if(this.weixin ){
                    this.zhifub=false;
                    this.banklist.forEach(function(item){
                        item.ischecked=false;
                    })
                }

			},

			//支付宝支付
			zhifubactive(){
				this.zhifub = true;
                this.isqueren = true;
                if(this.zhifub){
                    this.weixin=false;
                     this.banklist.forEach(function(item){
                        item.ischecked=false;
                    })
                };

			},
            chushihua(){
                var rep=/&nbsp;/ig;
                var _this=this;
                var otoken= localStorage.token;
                if(typeof otoken =="undefined"){
                      this.showdenglu();
                      return ;
                }
              var ourl = this.$store.state.Yi + "index/order/cashier"  ;
              axios.post(ourl,qs.stringify({
                  token:otoken,
                  orderId:this.$route.query.order_id,
                  orderSn:this.$route.query.order_sn,
              })).then(function(res){
                  console.log(res.data)
                  _this.odata=res.data.data;
                  _this.oname = res.data.data.goods_name.replace(rep,' ');
              })
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
            checkedcurbank(str){

                this.banklist.forEach(function(item){
                   if(item.bankname==str){
                       item.ischecked=true;
                   }else{
                       item.ischecked=false;
                   }
                });


                this.weixin=false;
                this.zhifub=false;
                this.isqueren = false;

                var ocuritem = this.banklist.pop();
                 this.banklist.push(ocuritem);

                 this.turntopaypage(str);
            },
            /////获取银行logo路径
             getyinhanlogourl(oname){
                var BankData=[
                    {"name":"中国光大银行","oimgsrc":"gd.png"},
                    {"name":"中国广东广发银行","oimgsrc":"gf.png"},
                    {"name":"中国工商银行","oimgsrc":"gs.png"},
                    {"name":"中国华夏银行","oimgsrc":"hx.png"},
                    {"name":"中国建设银行","oimgsrc":"jsyh.png"},
                    {"name":"中国交通银行","oimgsrc":"jt.png"},
                    {"name":"中国民生银行","oimgsrc":"ms.png"},
                    {"name":"中国农业银行","oimgsrc":"nyyh.png"},
                    {"name":"平安银行","oimgsrc":"pa.png"},
                    {"name":"上海浦东发展银行","oimgsrc":"pf.png"},
                    {"name":"上海银行","oimgsrc":"shyh.png"},
                    {"name":"兴业银行","oimgsrc":"xy.png"},
                    {"name":"中国邮政储蓄银行","oimgsrc":"yz.png"},
                    {"name":"中国银行","oimgsrc":"zgyh.png"},
                    {"name":"招商银行","oimgsrc":"zsyh.png"},
                    {"name":"中信实业银行","oimgsrc":"zxsy.png"}
                ];
                var oimgurl ="";
                for(var i=0,len=BankData.length;i<len;i++){
                    if($.trim(BankData[i].name).indexOf($.trim(oname))!=-1){
                        oimgurl= $.trim(BankData[i].oimgsrc);
                    }
                };
                return oimgurl;
            },
            getblimgurl(obj){
                 var _this= this;
                  _this.banklist = JSON.parse(JSON.stringify(obj));

                this.banklist.forEach(function(item,key){
                    var oname = item.bankname;
                    var oimgurl = _this.getyinhanlogourl(oname);
                    item.logoimgurl =opicurl+oimgurl;
                    item.ischecked=false;
                });
            },

		},
        created() {
             this.chushihua();
        },
        updated() {

        },
        mounted() {
          this.paybankshow();
        }
	}
</script>



<style scoped="scoped">
	span.checkes{
        position: relative;
    }
    span.checkes label{
            display: inline-block;
            border: 1px solid #ccc;
            background: #fff;
            width: 16px;
            height: 16px;
            position: relative;
            border-radius: 2px;
            border-radius: 50%;
    }
   span.checkes input{
       display:none;
   }
   span.checkes input:checked + label{
       background:#e5000c;
   }
    span.checkes input:checked + label::before{
            position: absolute;
            top: 0px;
            left: 4px;
            display: inline-block;
            content: '';
            height: 10px;
            width: 5px;
            border: 1px solid #fff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
    }
	div.bankli{
        width:70%;
        height:100%;
       background-repeat: no-repeat;
       background-position: left center;
       background-position: left center;
        background-size: 80% auto;
    }
	.PayOrder .header{
		font-size: .3rem;
		height: .9rem;
		line-height: .9rem;
		position: relative;
		border-bottom: #eaeaea 1px solid;
	}

	.PayOrder .header span{
		position: absolute;
		left: 0;
		width: .8rem;
		text-align: center;
	}

	.PayOrder .title{
		height: 2rem;
		border-bottom: #eaeaea 1px solid;
	}

	.PayOrder .title h3{
		font-size: .36rem;
		font-weight: 600;
		margin-top: .7rem;
	}

	.PayOrder .title h3 span{
		font-size: .46rem;
		font-weight: 600;
	}

	.PayOrder .title p{
		margin-top: .3rem;
		color: #999;
	}

	.PayOrder .bankpay{
		font-size: .3rem;
		margin: .9rem .9rem 0 .9rem;
		border-top: #eaeaea 1px solid;
        border-bottom:#eaeaea 1px solid;
		display: flex;
		justify-content: space-between;
		height: .9rem;
		line-height: .9rem;
	}

	.PayOrder .bankpay span{
		/* padding-right: .1rem; */
	}

	.PayOrder .pay{
		margin: 0 .9rem .9rem .9rem;
		border-top: #eaeaea 1px solid;
	}

	.PayOrder .pay>li{
		border-bottom: #eaeaea 1px solid;
		height: .9rem;
		line-height: .9rem;
		font-size: .3rem;
		display: flex;
		justify-content: space-between;
	}

	.PayOrder .pay>li div span{
		padding-right: .1rem;
	}

	.PayOrder .pay li>.active{
		color: #e5000c;
	}

	.PayOrder .bank{
		margin: 0 .9rem 0 1.3rem;
	}

	.PayOrder .bank li{
		border-top: #eaeaea 1px solid;
		height: .9rem;
		line-height: .9rem;
		font-size: .3rem;
		display: flex;
		justify-content: space-between;
	}
	.PayOrder .bank li:first-child{
        border-top:none;
    }
	.PayOrder .bank>li div span{
		padding-right: .1rem;
	}

	.PayOrder .bank li>.active{
		color: #e5000c;
	}

	.PayOrder .msg{
		color: #999;
		font-size: .24rem;
		padding-top: .9rem;
	}

	.PayOrder .butt{
		height: .9rem;
		line-height: .9rem;
		margin: .3rem;
		color: #fff;
		font-size: .32rem;
		border-radius: .1rem;
		background-color: #e5000c;
	}


</style>
