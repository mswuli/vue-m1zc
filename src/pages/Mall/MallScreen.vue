<template>
	<div class="MallScreen">
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

	import ScreenList from "@/pages/Mall/components/ScreenList";
	import ScreenHeader from "@/pages/Mall/components/ScreenHeader";
	import ScreenInventor from "@/pages/Mall/components/ScreenInventor";
	import ScreenSeries from "@/pages/Mall/components/ScreenSeries";

	export default {
		name: 'MallScreen',
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
				const url = this.$store.state.Yi + "index/Mall/searchlogo";
				axios.get(url).then(this.getBrandSuc);
			},
			getBrandSuc(res) {
				this.cities = this.objKeySort(res);
			},
			//转换品牌数据
			objKeySort(res) {
				let brand = {};
				for (let i = 0; i < res.data.length; i++) {
					brand[res.data[i].fir] = []
				}
				for (let n in brand) {
					for (let m = 0; m < res.data.length; m++) {
						if (n == res.data[m].fir) {
							brand[n].push(res.data[m])
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

