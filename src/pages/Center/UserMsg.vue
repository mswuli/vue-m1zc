<template>
	<div class="UserMsg">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			个人信息
			<span v-show="show" class="add" @click="getUpdateInfo">修改</span>
			<span v-show="!show" class="add" @click="getachieveInfo">完成</span>
		</div>

		<div class="content">
			<ul v-show="show">
				<li class="portrait">
					<div :style="msg1">
					</div>
					<!-- <p>编辑头像<span class="iconfont">&#xe65f;</span></p> -->
				</li>
				<li>
					<span>用户名称：</span>
					<span>{{phone}}</span>
				</li>
				<li>
					<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
					<span>{{msg2}}</span>
				</li>
				<li>
					<span>真实姓名：</span>
					<span>{{msg3}}</span>
				</li>
				<li>
					<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					<span>{{msg4}}</span>
				</li>
				<li>
					<span>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</span>
					<span>{{msg5}}</span>
				</li>
			</ul>

			<ul v-show="!show">
				<li class="portrait">
					<div :style="msg1">
						<input type="file" @change="headportrait($event)">
					</div>
					<p>点击头像编辑</p>
				</li>
				<li>
					<span>用户名称：</span>
					<span>{{phone}}</span>
				</li>
				<li>
					<span>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
					<input type="text" v-model="msg2">
				</li>
				<li>
					<span>真实姓名：</span>
					<input type="text" v-model="msg3">
				</li>
				<li>
					<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					<input type="text" v-model="msg4" readonly @click="showActive">
				</li>
				<li>
					<span>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</span>
					<input type="text" v-model="msg5" readonly @click="showDatePicker">
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'UserMsg',
		data() {
			return {
				show: true,
				phone: "",
				msg1: {backgroundImage: 'url(' + require('@/assets/img/center/sprit.png') + ')'},
				msg2: "",
				msg3: "",
				msg4: "",
				msg5: "",
				msg6: "",  //修改后的头像
				msg7: "",  //原来的用户头像
				msg8: "",  //性别
				toast1: this.$createToast({
					time: 0,
					txt: '',
					mask: true
				})  //遮罩层函数
			}
		},
		methods: {
			//返回个人中心
			toCenter() {
				this.$router.push('/Center');
			},
			//修改按钮
			getUpdateInfo() {
				this.show = false;
			},
			//完成按钮
			getachieveInfo() {
				this.toast1.show();  //显示遮罩
				if(localStorage.token){
					const url = this.$store.state.Yi + 'index/My/peditinfo';
					axios.post(url,qs.stringify({
						token: localStorage.token,
						user_name: this.msg2,
						real_name: this.msg3,
						sex: this.msg8,
						birthday: this.msg5,
						img: this.msg6,
						up: this.msg7
					})).then(
						(res) => {
							//console.log(res.data.error)
							if(res.data.error == 0){
								const toast = this.$createToast({
									txt: '修改用户信息成功！',
									type: 'correct',
									time: 1500,
									mask: true,
									onTimeout: () => {   //回调
										//this.$router.push('/SettingSite');
										this.toast1.hide();
										this.show = true;
									}
								})
								toast.show()
							}else if(res.data.error == 1){
								const toast = this.$createToast({
									txt: '修改用户信息失败！',
									type: 'error',
									time: 1500,
									mask: true
								})
								toast.show()
							}else{
								const toast = this.$createToast({
									txt: '未知错误！',
									type: 'error',
									time: 1500,
									mask: true
								})
								toast.show()
							}
						}
					)
				}
				
			},
			//获取用户数据
			getUsermsgInfo() {
				if (localStorage.token) {
					const url = this.$store.state.Yi + 'index/My/userInfo'
					axios.post(url, qs.stringify({
						token: localStorage.token
					})).then(
						(res) => {
							//console.log(res.data.data.infoRes);
							this.phone = res.data.data.infoRes.phone;
							this.msg6 = res.data.data.infoRes.head_portrait;
							this.msg7 = res.data.data.infoRes.head_portrait;
							this.msg8 = res.data.data.infoRes.sex;
							if(res.data.data.infoRes.head_portrait){
								this.msg1 = {backgroundImage: 'url(' + res.data.data.infoRes.head_portrait + ')'};
							}
							this.msg2 = res.data.data.infoRes.user_name;
							this.msg3 = res.data.data.infoRes.real_name;
							if (res.data.data.infoRes.sex == 0) this.msg4 = "保密";
							if (res.data.data.infoRes.sex == 1) this.msg4 = "男";
							if (res.data.data.infoRes.sex == 2) this.msg4 = "女";
							this.msg5 = res.data.data.infoRes.birthday.join("/");
						}
					)
				}
			},
			//性别选择
			showActive() {
				this.$createActionSheet({
					title: '请选择性别',
					data: [{
						content: '保密'
					}, {
						content: '男'
					}, {
						content: '女'
					}],
					onSelect: (item, index) => {
						this.msg4 = item.content;
						if (item.content == "保密") this.msg8 = 0;
						if (item.content == "男") this.msg8 = 1;
						if (item.content == "女") this.msg8 = 2;
					}
				}).show()
			},
			//生日选择
			showDatePicker() {
				if (!this.datePicker) {
					this.datePicker = this.$createDatePicker({
						title: '请选择生日',
						min: new Date(1900, 1, 1),
						max: new Date(),
						value: new Date(),
						onSelect: this.selectHandle,
						onCancel: this.cancelHandle
					})
				}
				this.datePicker.show()
			},
			selectHandle(date, selectedVal, selectedText) {
				this.msg5 = selectedText.join('/')
			},
			//上传头像
			headportrait(e) {
				const _self = this;
				// 利用fileReader对象获取file
				let file = e.target.files[0];
				// console.log(file.type)
				if(file.type == "image/png" || file.type == "image/jpeg"){
					let filesize = file.size;
					let filename = file.name;
					// 2,621,440   2M
					if (filesize > 2101440) {
						// 图片大于2MB
					}
					let reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function (e) {
						// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
						let imgcode = e.target.result;
						_self.msg1 = {backgroundImage: 'url(' + imgcode + ')'};
						_self.msg6 = imgcode;
					}
				}else{
					const toast = this.$createToast({
						txt: '图片仅支持PNG或JPG格式！',
						type: 'error',
						time: 1500
					})
					toast.show();
				}
			},
		},
		mounted() {
			this.getUsermsgInfo();
		}
	}
</script>

<style scoped="scoped">
	.UserMsg .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}

	.UserMsg .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}

	.UserMsg .header .add {
		position: absolute;
		right: .2rem;
		height: .9rem;
		line-height: .9rem;
		color: #e5000c;
	}

	.UserMsg .content ul {
		margin: 0 .2rem;
		text-align: left;
	}

	.UserMsg .content ul .portrait {
		display: block;
		height: 2.1rem;
		text-align: center;
	}

	.UserMsg .content ul .portrait div {
		width: 1.1rem;
		height: 1.1rem;
		margin: auto;
		border-radius: 50%;
		overflow: hidden;
		/* border: .06rem rgba(0, 0, 0, .1) solid; */
		position: relative;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.UserMsg .content ul .portrait div input {
		width: 100%;
		height: 100%;
		left: 0rem;
		top: 0rem;
		position: absolute;
		opacity: 0;
		z-index: 10;
	}
	
	/* .UserMsg .content ul .portrait div img {
		width: 100%;
	} */

	.UserMsg .content ul .portrait p {
		color: #8e9bb1;
	}

	.UserMsg .content ul .portrait p span {
		font-size: .24rem;
	}

	.UserMsg .content ul li {
		height: 1rem;
		line-height: 1rem;
		font-size: .28rem;
		position: relative;
		display: flex;
		border-bottom: #ececec 1px solid;
	}

	.UserMsg .content ul li>span {
		margin-right: .3rem;
	}

	.UserMsg .content ul li>input {
		height: .4rem;
		line-height: .4rem;
		margin-top: .3rem;
		border: #ececec 1px solid;
		border-radius: .1rem;
		padding-left: .1rem;
		font-size: .24rem;
	}
</style>
