<template>
	<div>
		<transition name="fade">
			<keep-alive :include="keepAliveTwo">
				<router-view class="transitionBody"></router-view>
			</keep-alive>
		</transition>
		<div class="tabBar boxbt">
			<router-link to='/Mall'>
				<div class="iconBox" @click="tab(0)">
					<p class="iconfont" v-bind:class="{active: isSelect == isActive[0]}">&#xe60a;</p>
					<p class="text">汽车商城</p>
				</div>
			</router-link>
			<router-link to='/Articles'>
				<div class="iconBox" v-on:click="tab(1)">
					<p class="iconfont" v-bind:class="{active: isSelect == isActive[1]}">&#xe60b;</p>
					<p class="text">汽车资讯</p>
				</div>
			</router-link>
			<router-link to='/Trolley'>
				<div class="iconBox" v-on:click="tab(2)">
					<p class="iconfont" v-bind:class="{active: isSelect == isActive[2]}">&#xe610;</p>
					<p class="text">购物车</p>
				</div>
			</router-link>
			<router-link to='/Center'>
				<div class="iconBox" v-on:click="tab(3)">
					<p class="iconfont" v-bind:class="{active: isSelect == isActive[3]}">&#xe615;</p>
					<p class="text">个人中心</p>
				</div>
			</router-link>
		</div>
		
		<div class="down" v-show="!this.$store.state.isapp">
			<img :src="require('@/assets/img/down/logo.png')" alt="" @click="toDownload">
			<p @click="toDownload">下载APP</p>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'tabBar',
		data() {
			return {
				isActive: ["Mall", "Articles", "Trolley", "Center"],
				isSelect: "",
			}
		},
		watch: {
			isActive: function() {
				// console.log(this.isActive)
				// this.$store.state.navShow  //获取仓库数据
				// this.$store.dispatch("changeNavShow",false);  //这里是调用vuex里面actions里面的方法
				// this.$store.commit("setNavShow",city);  //绕开actions调mutations里面的方法
			}
		},
		computed: {
			keepAliveTwo() {
				return this.$store.state.keepAliveTwo
			}
		},
		methods: {
			tab(a) {
				this.isSelect = this.isActive[a];
			},
			toDownload(){
				this.$router.push('/Download');
			}
		},
		mounted() {
			this.isSelect = this.$route.name;
		},
		updated() {
			this.isSelect = this.$route.name;
		}
	}
</script>

<style scoped>
	div.tabBar {
		height: 1.1rem;
		width: 100%;
		position: fixed;
		bottom: 0;
		background-color: #fefefe;
	}

	div.iconBox {
		float: left;
		width: 25%;
		height: 100%;
		color: #999;
	}

	div.iconBox p.iconfont {
		float: left;
		width: 100%;
		height: .7rem;
		line-height: .8rem;
		font-size: .4rem;
	}

	div.iconBox p.text {
		float: left;
		width: 100%;
		height: .4rem;
		line-height: .3rem;
		font-size: .2rem;
	}

	.active {
		color: #e5000c;
	}
	
	.down{
		width: 12%;
		position: fixed;
		bottom: 2rem;
		right: .2rem;
	}
	
	.down img{
		width: 100%;
		border-radius: .14rem;
	}
	
	.down p{
		margin-top: .1rem;
		background-color: #101010;
		color: #fff;
		height: .3rem;
		line-height: .3rem;
		font-size: .2rem;
		border-radius: .14rem;
		white-space: nowrap;
	}
	
	.down .close{
		position: absolute;
		color: #bbb;
		font-size: .2rem;
		top: -0.1rem;
		right: -0.1rem;
		background-color: rgba(0,0,0,.6);
		border-radius: .15rem;
		width: .3rem;
		height: .3rem;
		line-height: .3rem;
	}

	/* iPhoneX,iPhoneXs的适配*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.boxbt {
			padding-bottom: 27px;
		}
	}

	/* iPhoneXs Max的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.boxbt {
			padding-bottom: 27px;
		}
	}

	/* iPhoneXr的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.boxbt {
			padding-bottom: 27px;
		}
	}
	
	/* .fade-leave-active, */
	.fade-enter-active{
		transition: all 0.2s ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: .5;
	}
	
</style>
