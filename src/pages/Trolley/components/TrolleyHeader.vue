<template>
	<div class="TrolleyHeader">
		<!-- <span class="iconfont icon">&#xe606;</span> -->
		购物车
		<!-- <span class="iconfont add">&#xe658;</span> -->
	</div>
</template>

<script>
	export default{
		name: 'TrolleyHeader'
	}
</script>

<style scoped="scoped">
	.TrolleyHeader{
		background-color: #fff;
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        z-index: 999;
	}
	
	.TrolleyHeader .icon{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.TrolleyHeader .add{
		position: absolute;
		right: .2rem;
		height: .9rem;
		line-height: .9rem;
	}
</style>
