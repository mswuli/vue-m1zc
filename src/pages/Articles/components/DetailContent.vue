<template>
	<div class="DetailContent">
		<div class="detailbanner">
			<div class="zhubox">
				<span class="tuwen">{{typeMsg}}</span>
				<img :src="bannerdata.back_url" alt="">
				<div class="dtitle"><span class="dbiaoti">{{bannerdata.title}}</span></div>
				<ul class="articlzuo">
					<li class="zuozhe"><span>作者</span><span class="zuoming">{{bannerdata.author}}</span></li>
					<li class="zuohisjian">
						<time class="sejian">{{bannerdata.add_time | toTime}}</time>
					</li>
				</ul>
				<ul class="cheyuan" @click="toglcheyuan">
					相关车源
				</ul>
			</div>
			<div class="detailneirong" v-html="msg(bannerdata.content)">
				
			</div>

		</div>
		<!-- <div class="wendianzan">
			<span class="wendianz iconfont" :class="{redcolor: zan}" @click="praiseClick(bannerdata.article_id)">&#xe667;
				<span class="num" v-show="zanShow">{{zanNum}}</span>
			</span>
		</div> -->
		<div class="sharefen">
			<ul class="fenxiangzhi clearfix">
				<!-- <span class="sharemark iconfont tag-read" style="color: #4376CF;" :data-clipboard-text="url" @click="copy">&#xe659;</span> -->
				<span v-show="isapp"  id="btnShareFirend" class="sharemark iconfont" style="color: #51C332;" @click="shareWeixinMessage('WXSceneSession')">&#xe73b;</span>
				<span v-show="isapp" class="sharemark iconfont" style="color: #51C332;" @click="shareWeixinMessage('WXSceneTimeline')">&#xe655;</span>
				<span v-show="isapp" class="sharemark iconfont" style="color: #35A9FF;" @click="shareQqMessage()">&#xe65c;</span>
				
				<span   v-show="!isapp"  id="btnShareFirend" class="sharemark iconfont" style="color: #51C332;" @click="fenxweixin">&#xe73b;</span>
				<span   v-show="!isapp"  class="sharemark iconfont" style="color: #51C332;"  @click="fenxwxpyq">&#xe655;</span>
				<span   v-show="!isapp"  class="sharemark iconfont" style="color: #35A9FF;"  @click="fenxqq">&#xe65c;</span>
				<!-- <span   v-show="!isapp"  class="sharemark iconfont" style="color: #35A9FF;"  @click="fenxqqkj">&#xe697;</span>
				<span   v-show="!isapp"  class="sharemark iconfont" style="color: #35A9FF;"  @click="fenxweibo">&#xe61a;</span> -->
				
				<span class="wenzi">分享至：</span>
				
			</ul>
		</div>

	

		<div class="keyword" v-show="keywords.length!=0">
			<ul class="xiagnguan">关键标签</ul>
			<ul class="guanliancitiao">文章相关词条标签</ul>
			<ul class="xianli">
				<span class="keyli" v-for="(item,i) in keywords" :key="i">{{item}}</span>
			</ul>
		</div>

		<div class="pinglun" v-if="replys">
			<div class="title">
				<h3>相关评论</h3>
				<p>共{{replys.length}}条评论</p>
			</div>
			<ul class="contlist">
				<li v-for="(item,index) in replys" :key="index">
					<div class="img">
						<img :src="require('@/assets/img/center/sprit.png')" alt="" v-if="!item.head_portrait">
						<img :src="require('@/assets/img/center/sprit.png')" alt="" v-else>
					</div>
					<div class="cont">
						<div class="detail">
							<div class="name">
								<div>
									<h3>{{item.user_name}}</h3>
									<p>{{item.addtime | toTimes}}</p>
								</div>
								<div>
									<span style="margin-right: .2rem;color: #4E98EC;font-size: .24rem;" @click="showShare(item.comment_id)">回复</span>
									<span class="iconfont" @click="wenZan(item.id_value,item.comment_id,index,'zan1')">&#xe622;</span>
									<span class="number" ref="zan1">{{item.zan}}</span>
								</div>
							</div>
							<p>{{item.content}}</p>
						</div>
						<div class="reply" v-for="(it,i) in item.son" :key="i">
							<div class="img">
								<img :src="require('@/assets/img/center/sprit.png')" alt="" v-if="!item.head_portrait">
								<img :src="require('@/assets/img/center/sprit.png')" alt="" v-else>
							</div>
							<div class="cont">
								<div class="detail">
									<div class="name">
										<div>
											<h3>{{it.user_name}}</h3>
											<p>{{it.addtime | toTimes}}</p>
										</div>
										<div>
											<span style="margin-right: .2rem;color: #4E98EC;font-size: .24rem;" @click="showShare(it.comment_id)">回复</span>
											<span class="iconfont" @click="wenZan(it.id_value,it.comment_id,i,'zan2')">&#xe622;</span>
											<span class="number" ref="zan2">{{it.zan}}</span>
										</div>
									</div>
									<p>{{it.content}}</p>
								</div>
							</div>
						</div>
					</div>
					<div style="clear: both;"></div>
				</li>
			</ul>
			<div style="clear: both;"></div>
		</div>
		<!-- 发表评论 -->
		<div class="ada">
			<div class="issue">
				<div class="rep">
					<span class="iconfont">&#xe61f;</span>
					<span v-if="replys">{{replys.length}}</span>
					<span v-else>0</span>
				</div>
				<div class="praise">
					<span class="iconfont" @click="praiseClick(bannerdata.article_id)">&#xe622;</span>
					<span>{{zanNum}}</span>
				</div>
				<div class="issuerep">
					<span @click="showShare(0)">发表评论</span>
				</div>
			</div>
		</div>
		<!-- 遮罩 -->
		<div class="ze" v-show="show" @click="hide"></div>
		<!-- 输入框 -->
		<div class="repl">
			<textarea name="" ref="text" cols="30" rows="10" v-model="msg1"></textarea>
			<div><span @click="inssReply(bannerdata.article_id)">发表</span></div>
		</div>
	</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import qs from 'qs'
	import img from '@/assets/img/loading.png'

	import Clipboard from 'clipboard'  //复制插件
	import NativeShare from 'nativeshare'
	var nativeShare = new NativeShare()
	export default {
		name: "DetailContent",
		components: {
			//FenXiang
		},
		watch: {
			title() {
				this.$emit("change", this.title)
			}
		},
		data() {
			return {
				toglid:"",
				bannerdata: {},
				tored: [],
				type: 0,
				videourl: "",
				loadingimg: img,
				keywords: [],
				title: "",
				zan: false,
				zanShow: false,
				zanNum: 0,
				sharejsarr: ["http://res.wx.qq.com/open/js/jweixin-1.4.0.js"], //////分享需要事先加载的js路径
				share: {}, //分享详情  title: '分享标题，最大45字节',   desc: '分享内容，最大60字节', image_url: '图片URL', share_url: '分享链接'
				shares: null,
				sharewx: null,
				shareqq: null,
				sharewb: null,
				sharImg: require('@/assets/img/detail/shar.png'),
				url: "",
				isapp: false, //微信写好后填写到v-show里面
				replys: [],
				show: false,
				msg1: "",
				repNum: 0,
				scrolltop: 0,
			};
		},
		computed: {
			typeMsg() {
				if (this.type == 1) {
					return "图文"
				} else if (this.type == 2) {
					return "视频"
				}
			}
		},
		beforeCreate() {
			function plusready() {
				this.updateService();
			}
			if (window.plus) {
				plusready();
			} else {
				document.addEventListener("plusready", plusready, false);
			}
		},
		methods: {
			//更新分享服
			updateService() {
				let _self = this;
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
			},
			//分享到微信
			shareWeixinMessage(text) {
				if(!window.plus){
					// this.fenxiwx();
					
					return 
				}
				let _self = this;
				_self.sharewx.send({
					type: "web",
					title: _self.title,
					content: _self.toContent(_self.bannerdata.content),
					thumbs: [_self.sharImg],
					href: "https://m.1zhanche.com/" + window.location.hash,
					extra: {
						scene: text
					}
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
					title:  _self.title,
					content:  _self.toContent(_self.bannerdata.content),
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
			//处理分享文章内容格式
			toContent(con){
				con = con.replace(/&nbsp;/ig,"");
				return con.replace(/<\/?.+?>/gi,"");
			},
			//点赞
			praiseClick(id) {
				const url = this.$store.state.Yi + 'index/article/clickZan';
				// console.log(id)
				if (localStorage.token) {
					axios.post(url, qs.stringify({
						token: localStorage.token,
						article_id: id
					})).then(
						(res) => {
							if (res.data.error == 0) {
								this.zan = true;
								this.zanShow = true;
								this.zanNum = this.zanNum + 1;
								const toast = this.$createToast({
									txt: '点赞成功！',
									type: 'correct',
									time: 1500,
									mask: true
								})
								toast.show();
							} else if (res.data.error == 4) {
								const toast = this.$createToast({
									txt: '已点赞过了！',
									type: 'warn',
									time: 1500,
									mask: true
								})
								toast.show();
							} else {
								const toast = this.$createToast({
									txt: '服务器繁忙，请稍后重试！',
									type: 'warn',
									time: 1500,
									mask: true
								})
								toast.show();
							}
						}
					)
				} else {
					this.$router.push({
						path: "/AccountLogin",
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			},
			//请求文章数据
			dataContent() {
				var _this = this;
				const url = this.$store.state.Yi + "index/Article/details";
				const article_id = this.$route.query.Art;
				axios.post(url, qs.stringify({
					token: localStorage.token,
					article_id: article_id
				})).then(this.getDetailsSuc).catch(function(res){
					_this.$router.push({path:"/Articles"});
				})
			},
			getDetailsSuc(res) {
				this.bannerdata = res.data.article;
				this.type = res.data.article.content_type;
				this.videourl = this.bannerdata.video_url;
				this.keywords = this.strtoarr(this.bannerdata.keywords);
				this.title = this.bannerdata.title;
				if (res.data.user_data.is_zan == 1) {
					this.zan = true;
				}
				if (res.data.article.zan > 0) {
					this.zanNum = res.data.article.zan;
					this.zanShow = true;
				}
				this.getsharedetail();
				
				console.log(res.data)
				
				this.toglid = res.data.reco_car.goods_id||"";
			},
			toglcheyuan(){
				if(!!this.toglid){
					this.$router.push({path:"/Detail",query:{goods_id:this.toglid}});
				}
				
			},
			strtoarr(str) {
				str = $.trim(str);
				if (str.length == 0) {
					return [];
				}
				var resp = /，/ig;
				str = str.replace(resp, ",");
				return str.split(",")
			},
			videoShow(ourl, oloadingimg) {
				var str = "";
				str += '<P><br><br></p>';
				str += '<video id="my-player" class="video-js" controls preload="auto" width="100%" height="" poster="' +
					oloadingimg + '" data-setup="{}">';
				str += '<source src="' + ourl + '" type="video/mp4"></source>';
				str += '<p class="vjs-no-js">';
				str += 'To view this video please enable JavaScript, and consider upgrading to aweb browser that';
				str += '<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>';
				str += '</p>';
				str += '</video>';
				str += '<P><br><br></p>';

				return str;
			},


			//文章格式转换
			msg(msg) {
				var oprefix = "https://www.1zhanche.com";
				if (!msg) {
					return "";
				}
				var restype = /style=/ig;
				msg = msg.replace(restype, " ");
				var odm = document.createElement('div');
				odm.innerHTML = msg;
				var oimgs = odm.getElementsByTagName("img");
				for (var i = 0, len = oimgs.length; i < len; i++) {
					var thisimg = oimgs[i];
					var thissrc = thisimg.getAttribute("src");
					var rexp = /http/ig;
					var newimgsrc = thissrc;
					if(!rexp.test(thissrc)){
						newimgsrc = oprefix+newimgsrc;
					}
					thisimg.setAttribute("src", newimgsrc);
					// thisimg.setAttribute("src", oprefix + thissrc);
					thisimg.setAttribute("width", "100%");
				}
				$(odm).find("img").each(function() {
					var opdom = $(this).parents("p");
					if (opdom.length > 0) {
						opdom.css({
							"text-indent": "0px",
							"margin": "1.5em 0px",
						});
					} else {
						$(this).css({
							"margin": "1.5em 0px"
						});
					}
				});

				$(odm).find("p").each(function(onx) {
					if ($(this).find("img").length == 0 && $.trim($(this).text()).length == 0) {
						$(this).remove();
					};
					if ($.trim($(this).text()).length > 0) {
						$(this).css({
							"text-indent": "2em",
							"line-height": "2em",
							"word-break": "break-all",
							"font-size": "0.32rem"
						});
					}
				});
				return odm.innerHTML;
			},
			// //在body 中动态加入 js 
			addsharejsdom(arr) {
				for (var i = 0, len = arr.length; i < len; i++) {
					const s = document.createElement('script');
					s.type = 'text/javascript';
					s.src = arr[i];
					document.body.appendChild(s);
				}
			},
			getsharedetail() {
				this.share.title = this.bannerdata.title;
				var ocontent = $(this.bannerdata.content).text().length;
		
				if (ocontent > 200) {
					this.share.desc = $(this.bannerdata.content).text().slice(0, 200) + "...";
				} else {
					this.share.desc = $(this.bannerdata.content).text().slice(0, 200);
				}
				this.share.image_url = this.bannerdata.back_url;
				this.share.share_url = "https://m.1zhanche.com/"+window.location.hash;

				// title: '分享标题，最大45字节',
				// desc: '分享内容，最大60字节',
				// image_url: '图片URL',
				// share_url: '分享链接'
			},
			
			///////下面是关于sharenative 的
			chushishare(){
				var _this = this;
				var ourl = this.$store.state.Yi +"index/api/wxshare";
				var ocururl = location.href;
				//////分享加密地址
				var shareurl = "https://m.1zhanche.com";
				// console.log(shareurl);
				// console.log(666);
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
			
			fenxweixin(){
				nativeShare.call("wechatFriend");
			},
			fenxwxpyq(){
				nativeShare.call("wechatTimeline");
			},
			fenxqq(){
				nativeShare.call("qqFriend");
			},
			fenxqqkj(){
				nativeShare.call("qZone");
			},
			fenxweibo(){
				nativeShare.call("weibo");
			},
			
			//读取评论
			getComment(){
				const url = this.$store.state.Yi + "index/Article/commentList";
				axios.post(url,qs.stringify({
					article_id: this.$route.query.Art,
				})).then(
					(res) => {
						// console.log(res.data)
						this.replys = res.data.data;
					}
				)
			},
			//隐藏
			hide(){
				if(this.show){
					this.msg1 = "";
					this.repNum = 0;
					this.show = false;
					document.getElementsByClassName("repl")[0].style.top = -3 + 'rem';
					setTimeout(() => {
						document.documentElement.scrollTop = this.scrolltop
						document.body.scrollTop = this.scrolltop
					},30	)
					
				}
			},
			//显示
			showShare(a){
				this.show = !this.show;
				if(localStorage.token){
					if(this.show){
						this.scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
						this.repNum = a;
						document.getElementsByClassName("repl")[0].style.top = 0;
						this.$refs.text.focus()
					}else{
						this.msg1 = "";
						this.repNum = 0;
						document.getElementsByClassName("repl")[0].style.top = -3 + 'rem';
						document.documentElement.scrollTop = this.scrolltop
						document.body.scrollTop = this.scrolltop
					}
				}else{
					this.$router.push({
						path: "/AccountLogin",
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			},
			//赞评论
			wenZan(a,b,c,d){
				const url = this.$store.state.Yi + 'index/Article/clickZanComment';
				if(localStorage.token){
					axios.post(url,qs.stringify({
						token: localStorage.token,
						article_id: a,
						comment_id: b
					})).then(
						(res) => {
							if(res.data.type == 1){
								const toast = this.$createToast({
									txt: '点赞成功！',
									type: 'correct',
									time: 1500,
									mask: true
								})
								toast.show();
								if(d == "zan1"){
									let num = parseInt(this.$refs.zan1[c].innerHTML)
									num++
									this.$refs.zan1[c].innerHTML = num
								}else if(d == "zan2"){
									let num = parseInt(this.$refs.zan2[c].innerHTML)
									num++
									this.$refs.zan2[c].innerHTML = num
								}
							}else if(res.data.type == 0){
								const toast = this.$createToast({
									txt: '点赞失败！',
									type: 'error',
									time: 1500,
									mask: true
								})
								toast.show();
							}else if(res.data.type == 3){
								const toast = this.$createToast({
									txt: '请登录后在操作！',
									type: 'error',
									time: 1500,
									mask: true
								})
								toast.show();
							}else if(res.data.type == 4){
								const toast = this.$createToast({
									txt: '已经点过赞了！',
									type: 'warn',
									time: 1500,
									mask: true
								})
								toast.show();
							}else{
								const toast = this.$createToast({
									txt: '服务器繁忙！',
									type: 'warn',
									time: 1500,
									mask: true
								})
								toast.show();
							}
						}
					)
				}else{
					this.$router.push({
						path: "/AccountLogin",
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			},
			//发表评论
			inssReply(id){
				this.msg1 = this.msg1.replace(/script|select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/gi,"")
				console.log(this.msg1)
				return;
				if(this.msg1.length == 0 || this.msg1 == " "){
					const toast = this.$createToast({
						txt: '内容不能为空！',
						type: 'warn',
						time: 1500,
						mask: true
					})
					toast.show();
					return
				}
				
				const url = this.$store.state.Yi + ' index/Article/addComment';
				if(localStorage.token){
					axios.post(url,qs.stringify({
						token: localStorage.token,
						id_value: id,
						parent_id: this.repNum,
						content: this.msg1,
					})).then(
						(res) => {
							// console.log(res.data)
							if(res.data.error == 0){
								this.msg1 = "";
								this.hide();
								const toast = this.$createToast({
									txt: '发布成功！',
									type: 'warn',
									time: 1500,
									mask: true,
									onTimeout: () => {
										this.getComment()
									}
								})
								toast.show();
							}else if(res.data.error == 0){
								
							}else{
								const toast = this.$createToast({
									txt: '服务器繁忙！',
									type: 'warn',
									time: 1500,
									mask: true
								})
								toast.show();
							}
						}
					)
				}else{
					this.$router.push({
						path: "/AccountLogin",
						query: {
							redirect: this.$route.fullPath
						}
					})
				}
			}
		
		},
		created() {
			this.dataContent();
		},
		mounted() {
			this.copyUrl();
			this.getComment();
			if (window.plus) {
				this.isapp = true;
				this.updateService();
			}
			this.chushishare();
		},
		updated() {
			var lenp = $("div.detailneirong p").length;
			var veolen = $("div.detailneirong video").length;
			if (lenp > 0 && veolen == 0 && $.trim(this.videourl).length != 0) $("div.detailneirong p").eq(0).after(this.videoShow(
				this.videourl, this.loadingimg));
				
		}
	};
</script>

<style scoped="scoped">
	.DetailContent {
		position: relative;
		width: 100%;
		padding-top: 0.9rem;
		font-size: 0.12rem;
		padding-bottom: 1.4rem;
	}

	div.DetailContent p span {
		font-size: 0.12rem !important;
	}

	div.zhubox {
		position: relative;
	}
	div.zhubox::before{
		content:"";
		display:inline-block;
		width:100%;
		height:100%;
		position:absolute;
		background:#000;
		opacity: 0.5;
	}
	div.zhubox img {
		width: 100%;
	}

	span.tuwen {
		position: absolute;
		text-align: center;
		line-height: 0.32rem;
		width: 0.75rem;
		height: 0.32rem;
		display: inline-block;
		top: 0.26rem;
		left: 0.26rem;
		border-radius: 0.12rem;
		background-color: rgba(150, 150, 150, 0.8);
		color: #fff;
		font-size: 0.24rem;
	}

	div.dtitle {
		position: absolute;
		width: 100%;
		top: 40%;
		text-align: center;
		color: #fff;
		font-size: 0.36rem;
	}

	div.dtitle span {
		position: relative;
		display: inline-block;
		width: 75%;
		margin: 0 auto;
		font-size: 0.28rem;
	}

	span.zuoming {
		margin-left: 0.24rem;
		position: relative;
	}

	span.zuoming::after {
		content: ":";
		position: absolute;
		top: 0;
		left: -0.16rem;
	}

	.articlzuo {
		display: flex;
		position: absolute;
		top: 0.26rem;
		right:0.26rem;
		z-index: 100;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.24rem;
	}

	li.zuozhe {
		margin-right: 0.3rem;
	}

	span.wendianz {
		margin: 1em auto 1em;
		position: relative;
		display: inline-block;
		width: 1.06rem;
		height: 1.06rem;
		line-height: 1.06rem;
		border-radius: 50%;
		border: 1px solid #eee;
		font-size: 0.75rem;
	}

	.num {
		position: absolute;
		right: -5px;
		top: -2px;
		font-size: 12px;
		background-color: #e5000c;
		height: 20px;
		line-height: 20px;
		color: #fff;
		width: 20px;
		border-radius: 50%;
		text-align: center;
	}

	span.wendianz.redcolor {
		color: #e5000c;
	}

	div.detailneirong {
		position: relative;
		margin: 0 auto;
		width: 92%;
		text-align: left;
		padding-top: 0.45rem;
	}

	.detailneirong img {
		width: 100%;
	}

	.detailneirong p {
		text-indent: 2em;
	}

	div.keyword {
		position: relative;
		width: 92%;
		text-align: left;
		margin: 0 auto;
		padding: 0.40rem 0;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	div.keyword ul {
		margin: 0;
		padding: 0;
		font-size: 14px;
	}

	div.keyword ul.xiagnguan {
		font-size: 20px;
		font-weight: bold;
	}

	div.keyword ul.guanliancitiao {
		padding: 0.34rem 0;
	}

	span.keyli {
		padding: 0.12rem 0.1rem;
		border-radius: 0.12rem;
		border: 1px solid #eee;
		margin-right: .2rem;
	}

	ul.xianli {
		display: flex;
		flex-wrap: wrap;
	}

	div.pinglun {
		/* height: 100px; */
		width: 92%;
	}

	.fenxiangzhi {
		width: 92%;
		position: relative;
		margin: 0 auto;
		text-align: right;
		height: 0.9rem;
		line-height: 0.9rem;
	}

	.fenxiangzhi>span {
		float: right;
	}

	span.wenzi {
		font-size: .28rem;
	}

	span.sharemark {
		width: 0.7rem;
		font-size: .7rem;
		margin-right: .24rem;
	}

	span.sharemark:first-child {
		margin-right: 0
	}
	
	/* 评论 */
	.pinglun{
		text-align: left;
		padding: 4%;
	}
	
	.pinglun .title h3{
		font-size: 20px;
		font-weight: bold;
	}
	
	.pinglun .title p{
		font-size: .24rem;
		color: #999;
		padding: .2rem 0;
	}
	
	.pinglun .contlist li{
		padding-bottom: .4rem;
	}
	
	.pinglun .contlist li .img{
		float: left;
		width: 14%;
	}
	
	.pinglun .contlist li .img img{
		width: 70%;
	}
	
	.pinglun .contlist li .cont{
		float: left;
		width: 86%;
	}
	
	.cont .detail .name{
		height: .72rem;
		display: flex;
	}
	
	.cont .detail .name>div:first-child{
		flex: 2;
	}
	
	.cont .detail .name>div:first-child h3{
		font-size: .3rem;
	}
	
	.cont .detail .name>div:first-child p{
		font-size: .24rem;
		padding-top: .1rem;
		color: #999;
	}
	
	.cont .detail .name>div:last-child{
		flex: 1;
		text-align: right; 
		line-height: .72rem;
	}
	
	.cont .detail .name>div:last-child .iconfont{
		font-size: .36rem;
		margin-right: .1rem;
		color: #000;
	}
	
	.cont .detail .name>div:last-child .number{
		color: #999;
	}
	
	.cont .detail>p{
		font-size: .24rem;
		margin-top: .2rem;
		line-height: .3rem;
	}
	
	.reply{
		margin-top: .4rem;
	}
	
	.ada{
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
	}
	
	.issue{
		display: flex;
		height: .9rem;
		width: 92%;
		line-height: .9rem;
		margin: 0 4% 4% 4%;
		background-color: #f9f9fa;
		border-radius: .3rem;
	}
	
	.issue div .iconfont{
		font-size: .4rem;
	}
	
	.issue .rep{
		flex: 1;
		font-size: .3rem;
	}
	
	.issue .praise{
		flex: 1;
		font-size: .3rem;
	}
	
	.issue .issuerep{
		flex: 2;
		font-size: .32rem;
		text-align: right;
		margin-right: .12rem
	}
	
	.issue .issuerep span{
		background-color: #e64953;
		color: #fff;
		padding: .18rem .5rem;
		border-radius: .24rem;
	}
	
	.ze{
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 900;
		top: 0;
		left: 0;
	}
	
	.repl{
		position: fixed;
		z-index: 999;
		left: 0;
		top: -3rem;
		height: 3rem;
		width: 100%;
		background-color: #fff;
		font-size: .28rem;
		transition: all .3s ease;
		border-bottom-left-radius: .1rem;
		border-bottom-right-radius: .1rem;
	}
	
	.repl textarea{
		height: 1.6rem;
		width: 94%;
		border: 1px solid #eaeaea;
		margin: 3%;
		border-radius: .1rem;
	}
	
	.repl div{
		width: 100%;
		text-align: right;
	}
	
	.repl div span{
		background-color: #eaeaea;
		padding: .1rem .3rem;
		margin-right: 3%;
		border-radius: .1rem;
	}
	ul.cheyuan{
		display:inline-block;
		width:1.32rem;
		height:0.44rem;
		line-height:0.44rem;
		background:#ff5236;
		color:#fff;
		font-size: 0.28rem ;
		text-align: center;
		z-index: 999;
		position:absolute;
		bottom:0.12rem;
		right:0.26rem;
		border-radius: 0.080rem;
	}
	
	/* iPhoneX,iPhoneXs的适配*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.ada {
			padding-bottom: 27px;
		}
		.repl{
			bottom: 90px;
		}
	}
	
	/* iPhoneXs Max的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.ada {
			padding-bottom: 27px;
		}
		.repl{
			bottom: 90px;
		}
	}
	
	/* iPhoneXr的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.ada {
			padding-bottom: 27px;
		}
		.repl{
			bottom: 90px;
		}
	}
</style>
