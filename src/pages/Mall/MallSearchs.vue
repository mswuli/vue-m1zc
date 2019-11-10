<template>
	<div class="MallSearchs">
		<div class="search">
			<div class="search-input">
				<span class="iconfont">&#xe603;</span>
				<input type="text" placeholder="请输入关键字" v-model="msg1" ref="myInput" @keyup="getSearchInfo">
			</div>
			<div class="service-input">
				<span class="iconfont" @click="toMall">取消</span>
			</div>
		</div>
		
		<div class="showSearch" v-show="!show">
				<dl v-for="(item,index) in searchList" :key="index" @click="toDatail(item.goods_id)">
					<dt><img :src="item.image_abbreviation" alt=""></dt>
					<dd>
						<h2>{{item.in_paragraph+"款"}} {{item.m_name}} {{item.goods_name}} {{item.displacement}} {{item.fuel}}</h2>
						<p class="text">{{item.in_color}} {{item.outside_color}}</p>
						<p class="label"><span>{{item.cartype_value}}</span><span>{{item.carvarsion}}</span></p>
						<span>{{item.shop_price}}万</span>
					</dd>
				</dl>
				
				<div class="more-load" v-if="isMoreLoad" @click="getServerData">
					<img v-if="loadingImg" :src="require('@/assets/img/loading/loading.gif')" alt="">
					<span v-else>查看更多</span>
				</div>
				<div class="more-load" v-if="loadLastText"> 暂无更多的车型数据 </div>
		</div>
		
	</div>
	
</template>

<script>
	import axios from 'axios'

	export default {
		name: "MallSearchs",
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
			toDatail(a){
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: a,
						key: this.msg1
					}
				});
			},
			toAccountLogin() {
				this.$router.push("/AccountLogin");
			},
			//回到首页
			toMall(){
				this.$router.push('/Mall');
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
				
				const url = this.$store.state.Yi + 'index/mall/searchByKey';
				axios.get(url, {
					params: {
						key: this.msg1,
						opage: this.definePageNum
					}
				}).then(
					(res) => {
						if(res.data.error == "0"){
							for(let i in res.data.data.resGoods){
								this.searchList.push(res.data.data.resGoods[i])
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
		},
		mounted() {
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
			if (from.name == "MallSearchs") {
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
	.showSearch{
		width: 100%;
		overflow: hidden;
		/* padding-bottom: 1.1rem; */
	}
	
	.showSearch h3{
		height: .74rem;
	}
	
	.showSearch dl{
		width: 100%;
		height: 1.48rem;
		padding: .36rem .3rem;
		border-bottom: 1px #f0f0f0 solid;
	}
	
	.showSearch dl dt{
		float: left;
		width: 30%;
		height: 1.46rem;
		position: relative;
		overflow: hidden;
	}
	
	.showSearch dl dt img{
		position: absolute;
		margin: auto;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		width: 100%;
	}
	
	.showSearch dl dd{
		width: 58%;
		height: 1.46rem;
		float: left;
		margin-left: 0.3rem;
		text-align: left;
		position: relative;
	}
	
	.showSearch dl dd>span{
		position: absolute;
		right: 0;
		bottom: 0;
		color: #e5000c;
		font-size: .3rem;
		font-weight: 600;
	}
	
	.showSearch dl dd h2{
		font-size: 0.26rem;
		font-weight: 600;
		overflow: hidden;
		padding: 1px 0;
		word-break: break-all;
		color: #333;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.showSearch dl dd .text{
		height: 0.66rem;
		font-size: 0.24rem;
		line-height: 0.32rem;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #666;
		padding-top: 0.06rem;
		word-break: break-all;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.showSearch dl dd .label{
		font-size: 0.22rem;
		margin-top: .18rem;
	}
	
	.showSearch dl dd .label span{
		border: 1px solid #666;
		border-radius: 5px;
		padding: 0.02rem 0.05rem 0.00rem 0.05rem;
		margin-right: .1rem;
	}
	
	.more-load {
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
	}
</style>
