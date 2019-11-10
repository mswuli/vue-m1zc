<template>
	<div class="MsgAll">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			所有消息
		</div>
		<div class="content">
			<img :src="require('@/assets/img/center/nomsg.png')" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		name: 'MsgAll',
		methods: {
			toCenter() {
				this.$router.push('/Center')
			}
		},
	}
</script>

<style scoped="scoped">
	.MsgAll .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.MsgAll .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.MsgAll .content img{
		width: 100%;
	}
</style>
