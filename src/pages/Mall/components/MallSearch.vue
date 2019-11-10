<template>
	<div class="search">
		<div class="search-input">
			<span class="iconfont">&#xe603;</span>
			<input type="text" placeholder="点击搜索 路虎 保时捷" @focus="getSearchInfo" v-model="msg1">
		</div>
		<div class="service-input">
			<span class="iconfont" @click="kf">&#xe621;</span>
		</div>
		<!-- <router-link to="/AccountLogin"> -->
		<!-- <div class="leave-input" @click="toAccountLogin">
			<span class="iconfont">&#xe68b;</span>
		</div> -->
		<!-- </router-link> -->
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: "MallSearchs",
		data(){
			return{
				msg1: "",
			}
		},
		methods: {
			toAccountLogin() {
				this.$router.push("/AccountLogin");
			},
			//搜索
			getSearchInfo() {
				this.$router.push('/MallSearchs');
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

<style scoped>
	.search {
		position: fixed;
		background-color: #fff;
		z-index: 9999;
		width: 100%;
		top: 0;
		height: .9rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.search-input {
		margin-left: .2rem;
		width: 86%;
		height: .64rem;
		border-radius: .32rem;
		background-color: #eee;
		position: relative;
	}

	.search-input input {
		height: 100%;
		width: 76%;
		background-color: #eee;
		text-align: center;
	}

	.search-input span {
		font-size: .5rem;
		position: absolute;
		top: .08rem;
		left: .16rem;
	}

	.service-input {
		width: .8rem;
	}

	.service-input span {
		font-size: .52rem;
	}

	.leave-input {
		width: .8rem;
	}

	.leave-input span {
		font-size: .5rem;
	}
	
	.showSearch{
		margin-top: .9rem;
	}
</style>
