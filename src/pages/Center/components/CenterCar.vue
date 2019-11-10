<template>
	<div class="CenterCar">
		<h3>爱车管理</h3>
		<ul>
			<li @click="toAdmini">
				<span class="iconfont icon">&#xe631;</span>
				车辆管理
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toCarScreen">
				<span class="iconfont icon">&#xe601;</span>
				新增车辆
				<span class="iconfont next">&#xe65f;</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'CenterCar',
		methods: {
			toAdmini() {
				this.$router.push('/CarAdmini');
			},
			toCarScreen(){
				this.$router.push('/CarScreen');
			}
		},
	}
</script>

<style scoped="scoped">
	.CenterCar{
		background-color: #fff;
		border: #f8f8f8 .24rem solid;
		border-top: none;
	}
	
	.CenterCar h3{
		font-size: .32rem;
		font-weight: bold;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		margin: 0 .24rem;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterCar ul{
		margin: 0 .24rem;
	}
	
	.CenterCar ul li{
		font-size: .24rem;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterCar ul li:last-child{
		border-bottom: none;
	}
	
	.CenterCar ul li .icon{
		float: left;
		height: .86rem;
		line-height: .86rem;
		font-size: .5rem;
		margin-right: .2rem;
		width: .6rem;
	}
	
	.CenterCar ul li .next{
		float: right;
		height: .86rem;
		width: .86rem;
		line-height: .86rem;
		text-align: right;
	}
</style>
