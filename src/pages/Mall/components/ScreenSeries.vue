<template>

	<div class="series" v-show="true" @click.self="seriesHide">
		<div class="seriesList">
			<div class="list" ref="wrapper">
				<div>
					<div class="title">
						<span><img :src="logo_id.logo_img" alt=""></span>
						<span>{{logo_id.logo_name}}</span>
					</div>
					<div class="unlimited" @click="goArticles(logo_id.logo_id)">不限车系</div>
					<ul>
						<li @click="goArticlesM(item.m_pid,item.m_id)" v-for="(item,index) in logoList" :key="index"> 
							<span><img :src="item.m_img" alt=""></span>
							<span>{{item.m_name}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import Bscroll from 'better-scroll'
	import qs from 'qs'
	import axios from 'axios'

	export default {
		name: 'ScreenSeries',
		props: {
			cities: Object,
			seriesShow: Boolean,
			logo_id: Object
		},
		data() {
			return {
				logoList: []
			}
		},
		watch:{
			seriesShow(){
				if(this.seriesShow){
					document.getElementsByClassName("series")[0].style.left = "0";
				}else{
					document.getElementsByClassName("series")[0].style.left = "120%";
				}
			},
			logo_id(){
				this.getSearchMInfo();
			}
		},
		methods:{
			seriesHide(){
				this.$emit("change",false)
			},
			goArticles(a){
				this.$router.push({
					path: "/Mall",
					query: {
						in_color: 0,
						outside_color: 0,
						fuel: 0,
						displacement: 0,
						mark: 0,
						shop_price: 0,
						fine_name: 0,
						in_paragraph: 0,
						cartype_value: 0,
						p_id: a,
						m_id: 0,
					}
				});
			},
			goArticlesM(a,b){
				this.$router.push({
					path: "/ScreenAdvanced",
					query: {
						in_color: 0,
						outside_color: 0,
						fuel: 0,
						displacement: 0,
						mark: 0,
						shop_price: 0,
						fine_name: 0,
						in_paragraph: 0,
						cartype_value: 0,
						p_id: a,
						m_id: b,
					}
				});
			},
			getSearchMInfo() {
				const url = this.$store.state.Yi + "index/Mall/searchM";
				axios.post(url,qs.stringify({
					m_pid: this.logo_id.logo_id
				})).then(this.getSearchMSuc);
			},
			getSearchMSuc(res){
				this.logoList = res.data;
			}
			
		},
		mounted() {
			this.scroll = new Bscroll(this.$refs.wrapper, {click: true});
		}
	}
</script>

<style scoped="scoped">
	.series {
		position: fixed;
		height: 100%;
		width: 120%;
		background-color: rgba(0,0,0,.1);
		top: .9rem;
		left: 120%;
		transition: all .5s cubic-bezier(.25,.1,.3,1.5);
	}

	.list {
		position: absolute;
		top: 0;
		bottom: 1rem;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.seriesList{
		position: absolute;
		height: 100%;
		width: 72%;
		background-color: #fff;
		top: 1px;
		right: 0;
		text-align: left;
		
	}
	
	.showList{
		right: 0;
	}
	
	.seriesList .title{
		height: .82rem;
		line-height: .82rem;
		padding-left: .2rem;
	}
	
	.seriesList .title span img{
		max-width: .7rem;
	}
	
	.seriesList .unlimited{
		height: .82rem;
		line-height: .82rem;
		border-top: .2rem #ededed solid;
		border-bottom: .2rem #ededed solid;
		padding-left: .2rem;
	}
	
	.seriesList ul li{
		height: 1rem;
		line-height: 1rem;
		border-bottom: 1px #ededed solid;
	}
	
	.seriesList ul li span img{
		max-width: 1.5rem;
	}
	
</style>
