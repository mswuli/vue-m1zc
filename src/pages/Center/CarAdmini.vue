<template>
	<div class="CarAdmini">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			车辆管理
			<span class="addcar" @click="toCarScreen">新增车辆</span>
		</div>

		<div class="content">
			<dl v-for="(item,index) in carmanger" :key="index" @touchstart="gtouchstart(item.id)" @touchend="gtouchend">
				<dt>
					<img :src="item.m_img" alt="">
				</dt>
				<dd>
					<h3>
						<p class="title">{{item.logo_name}} {{item.m_name}} {{item.in_paragraph + "款"}} {{item.displacement}} {{item.fuel}}</p>
						<span class="atte" v-show="item.license_type == 0">未认证</span>
						<span class="atte blue" v-show="item.license_type == 1" @click="toCarEcho(item.id)">已认证</span>
						<span class="atte" v-show="item.license_type == 2">失败</span>
						<span class="atte" v-show="item.license_type == 3" @click="toCarEcho(item.id)">审核中</span>
					</h3>
					<p class="list">
						品牌: <span>{{item.logo_name}}</span>
						车系: <span>{{item.m_name}}</span>
						年款: <span>{{item.in_paragraph + "款"}}</span>
					</p>
					<p class="attestation" @click="toCarAuthentic(item.logo_name,item.m_name,item.id)" v-show="item.license_type == 0">前往车主认证</p>
					<p class="attestation" @click="toCarAuthentic(item.logo_name,item.m_name,item.id)" v-show="item.license_type == 2">重新认证</p>
				</dd>
			</dl>

			<dl v-for="(item,index) in order_car" :key="index+100">
				<dt>
					<img :src="item.image" alt="">
				</dt>
				<dd>
					<h3>
						<p class="title">{{item.brand_name}} {{item.cars_value}} {{item.in_paragraph + "款"}} {{item.displacement}}
							{{item.fuel}}</p>
						<!-- <span class="atte" v-show="item.license_type == 0">未认证</span> -->
						<span class="atte blue">1站车</span>
						<!-- <span class="atte" v-show="item.license_type == 2">失败</span> -->
						<!-- <span class="atte" v-show="item.license_type == 3">审核中</span> -->
					</h3>
					<p class="list">
						品牌: <span>{{item.brand_name}}</span>
						车系: <span>{{item.cars_value}}</span>
						年款: <span>{{item.in_paragraph + "款"}}</span>
					</p>
					<p class="attestation blue" @click="showBaoxian(item.order_id)">查看保险详情</p>
				</dd>
			</dl>

			<div class="nona" v-show="carmanger.length == 0">
				<img :src="require('@/assets/img/center/nocar.png')" alt="" style="width: 100%;">
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'CarAdmini',
		data() {
			return {
				carmanger: [],
				order_car: [],
				timeOutEvent: 0 // 长按事件定时器
			}
		},
		methods: {
			toCenter() {
				this.$router.push("/Center");
			},
			toCarScreen() {
				this.$router.push("/CarScreen");
			},
			//查看保险回显
			toCarEcho(a) {
				this.$router.push({
					path: '/CarEcho',
					query: {
						id: a
					}
				})
			},
			// 开始触摸
			gtouchstart(a) {
				let _self = this
				this.timeOutEvent = setTimeout(() => {
					_self.timeOutEvent = 0
					_self.showBtn(a)
				}, 500)
			},
			//结束触摸清除计时器
			gtouchend() {
				clearTimeout(this.timeOutEvent)
				this.timeOutEvent = 0
			},
			//提示框
			showBtn(a) {
				this.$createDialog({
					type: 'confirm',
					icon: 'cubeic-alert',
					title: '删除车辆',
					content: '是否删除选中车辆？',
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
						this.removeCar(a);
					}
				}).show()
			},
			//删除
			removeCar(a) {
				const url = this.$store.state.Yi + 'index/My/cardel';
				let token = localStorage.token;
				if (!token) token = 0;
				axios.post(url, qs.stringify({
					token: token,
					id: a
				})).then(
					(res) => {
						//console.log(res.data.error)
						if (res.data.error == 0) {
							const toast = this.$createToast({
								txt: '删除成功！',
								type: 'correct',
								time: 1000,
								onTimeout: () => { //回调
									this.getCarmangerInfo()
								}
							})
							toast.show()
						} else if (res.data.error == 1) {
							const toast = this.$createToast({
								txt: '删除失败！',
								type: 'error',
								time: 1500
							})
							toast.show()
						} else {
							const toast = this.$createToast({
								txt: '未知错误！',
								type: 'error',
								time: 1500
							})
							toast.show()
						}
					}
				)
			},
			//认证
			toCarAuthentic(a, b, c) {
				this.$router.push({
					path: "/CarAuthentic",
					query: {
						name: a,
						series: b,
						id: c
					}
				});
			},
			//获取数据
			getCarmangerInfo() {
				const url = this.$store.state.Yi + 'index/My/carmanger';
				let token = localStorage.token;
				if (!token) token = 0;
				axios.post(url, qs.stringify({
					token: token
				})).then(this.getCarmangerSuc)
			},
			getCarmangerSuc(res) {
				//console.log(res.data.data)
				if (res.data.data) {
					this.carmanger = res.data.data.bool;
					this.order_car = res.data.data.order_car;
				}
			},
			//查看保险
			showBaoxian(a) {
				this.$router.push({
					path: "/CarInsurance",
					query: {
						oeder_id: a,
					}
				});
			}
		},
		mounted() {
			this.getCarmangerInfo()
		}
	}
</script>

<style scoped="scoped">
	.CarAdmini .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}

	.CarAdmini .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}

	.CarAdmini .header .addcar {
		position: absolute;
		height: .9rem;
		line-height: .9rem;
		right: .2rem;
	}

	.CarAdmini .content {
		margin: 0 .2rem;
	}

	.CarAdmini .content dl {
		height: 1.8rem;
		border-bottom: #f0f0f0 1px solid;
	}

	.CarAdmini .content dl dt {
		float: left;
		width: 30%;
		height: 1.8rem;
	}

	.CarAdmini .content dl dt img {
		margin-top: .3rem;
		max-height: 1.2rem;
	}

	.CarAdmini .content dl dd {
		float: left;
		width: 70%;
		height: 1.8rem;
		text-align: left;
		position: relative;
	}

	.CarAdmini .content dl dd h3 {
		margin-top: .38rem;
		height: .28rem;
		position: relative;
	}

	.CarAdmini .content dl dd h3 .title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 80%;
	}

	.CarAdmini .content dl dd h3 .atte {
		position: absolute;
		color: #e5000c;
		font-size: .24rem;
		border: #e5000c 1px solid;
		border-radius: 3px;
		padding: 1px;
		right: 0;
		top: 0;
		background-color: #fff;
	}

	.CarAdmini .content dl dd h3 .blue {
		color: #5BC0DE;
		border: #5BC0DE 1px solid;
	}

	.CarAdmini .content dl dd .list {
		font-size: .24rem;
		margin-top: .22rem;
		color: #8e9bb1;
	}

	.CarAdmini .content dl dd .list span {
		color: #000000;
	}

	.CarAdmini .content dl dd .attestation {
		font-size: .24rem;
		width: 1.82rem;
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		color: #fff;
		position: absolute;
		background-color: #e5000c;
		border-radius: .1rem;
		bottom: .1rem;
		right: .1rem;
	}

	.CarAdmini .content dl dd .blue {
		background-color: #fff;
		color: #5BC0DE;
		border: #5BC0DE 1px solid;
	}
</style>
