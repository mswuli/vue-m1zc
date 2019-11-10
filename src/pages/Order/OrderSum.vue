<template>
	<div class="OrderSum">
        <div class="kefu">
            <h3 class="clearfix">
                <span class="iconfont fanhs" @click="toPrev">&#xe606;</span>
                <span>汇总页面</span>
            
                <ul class="kefutu" @click="kf()">
                    <li class="tubiao"><i class="iconfont">&#xe600;</i></li>
                    <li class="kefuzi">客服</li>
                </ul> 
            </h3>
        </div>
         <div class="Ordersumtitle clearfix" v-if="Object.keys(carInfo).length>0">
            <div class="imgtu">
                <div class="tubox" v-bind:style="{backgroundImage:'url('+carInfo.goods_img+')'}" >
              
                </div>           
            </div>
            <div class="miaoshu">
                <ul class="cheming">
                    <span> {{ carInfo.goods_name }} </span>
                </ul>
                <ul class="jiange">
                    <span class="danjia">￥<span class="shu">{{ carInfo.goods_price  | geshihua }}</span>元</span>
                </ul>
            </div>
            
        </div>
        
    
        <sum-list :resdata="resdata"></sum-list>
        <!-- <sum-nav></sum-nav> -->

        </div>      
        
       	
	</div>
</template>

<script>
 
    import SumList from '@/pages/Order/components/SumList'
    import SumNav from '@/pages/Order/components/SumNav'
  
    import axios from 'axios'
    import qs from 'qs'
    
    
    export default{
        name: 'OrderSum',
        components:{
            SumNav,
            SumList,
            
        },
        data() {
        	return {
                oimg:"",
                carInfo:{},
                resdata:{},
                toast: this.$createToast({
                	time: 0,
                	txt: '',
                	mask: true
                })  //遮
        		
        	};
        },
        
        // this.toast.show();  //显示遮罩
        // this.toast.hide(); //关闭遮罩
        methods:{
            startdata(){
                
                var ourl = this.$store.state.Yi + 'index/order/orderSum';
                var cart_id = this.$route.query.cart_id;
                var _this = this;
                var otoken= localStorage.token;
                console.log(otoken);
                if(typeof otoken =="undefined"){
                     this.showPopup();
                     return ;
                }
                // this.toast.show();  //显示遮罩
                axios.post(ourl,
                    qs.stringify({
                        cart_id:cart_id,
                        token:otoken
                        }
                )).then(this.setchushi);
                
            },
            
            
            showPopup() {
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
            setchushi(res){
                // this.toast.hide(); //关闭遮罩
             
                if(res.data.error==1){
                    this.$router.push({path:"/Mall"});
                }
                this.carInfo=JSON.parse(JSON.stringify(res.data.carInfo)) ;
                this.carInfo.goods_name = this.carInfo.goods_name.replace(/&nbsp;/ig," ");
                this.resdata =JSON.parse(JSON.stringify(res.data)) ;
                
            },
			//客服
			kf() {
				let isSdkReady = false;
				ysf('onready', function() {
					isSdkReady = true;
				})
				if (isSdkReady) {
					ysf('open');
					// location.href = ysf('url');
				} else {
					// 仅做参考
					alert('sdk尚未加载成功，请稍后再试');
				}
			},
            toPrev(){
                this.$router.push({path:"/OrderIns",query:{"goods_id":this.carInfo.goods_id,"cart_id":this.$route.query.cart_id}})
            }
        },
        created() {
               this.startdata();
               
               
        },
        mounted() {},
    }
	
	
</script>

<style scoped="scoped">

   span.fanhs{
       float:left;
       padding-left:0.2rem;
   }
    div.kefu{
        height:0.9rem;
        position:fixed;
        width:100%;
         background:#fff;
     border-bottom: 1px solid #eee;
     z-index: 999;
    }
    .clearfix:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
    }
    .clearfix{
        zoom:1;
    }
	  div.kefu h3{
        height:100%;
        width:100%;
        position:relative;
        text-align: center;
        height: 0.9rem;

    }
     div.kefu h3 span{
        line-height: 0.9rem;
      
    }
    ul.kefutu{
        position:relative;
        float:right;
        width:0.8rem;
        height:100%;
    }
   .clearfix:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
    }
    .clearfix{
        zoom:1;
    }
    
    
    div.qingdan::before{
        position:relative;
        display:block;
        content:"";
        height:0.10rem;
        width:100%;
        background:#eee;
    }
    
    li.tubiao{
        padding-top:0.15rem;
        line-height:0.30rem;
    }
    li.kefuzi{
        line-height: 0.35rem;
    }
    
     div.Ordersumtitle{
        position:relative;
        padding-top:0.9rem;
        height:1.77rem;
        width:100%;
        border-bottom:1px solid #eee;
         background:#fff;
         color:#666;
    }
       
    
    div.imgtu{
        position:relative;
        float:left;
        width:32% ;
        height:100%;
        display:inline-block;
        
    }
    div.tubox{
       position:absolute;
       width:76.4%;
       height:92%;
       margin:auto;
       bottom:0;left:0;top:0;right:0;
       
       /* background:url('~@/assets/img/001.png')no-repeat center center; */
       background-repeat: no-repeat;
       background-position: center center;
       background-size: 100% auto;
       
    }
     div.imgtu img{
        
         width:100%;
     }
    div.miaoshu{
        float: left;
        width:68%;
        height:100%;
     
        display:inline-block;
        
    }
    ul.cheming{
           width: 94%;
            word-break: break-all;
            padding: 0.26rem 0 0.24rem;
            font-size: 0.30rem;
            line-height: 0.34rem;
            text-align: left;
    
    }
    ul.jiange{
        text-align: left;
        color:#e5000c;
         position: absolute;
         bottom: 0.32rem;
    }
    span.shu{
        margin-right:0.1rem;
    }
    
</style>