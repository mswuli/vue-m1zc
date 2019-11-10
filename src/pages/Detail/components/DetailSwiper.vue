<template>
	<div class="wrapper" id="title" v-if="DatailData.goodInfo">
		<swiper :options="swiperOption">
			<swiper-slide class="swiper-slide" v-for="(item,index) in DatailData.goodsPics" :key="index">
				<!-- <img :src="item.image | fnName" alt=""> -->
				<!-- 缩略图 -->
				<img :src="item.image_abbreviation" alt="">
			</swiper-slide>
			<!-- 页码 -->
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<div class="title">外观:{{DatailData.goodInfo.in_color}} 内饰:{{DatailData.goodInfo.outside_color}}</div>

		<div class="navbar" :class="{navbarScroll: navBar}">
			<div class="prev" :class="{prevBar: navBar}">
				<span class="iconfont" @click="toMall()">&#xe606;</span>
			</div>
			<div class="menu" :class="{menuBar: navBar}">
				<span @click="tocompare" id="duibi"><p>对比</p></span>
				<span v-if="isapp" @click="showShare"><p>分享</p></span>
				<span v-if="!isapp" class="webshd" @click="webtoshare"><p>分享</p></span>
                <i class="xianshi" v-if="futozi>0">{{futozi}}</i>
			</div>
		</div>

		<div class="share" v-show="show" @click="hideShare">
			<div class="icon boxbt">
				<div class="iconlist">
					<div @click="shareWeixinMessage('WXSceneSession')" v-show="isapp">
						<p><span class="iconfont" style="color: #51C332;">&#xe73b;</span></p>
						<p>微信好友</p>
					</div>
					<div @click="shareWeixinMessage('WXSceneTimeline')" v-show="isapp">
						<p><span class="iconfont" style="color: #51C332;">&#xe655;</span></p>
						<p>朋友圈</p>
					</div>
					<div @click="shareQqMessage" v-show="isapp">
						<p><span class="iconfont" style="color: #35A9FF;">&#xe65c;</span></p>
						<p>QQ</p>
					</div>
					<!-- <div @click="shareWeiboMessage">
						<p><span class="iconfont" style="color: #D0011B;">&#xe61a;</span></p>
						<p>微博</p>
					</div> -->
					<div class="tag-read" :data-clipboard-text="url" @click="copy">
						<p><span class="iconfont" style="color: #4376CF;">&#xe659;</span></p>
						<p>复制链接</p>
					</div>
				</div>
				<div class="cancel boxbt" @click="hideShare">
					取消分享
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	import Button from 'cube-ui'
	import Clipboard from 'clipboard'
	import NativeShare from 'nativeshare'
	var nativeShare = new NativeShare()

	export default {
		name: 'DetailSwiper',
		props: {
			DatailData: Object,
			futozi:Number,
		},
		watch: {
			DatailData(t){
				// console.log(t)
				this.title = t.goodInfo.in_paragraph + "款" + t.goodInfo.m_name + t.goodInfo.goods_name + t.goodInfo.displacement + t.goodInfo.fuel;
				this.content = "一站车售价" + t.goodInfo.shop_price + "万";
				this.sharImg = t.goodsPics[0].image + "?x-oss-process=style/app_jietu";

				this.getsharedetail();
				this.chushishare();
			}
		},
		data() {
			return {
				navBar: false,
				swiperOption: {
					//显示分页
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
					//开启循环模式
					loop: true,
				},
				show: false,
				shares: null,
				sharewx: null,
				shareqq: null,
				sharewb: null,
				sharImg: require('@/assets/img/detail/shar.png'),
				title: "",
				content: "",
				url: "",
				isapp: false, //微信写好后填写到v-show里面
				share:{title:"",},
			}
		},
		methods: {
			//更新分享服
			updateService(){
				let _self = this;
        mui.plusReady(function () {
          // 扩展API加载完毕，现在可以正常调用扩展API
          plus.share.getServices(function(s) {
          	_self.shares = s;
          	for (var i in s) {
          		if ('weixin' == s[i].id) {
          			_self.sharewx = s[i];
          		}
          	}
          	for (var i in s) {
          		if ('qq' == s[i].id) {
          			_self.shareqq = s[i];
          		}
          	}
          	// for (var i in s) {
          	// 	if ('sinaweibo' == s[i].id) {
          	// 		_self.sharewb = s[i];
          	// 	}
          	// }
          }, function(e) {
          	mui.toast("获取分享服务列表失败：" + e.message);
          });
        });
			},
			//分享到微信
			shareWeixinMessage(text) {
				let _self = this;
				let imgU = _self.sharImg;
				if(mui.os.ios) {
					imgU = require('@/assets/img/detail/shar.png');
				}else{
					imgU = _self.sharImg;
				}
				_self.sharewx.send({
					type: "web",
					title: _self.title,
					content: _self.content,
					thumbs: [imgU],
					href:  "https://m.1zhanche.com/" + window.location.hash,
					extra: {scene: text}
				}, function() {
					mui.toast("分享成功！");
				}, function(e) {
					mui.toast("分享失败：" + e.message);
				});
			},
			//分享到QQ
			shareQqMessage() {
				let _self = this;
				_self.shareqq.send({
					type: "text",
					title: _self.title,
					content: _self.content,
					href: "https://m.1zhanche.com/" + window.location.hash,
					pictures: [_self.sharImg]
				}, function() {
					mui.toast("分享成功！");
				}, function(e) {
					mui.toast("分享失败：" + e.message);
				});
			},
			//分享到微博
			// shareWeiboMessage() {
			// 	this.sharewb.send({
			// 		type: "web",
			// 		content: "1站式购车平台",
			// 		href: "https://m.1zhanche.com/" + window.location.hash
			// 	}, function() {
			// 		mui.toast("分享成功！");
			// 	}, function(e) {
			// 		mui.toast("分享失败：" + e.message);
			// 	});
			// },
			//显示分享
			showShare(){
				this.show = true
				setTimeout(function(){
					document.getElementsByClassName("icon")[0].style.bottom = 0;
				},100)
			},
			//收起分享
			hideShare(){
				document.getElementsByClassName("icon")[0].style.bottom = -3 + 'rem';
				let _self = this;
				setTimeout(function(){
					_self.show = false
				},300)
			},
			//返回首页
			toMall() {
				if(this.$route.query.key){
					this.$router.push({
						path: '/MallSearchs',
					})
				}else{
					this.$router.push("/Mall");
				}
			},
			// 复制地址到剪切板
			copyUrl(){
				this.url = "https://m.1zhanche.com/" + window.location.hash;
			},
			copy() {
				var clipboard = new Clipboard('.tag-read')
				clipboard.on('success', e => {
					this.$createToast({
						type:"correct",
						time: 2000,
						txt: '复制成功,快去粘贴吧！'
					}).show()
					// 释放内存
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制
					// this.$createToast({
					// 	type:"error",
					// 	time: 2000,
					// 	txt: '该浏览器暂不支持自动复制！'
					// }).show()
					// 释放内存
					clipboard.destroy()
				})
			},
			showFiltrate() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(document.getElementById("title")){
					var offsetTop = document.getElementById("title").offsetHeight;
				}
				if(scrollTop > offsetTop - 33){
					this.navBar = true;
				}else{
					this.navBar = false;
				}
				this.$emit("change",this.navBar);
			},
			// 对此
      tocompare(){
        var goodsIds = localStorage.addui;
        if(!goodsIds){
					this.$createToast({
						type:"warn",
						time: 2000,
						txt: '请先添加对比项目！'
				  }).show()
          return ;
        }
        this.$router.push({
          path: '/Compare',
          query:{
            goodsIds: goodsIds
          }
        })
      },
			webtoshare(){
				nativeShare.call();
			},
			getsharedetail() {
				this.share.title = this.title;
				this.share.desc = this.content||"";
				if (this.share.desc.length > 200) {
					this.share.desc = this.share.desc.slice(0, 200) + "...";
				} else {
					this.share.desc = this.share.desc.slice(0, 200);
				}
				this.share.image_url = this.sharImg;
				this.share.share_url = "https://m.1zhanche.com/"+window.location.hash;
				// console.log(this.share);
				// title: '分享标题，最大45字节',
				// desc: '分享内容，最大60字节',
				// image_url: '图片URL',
				// share_url: '分享链接'
			},
			// 下面是关于sharenative 的
			chushishare(){
				var _this = this;
				var ourl = this.$store.state.Yi +"index/api/wxshare";
				var ocururl = location.href;
				// 分享加密地址
				var shareurl = "https://m.1zhanche.com";
				axios.get(ourl,{params:{url:shareurl}}).then(function(res){
					// console.log(res.data);
					var fanjson = res.data;
					nativeShare = new NativeShare({
						wechatConfig: {
							appId: fanjson.appid, //appid,
							timestamp: fanjson.timestamp, // 时间戳
							nonceStr: fanjson.noncestr, // 随机字符串
							signature: fanjson.signature, // 签名
						},
						// 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
						// 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
						syncDescToTag: false,
						syncIconToTag: false,
						syncTitleToTag: false,
					});
					nativeShare.setShareData({
						icon:  _this.share.image_url, // 分享图标
						link: _this.share.share_url, // 分享链接
						title: _this.share.title, // 分享标题,
						desc: _this.share.desc, // 分享描述
						from: '1站车',
						success: function() {
							alert('success')
						},
						fail: function() {
							alert('fail')
						}
					})
				});
			},

		},
		filters: {
			fnName: function(value) {
				return value+"?x-oss-process=style/app_jietu";
			}
		},
		mounted() {
			this.copyUrl();
			if (window.plus) {
				this.isapp = true;
				this.updateService();
			}
			window.addEventListener('scroll',this.showFiltrate);
		},
		destroyed() {
			window.removeEventListener('scroll',this.showFiltrate);
		}

	}
</script>

<style scoped="scoped" lang="stylus">
	.wrapper
		// margin-top .9rem
		position relative

	.title
		position absolute
		background-color rgba(255,255,255,.6)
		height .36rem
		line-height .36rem
		border-radius .18rem
		font-size .24rem
		color #333
		bottom .2rem
		z-index 10
		left .24rem
		padding 0 .1rem
		max-width 91%
		overflow hidden
		white-space nowrap
		text-overflow ellipsis

	.wrapper>>>.swiper-pagination-fraction
		background-color rgba(255,255,255,.6)
		width auto
		height .36rem
		line-height .36rem
		border-radius .18rem
		font-size .24rem
		left .24rem
		bottom .64rem
		color #333
		padding 0 .1rem

	.swiper-slide
		width 100%
		text-align center

	.swiper-slide img
		width 100%

	.navbar
		position fixed
		height .88rem
		width 100%
		top 0
		z-index 15

	.navbar span
		font-size 18px

	.prev
		position absolute
		z-index 10
		color #fff
		height .6rem
		width .6rem
		border-radius 50%
		background-color rgba(0,0,0,.3)
		line-height .6rem
		top .14rem
		left .1rem

	.prevBar
		color #333
		background-color #fff

	.menu
		position absolute
		z-index 10
		top .15rem
		right 0rem
		height .6rem
		width 2.46rem

	.menu span
		float left
		height .6rem
		width 1.06rem
		line-height .6rem
		color #fff
		background-color rgba(0,0,0,.3)
		border-radius .3rem
		margin-left .1rem
		padding-right 1px

	.menu span p
		display inline-block
		border 2px solid #fff
		height 0.4rem
		line-height 21px
		border-radius 14px
		padding 0px 6px
		font-size .3rem

	.menuBar span
		color #333
		background-color #fff

	.navbarScroll
		background-color #fcfcfc
		border-bottom 1px #eaeaea solid

	.navbarScroll span p
		border 2px solid #999

	.xianshi{
		position: absolute;
		display: inline-block;
		width: 18px;
		height: 18px;
		line-height:20px;
		text-align:center;
		top: -6px;
		left: 45px;
		color: #fff;
		background: #e5000c;
		border-radius:50%;
	}

	.share
		position fixed
		width 100%
		height 100%
		background-color rgba(0,0,0,.4)
		z-index 9999
		top 0

	.icon
		position absolute
		bottom -3rem
		height 3rem
		width 100%
		background-color #eaeaea
		transition all .3s ease

	.iconlist
		display flex

	.iconlist>div
		margin-top: .5rem
		flex 1

	.iconlist>div p span
		font-size .9rem

	.cancel
		position absolute
		bottom 0
		height .8rem
		line-height .8rem
		font-size .30rem
		width 100%
		background-color #fff


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
