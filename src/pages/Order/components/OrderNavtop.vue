<template>
	<div class="OrderNavtop">
		<div class="imgbox" id="title">
			<img :src="require('@/assets/img/order/luhu.jpg')" alt="">
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
			<p>路虎揽胜行政 2019 HSE 柴油 3.0T 5座 外圣托里尼黑内真皮座椅内饰（黑檀木色）报关中欧规</p>
			<p class="money">一站车 ￥<span style="font-size: .34rem">1,090,000</span> 元 <span>报关中</span></p>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'OrderNavtop',
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
				this.$router.push("/Detail")
			}
		},
		mounted() {
			window.addEventListener('scroll',this.showFiltrate);
		},
		destroyed() {
			window.removeEventListener('scroll',this.showFiltrate);
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	.OrderNavtop
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
		margin-top .42rem
		span
			color #e5000c
	
	.navbar
		position fixed
		height .67rem
		width 100%
		top 0
		z-index 15
	
	.navbarScroll
		background-color #fcfcfc
	
	.prev
		position absolute
		z-index 10
		color #fff
		height .5rem
		width .5rem
		border-radius 50%
		background-color rgba(0,0,0,.3)
		line-height .5rem
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
		height .5rem
		width .5rem
		line-height .5rem
		color #fff
		background-color rgba(0,0,0,.3)
		border-radius 50%
		margin-left .1rem
		
	.menuBar span
		color #333
		background-color #fff
</style>
