<template> 
	<div class="wrapper">
		<swiper :options="swiperOption" v-if="pics.length>1">
			<swiper-slide class="swiper-slide" v-for="(item,index) in pics" :key="index">
				<!-- <img v-if="item.pic_thumb" :src="item.pic_thumb" alt="" @click="toBanner(index)">
				<img v-else :src="item.pic" alt="" @click="toBanner(index)"> -->
				<img :src="item.mobile_pic" alt="" @click="toBanner(index)">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	export default {
		name: 'MallSwiper',
		props:{
			pics: Array
		},
		data() {
			return {
				swiperOption: {
					//显示分页
					pagination: {
						el: '.swiper-pagination',
						clickable: true //允许分页点击跳转
					},
					//开启循环模式
					loop: true,
					//自动轮播
					autoplay: {
						delay: 2000
					}
					//开启鼠标滚轮控制Swiper切换
					//mousewheel: true
				}
			}
		},
		methods: {
			toBanner(a) {
				// if(a == 0){
				// 	this.$router.push({
				// 		path: "/Mall",
				// 		query: {
				// 			in_color: 0,outside_color: 0,fuel: 0,displacement: 0,mark: 0,shop_price: 0,fine_name: 0,in_paragraph: 0,cartype_value: 0,p_id: 1,m_id: 1,
				// 		}
				// 	});
				// }
				// if(a == 1){
				// 	this.$router.push({
				// 		path: "/Mall",
				// 		query: {
				// 			in_color: 0,outside_color: 0,fuel: 0,displacement: 0,mark: 0,shop_price: 0,fine_name: 0,in_paragraph: 0,cartype_value: 0,p_id: 5,m_id: 12,
				// 		}
				// 	});
				// }
				// if(a == 2){
				// 	this.$router.push({
				// 		path: "/Mall",
				// 		query: {
				// 			in_color: 0,outside_color: 0,fuel: 0,displacement: 0,mark: 0,shop_price: 0,fine_name: 0,in_paragraph: 0,cartype_value: 0,p_id: 2,m_id: 2,
				// 		}
				// 	});
				// }
				// if(a == 3){
				// 	this.$router.push({
				// 		path: "/Mall",
				// 		query: {
				// 			in_color: 0,outside_color: 0,fuel: 0,displacement: 0,mark: 0,shop_price: 0,fine_name: 0,in_paragraph: 0,cartype_value: 0,p_id: 2,m_id: 10,
				// 		}
				// 	});
				// }
			}
		},
	}
</script>

<style scoped>
	.wrapper{
		padding-top: .9rem;
	}
	
	.wrapper>>>.swiper-pagination-bullet-active {
		background-color: #fff;
	}
	
	.wrapper>>>.swiper-pagination-bullet{
		opacity: 0.4;
	}
	
	.wrapper>>>.swiper-pagination-bullet-active{
		opacity: 1;
	}
	
	.wrapper>>>.swiper-container-horizontal > .swiper-pagination-bullets{
		bottom: 1px;
	}
	
	.wrapper>>>.swiper-pagination-bullet{
		width: 6px;
		height: 6px;
	}

	.swiper-slide {
		width: 100%;
		text-align: center;
		/* height: 3.75rem; */
	}
	
	.swiper-slide img{
		width: 100%;
	}
</style>
