<template>
	<div class="AddrNav boxbt">
		<div class="first">
			<div class="service" @click="kf()">
				<p><span class="iconfont">&#xe621;</span></p>
				<p>客服</p>
			</div>
			<div class="shopCar service"  @click="addgouwuche(goodid)">
				<p><span class="iconfont">&#xe610;</span></p>
				<p>加入购物车</p>
			</div>
		</div>
		<div class="contrast" @click="toDetail">上一步</div>
		<div class="go" @click="toNext">下一步</div>
	</div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    
    
	export default{
		name: 'AddrNav',
        props:{
        	goodid: Number,
            oMobis:Object 
        },
		data(){
			return{
				omsg:{}
			}
		},
		methods:{
			toDetail(){
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: this.$route.query.goods_id
					}
				});
			},

			toNext(){
                 var qurl = this.$store.state.Yi + "index/order/addrAdd";
                 var _this = this;
				if(this.$store.state.orderNext){
                    
                    this.$store.dispatch("changeNext",false);
                    
                   var otoken= localStorage.token;
                     if(typeof otoken =="undefined"){
                         this.showPopup();
                         return ;
                      }
                    
                    axios.post(qurl,qs.stringify({
                        address:this.oMobis.Address,
                        distance:this.oMobis.distance,
                        goods_id:this.oMobis.goods_id,
                        type:this.oMobis.type,
                        cart_id: this.oMobis.cart_id,
                        token:otoken
                    })).then(function(res){
                        console.log(res.data);
                        if(res.data.error==0){
                            _this.$router.push({
                            	path: "/OrderIns",
                            	query: {
                            		goods_id: _this.$route.query.goods_id,
                                    cart_id:res.data.data.cart_id
                            	}
                            });
                        } 
                    });
                    
				}else{
					const toast = this.$createToast({
						txt: '请选择提车地点！',
						type: 'error',
						time: 1500
					})
					toast.show() 
				}
			},
             showPopup() {
				this.$router.push({path: "/AccountLogin",query: {redirect: this.$route.fullPath}});
             //  var _this=this;
             //  const toast = this.$createToast({
             // 	txt: '您还未登录,请先登录！',
             // 	type: 'warn',
             // 	time: 2500,
             //  mask:true,
             //  $events: {
             //      timeout: () => {
             //        _this.$router.push({path: "/AccountLogin"});
             //      }
             //    }
             // }).show()
            },
            addgouwuche(n){
               
              var ogwcurl = this.$store.state.Yi + "index/cart/mallCartAdd";
              var _this=this;
              var otoken= localStorage.token;
                 if(typeof otoken =="undefined"){
                    this.showPopup();
                    return ;
                   }
                   
               axios.post(ogwcurl,qs.stringify({
                     'goods_id':_this.oMobis.goods_id,
                     'token':otoken
                  })).then(function(res){
                if(res.data.error==0){
                    
                  _this.addsucccessgwc()
                }else{
                  _this.adderrorgwc()
                }
              });
              
            },
            showPopup() {
             // var _this=this;
			  this.$router.push({path: "/AccountLogin",query: {redirect: this.$route.fullPath}});
             //  const toast = this.$createToast({
             // 	txt: '您还未登录,请先登录！',
             // 	type: 'warn',
             // 	time: 2500,
             //  mask:true,
             //  $events: {
             //      timeout: () => {
             //        _this.$router.push({path: "/AccountLogin",query: {redirect: _this.$route.fullPath}});
             //      }
             //    }
             // }).show()
            },
            addsucccessgwc(){
              const toast = this.$createToast({
              	txt: '添加购物车成功！',
              	type: 'correct',
              	time: 2000,
                mask:true,
              }).show()
            },
            adderrorgwc(){
              const toast = this.$createToast({
              	txt: '添加购物车失败！',
              	type: 'error',
              	time: 2000,
                mask:true,
              }).show()
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
            
		},
	}
</script>

<style scoped="scoped">
	.AddrNav{
		position: fixed;
		z-index: 25;
		bottom: 0;
		height: 1rem;
		width: 100%;
		display: flex;
		background-color: #f7f7f7;
		box-shadow: 2px 0 2px #eee;
	}
	
	.AddrNav>div{
		flex: 1;
	}
	
	.AddrNav .first{
		flex: 1.4;
	}
	
	.AddrNav .first div{
		float: left;
		width: 50%;
		height: 100%;
		
	}
	
	.AddrNav .first .service{
		padding-top: .05rem;
		border-right: 1px solid #e0e0e0;
		box-sizing: border-box;
		font-size: .24rem;
	}
	
	.AddrNav .first .service p{
		margin-top: .05rem;
	}
	
	.AddrNav .first .service .iconfont{
		font-size: .5rem;
	}
	
	.AddrNav .first .shopCar .iconfont{
		font-size: .5rem;
	}
	
	.AddrNav .contrast{
		line-height: 1rem;
		background-color: #333333;
		color: #fff;
		font-size: .34rem;
	}
	
	.AddrNav .go{
		line-height: 1rem;
		background-color: #e5000c;
		color: #fff;
		font-size: .34rem;
	}
	
	/* iPhoneX,iPhoneXs的适配*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.boxbt{
			padding-bottom: 27px;
		}
	}
	/* iPhoneXs Max的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.boxbt{
			padding-bottom: 27px;
		}
	}
	/* iPhoneXr的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.boxbt{
			padding-bottom: 27px;
		}
	}
</style>
