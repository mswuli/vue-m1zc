<template>
	<div class="MsgNotice">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			系统公告
		</div>
		<div class="content">
			<img :src="require('@/assets/img/center/notice.png')" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		name: 'MsgNotice',
		methods: {
			toCenter() {
				this.$router.push('/Center')
			}
		},
	}
</script>

<style scoped="scoped">
	.MsgNotice .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.MsgNotice .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.MsgNotice .content img{
		width: 100%;
	}
</style>
