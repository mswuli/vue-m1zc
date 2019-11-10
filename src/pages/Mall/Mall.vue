<template>
	<div class="Mall">
		<mall-search></mall-search>
		<mall-swiper :pics="pics"></mall-swiper>
		<mall-filtrate :zhaunt="zhaunt" @change="search" @upzhuant="upzhuant" @sort="sort"></mall-filtrate>
		<mall-list :searchBar="searchBar" :article="article" :uzhuant="uzhuant" :usort="usort" @clear="clear" @serverData="serverData"></mall-list>
	</div> 
</template>

<script>
	import axios from 'axios'

	import MallSearch from '@/pages/Mall/components/MallSearch'
	import MallSwiper from '@/pages/Mall/components/MallSwiper'
	import MallFiltrate from '@/pages/Mall/components/MallFiltrate'
	import MallList from '@/pages/Mall/components/MallList'

	export default {
		name: "Mall",
		data() {
			return {
				searchBar: false,
				pics: [],
				article: [],
				zhaunt: [],
				uzhuant: "0",
				usort: 1
			}
		},
		methods: {
			//状态
			upzhuant(msg) {
				//console.log(msg)
				if (this.uzhuant != msg) {
					this.article = [];
				}
				this.uzhuant = msg;
			},
			//排序
			sort(msg) {
				if (this.usort != msg) {
					this.article = [];
				}
				this.usort = msg;
			},
			//清空页面内容加载筛选内容
			clear() {
				this.article = []
			},
			search(msg) {
				this.searchBar = msg;
			},
			//轮播数据
			getBrandInfo() {
				const url = this.$store.state.Yi + "index/index/indexpic";
				axios.get(url).then(this.getBrandSuc);
			},
			getBrandSuc(res) {
				//console.log(res.data)
				this.pics = res.data.data.pics;
			},
			//车辆状态
			serverData(msg) {
				this.zhaunt = msg.zhuant; //状态
				for (let i = 0; i < msg.resGoods.length; i++) {
					this.article.push(msg.resGoods[i]);
				}
			}
		},
		mounted() {
			this.getBrandInfo();
		},
		components: {
			MallSwiper,
			MallSearch,
			MallFiltrate,
			MallList
		},
		//返回跳转页面之前的滚动条高度、
		beforeRouteLeave(to, from, next) {
			if (from.name == "Mall") {
				from.meta.scollTopPosition = document.documentElement.scrollTop || document.body.scrollTop
			}
			next()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				setTimeout(function(){
					document.documentElement.scrollTop = to.meta.scollTopPosition
					document.body.scrollTop = to.meta.scollTopPosition
				},75)
			})
		},
	}
</script>

<style scoped>
	.list {
		position: absolute;
		top: .86rem;
		bottom: 1.1rem;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
</style>
