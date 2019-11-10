<template>
	<div class="ArticlesList">
		<h3 v-show="searchBar"></h3>
		<dl v-for="(item,index) in article" :key="index" @click="toArticlesDetail(item.article_id)">
			<dt><img :src="item.file_url | fnName" alt=""></dt>
			<dd>
				<h2>{{item.title}}</h2>
				<p class="text">{{toContent(item.content)}}</p>
				<div class="writer">
					<div><i class="iconfont">&#xe618;</i><span>{{item.author}}</span></div>
					<div><i class="iconfont">&#xe61e;</i><span>{{item.add_time | toTime}}</span></div>
				</div>
			</dd>
		</dl>
		
		<div class="more-load" v-if="isMoreLoad" @click="scrollLoadMore">
			<img v-if="loadingImg" :src="require('@/assets/img/loading/loading.gif')" alt="">
			<span v-else>查看更多</span>
		</div>
		<div class="more-load" v-if="loadLastText"> 暂无更多的文章 </div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'ArticlesList',
		props: {
			searchBar: Boolean,
			article: Array,
			c_id: Number
		},
		watch:{
			c_id(){
				this.definePageNum = 0;
				this.loadLastText = false;
				this.scrollLoadMore();
				this.listenScroll();
			},
			'$route'(to, from) {
				if(from.name == "ArticlesBrand"){
					this.$emit("clear","清空")
					this.definePageNum = 0;
					this.loadLastText = false;
					this.scrollLoadMore();
					this.listenScroll();
				}
			} 
		},
		data(){
			return{
				isMoreLoad: false,  //是否显示加载更多
				loadingImg: false,  //显示loading图
				loadLastText: false,  //到底了
				definePageNum: 0,  //记录当前的页码
			}
		},
		methods:{
			//跳转到文章详情页
			toArticlesDetail(a){
				this.$router.push({
					path: "/ArticlesDetail",
					query: {
						Art: a
					}
				});
			},
			//处理文章内容格式
			toContent(con){
				con = con.replace(/&nbsp;/ig,"");
				return con.replace(/<\/?.+?>/gi,"");
			},
			//上划加载
			scrollLoadMore() {
				
				if (this.loadingImg) return  // 防止多次加载
				this.loadingImg = true;  //显示加载动图
				this.definePageNum = this.definePageNum + 1;  // 第一次获取时为默认值
				const id = this.$route.query;
				const url = this.$store.state.Yi + "index/Article/index";
				
				if(Object.keys(id).length > 2){
					
					//有Get参数时调用此ajax
					axios.get(url, {
						params: {
							l_id: id.l_id,
							m_id: id.m_id,
							c_id: id.c_id,
							sort: id.sor,
							opage: this.definePageNum
						}
					}).then((res) => {
						// console.log(res)
						if (res.data.error == 0) {
							this.$emit("serverData",res.data.data)
							if (this.definePageNum < res.data.data.pageCount) {
								this.isMoreLoad = true;
							} else {
								this.isMoreLoad = false;
								this.loadLastText = true;
							}
							this.loadingImg = false;
						}else if(res.data.error == 1){
							this.isMoreLoad = false;
							this.loadLastText = true;
							this.loadingImg = false;
						}
					})
				}else{
					//无参数时调用此ajax
					axios.get(url, {
						params: {
							opage: this.definePageNum
						}
					}).then((res) => {
						if (res.data.error == 0) {
							this.$emit("serverData",res.data.data)
							if (this.definePageNum < res.data.data.pageCount) {
								this.isMoreLoad = true;
							} else {
								this.isMoreLoad = false;
								this.loadLastText = true;
							}
							this.loadingImg = false;
						}
					})
				}
			},
			//判断页面是否划到底部
			listenScroll() {
				let self = this;
				let scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
				let clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
				let scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
				if (scr + clientHeight + 10 >= scrHeight) {
					if (self.isMoreLoad) {
						self.scrollLoadMore()
					} else {
						return
					}
				}
			}
		},
		//过滤器
		filters: {
			//给图加上logo
			fnName: function(value) {
				return value + "?x-oss-process=style/jietu";
			}
		},
		mounted() {
			this.scrollLoadMore();
			window.addEventListener('scroll',this.listenScroll);
		},
		destroyed() {
			window.removeEventListener('scroll',this.listenScroll);
		}
	}
</script>

<style scoped="scoped">
	.ArticlesList{
		width: 100%;
		overflow: hidden;
		padding-bottom: 1.1rem;
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
	}
</style>
