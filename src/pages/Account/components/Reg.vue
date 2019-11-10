<template>
	<div class="Reg">
		<ul>
			<li class="logo">
				<img :src="require('@/assets/img/account/yizhanche.png')" alt="">
			</li>
			<li class="inp">
				<span class="iconfont">&#xe668;</span>
				<input type="text" placeholder="请输入昵称"  v-model="msg1" autocomplete="off" maxlength="16">
			</li>
			<li class="inp">
				<span class="iconfont">&#xe60e;</span>
				<input type="text" placeholder="手机号"  v-model="msg2" @blur="getUser" @keydown="resetReg" autocomplete="off" maxlength="11">
			</li>
			<li class="inp">
				<span class="iconfont">&#xe657;</span>
				<input type="text" placeholder="请输入验证码"  v-model="msg3" autocomplete="off" maxlength="4">
				<span class="getMsg" @click="verifyMsg">{{verify}}</span>
			</li>
			<li class="inp">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请设置密码"  v-model="msg4" autocomplete="off" maxlength="16">
			</li>
			<li class="inp">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请再次输入密码"  v-model="msg5" autocomplete="off" maxlength="16">
			</li>
			<li class="protocol">
				<span>
					<div @click="che" class="label">
						<span :class="{active: checked}"></span>
					</div>
					我已经阅读并同意《<span @click="toProtocol">一站车用户购买协议</span>》
				</span>
			</li>
			<li class="logining">
				<cube-popup
				type="my-popup"
				ref="myPopup"
				:mask="false"
				>
				<div class="tip">
					<p class="iconfont">&#xe677;</p>
					<p>手机号已注册</p>
				</div>
				</cube-popup>
				<button :class="{down: msg1&&msg2&&msg3&&msg4&&msg5&&checked}" @click="verifyReg()">注册</button>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default{
		name: 'Reg',
		data(){
			return{
				checked: false,
				msg1: "",
				msg2: "",
				msg3: "",
				msg4: "",
				msg5: "",
				verify: "获取验证码",
				register: true,
				isGo: true
			}
		},
		methods:{
			//跳转协议详情
			toProtocol(){
				this.$router.push({
					path: '/AccountProtocol',
					query: {
						name: this.$route.query.name,
						names: this.$route.name
					}
				})
			},
			//选择协议
			che(){
				this.checked = !this.checked
			},
			//判断是否注册
			getUser(){
				const url = this.$store.state.Yi + "index/api/seek";
				axios.post(url,qs.stringify({
					phone: this.msg2
				})).then(
					(res) => {
						if(res.data == 1){
							this.register = false;
							this.showPopup('myPopup');
						}
					}
				)
			},
			resetReg(){
				this.register = true;
			},
			showPopup(refId) {  //提示已注册
				const component = this.$refs[refId]
				component.show()
				setTimeout(() => {
					component.hide()
				}, 2000)
			},
			//获取验证码
			verifyMsg(){
				if(this.isPhone(this.msg2) && this.register){
					if(this.isGo){
						this.isGo = false
						let s = 60
						const v = setInterval(()=>{
							s--;
							this.verify = "重发" + s + "s";

							if(s == 0){
								clearInterval(v);
								this.isGo = true;
								this.verify = "获取验证码";
							}

						},1000)
						//调用短信验证码接口
						this.msg()
					}
				}else if(!this.register){
					this.showPopup('myPopup');
				}
			},
			msg(){
				const url = this.$store.state.Yi + "index/Api/smsCode";
				axios.post(url,qs.stringify({
					country_code: '86',
					phone: this.msg2
				})).then(
					(res) => {
						console.log(res.data)
					}
				)
			},
			//验证手机号码
			isPhone(phone){
			    if(phone == null || phone == ''){
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
			    if(!phoneReg.test(phone)){
					const toast = this.$createToast({
						txt: '请输入正确的手机号码！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
			        return false;
			    }else{
			        return true;
			    }
			},
			//验证验证码
			isMsg(msg){
				let reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/gi;
				 if(msg == null || msg == ''){
					const toast = this.$createToast({
				    	txt: '请输入验证码！',
				    	type: 'error',
				    	time: 1500
				    })
				    toast.show();
				    return false;
				}else if(reg.test(msg)){
					const toast = this.$createToast({
						txt: '请勿在验证码中输入非法关键词！',
						type: 'error',
						time: 1500
					})
					toast.show();
					return false;
				}else{
					return true;
				}
			},
			//验证用户名
			userName(username){
				let reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/gi;
				if(username.length < 2){
					const toast = this.$createToast({
						txt: '名称必须大于2个字符！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
				    return false;
				}else if(reg.test(username)){
					const toast = this.$createToast({
						txt: '请勿在用户名中输入非法关键词！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				}else{
					return true;
				}
			},
			//判断密码长度
			psd1(p1){
				let reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/gi;
        let regs = /^(\d)\1{5}$/;
        let str = '01234567890_09876543210';
				if(p1.length < 6){
					const toast = this.$createToast({
						txt: '密码长度必须大于6个字符！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
				    return false;
				}else if(reg.test(p1)){
					const toast = this.$createToast({
						txt: '请勿在密码中输入非法关键词！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				}else if(regs.test(p1) || str.indexOf(p1) > -1){
					const toast = this.$createToast({
						txt: '密码不能为连续或重复的数字！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				}else{
					return true;
				}
			},
			//密码1 = 密码2
			psd2(p1,p2){
				if(p1 != p2){
					const toast = this.$createToast({
						txt: '两次输入的密码不一致！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
				    return false;
				}else{
					return true;
				}
			},
			//协议
			agreement(){
				if(!this.checked){
					const toast = this.$createToast({
						txt: '请阅读并同意一站车协议！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				}else{
					return true;
				}
			},

			verifyReg(){
				if( this.userName(this.msg1)&&this.isPhone(this.msg2)&&this.isMsg(this.msg3)&&this.psd1(this.msg4)&&this.psd2(this.msg4,this.msg5)&&this.agreement() ){
					this.regAccount();
				}
			},
			//注册账号
			regAccount(){
				const url = this.$store.state.Yi + "index/Login/reg";
				axios.post(url,qs.stringify({
					password: this.msg4,
					password_confirm: this.msg5,
					smscode: this.msg3,
					user_name: this.msg1,
					country_code: "86",
					phone: this.msg2,
					login_type: this.$store.state.login_type,
				})).then(this.regInfo)
			},
			//回调
			regInfo(res){
				console.log(res.data)
				if(res.data.type == 0){
					const toast = this.$createToast({
						txt: '注册失败！',
						type: 'error',
						time: 1000,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 1){
					const toast = this.$createToast({
						txt: '注册成功！',
						type: 'correct',
						time: 1000,
						mask: true,
						onTimeout: () => {   //回调
						console.log(res.data)
							localStorage.expire = res.data.expire_time;
							localStorage.token = res.data.token;
							this.$store.dispatch("changeExpireTime",true);  //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
							if(this.$store.state.GoBack){
								this.$router.push(this.$store.state.GoBack);
								this.$store.dispatch("changeBack",null);
							}else{
								this.$router.push("/Mall");
							}
						}
					})
					toast.show()
				}else if(res.data.type == 2){
					const toast = this.$createToast({
						txt: '验证码输入有误！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 3){
					const toast = this.$createToast({
						txt: '该手机号已注册！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 4){
					const toast = this.$createToast({
						txt: '密码不一致！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 5){
					const toast = this.$createToast({
						txt: '手机号码不能为空！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 6){
					const toast = this.$createToast({
						txt: '验证码过期！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 7){
					const toast = this.$createToast({
						txt: '验证码错误！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else{
					const toast = this.$createToast({
						txt: '服务器繁忙,请刷新页面后重试！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}
			}

		}
	}
</script>

<style scoped="scoped">
	.Reg{
		margin-top: 1.6rem;
	}

	.Reg ul .logo{
		margin-bottom: .8rem;
	}

	.Reg ul .logo img{
		width: 4rem;
	}

	.Reg ul .inp{
		height: .9rem;
		margin: 0 .28rem;
		text-align: left;
		margin-bottom: .22rem;
		border-bottom: #b8b8b8 1px solid;
		position: relative;
	}

	.Reg ul .inp .getMsg{
		position: absolute;
		width: 1.4rem;
		height: .52rem;
		background-image: linear-gradient(to right,#e9616a,#e5010d);
		left: auto;
		right: 0px;
		bottom: 6px;
		border-radius: 5px;
		font-size: .24rem;
		color: #fff;
		line-height: .52rem;
		text-align: center;
	}

	.Reg ul .inp span{
		position: absolute;
		left: 0;
		bottom: 5px;
		color: #e5000c;
		font-size: .4rem;
	}

	.Reg ul .inp input{
		position: absolute;
		left: 35px;
		bottom: 0;
		height: .6rem;
		width: 88%;
	}

	.Reg .protocol{
		margin-top: .6rem;
	}

	.protocol>span{
		width: auto;
		border: 1px solid #eee;
		font-size: .26rem;
		padding: .1rem .2rem;
		border-radius: .5rem;
		position: relative;
		color: #999;
		padding-left: .55rem;
	}

	.protocol>span span{
		color: #1d4faa;
	}

	.protocol>span .label{
		position: absolute;
		width: .3rem;
		height: .3rem;
		border: 1px solid #333;
		border-radius: 50%;
		top: 4px;
		left: 6px;
	}

	.protocol>span .label .active{
		position: absolute;
		width: .18rem;
		height: .18rem;
		background-color: #e5000c;
		border-radius: 50%;
		left: 3px;
		top: 3px
	}

	.protocol>span input{
		opacity: 0;
	}

	.Reg ul .logining{
		height: .9rem;
		margin: .3rem .28rem;
	}

	.Reg ul .logining button{
		height: 100%;
		width: 100%;
		background-color: #eaeaea;
		color: #fff;
		font-size: .36rem;
		font-weight: bold;
		border-radius: .1rem;
	}

	.Reg ul .logining .down{
		background-color: #e5000c;
	}

	.tip{
		background-color: rgba(0,0,0,.6);
		padding: .2rem;
		border-radius: .1rem;
		color: #fff;
	}

	.tip .iconfont{
		font-size: .8rem;
		font-weight: 600;
		padding-bottom: .2rem;
	}
</style>
