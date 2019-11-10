<template>
	<div class="SettingSite">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			收货地址管理
			<span class="add" @click="toSettingSiteadd">新增地址</span>
		</div>

		<div class="content">
			<div class="list" v-for="(item,index) in SiteData" @touchstart="gtouchstart(item.address_id)" @touchend="gtouchend">
				<h3>{{item.consignee + "&nbsp;&nbsp;&nbsp;&nbsp;"}} {{ item.mobile}}</h3>
				<p><span class="mor" v-show="item.address_type == 1">默认</span>
					<span>{{item.province}} {{item.city}} {{item.district}} {{item.address}}</span></p>
				<span class="iconfont" @click="toSettingSiteup(item.address_id)">&#xe658;</span>
			</div>
			<div style="margin-top: 2rem;" class="imgbox" v-show="SiteData.length == 0">
				<img :src="require('@/assets/img/center/zhanwuSite.png')" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'SettingSite',
		data() {
			return {
				SiteData: [],
				timeOutEvent: 0, // 计时器
			}
		},
		methods: {
			toSettingSiteup(a) {
				this.$router.push({
					path: "/SettingSiteup",
					query: {
						address_id: a
					}
				})
			},
			toCenter() {
				this.$router.push('/Center');
			},
			toSettingSiteadd() {
				this.$router.push('/SettingSiteadd');
			},
			//请求地址信息
			getSiteData() {
				if (localStorage.token){
					const url = this.$store.state.Yi + 'index/My/adrbasemanger';
					axios.post(url, qs.stringify({
						token: localStorage.token
					})).then(this.getSiteSuc)
				}else{
					that.$createToast({
						type: 'error',
						time: 1000,
						txt: '请先登录！',
						mask: true
					}).show()
				}
				
			},
			getSiteSuc(res) {
				//console.log(res.data.data.bool)
				this.SiteData = res.data.data.bool;
			},
			// 开始触摸
			gtouchstart(a) {
				let _self = this
				this.timeOutEvent = setTimeout(() => {
					_self.timeOutEvent = 0
					
					// 此处为长按事件
					_self.$createDialog({
						type: 'confirm',
						icon: 'cubeic-alert',
						title: '删除地址',
						content: '是否删除地址？',
						confirmBtn: {
							text: '确定',
							active: true,
							disabled: false,
							href: 'javascript:;'
						},
						cancelBtn: {
							text: '取消',
							active: false,
							disabled: false,
							href: 'javascript:;'
						},
						onConfirm: () => {
							if(localStorage.token){
								const url = this.$store.state.Yi + 'index/My/dizdel';
								axios.post(url,qs.stringify({
									token: localStorage.token,
									address_id: a
								})).then(
									(res) => {
										if(res.data.error == 0){
											_self.$createToast({
												type: 'correct',
												time: 1000,
												txt: '删除成功！',
												mask: true
											}).show()
											_self.getSiteData()
										}
									}
								)
							}else{
								_self.$createToast({
									type: 'error',
									time: 1000,
									txt: '请先登录！',
									mask: true
								}).show()
							}
						}
					}).show()
					
				}, 500)
			},
			//结束触摸清除计时器
			gtouchend() {
				clearTimeout(this.timeOutEvent)
				this.timeOutEvent = 0
			}
		},
		mounted() {
			this.getSiteData();
		}
	}
</script>

<style scoped="scoped">
	.SettingSite .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}

	.SettingSite .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}

	.SettingSite .header .add {
		position: absolute;
		right: .2rem;
		height: .9rem;
		line-height: .9rem;
	}

	.SettingSite .content {
		margin: 0 .2rem;
	}

	.SettingSite .content .list {
		height: 1.2rem;
		text-align: left;
		position: relative;
		border-bottom: #ececec 1px solid;
	}

	.SettingSite .content .list h3 {
		font-size: .32rem;
		margin-top: .46rem;
	}

	.SettingSite .content .list p {
		color: #8e9bb1;
		margin-top: .1rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: .1rem 0;
	}

	.SettingSite .content .list p .mor {
		border: #e5000c 1px solid;
		border-radius: .1rem;
		color: #e5000c;
		padding: 0 .1rem;
	}

	.SettingSite .content .list .iconfont {
		color: #8e9bb1;
		position: absolute;
		right: 0;
		top: .1rem;
	}

	.SettingSite .content .imgbox {
		margin-top: 2rem;
	}

	.SettingSite .content .imgbox img {
		width: 40%;
	}
</style>
