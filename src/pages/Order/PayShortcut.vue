<template>
	<div class="PayShortcut">
		<div class="header">
			<span class="iconfont" @click="toPayOrder">&#xe606;</span>
			快捷支付
		</div>
		
		<div class="title">
			<h3>￥<span>{{odata.order_amount}}</span></h3>
			<p>{{oname}}</p>
		</div>
		
		<div class="verify">
			<p>请输入 <span>{{optel}} </span>收到的验证码</p>
			<div>
				<input type="text" placeholder="请输入验证码" v-model="osmscode">
				<span class="getMsg" @click="verifyMsg">{{verify}}</span>
			</div>
		</div>
		
		<div class="butt" @click="zhifuqian">支付</div>
	</div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
	export default{
		name: 'PayShortcut',
		data(){
			return{
                odata:{},
                oname:'',
                optel:'',
                obankname:'',
                banklist:[],
				verify: "获取验证码",
				isGo: true,
                
                oagreeid:'',
                othpinfo:'',
                osmscode:'',
                qqurlmark:true, /////短信请求标志，true时调用第一个请求，否则调用第二个请求
			}
		},
		methods:{
			toPayOrder(){
                
				this.$router.push({path:'/PayOrder',query:{
                    order_id:this.$route.query.orderId,
                    order_sn:this.$route.query.orderSn
                }});
			},
			//获取验证码
			verifyMsg(){
				if(this.isGo){
                    
                    this.isGo = false
                    let s = 60
                    const v = setInterval(()=>{
                    	s--;
                    	this.verify = s + "秒重发";
                    	
                    	if(s == 0){
                    		clearInterval(v);
                    		this.isGo = true;
                    		this.verify = "获取验证码";
                    	}
                    },1000)
                    //调用短信验证码接口
                    
                    var qqurl1 = this.$store.state.Yi + 'index/trade/qpayApply'; /////短信第一次请求
                    var qqurl2 = this.$store.state.Yi + 'index/trade/qpaySms';/////短信第二次请求
                    var qqurl ='';
                    var _this = this;
                    if(this.qqurlmark){
                        qqurl=qqurl1
                    }else{
                        qqurl=qqurl2
                    }
                    var obaj=this.getshouyingpaydata();
                    axios.post(qqurl,qs.stringify(obaj)).then(function(res){
                        _this.qqurlmark = false;
                        _this.othpinfo = res.data.thpinfo;
                        console.log(res.data);
                        var ostr = res.data.errmsg;
                         _this.$createToast({
                            txt: ostr,
                            type:'correct',
                            time: 2000,
                           }).show()                     
                    });  
				}
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
                  orderId:this.$route.query.orderId,
                  orderSn:this.$route.query.orderSn,
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
            
            
            paybankshow(){
                var _this = this;
                var ogetbannkurl = this.$store.state.Yi + 'index/sign/signBank'
                var otoken= localStorage.token;

                   axios.post(ogetbannkurl,qs.stringify({
                       token:otoken,
                   })).then(function(res){
                   
                       console.log(res.data);
                       _this.banklist = res.data;
                       _this.settelpno();
                   })           
            },
            settelpno(){
                var _this = this;
               var  obname = this.$route.query.bankname;
               var rep = /\s*/ig;
               obname = obname.replace(rep,'');
               this.banklist.forEach(function(item){
                   if(item.bankname.indexOf(obname)!=-1 ){                     
                       _this.optel = item.mobile;
                       _this.oagreeid = item.agreeid;
                   }
               })
            },
            getshouyingpaydata(){
                var otoken= localStorage.token;
                var canjson={};
                canjson.orderId = this.$route.query.orderId;
                canjson.orderSn = this.$route.query.orderSn;
                canjson.agreeid = this.oagreeid;
                canjson.thpinfo=this.othpinfo;
                canjson.smscode=this.osmscode;
                canjson.token = otoken;
                return canjson;
            },
            zhifuqian(){
                var _this = this;
              var opayurl = this.$store.state.Yi + 'index/trade/qpayComfirm';
               if(this.othpinfo.length==0){
                  this.$createToast({
                    type:'info',
                    time: 1500,
                    txt: '支付前需要获取验证码'
                  }).show();
                  return ;
              }
              if(this.osmscode.length==0){
                  this.$createToast({
                    type:'info',
                    time: 1500,
                    txt: '验证码为空，请先输入验证码'
                  }).show();
                  return ;
              };
             
              var ocanshu = this.getshouyingpaydata();
              axios.post(opayurl,qs.stringify(ocanshu)).then(function(res){
                  console.log(res.data);
                  if(res.data.error=="0000"){ ///////支付成功跳转页面
                      _this.$router.push({path: '/PaySuccess',query:{
                          orderSn:ocanshu.orderSn
                      }})
                  }else{   //////支付失败跳转页面
                  ////orderSn=2019053150985055&orderId=619&bankname=招商银行
                      _this.$router.push({path: '/PayError',query:{
                          msg:res.data.errmsg,
                          orderSn:_this.$route.query.orderSn,
                          orderId:_this.$route.query.orderId,
                          bankname:_this.$route.query.bankname
                      }});
                  }
              });
            }
            
            
		},
        mounted() {
            this.chushihua();
            this.paybankshow()
        }
	}
</script>

<style scoped="scoped">
	.PayShortcut .header{
		font-size: .3rem;
		height: .9rem;
		line-height: .9rem;
		position: relative;
		border-bottom: #eaeaea 1px solid;
		background-color: #fff;
	}
	
	.PayShortcut .header span{
		position: absolute;
		left: 0;
		width: .8rem;
		text-align: center;
	}
	
	.PayShortcut .title{
		height: 2.7rem;
		background-color: #fff;
		border-bottom: #eaeaea 1px solid;
	}
	
	.PayShortcut .title h3{
		padding-top: .7rem;
		font-size: .36rem;
		font-weight: 600;
	}
	
	.PayShortcut .title h3 span{
		font-size: .46rem;
		font-weight: 600;
	}
	
	.PayShortcut .title p{
		margin-top: .3rem;
		color: #999;
	}
	
	.PayShortcut .verify{
		
	}
	
	.PayShortcut .verify p{
		background-color: #f7f7f7;
		height: .55rem;
		line-height: .55rem;
		text-indent: .2rem;
		text-align: left;
		color: #999;
	}
	
	.PayShortcut .verify div{
		display: flex;
		height: .86rem;
		line-height: .85rem;
		border-top: #eaeaea 1px solid;
		border-bottom: #eaeaea 1px solid;
		background-color: #fff;
	}
	
	.PayShortcut .verify div input{
		flex: 2;
		text-align: center;
	}
	
	.PayShortcut .verify div span{
		flex: 1;
		color: #999;
		font-size: .3rem;
		border-left: #eaeaea 1px solid;
	}
	
	.PayShortcut .butt{
		height: .9rem;
		line-height: .9rem;
		margin: 3rem .2rem 0 .2rem;
		color: #fff;
		font-size: .32rem;
		border-radius: .1rem;
		background-color: #e5000c;
	}
</style>
