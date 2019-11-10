<template>
    <div class="PayShortcut">
    	<div class="header">
    		<span class="iconfont" @click="fanhuipage">&#xe606;</span>
    		 <span  class="toubus" v-if="successmark">支付完成</span>
              <span  class="toubus" v-if="!successmark">支付失败</span>
    	</div>
    	<div class="tupian">
            <img :src="require('@/assets/img/ibg/izhifu.png')" alt="">
        </div>
         <div class="yifu" v-if="!successmark">
            失败原因
        </div>
        <div class="lname" v-if="!successmark" style="margin-top:1rem;color:#e5000c">
            <span class="tnanem">
                {{errormsg}}
            </span>
        </div>
        
        <div class="yifu" v-if="successmark">
            已支付定金
        </div>
        <div class="shul" v-if="successmark">
            <span>￥</span><span class="shuzhi">{{jiage}}</span>
        </div>
        <div class="lname" v-if="successmark">
            <span class="tnanem">
                {{mingzi}}
            </span>
        </div>
        
        <ul class="abli" v-if="successmark">
              <li class="dianji" @click="tojiecheinfon">接车人信息</li>
              <li class="dianji" @click="tofapiao">发票信息</li>
              <li class="dianji" @click="kandingdan">查看订单</li>
        </ul>
        
    
    </div>
</template>

<script>
     import axios from 'axios'
     import qs from 'qs'
      
     
     export default{
     	name: 'PayShortcut',
     	data(){
     		return{
                ordersn:'',
                jiage:'',
                mingzi:"",
                successmark:true,
                orderid:'',
                errormsg:''
                
     		}
     	},
        methods:{
            
            kandingdan(){
                 this.$router.push({path: '/OrderDetail',query:{
                    order_id:this.orderid,
                }})
            },
            tojiecheinfon(){
                this.$router.push({path: '/OrderPickone',query:{
                    order_id:this.orderid,
                    order_sn:this.ordersn
                }})
            },
            tofapiao(){
                var _this = this;
                this.$router.push({path: '/OrderInvoice',query:{
                    order_id:this.orderid,
                    order_sn:this.ordersn
                }})
                
            },
            gerenfpiao(){
              console.log("geren");  
            },
            gongsfpiao(){
                console.log("gongsi");  
            },
            fanhuipage(){
                this.$router.push({path:'/PayShortcut',query:{
                    order_id:this.orderid,
                    order_sn:this.ordersn
                }})
            },
            setshuzhi(data){
                 var rep=/&nbsp;/ig;
                this.ordersn=data.order_sn;
                this.jiage=data.order_amount;
                this.mingzi = data.goods_name;
                this.orderid = data.order_id;
                this.mingzi = this.mingzi.replace(rep," ");
                
            },
            chushihua(){
                var rep=/&nbsp;/ig;
                var _this=this;
                var otoken= localStorage.token;
                if(typeof otoken =="undefined"){
                      this.showdenglu();
                      return ;
                }
              var ourl = this.$store.state.Yi + "index/trade/tradeSuccess"  ;
              axios.post(ourl,qs.stringify({
                  token:otoken,
                  orderSn:this.$route.query.orderSn,
              })).then(function(res){
                    console.log(res.data)
                  if(res.data.error==0){
                      _this.setshuzhi(res.data.data);
                      _this.successmark=true;
                  }else{
                      _this.successmark=false;
                      _this.errormsg = res.data.errmsg;
                      _this.$createToast({
                        type:"info",
                        time: 3000,
                        txt: res.data.errmsg
                      }).show();
                      
                  }
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
        },
        mounted() {
            this.chushihua();
        }
        
        
    }
     
</script>

<style scoped="scoped">
    span.toubus{
        font-size: 0.36rem;
        color:#333
    }
    div.yifu{
        font-size: 0.36rem;
        color:#333;
    }
    div.lname{
        width:85%;
        position:relative;
        margin: 0 auto ;
        margin-bottom:1.15rem;
        color:#666;
        font-size: 0.36rem;
    }
    div.shul{
        height:1.10rem;
        line-height: 1.10rem;
    }
    span.shuzhi{
        margin-left:0.12rem;
        font-size: 0.44rem;
        color:#000;
        font-weight: bold;
    }
    li.dianji{
        position:relative;
        margin:0.40rem auto;
        width:85%;
        height:0.94rem;
        line-height:.94rem;
        border:1px solid #e5000c;
        border-radius: 5px;
        color:#e5000c;
        font-size: 0.36rem;
    }
    div.tupian{
        height:3.55rem;
        width:100%;
        position:relative
    }
     div.tupian img{
         position:absolute;
         left:0;
         right:0;
         top:0;
         bottom:0;
         margin:auto;
        width:100%;
        
         
     }
    .PayShortcut .header{
    	font-size: .3rem;
    	height: .9rem;
    	line-height: .9rem;
    	position: relative;

    	background-color: #fff;
    }
    
    .PayShortcut .header span.iconfont{
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
    
    
    
    
</style>
