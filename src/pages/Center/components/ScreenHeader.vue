<template>
	<div class="header">
		<div class="navGo">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			高级筛选
		</div>
	</div>
</template>

<script>
	export default{
		name: "ScreenHeader",
		data(){
			return{
				
			}
		},
		methods:{
			toCenter() {
				this.$router.push("/Center");
			}
		}
	}
</script>

<style scoped="scoped">
	.header {
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
	
	.header span {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}
</style>
