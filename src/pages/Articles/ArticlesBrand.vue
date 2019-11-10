<template>
	<div class="ArticlesBrand">
		<div>
			<brand-header></brand-header>
			<brand-inventor :cities="cities" :listTatil="listTatil" @change="getSeriesShow" @id="id"></brand-inventor>
			<brand-list :cities="cities" @change="getlist"></brand-list>
			<brand-series :logo_id="logo_id" :cities="cities" :seriesShow="seriesShow" @change="getSeriesShow"></brand-series>
		</div>
	</div>
</template>

<script>
	import qs from 'qs'
	import axios from "axios";

	import BrandList from "@/pages/Articles/components/BrandList";
	import BrandHeader from "@/pages/Articles/components/BrandHeader";
	import BrandInventor from "@/pages/Articles/components/BrandInventor";
	import BrandSeries from "@/pages/Articles/components/BrandSeries";

	export default {
		name: 'ArticlesBrand',
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
				const url = this.$store.state.Yi + "index/Article/searchlogo";
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
			BrandList,
			BrandHeader,
			BrandInventor,
			BrandSeries
		}
	}
</script>

<style scoped="scoped">
</style>
