<template>
	<div class="ArticlesSearchs">
		<div class="search">
			<div class="search-input">
				<span class="iconfont">&#xe603;</span>
				<input type="text" placeholder="请输入关键字" v-model="msg1" ref="myInput" @keyup="getSearchInfo">
			</div>
			<div class="service-input">
				<span class="iconfont" @click="toMall">取消</span>
			</div>
		</div>
		
		<div class="ArticlesList showSearch" v-show="!show">
				<dl v-for="(item,index) in searchList" :key="index" @click="toArticlesDetail(item.article_id)">
					<dt><img :src="item.file_url" alt=""></dt>
					<dd>
						<h2>{{item.title}}</h2>
						<p class="text">{{toContent(item.content)}}</p>
						<div class="writer">
							<div><i class="iconfont">&#xe618;</i><span>{{item.author}}</span></div>
							<div><i class="iconfont">&#xe61e;</i><span>{{item.add_time | toTime}}</span></div>
						</div>
					</dd>
				</dl>

				<div class="more-load" v-if="isMoreLoad" @click="getServerData">
					<img v-if="loadingImg" :src="require('@/assets/img/loading/loading.gif')" alt="">
					<span v-else>查看更多</span>
				</div>
				<div class="more-load" v-if="loadLastText"> 暂无更多的文章 </div>
		</div>
		
	</div>
	
</template>

<script>
	import axios from 'axios'

	export default {
		name: "ArticlesSearchs",
		data(){
			return{
				msg1: "",
				show: false,
				shows: false,
				searchList: [],
				isMoreLoad: false,  //是否显示加载更多
				loadingImg: false,  //显示loading图
				loadLastText: false,  //到底了
				definePageNum: 0,  //记录当前的页码
			}
		},
		methods: {
			toArticlesDetail(a){
				this.$router.push({
					path: "/ArticlesDetail",
					query: {
						Art: a,
						key: this.msg1
					}
				});
			},
			toAccountLogin() {
				this.$router.push("/AccountLogin");
			},
			//处理文章内容格式
			toContent(con){
				con = con.replace(/&nbsp;/ig,"");
				return con.replace(/<\/?.+?>/gi,"");
			},
			//回到首页
			toMall(){
				this.$router.push('/Articles');
			},
			//获取焦点
			// onfocus(){
			// 	let self = this;
			// 	if(!this.$route.query.key){
			// 		setTimeout(function(){
			// 			self.$refs.myInput.focus();
			// 		},200)
			// 	}
			// },
			//搜索
			getSearchInfo(e) {
				if (e.keyCode == 13) {
					this.$refs.myInput.blur();
					this.searchList = [];
					this.isMoreLoad = false;  //是否显示加载更多
					this.loadingImg = false;  //显示loading图
					this.loadLastText = false;  //到底了
					this.definePageNum = 0;  //记录当前的页码
					this.getServerData();
				}
			},
			//滑动加载
			getServerData(){
				if (this.loadingImg) return  // 防止多次加载
				this.loadingImg = true;  //显示加载动图
				this.definePageNum = this.definePageNum  + 1;  // 第一次获取时为默认值
				
				const url = this.$store.state.Yi + 'index/article/searchByKey';
				axios.get(url, {
					params: {
						key: this.msg1,
						opage: this.definePageNum
					}
				}).then(
					(res) => {
						if(res.data.error == "0"){
							for(let i in res.data.data.article){
								this.searchList.push(res.data.data.article[i])
							}
							
							if (this.definePageNum < res.data.data.pageCount) {
								//console.log('加载')
								this.isMoreLoad = true;
							} else {
								//console.log('到底了')
								this.isMoreLoad = false;
								this.loadLastText = true;
							}
							this.loadingImg = false;
						}
					}
				)
			},
			listenScrolls(){
				let self = this;
				let scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
				let clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
				let scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
				if (scr + clientHeight + 10 >= scrHeight) {
					if (self.isMoreLoad) {
						self.getServerData()
					} else {
						return
					}
				}
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
			}
		},
		mounted() {
			// this.$route.meta.keepAlive = true;
			// this.onfocus();
			// this.keySearch();
			window.addEventListener('scroll',this.listenScrolls);
		},
		destroyed() {
			window.removeEventListener('scroll',this.listenScrolls);
		},
		filters: {
			fnName: function(value) {
				return value + "?x-oss-process=style/jietu";
			}
		},
		//返回跳转页面之前的滚动条高度、
		beforeRouteLeave(to, from, next) {
			if (from.name == "ArticlesSearchs0-") {
				from.meta.scollTopPosition = document.documentElement.scrollTop || document.body.scrollTop
			}
			next()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				document.documentElement.scrollTop = to.meta.scollTopPosition
				document.body.scrollTop = to.meta.scollTopPosition
			})
		}
	}
</script>

<style scoped>
	.search {
		position: fixed;
		background-color: #fff;
		z-index: 9999;
		width: 100%;
		top: 0;
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.search-input {
		margin-left: .2rem;
		width: 86%;
		height: .64rem;
		border-radius: .32rem;
		background-color: #eee;
		position: relative;
	}

	.search-input input {
		height: 100%;
		width: 76%;
		background-color: #eee;
		text-align: center;
	}

	.search-input span {
		font-size: .5rem;
		position: absolute;
		top: .08rem;
		left: .16rem;
	}

	.service-input {
		width: .8rem;
	}

	.leave-input {
		width: .8rem;
	}

	.leave-input span {
		font-size: .5rem;
	}
	
	.showSearch{
		margin-top: .9rem;
	}
	
	/* 显示搜索页面 */
	.ArticlesList{
		width: 100%;
		overflow: hidden;
		/* padding-bottom: 1.1rem; */
	}
	
	.ArticlesList h3{
		height: .74rem;
	}
	
	.ArticlesList dl{
		width: 100%;
		height: 1.48rem;
		padding: .36rem .3rem;
		border-bottom: 1px #f0f0f0 solid;
	}
	
	.ArticlesList dl dt{
		float: left;
		width: 30%;
		height: 1.46rem;
		position: relative;
		overflow: hidden;
	}
	
	.ArticlesList dl dt img{
		position: absolute;
		margin: auto;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		height: 100%;
	}
	
	.ArticlesList dl dd{
		width: 58%;
		height: 1.46rem;
		float: left;
		margin-left: 0.3rem;
		text-align: left;
		position: relative;
	}
	
	.ArticlesList dl dd h2{
		font-size: 0.26rem;
		font-weight: 600;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #333;
		padding: 1px 0;
	}
	
	.ArticlesList dl dd .text{
		height: 0.66rem;
		font-size: 0.24rem;
		line-height: 0.32rem;
		overflow: hidden;
		color: #999;
		padding-top: 0.06rem;
		word-break: break-all;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.ArticlesList dl dd .writer{
		width: 100%;
		height: .26rem;
		text-align: left;
		font-size: .24rem;
		margin-top: .2rem;
		color: #666;
	}
	
	.ArticlesList dl dd .writer div{
		float: left;
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	
	.ArticlesList dl dd .writer div i{
		font-size: .24rem;
		margin-right: .1rem;
	}
	
	.more-load {
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
		/* padding-bottom: .2rem; */
	}
</style>

