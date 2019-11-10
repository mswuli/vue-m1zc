<template>
    <div class="InsNav boxbt">
    	<div class="first">
    		<div class="service" @click="kf()">
    			<p><span class="iconfont">&#xe621;</span></p>
    			<p>客服</p>
    		</div>
    		<div class="shopCar service" @click="addgouwuche" >
    			<p><span class="iconfont">&#xe610;</span></p>
    			<p>加入购物车</p>
    		</div>
    	</div>
    	<div class="contrast" @click="toPrev">上一步</div>
    	<div class="go" @click="toNext">下一步</div>
    </div>
</template>


<script>
    import axios from 'axios'
    import qs from 'qs'
    
	export default{
		name: 'InsNav',
         props:{
            canobj:Object 
        },
		data(){
			return{
				
			}
		},
		methods: {
			toPrev(){
				this.$router.push({
					path: "/OrderAddr",
					query: {
						goods_id:this.$route.query.goods_id,
                        cart_id:this.$route.query.cart_id
					}
				})
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
			
            
			toNext(){
                var qurl = this.$store.state.Yi + "index/order/insAdd";
                var _this = this;
                var otoken= localStorage.token;
                if(typeof otoken =="undefined"){
                      this.showPopup();
                      return ;
                }
               
                axios.post(qurl,qs.stringify({
                    ins_company_id:this.canobj.ins_company_id,
                    gua_rel_id : this.canobj.gua_rel_id ,
                    rule_ids:this.canobj.rule_ids ,
                    sdew_ids:this.canobj.sdew_ids,
                    compulsory_id :this.canobj.compulsory_id ,
                    vehicel_id:  this.canobj.vehicel_id,
                    goods_id: this.canobj.goods_id,
                    cart_id: this.canobj.cart_id,
                    type:2,
                    token:otoken
                })).then(function(res){
                    console.log(res.data);
                    if(res.data.error==0){
                        _this.$router.push({
                        	path: "/OrderSum",
                        	query: {
                                cart_id:res.data.data.cart_id
                        	}
                        });
                    } 
                });
			},
           
             addgouwuche(){
              var ogwcurl = this.$store.state.Yi + "index/order/insAdd";
              var _this=this;
              var otoken= localStorage.token;
                 if(typeof otoken =="undefined"){
                    this.showPopup();
                    return ;
                   }
                   
               axios.post(ogwcurl,qs.stringify({
                       ins_company_id:this.canobj.ins_company_id,
                       gua_rel_id : this.canobj.gua_rel_id ,
                       rule_ids:this.canobj.rule_ids ,
                       sdew_ids:this.canobj.sdew_ids,
                       compulsory_id :this.canobj.compulsory_id ,
                       vehicel_id:  this.canobj.vehicel_id,
                       goods_id: this.canobj.goods_id,
                       cart_id: this.canobj.cart_id,
                       type:1,
                       token:otoken
                  })).then(function(res){
                      console.log(res.data);
                    if(res.data.error==0){
                      _this.addsucccessgwc()
                    }else{
                      _this.adderrorgwc()
                    }
                  });
              
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
            }
            
            
           
		}
	}
</script>

<style scoped="scoped">
	.InsNav{
		position: fixed;
		z-index: 25;
		bottom: 0;
		height: 1rem;
		width: 100%;
		display: flex;
		background-color: #f7f7f7;
		box-shadow: 2px 0 2px #eee;
	}
	
	.InsNav>div{
		flex: 1;
	}
	
	.InsNav .first{
		flex: 1.4;
	}
	
	.InsNav .first div{
		float: left;
		width: 50%;
		height: 100%;
		
	}
	
	.InsNav .first .service{
		padding-top: .05rem;
		border-right: 1px solid #e0e0e0;
		box-sizing: border-box;
		font-size: .24rem;
	}
	
	.InsNav .first .service p{
		margin-top: .05rem;
	}
	
	.InsNav .first .service .iconfont{
		font-size: .5rem;
	}
	
	.InsNav .first .shopCar .iconfont{
		font-size: .5rem;
	}
	
	.InsNav .contrast{
		line-height: 1rem;
		background-color: #333333;
		color: #fff;
		font-size: .34rem;
	}
	
	.InsNav .go{
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
