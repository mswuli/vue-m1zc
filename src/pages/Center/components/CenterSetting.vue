<template>
	<div class="CenterSetting">
		<h3>账户设置</h3>
		<ul>
			<li @click="toSettingSite">
				<span class="iconfont icon">&#xe630;</span>
				收货地址管理
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="toAccountSafety">
				<span class="iconfont icon">&#xe62f;</span>
				账户安全管理
				<span class="iconfont next">&#xe65f;</span>
			</li>
			<li @click="kf()">
				<span class="iconfont icon">&#xe621;</span>
				联系客服
				<span class="iconfont next">&#xe65f;</span>
			</li>
		</ul>
	</div>
</template>

<script> 
	export default{
		name: 'CenterSetting',
		methods: {
			//收货地址管理
			toSettingSite() {
				this.$router.push('/SettingSite');
			},
			//账号安全管理
			toAccountSafety() {
				this.$router.push('/AccountSafety');
			},
			//客服
			kf() {
				let isSdkReady = false;
				ysf('onready', function() {
					isSdkReady = true;
				})
				if (isSdkReady) {
					ysf('open');
					// location.href = ysf('url');
				} else {
					// 仅做参考
					alert('sdk尚未加载成功，请稍后再试');
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.CenterSetting{
		background-color: #fff;
		border: #f8f8f8 .24rem solid;
		border-top: none;
	}
	
	.CenterSetting h3{
		font-size: .32rem;
		font-weight: bold;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		margin: 0 .24rem;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterSetting ul{
		margin: 0 .24rem;
	}
	
	.CenterSetting ul li{
		font-size: .24rem;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterSetting ul li:last-child{
		border-bottom: none;
	}
	
	.CenterSetting ul li .icon{
		float: left;
		height: .86rem;
		line-height: .86rem;
		font-size: .5rem;
		margin-right: .2rem;
		width: .6rem;
	}
	
	.CenterSetting ul li .next{
		float: right;
		height: .86rem;
		width: .86rem;
		line-height: .86rem;
		text-align: right;
	}
</style>
