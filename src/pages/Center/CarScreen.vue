<template>
	<div class="CarScreen">
		<div>
			<screen-header></screen-header>
			<screen-inventor :cities="cities" :listTatil="listTatil" @change="getSeriesShow" @id="id"></screen-inventor>
			<screen-list :cities="cities" @change="getlist"></screen-list>
			<screen-series :logo_id="logo_id" :cities="cities" :seriesShow="seriesShow" @change="getSeriesShow"></screen-series>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import qs from 'qs'
	import axios from "axios";

	import ScreenList from "@/pages/Center/components/ScreenList";
	import ScreenHeader from "@/pages/Center/components/ScreenHeader";
	import ScreenInventor from "@/pages/Center/components/ScreenInventor";
	import ScreenSeries from "@/pages/Center/components/ScreenSeries";

	export default {
		name: 'CarScreen',
		data() {
			return {
				cities: {},
				listTatil: "",
				seriesShow: false,
				logo_id: {}
			};
		},
		methods: {
			getBrandInfo() {
				const url = this.$store.state.Yi + "index/My/logo";
				axios.get(url).then(this.getBrandSuc);
			},
			getBrandSuc(res) {
				//console.log(res.data.data);
				this.cities = this.objKeySort(res.data.data);
			},
			//转换品牌数据
			objKeySort(res) {
				let brand = {};
				for (let i = 0; i < res.logo.length; i++) {
					brand[res.logo[i].fir] = []
				}
				for (let n in brand) {
					for (let m = 0; m < res.logo.length; m++) {
						if (n == res.logo[m].fir) {
							brand[n].push(res.logo[m])
						}
					}
				}
				let newkey = Object.keys(brand).sort();
				let newObj = {};
				for (let s = 0; s < newkey.length; s++) {
					newObj[newkey[s]] = brand[newkey[s]];
				}
				return newObj;
			},
			getlist(msg) {
				this.listTatil = msg;
			},
			getSeriesShow(msg) {
				this.seriesShow = msg;
			},
			id(msg){
				this.logo_id = msg;
			}
		},
		mounted() {
			this.getBrandInfo();
		},
		components: {
			ScreenList,
			ScreenHeader,
			ScreenInventor,
			ScreenSeries
		}
	}
</script>

<style scoped="scoped">
</style>

