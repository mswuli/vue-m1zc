<template>
	<div class="MsgLogin">
		<ul>
			<li class="logo">
				<img :src="require('@/assets/img/account/yizhanche.png')" alt="">
			</li>
			<li class="tel">
				<span class="iconfont">&#xe60e;</span>
				<input type="text" placeholder="手机号" v-model="msg1" autocomplete="off" @blur="iPhone" maxlength="11">
			</li>
			<li class="psd">
				<span class="iconfont">&#xe657;</span>
				<input type="text" placeholder="请输入验证码" v-model="msg2" autocomplete="off" maxlength="4">
				<span class="getMsg" @click="verifyMsg">{{verify}}</span>
			</li>
			<li class="tel psds" v-show="show">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请设置密码" v-model="msg3" autocomplete="off" maxlength="16">
			</li>
			<li class="tel psds" v-show="show">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请再次输入密码" v-model="msg4" autocomplete="off" maxlength="16">
			</li>
			<li class="protocol" v-show="show">
				<span>
					<div @click="che" class="label">
						<span :class="{active: checked}"></span>
					</div>
					我已经阅读并同意《<span @click="toProtocol">一站车用户购买协议</span>》
				</span>
			</li>
			<li class="logining"><button :class="{downs: msg1&&msg2&&!show , down: msg1&&msg2&&msg3&&msg4&&checked }" @click="msgLogin">登录</button></li>
			<li class="help">
				<span @click="toAccountReg">注册</span>
				<span @click="toAccountReset">忘记密码?</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default{
		name: 'MsgLogin',
		data(){
			return{
				msg1: "",
				msg2: "",
				msg3: "",
				msg4: "",
				verify: "获取验证码",
				isGo: true,
				checked: false,
				show: false,  //没注册就显示
			}
		},
		methods:{
			toAccountReg(){
				this.$router.push({
					path: "/AccountReg",
					query: {
						name: this.$route.name
					}
				});
			},
			toAccountReset(){
				this.$router.push({
					path: "/AccountReset",
					query: {
						reset: this.$route.name
					}
				});
			},
			//跳转协议详情
			toProtocol(){
				this.$router.push({
					path: '/AccountProtocol',
					query: {
						names: this.$route.name
					}
				})
			},
			//选择协议
			che(){
				this.checked = !this.checked
			},
			//判断手机号注册
			iPhone(){
				if(this.isPhone(this.msg1)){
					const url = this.$store.state.Yi + 'index/api/seek';
					axios.post(url,qs.stringify({
						phone: this.msg1
					})).then(
						(res) => {
							if(res.data.type == '0'){
								const toast = this.$createToast({
									txt: '请输入验证码和密码后系统将自动为您注册！',
									type: 'error',
									time: 2500,
									mask: true
								})
								toast.show();
								this.show = true;
							}else if(res.data.type == '1'){
								this.show = false;
								this.msg3 = "";
								this.msg4 = "";
							}else{
								this.show = false;
							}
						}
					)
				}
			},
			//判断密码长度
			psd1(p1){
				let reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/gi;
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
			//获取验证码
			verifyMsg(){
				//this.iPhone();
				if(this.isPhone(this.msg1)){
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
						this.msg();
					}
				}
			},
			msg(){
				const url = this.$store.state.Yi + "index/Api/smsCode";
				axios.post(url,qs.stringify({
					country_code: '86',
					phone: this.msg1
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
			        	time: 1500
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
						time: 1500
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
			//登录
			msgLogin(){
				if(!this.show){
					if( this.isPhone(this.msg1) && this.isMsg(this.msg2) ){
						const url = this.$store.state.Yi + "index/Login/login";
						axios.post(url, qs.stringify({
							password: '',
							smscode: this.msg2,
							country_code: '86',
							phone: this.msg1,
							login_type: this.$store.state.login_type,
						})).then(this.loginInfo);
					}
				}else{
					if( this.isPhone(this.msg1) && this.isMsg(this.msg2) && this.psd1(this.msg3) && this.psd2(this.msg3,this.msg4) && this.agreement() ){
						const url = this.$store.state.Yi + "index/Login/login";
						axios.post(url, qs.stringify({
							password: this.msg3,
							smscode: this.msg2,
							country_code: '86',
							phone: this.msg1,
							login_type: this.$store.state.login_type,
						})).then(this.loginInfo);
					}
				}
			},
			//登录回调
			loginInfo(res){
				//console.log(res.data);
				if(res.data.type == 0){
					const toast = this.$createToast({
						txt: '登录失败！',
						type: 'error',
						time: 1000,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 1){
					const toast = this.$createToast({
						txt: '登录成功！',
						type: 'correct',
						time: 1000,
						mask: true,
						onTimeout: () => {   //回调
							localStorage.expire = res.data.expire_time;
							localStorage.token = res.data.token;
							this.$store.dispatch("changeExpireTime",true);  //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
							if(this.$store.state.GoBack){
								this.$router.push(this.$store.state.GoBack);
								this.$store.dispatch("changeBack",null);
							}else{
								this.$router.push("/Center");
							}
						}
					})
					toast.show()
				}else if(res.data.type == 2){
					const toast = this.$createToast({
						txt: '验证码输入有误！',
						type: 'error',
						time: 1500,
						mask: true,
					})
					toast.show()
				}else if(res.data.type == 3){
					const toast = this.$createToast({
						txt: '手机未注册或用户类型不对！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 6){
					const toast = this.$createToast({
						txt: '验证码输入有误！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else if(res.data.type == 7){
					const toast = this.$createToast({
						txt: '密码不能为空！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show()
				}else {
					const toast = this.$createToast({
						txt: '服务器繁忙！',
						type: 'error',
						time: 1000,
						mask: true
					})
					toast.show()
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.MsgLogin{
		margin-top: 1.6rem;
		margin-bottom: 1.2rem;
	}

	.MsgLogin ul .logo{
		margin-bottom: .8rem;
	}

	.MsgLogin ul .logo img{
		width: 4rem;
	}

	.MsgLogin ul .tel,.MsgLogin ul .psd{
		height: .9rem;
		margin: 0 .28rem;
		text-align: left;
		margin-bottom: .62rem;
		border-bottom: #b8b8b8 1px solid;
		position: relative;
	}

	.MsgLogin ul .psds{
		margin-bottom: .42rem;
	}

	.MsgLogin ul .psd .getMsg{
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

	.MsgLogin ul .tel span,.MsgLogin ul .psd span{
		position: absolute;
		left: 0;
		bottom: 5px;
		color: #e5000c;
		font-size: .4rem;
	}

	.MsgLogin ul .tel input,.MsgLogin ul .psd input{
		position: absolute;
		left: 35px;
		bottom: 0;
		height: .6rem;
		width: 88%;
	}

	.MsgLogin ul .logining{
		height: .9rem;
		margin: 0 .28rem;
	}

	.MsgLogin ul .logining button{
		height: 100%;
		width: 100%;
		background-color: #eaeaea;
		color: #fff;
		font-size: .36rem;
		font-weight: bold;
		border-radius: .1rem;
	}

	.MsgLogin ul .logining .downs{
		background-color: #e5000c;
	}

	.MsgLogin ul .logining .down{
		background-color: #e5000c;
	}

	.MsgLogin ul .help{
		height: .7rem;
		margin: 0 .28rem;
		line-height: .7rem;
		display: flex;
		justify-content: space-between;
		color: #e5000c;
		font-size: .28rem;
	}

	.MsgLogin .protocol{
		margin-bottom: .4rem;
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
</style>
