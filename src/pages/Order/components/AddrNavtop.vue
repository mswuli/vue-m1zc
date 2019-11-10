<template>
	<div class="AddrNavtop"  v-if="addrData.goods_id">
		<div class="imgbox" id="title">
			<img :src="addrData.image | fnName" alt="">
		</div>
		
		<div class="navbar" :class="{navbarScroll: navBar}">
			<div class="prev" :class="{prevBar: navBar}">
				<span class="iconfont" @click="toDetail">&#xe606;</span>
			</div>
			<div class="menu" :class="{menuBar: navBar}">
				<!-- <span class="iconfont">&#xe656;</span> -->
				<!-- <span class="iconfont">&#xe610;</span> -->
				<!-- <span class="iconfont">&#xe613;</span> -->
			</div>
		</div>
		
		<div class="title">
			<p>{{addrData.brand_name}} {{addrData.m_name}} {{addrData.in_paragraph}} {{addrData.fine_name}} {{addrData.fuel}} {{addrData.displacement}} {{addrData.car_seats + "座"}} {{addrData.outside_color.color_name}} {{addrData.carvarsion}} {{addrData.cartype_value}}</p>
			<p class="money">一站车 ￥<span style="font-size: .36rem">{{addrData.shop_price | format_number}}</span> 元 <span> {{addrData.carvarsion}}</span></p>
		</div>
	</div>
</template>

<script>
	
	export default{
		name: 'AddrNavtop',
		props:{
			addrData: Object
		},
		data(){
			return{
				navBar: false
			}
		},
		methods:{
			showFiltrate() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = document.getElementById("title").offsetHeight;
				// console.log(scrollTop,offsetTop)
				if(scrollTop>(offsetTop-33)){
					this.navBar = true;
				}else{
					this.navBar = false;
				}
			},
			
			toDetail(){
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: this.$route.query.goods_id
					}
				})
			}
		},
		filters: {
			fnName: function(value) {
				return value + "?x-oss-process=style/jietu";
			}
		},
		mounted() {
			//window.addEventListener('scroll',this.showFiltrate);
		},
		destroyed() {
			//window.removeEventListener('scroll',this.showFiltrate);
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	.AddrNavtop
		border-bottom .1rem solid #f5f5f5

	.imgbox img
		width 100%
	
	.title
		font-size .3rem
		padding .24rem
		text-align left
		color #666
	
	.title .money
		font-size .26rem
		color #333
		margin-top .22rem
		span
			color #e5000c
	
	.navbar
		position fixed
		height .9rem
		width 100%
		top 0
		z-index 15
	
	.navbarScroll
		background-color #fcfcfc
		border-bottom 1px #eaeaea solid
	
	.prev
		position absolute
		z-index 10
		color #fff
		height .6rem
		width .6rem
		border-radius 50%
		background-color rgba(0,0,0,.3)
		line-height .6rem
		top .1rem
		left .1rem
	
	.prevBar
		color #333
		background-color #fff
	
	.menu
		position absolute
		z-index 10
		top .1rem
		right .1rem
		height .5rem
		width 1.82rem
	
	.menu span
		float left
		height .6rem
		width .6rem
		line-height .6rem
		color #fff
		background-color rgba(0,0,0,.3)
		border-radius 50%
		margin-left .1rem
		
	.menuBar span
		color #333
		background-color #fff
</style>
