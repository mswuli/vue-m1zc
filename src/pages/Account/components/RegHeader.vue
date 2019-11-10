<template>
	<div class="RegHerder">
		<div class="navGo">
			<span class="iconfont" @click="toAccountLogin">&#xe606;</span>
			用户注册
		</div>
	</div>
</template>

<script>
	export default{
		name: 'RegHerder',
		methods:{
			toAccountLogin(){
				this.$router.push({
					path: "/"+this.$route.query.name,
					query: {
						reset: this.$route.query.reset
					}
				});
			}
		},
		mounted() {
			console.log()
		}
	}
</script>

<style scoped="scoped">
	.RegHerder {
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
	
	.RegHerder .iconfont {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}
	
	.RegHerder .msgLogin{
		position: absolute;
		height: .9rem;
		width: 1.7rem;
		text-align: center;
		line-height: .9rem;
		right: 0;
		top: 0;
	}
</style>
