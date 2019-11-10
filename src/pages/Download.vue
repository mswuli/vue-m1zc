<template>
	<div class="Download">
		<cube-slide 
		ref="slide" 
		:data="items" 
		:loop="true" 
		:auto-play="true"
		:interval="2000"
		:showDots="false">
			<cube-slide-item v-for="(item, index) in items" :key="index">
				<img :src="item.image" width="100%">
			</cube-slide-item>
		</cube-slide>
		<div class="down">
			<a :href="href">
				下载 1站车APP
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Download',
		data() {
			return {
				items: [{
						image: require('@/assets/img/down/s_1.png')
					},
					{
						image: require('@/assets/img/down/s_2.png')
					},
					{
						image: require('@/assets/img/down/s_3.png')
					},
					{
						image: require('@/assets/img/down/s_4.png')
					},
					{
						image: require('@/assets/img/down/s_5.png')
					},
					{
						image: require('@/assets/img/down/s_6.png')
					},
					{
						image: require('@/assets/img/down/s_7.png')
					},
					{
						image: require('@/assets/img/down/s_8.png')
					}
				],
				href: ""
			}
		},
		mounted() {
			if(mui.os.ios) this.href = "https://apps.apple.com/cn/app/1%E7%AB%99%E8%BD%A6/id1470179858?from=singlemessage";
			if(mui.os.android) this.href = "http://app.mi.com/detail/822444";
		}
	}
</script>

<style scoped="scoped">  
	.down{
		position: fixed;
		height: .8rem;
		width: 90%;
		left: 5%;
		bottom: .54rem;
		background-color: rgba(16,16,16,.6);
		line-height: .8rem;
		border-radius: .3rem;
	}
	
	.down a{
		display: inline-block;
		height: 100%;
		width: 100%;
		color: #fff;
		font-size: .28rem;
	}
</style>
