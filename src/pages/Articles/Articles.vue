<template>
	<div class="Articles">
		<articles-search></articles-search>
		<mall-swiper
		:pics="pics"
		></mall-swiper>
		<articles-filtrate
		@change="search" 
		:aclass="aclass" 
		@update="update"
		></articles-filtrate>
		<articles-list
		:searchBar="searchBar" 
		:article="article"
		:c_id="c_id"
		@clear="clear"
		@serverData="serverData"
		
		></articles-list>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	import MallSwiper from '@/pages/Mall/components/MallSwiper'
	import ArticlesSearch from '@/pages/Articles/components/ArticlesSearch'
	import ArticlesFiltrate from '@/pages/Articles/components/ArticlesFiltrate'
	import ArticlesList from '@/pages/Articles/components/ArticlesList'
	
	export default{
		name: 'Articles',
		data(){
			return{
				searchBar: false,
				pics: [],
				article: [],
				aclass: [],
				c_id: 0
			}
		},
		methods: {
			search(msg){
				this.searchBar = msg;
			},
			update(msg){
				if(this.c_id != msg){
					this.article = [];
				}
				this.c_id = msg;
			},
			clear(){
				this.article = [];
			},
			serverData(res){
				for(let i = 0;i < res.article.length;i++){
					this.article.push(res.article[i]);
				}
			},
			getDataInfo() {
				const url = this.$store.state.Yi + "index/index/indexpic";
				const url1 = this.$store.state.Yi + "index/index/indexaclss";
				axios.get(url).then(this.getPicsSuc);
				axios.get(url1).then(this.getAclassSuc);
			},
			getPicsSuc(res){
				this.pics = res.data.data.pics;
			},
			getAclassSuc(res){
				this.aclass = res.data.data.aclass;
			}
		},
		mounted() {
			this.getDataInfo();
		},
		components:{
			MallSwiper,
			ArticlesSearch,
			ArticlesFiltrate,
			ArticlesList
		},
		//返回跳转页面之前的滚动条高度、
		beforeRouteLeave(to, from, next) {
			if (from.name == "Articles") {
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

<style scoped="scoped">
</style>
