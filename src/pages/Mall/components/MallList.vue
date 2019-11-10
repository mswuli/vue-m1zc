<template>
	<div class="shopList">
		<h3 v-show="searchBar"></h3>
		<!-- 缩略图 -->
		<dl v-for="(item,index) in article" :key="index" @click="toDatail(item.goods_id)">
			<dt><img :src="item.image_abbreviation" alt=""></dt>
			<dd>
				<h2>{{item.in_paragraph+"款"}} {{item.m_name}} {{item.goods_name}} {{item.displacement}} {{item.fuel}}</h2>
				<p class="text">{{item.in_color}} {{item.outside_color}}</p>
				<p class="label"><span>{{item.cartype_value}}</span><span>{{item.carvarsion}}</span></p>
				<span>{{item.shop_price}}万</span>
			<!-- 	<p>{{item.image_abbreviation}}</p> -->
			</dd>
		</dl>
		
		<div class="more-load" v-if="isMoreLoad" @click="scrollLoadMore">
			<img v-if="loadingImg" :src="require('@/assets/img/loading/loading.gif')" alt="">
			<span v-else>查看更多</span>
		</div>
		<div class="more-load" v-if="loadLastText"> 暂无更多的车型数据 </div>

	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: "MallList",
		props: {
			searchBar: Boolean,
			article: Array,
			uzhuant: String,
			usort: Number,
		},
		watch: {
			uzhuant() {
				this.definePageNum = 0;
				this.loadLastText = false;
				this.scrollLoadMore();
				this.listenScroll();
			},
			usort() {
				this.definePageNum = 0;
				this.loadLastText = false;
				this.scrollLoadMore();
				this.listenScroll();
			},
			'$route'(to, from) {
				if(from.name == "MallBrand" || from.name == "MallScreen" || from.name == "ScreenAdvanced"){
					this.$emit("clear","清空")
					this.definePageNum = 0;
					this.loadLastText = false;
					this.scrollLoadMore();
					this.listenScroll();
				}
			}
		},
		data() {
			return {
				isMoreLoad: false,  //是否显示加载更多
				loadingImg: false,  //显示loading图
				loadLastText: false,  //到底了
				definePageNum: 0  //记录当前的页码
			}
		},
		methods: {
			//跳转到订单详情页
			toDatail(a) {
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: a,
					}
				});
			},
			//上划加载
			scrollLoadMore() {
				if (this.loadingImg) return  // 防止多次加载
				this.loadingImg = true;  //显示加载动图
				this.definePageNum = this.definePageNum + 1;  // 第一次获取时为默认值
				
				const id = this.$route.query;  //获取Get参数
				const url = this.$store.state.Yi + "index/Mall/search";
				if(Object.keys(id).length > 2){
					//有Get参数时调用此ajax
					axios.get(url, {
						params: {
							in_color: id.in_color,
							outside_color: id.outside_color,
							fuel: id.fuel,
							displacement: id.displacement,
							mark: id.mark,
							shop_price: id.shop_price,
							fine_name: id.fine_name,
							in_paragraph: id.in_paragraph,
							cartype_value: id.cartype_value,
							carvarsion: this.uzhuant,
							p_id: id.p_id,
							m_id: id.m_id,
							priceOrder: this.usort,
							opage: this.definePageNum
						}
					}).then((res) => {
						if (res.data.error == 0) {
							this.$emit("serverData", res.data.data)
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
					})
				}else{
					//无参数时调用此ajax
					axios.get(url, {
						params: {
							in_color: 0,
							outside_color: 0,
							fuel: 0,
							displacement: 0,
							mark: 0,
							shop_price: 0,
							fine_name: 0,
							in_paragraph: 0,
							cartype_value: 0,
							carvarsion: this.uzhuant,
							p_id: 1,
							m_id: 0,
							priceOrder: this.usort,
							opage: this.definePageNum
						}
					}).then((res) => {
						if (res.data.error == 0) {
							this.$emit("serverData", res.data.data)
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
	.shopList {
		width: 100%;
		overflow: hidden;
		padding-bottom: 1.1rem;
	}

	.mover {
		transition: all .4s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.shopList h3 {
		height: .74rem;
	}

	.shopList dl {
		width: 100%;
		height: 1.48rem;
		padding: .36rem .3rem;
		border-bottom: 1px #f0f0f0 solid;
	}

	.shopList dl dt {
		float: left;
		width: 30%;
		height: 1.46rem;
		position: relative;
		overflow: hidden;
	}

	.shopList dl dt img {
		position: absolute;
		margin: auto;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		width: 100%;
	}

	.shopList dl dd {
		width: 58%;
		height: 1.46rem;
		float: left;
		margin-left: 0.3rem;
		text-align: left;
		position: relative;
	}

	.shopList dl dd>span {
		position: absolute;
		right: 0;
		bottom: 0;
		color: #e5000c;
		font-size: .3rem;
		font-weight: 600;
	}

	.shopList dl dd h2 {
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

	.shopList dl dd .text {
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

	.shopList dl dd .label {
		font-size: 0.22rem;
		margin-top: .18rem;
	}

	.shopList dl dd .label span {
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
