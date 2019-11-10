<template>
	<div class="CenterOrder">
		<h3>订单中心</h3>
		<ul>
			<li @click="toOrderAll('全部订单')">
				<span class="iconfont icon">&#xe634;</span>
				全部订单
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toOrderAll('待付定金')">
				<span class="iconfont icon">&#xe62c;</span>
				待付定金
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toOrderAll('待发货')">
				<span class="iconfont icon">&#xe620;</span>
				待发货
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toOrderAll('待收货')">
				<span class="iconfont icon">&#xe628;</span>
				待收货
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toOrderAll('待收发票')">
				<span class="iconfont icon">&#xe62e;</span>
				待收发票
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toOrderAll('已完成')">
				<span class="iconfont icon">&#xe616;</span>
				已完成
				<span class="iconfont next">&#xe65f;</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'CenterOrder',
		methods: {
			toOrderAll(cur) {
				this.$router.push({
					path: '/OrderAll',
					query: {
						current: cur
					}
				})
			}
		},
	}
</script>

<style scoped="scoped">
	.CenterOrder{
		background-color: #fff;
		border: #f8f8f8 .24rem solid;
		border-top: none;
	}
	
	.CenterOrder h3{
		font-size: .32rem;
		font-weight: bold;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		margin: 0 .24rem;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterOrder ul{
		margin: 0 .24rem;
	}
	
	.CenterOrder ul li{
		font-size: .24rem;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterOrder ul li:last-child{
		border-bottom: none;
	}
	
	.CenterOrder ul li .icon{
		float: left;
		height: .86rem;
		line-height: .86rem;
		font-size: .5rem;
		margin-right: .2rem;
		width: .6rem;
	}
	
	.CenterOrder ul li .next{
		float: right;
		height: .86rem;
		width: .86rem;
		line-height: .86rem;
		text-align: right;
	}
</style>
