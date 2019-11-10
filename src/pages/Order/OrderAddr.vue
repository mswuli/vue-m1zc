<template>
	<div class="ArticlesDetail">
		<addr-navtop :addrData="addrData"></addr-navtop>
		<addr-site :addrData="addrData" :goCity="goCity" :goods_id="goods_id" :oMobis="toMobis" ></addr-site>
		<addr-nav :goodid="goods_id"  :oMobis="toMobis" ></addr-nav>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
    import Vue from 'vue'
	
	import AddrNavtop from '@/pages/Order/components/AddrNavtop'
	import AddrSite from '@/pages/Order/components/AddrSite'
	import AddrNav from '@/pages/Order/components/AddrNav'

 
	export default {
		name: 'ArticlesDetail',
		data(){
			return{
				addrData: {},
				goCity: "",
				goods_id: 0,
               
                toMobis:{}
			}
		},
		methods:{
			getAddrInfo(){
				const url = this.$store.state.Yi + "index/order/goodsinfo";
				axios.get(url,{
					params: {
						goods_id: this.$route.query.goods_id
					}
				}).then(this.getAddSuc)
			},
			getAddSuc(res){
				console.log(res.data.data)
				this.addrData = res.data.data;
				this.goods_id = res.data.data.goods_id;
				this.goCity = res.data.data.Source_carcity.name;
                // this.cart_id = this.$route.query.cart_id||"";
                this.toMobis.cart_id=this.$route.query.cart_id||"";
                this.toMobis.goods_id=this.goods_id;
			}
		},
		mounted() {
			this.getAddrInfo();
		},
		components: {
			AddrNav,
			AddrNavtop,
			AddrSite
		}
	};
</script>

<style scoped="scoped">
</style>
