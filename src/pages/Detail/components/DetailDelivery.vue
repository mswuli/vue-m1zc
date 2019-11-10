<template>
	<div class="DetailDelivery" v-if="Object.keys(DatailData).length != 0">
		<h3>交付时刻</h3>
		
		<div class="wrapper" id="title">
			<swiper :options="swiperOption">
				<swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
					<img :src="item.imgUrl" alt="">
				</swiper-slide>
				<!-- 页码 -->
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<!-- <div class="title">外观:克里斯灰 内饰:织物真皮相拼(黑檀木色座椅)</div> -->
		</div>
		
	</div>
</template>

<script>
	export default{
		name: 'DetailDelivery',
		props:{
			DatailData: Object 
		},
		data(){
			return{
				slide:[
					{
						imgUrl: require("@/assets/img/detail/1.png")
					},
					{
						imgUrl: require("@/assets/img/detail/2.png")
					},
					{
						imgUrl: require("@/assets/img/detail/3.png")
					},
					{
						imgUrl: require("@/assets/img/detail/4.png")
					},
					{
						imgUrl: require("@/assets/img/detail/5.png")
					},
					{
						imgUrl: require("@/assets/img/detail/6.png")
					},
					{
						imgUrl: require("@/assets/img/detail/7.png")
					},
					{
						imgUrl: require("@/assets/img/detail/8.png")
					},
					{
						imgUrl: require("@/assets/img/detail/9.png")
					},
					{
						imgUrl: require("@/assets/img/detail/10.png")
					},
					{
						imgUrl: require("@/assets/img/detail/11.png")
					},
					{
						imgUrl: require("@/assets/img/detail/12.png")
					},
					{
						imgUrl: require("@/assets/img/detail/13.png")
					},
					{
						imgUrl: require("@/assets/img/detail/14.png")
					}
				],
				swiperOption: {
					//显示分页
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction'
					},
					//开启循环模式
					loop: true,
					autoplay: {
						delap: 2000
					}
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="stylus">
	.DetailDelivery{
		padding-bottom: 1.04rem;
	}
	
	.DetailDelivery>h3{
		text-align: left;
		text-indent: 2px;
		font-size: .34rem;
		font-weight: 500;
		margin: .24rem;
		border-left: 2px solid #e5000c;
	}
	
	.wrapper
		// margin-top .9rem
		position relative
		
	.title
		position absolute
		background-color rgba(255,255,255,.6)
		height .36rem
		line-height .36rem
		border-radius .18rem
		font-size .24rem
		color #333
		bottom 10px
		z-index 10
		left .24rem
		padding 0 .1rem
	
	.wrapper>>>.swiper-pagination-fraction
		background-color rgba(255,255,255,.6)
		width auto
		height .36rem
		line-height .36rem
		border-radius .18rem
		font-size .24rem
		right .24rem
		left auto
		color #333
		padding 0 .1rem
	
	.swiper-slide 
		width 100%
		text-align center
	
	.swiper-slide img
		width 100%
</style>
