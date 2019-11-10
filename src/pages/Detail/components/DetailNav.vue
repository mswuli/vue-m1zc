<template>
	<div class="DetailNav boxbt" v-if="Object.keys(DatailData).length != 0">
		<div class="first">
			<div class="service" @click="kf()">
				<p><span class="iconfont">&#xe621;</span></p>
				<p>客服</p>
			</div>
			<div class="shopCar service" @click="addgouwuche(DatailData.goodInfo.goods_id)">
				<p><span class="iconfont">&#xe610;</span></p>
				<p>加入购物车</p>
			</div>
		</div>
		<div class="contrast" @click="pageadd">加入对比</div>
		<div class="go" @click="toOrderAddr(DatailData.goodInfo.goods_id)">下一步</div>
	</div>
</template>

<script>
	import fly12 from '@/assets/fly'
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: "DetailNav",
		props: {
			DatailData: Object,

		},
		data() {
			return {
				arr: []
			};
		},

		methods: {
			pageadd(e) {
				var goodsid = this.$route.query.goods_id + "";
				var storagearr = this.getstoragearrids();

				if (storagearr.length >= 4) {
					this.$createToast({
						type: "",
						time: 2000,
						txt: '温馨提示，对比最多可以添加 4 项！'
					}).show();

					return false;
				}
				this.flymove(e);
			},

			flymove(event){
				var _this = this;
				var qishi =  event.target;

				 // 以下是飞入的效果实现
                var offset = $("#duibi").offset();   // 终点位置
                var addcar = $(qishi);
				var hrefsrc= $("div.swiper-slide.swiper-slide-active img").attr("src");
				var flyer = $("<img src='"+hrefsrc+"'>");
				flyer.css({"width":"30px","height":"30px","position":"absolute","left":"50px","top":0,"border-radius":"50%","z-index":"9999"});
				flyer.appendTo(addcar);	
				var Oscrolltop = $(document).scrollTop();
                flyer.fly({
                    start: {
                        left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
                        top: event.pageY-50 - Oscrolltop, //开始位置（必填） 
                    },
                    end: {
                        left: offset.left+30 , //结束位置（必填） 
                        top: offset.top+20 - Oscrolltop, //结束位置（必填） 
                        width: 0, //结束时宽度 
                        height: 0 //结束时高度 
                    },
                    onEnd: function () { //结束回调 
                        this.destory(); //移除dom 
						_this.feiruhouset()
                    }
                });
				
			},
			
			feiruhouset(){
				var goodsid = this.$route.query.goods_id + "";
				var storagearr = this.getstoragearrids();				
				if (storagearr.indexOf(goodsid) == -1) {
					storagearr.push(goodsid);
				}
				var curids = storagearr.join("-");
				localStorage.setItem("addui", curids);
				
				this.$emit("changefushu", storagearr.length);
							
				this.$createToast({
					type: "",
					time: 1000,
					txt: '对比添加成功！'
				}).show()
			},

			getstoragearrids() {
				var idsarr = [];
				var curids = localStorage.getItem("addui");
				if (curids) { ////如果有id 
					if (curids.indexOf("-") == -1) { //// 当有一个Id时
						idsarr.push(curids);
					} else if (curids.indexOf("-") != -1) { //////当有多个id 时
						idsarr = curids.split("-")
					}
				}
				return idsarr;
			},

			toOrderAddr(a) {
				this.$router.push({
					path: "/OrderAddr",
					query: {
						goods_id: a
					}
				});
			},
			addgouwuche(n) {
				var ogwcurl = this.$store.state.Yi + "index/cart/mallCartAdd";
				var _this = this;
				var otoken = localStorage.token;
				if (typeof otoken == "undefined") {
					this.showPopup();
					return;
				}

				axios.post(ogwcurl, qs.stringify({
					'goods_id': n,
					'token': otoken
				})).then(function(res) {
					if (res.data.error == 0) {
						_this.addsucccessgwc()
					} else {
						_this.adderrorgwc()
					}
				});

			},
			showPopup() {
				this.$router.push({
					path: "/AccountLogin",
					query: {
						redirect: this.$route.fullPath
					}
				})
				//  var _this=this;
				//  const toast = this.$createToast({
				// 	txt: '您还未登录,请先登录！',
				// 	type: 'warn',
				// 	time: 1500,
				//  mask:true,
				//  $events: {
				//      timeout: () => {
				//        _this.$router.push({path: "/AccountLogin",query: {redirect: _this.$route.fullPath}})
				//      }
				//    }
				// }).show()
			},
			addsucccessgwc() {
				const toast = this.$createToast({
					txt: '添加购物车成功！',
					type: 'correct',
					time: 2000,
					mask: true,
				}).show()
			},
			adderrorgwc() {
				const toast = this.$createToast({
					txt: '添加购物车失败！',
					type: 'error',
					time: 2000,
					mask: true,
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
		mounted() {
			
		}
	};
</script>

<style scoped="scoped">
	.DetailNav {
		position: fixed;
		z-index: 25;
		bottom: 0;
		height: 1rem;
		width: 100%;
		display: flex;
		background-color: #f7f7f7;
		box-shadow: 2px 0 2px #eee;
	}

	.DetailNav>div {
		flex: 1;
	}

	.DetailNav .first {
		flex: 1.4;
	}

	.DetailNav .first div {
		float: left;
		width: 50%;
		height: 100%;
	}

	.DetailNav .first .service {
		padding-top: 0.05rem;
		border-right: 1px solid #e0e0e0;
		box-sizing: border-box;
		font-size: 0.24rem;
	}

	.DetailNav .first .service p {
		margin-top: 0.05rem;
	}

	.DetailNav .first .service .iconfont {
		font-size: 0.5rem;
	}

	.DetailNav .first .shopCar .iconfont {
		font-size: 0.5rem;
	}

	.DetailNav .contrast {
		line-height: 1rem;
		background-color: #333333;
		color: #fff;
		font-size: 0.34rem;
		position:relative;
	}
	.DetailNav .contrast img{
		position:absolute;
		width:16px;
		height:16px;
		border-radius: 50%;
		top:0;
		left:50%;
	}
	.DetailNav .go {
		line-height: 1rem;
		background-color: #e5000c;
		color: #fff;
		font-size: 0.34rem;
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
