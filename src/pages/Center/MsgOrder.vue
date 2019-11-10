<template>
	<div class="MsgOrder">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			订单消息
		</div>
		<div class="content">
			<img :src="require('@/assets/img/center/nomsg.png')" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		name: 'MsgOrder',
		methods: {
			toCenter() {
				this.$router.push('/Center')
			}
		},
	}
</script>

<style scoped="scoped">
	.MsgOrder .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.MsgOrder .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.MsgOrder .content img{
		width: 100%;
	}
</style>
