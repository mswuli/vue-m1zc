<template>
	<div class="ResetHeader">
		<div class="RegHerder">
			<div class="navGo">
				<span class="iconfont" @click="toPrev">&#xe606;</span>
				重置密码
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'ResetHeader',
		methods: {
			toPrev() {
				this.$router.push("/"+this.$route.query.reset)
			}
		},
	}
</script>

<style scoped="scoped">
	.ResetHeader {
		height: .9rem;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		font-size: .32rem;
		line-height: .9rem;
		text-align: center;
	}
	
	.ResetHeader .iconfont {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}
	
	.ResetHeader .msgLogin{
		position: absolute;
		height: .9rem;
		width: 1.7rem;
		text-align: center;
		line-height: .9rem;
		right: 0;
		top: 0;
	}
</style>
