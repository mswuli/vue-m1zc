<template>
	<div class="Detail">
		<router-view></router-view>
		<detail-swiper
		:DatailData="DatailData"
		@change="navBarPut"
		:futozi="futozi"
		></detail-swiper>
		<detail-title
		:DatailData="DatailData"
		></detail-title>
		<detail-conf
		@change="navBarTop"
		:DatailData="DatailData"
		:cartype_value="cartype_value"
		></detail-conf>
		<detail-parameter
		:DatailData="DatailData"
		></detail-parameter>
		<detail-list
		@change="navBarListo"
		:cartype_value="cartype_value"
		:DatailData="DatailData"
		></detail-list>
		<detail-nav
		:DatailData="DatailData"  @changefushu="zigaifu"></detail-nav>
		<detail-delivery
		:DatailData="DatailData"></detail-delivery>
		<!-- <detail-anchor
		:top="top"
		:Listo="Listo"
		:navBar="navBar"
		></detail-anchor> -->
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	import DetailSwiper from '@/pages/Detail/components/DetailSwiper'
	import DetailTitle from '@/pages/Detail/components/DetailTitle'
	import DetailConf from '@/pages/Detail/components/DetailConf'
	import DetailParameter from '@/pages/Detail/components/DetailParameter'
	import DetailList from '@/pages/Detail/components/DetailList'
	import DetailNav from '@/pages/Detail/components/DetailNav'
	import DetailDelivery from '@/pages/Detail/components/DetailDelivery'
	import DetailAnchor from '@/pages/Detail/components/DetailAnchor'


	export default{
		name: 'Detail',
		data(){
			return {
				top: 0,
				Listo: [],
				DatailData: {},
				navBar:false,
				cartype_value: false,
                duishu:{},
				nums: 0,
				futozi:0,
			}
		},
		methods:{
			setshuzi(){
				var shu = localStorage.addui;

				var olen = 0;
				if(!shu){
					olen = 0
				}else{
					if(shu.indexOf("-")!=-1){
						olen = shu.split("-").length;
					}else{
						olen = 1
					}
				}
				this.futozi = olen;
			},
			zigaifu(n){
				this.futozi = n;
			},
			navBarPut(res){
				this.navBar = res;
			},

			navBarTop(res){
				this.top = res;
			},
			navBarListo(res){
				this.Listo = res;
			},

			getDatailInfo(){
				const url = this.$store.state.Yi + "index/Mall/detail";
				axios.get(url,{
					params: {
						goods_id: this.$route.query.goods_id
					}
				}).then(this.getDatailSuc).catch(this.toMall);
			},
			getDatailSuc(res){
				this.DatailData = res.data.data;
				// console.log(this.DatailData)

				if(res.data.data.goodInfo.cartype_value == "中规"){
					this.cartype_value = false;
				}else{
					this.cartype_value = true;
				}
			},
			toMall(){
				this.$router.push("/Mall");
			},
			aaa(a){
				//console.log(a)
				this.nums = a;
			},
			resetScroll(){
				document.documentElement.scrollTop = 0
			},
      par(){
				if(this.$route.query.t && this.$route.query.m){
					localStorage.token = this.$route.query.t;
					localStorage.expire = this.$route.query.m;
				}
      }
		},
		mounted(){
			this.getDatailInfo();
			this.resetScroll();
			this.setshuzi();
      this.par();
		},
		components:{
			DetailSwiper,
			DetailTitle,
			DetailConf,
			DetailParameter,
			DetailList,
			DetailNav,
			DetailDelivery,
			// DetailAnchor
		}
	}
</script>

<style>
</style>
