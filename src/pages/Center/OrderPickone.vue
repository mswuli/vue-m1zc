<template>
	<div class="OrderPickones">
		<div class="header">
			<span class="iconfont" @click="toOrderAll">&#xe606;</span>
			提交接车人信息
		</div>

		<ul>
			<li class="title">
				接车人姓名：<span><input type="text" placeholder="请填写真实的接车人姓名" v-model="msg1"></span>
			</li>
			<li class="title">
				接车人电话：<span><input type="text" placeholder="请填写真实的接车人带电话" v-model="msg2"></span>
			</li>
			<li class="title">
				身份证号码：<span><input type="text" placeholder="请填写身份证号码" v-model="msg3" style="width: 190px;"></span>
			</li>
			<li class="cred">
				<h3>身份证照片</h3>
				<dl>
					<dt>
						<div>
							<input @change="uploadXin($event)" type="file">
							<img :src="example.xin" alt="">
						</div>
						<div>
							<input @change="uploadJia($event)" type="file">
							<img :src="example.jia" alt="">
						</div>
					</dt>
					<dd>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/zhengmsfz.png')" alt="">
						</div>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/fanzhao.png')" alt="">
						</div>
					</dd>
				</dl>
			</li>
			<li class="butt" :class="{checked: imgCode.xin&&imgCode.jia}" @click="upPhoto">提交</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'OrderPickones',
		data() {
			return {
				imgCode: { //存储base64图片数据
					xin: "",
					jia: ""
				},
				example: { //例子
					xin: require('@/assets/img/center/shenfaz1.png'),
					jia: require('@/assets/img/center/shenfaz2.png')
				},
				msg1: "",
				msg2: "",
				msg3: "",
				toasts: this.$createToast({type: 'loading',mask: true,time: 0})
			}
		},
		methods: {
			toOrderAll() {
				this.$router.push({
					path: '/OrderAll',
					query: {
						current: this.$route.query.current
					}
				});
			},

			//验证身份证
			IdentityCodeValid(code) {
				var city = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江 ",
					31: "上海 ",
					32: "江苏 ",
					33: "浙江 ",
					34: "安徽 ",
					35: "福建 ",
					36: "江西 ",
					37: "山东 ",
					41: "河南 ",
					42: "湖北 ",
					43: "湖南 ",
					44: "广东 ",
					45: "广西 ",
					46: "海南 ",
					50: "重庆 ",
					51: "四川 ",
					52: "贵州 ",
					53: "云南 ",
					54: "西藏 ",
					61: "陕西 ",
					62: "甘肃 ",
					63: "青海 ",
					64: "宁夏 ",
					65: "新疆 ",
					71: "台湾 ",
					81: "香港 ",
					82: "澳门 ",
					91: "国外 "
				};
				var tip = "";
				var pass = true;
				if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
					tip = "身份证号格式错误";
					pass = false;
				} else if (!city[code.substr(0, 2)]) {
					tip = "地址编码错误";
					pass = false;
				} else {
					//18位身份证需要验证最后一位校验位
					if (code.length == 18) {
						code = code.split('');
						//∑(ai×Wi)(mod 11)
						//加权因子
						var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
						//校验位
						var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
						var sum = 0;
						var ai = 0;
						var wi = 0;
						for (var i = 0; i < 17; i++) {
							ai = code[i];
							wi = factor[i];
							sum += ai * wi;
						}
						var last = parity[sum % 11];
						if (parity[sum % 11] != code[17]) {
							tip = "校验位错误";
							pass = false;
						}
					}
				}
				if (!pass) {
					const toast = this.$createToast({
						txt: '身份证号码输入有误！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
				}

				return pass;
			},
			//上传行身份证正面
			uploadXin(e) {
				let _self = this;
				// 利用fileReader对象获取file
				var file = e.target.files[0];
				var filesize = file.size;
				var filename = file.name;
				// 2,621,440   2M
				if (filesize > 2101440) {
					// 图片大于2MB
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
					var imgcode = e.target.result;
					_self.imgCode.xin = imgcode;
					_self.example.xin = imgcode;
				}
			},
			//上传行身份证反面
			uploadJia(e) {
				const _self = this;
				// 利用fileReader对象获取file
				var file = e.target.files[0];
				var filesize = file.size;
				var filename = file.name;
				// 2,621,440   2M
				if (filesize > 2101440) {
					// 图片大于2MB
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(e) {
					// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
					var imgcode = e.target.result;
					_self.imgCode.jia = imgcode;
					_self.example.jia = imgcode;
				}
			},
			//验证姓名
			msgName(a) {
				if (a.length < 2) {
					const toast = this.$createToast({
						txt: '姓名长度不少于2位！',
						type: 'error',
						time: 1500
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证手机号码
			isPhone(phone) {
				if (phone == null || phone == '') {
					const toast = this.$createToast({
						txt: '请输入手机号码！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				}
				//验证号码
				var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
				if (!phoneReg.test(phone)) {
					const toast = this.$createToast({
						txt: '请输入正确的手机号码！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证图片
			imgTrue() {
				if (!this.imgCode.xin || !this.imgCode.jia) {
					const toast = this.$createToast({
						txt: '请添加证件照片！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},

			//上传图片
			getPhotoInfo() {
				this.toasts.show()
				const url = this.$store.state.Yi + 'index/my/receiverAjax';
				axios.post(url, qs.stringify({
					token: localStorage.token,
					order_id: this.$route.query.order_id,
					order_sn: this.$route.query.order_sn,
					name: this.msg1,
					tel: this.msg2,
					no: this.msg3,
					idcard_a: this.imgCode.xin,
					idcard_b: this.imgCode.jia
				})).then(
					(res) => {
						this.toasts.hide()
						console.log(res.data.error)
						if (res.data.error == "0") {
							const toast = this.$createToast({
								txt: '提交成功！',
								type: 'correct',
								time: 1500,
								mask: true,
								onTimeout: () => {
									this.toOrderAll();
								}
							})
							toast.show();
						} else {
							const toast = this.$createToast({
								txt: '提交失败！',
								type: 'error',
								time: 1500,
								mask: true
							})
							toast.show();
						}
					}
				)
			},
			//提交
			upPhoto() {
				if (this.msgName(this.msg1) && this.isPhone(this.msg2) && this.IdentityCodeValid(this.msg3) && this.imgTrue()) {
					this.getPhotoInfo()
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.OrderPickones .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}

	.OrderPickones .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}

	.OrderPickones ul {
		margin: 0 .2rem;
	}

	.OrderPickones ul .title {
		height: 1rem;
		font-size: .28rem;
		line-height: 1rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}

	.OrderPickones ul .cred {
		padding-bottom: .2rem;
		border-bottom: #ececec 1px solid;
	}

	.OrderPickones ul .cred h3 {
		font-size: .3rem;
		height: 1rem;
		line-height: 1rem;
		text-align: left;
	}

	.OrderPickones ul .cred dl dt {
		display: flex;
	}

	.OrderPickones ul .cred dl dt div {
		flex: 1;
		position: relative;
	}

	.OrderPickones ul .cred dl dt div input {
		position: absolute;
		height: 100%;
		width: 90%;
		left: 5%;
		top: 0;
		opacity: 0;
	}

	.OrderPickones ul .cred dl dt div img {
		width: 90%;
	}

	.OrderPickones ul .cred dl dd {
		display: flex;
	}

	.OrderPickones ul .cred dl dd div {
		flex: 1;
		position: relative;
	}

	.OrderPickones ul .cred dl dd div p {
		color: #8e9bb1;
		height: 1rem;
		line-height: 1rem;
	}

	.OrderPickones ul .cred dl dd div img {
		width: 90%;
	}

	.OrderPickones ul .butt {
		font-size: .32rem;
		color: #fff;
		font-weight: 600;
		margin-top: .4rem;
		margin-bottom: .4rem;
		height: 1rem;
		line-height: 1rem;
		border-radius: .1rem;
		background-color: #eaeaea;
	}

	.OrderPickones ul .checked {
		background-color: #e5000c;
	}
</style>
