<template>
	<div class="Login">
		<ul>
			<li class="logo">
				<img :src="require('@/assets/img/account/yizhanche.png')" alt="">
			</li>
			<li class="tel">
				<span class="iconfont">&#xe60e;</span>
				<input type="text" placeholder="手机号" v-model="msg1" autocomplete="off" maxlength="11">
			</li>
			<li class="psd">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请输入密码" v-model="msg2" autocomplete="off" maxlength="16">
			</li>
			<li class="logining"><button :class="{down: msg1&&msg2}" @click="login">登录</button></li>
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
		name: 'Login',
		data(){
			return{
				msg1:"",
				msg2:"",
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
			//验证验密码
			isMsg(msg){
				let reg = /select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|;|>|<|%/gi;
				if(msg == null || msg == ''){
					const toast = this.$createToast({
				    	txt: '请输入密码！',
				    	type: 'error',
				    	time: 1500,
						mask: true
				    })
					toast.show();
					return false;
				}else if(reg.test(msg)){
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
			//登录
			login(){
				if( this.isPhone(this.msg1) && this.isMsg(this.msg2) ){
					const url = this.$store.state.Yi + "index/Login/login";				
					axios.post(url, qs.stringify({
						password: this.msg2,
						smscode: '',
						country_code: '86',
						phone1: this.msg1,
						login_type: this.$store.state.login_type,
					})).then(this.loginInfo);
				}
			},
			//回调
			loginInfo(res){
				//console.log(res.data);
				if(res.data.type == 0){
					const toast = this.$createToast({
						txt: '密码错误！',
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
						txt: '验证码有误！',
						type: 'error',
						time: 1500,
						mask: true
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
						txt: '验证证码过期！',
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
			},

			dataTime(){
				console.log(Date.parse(new Date())/1000)
			}
			
		},
		mounted(){
			//this.login();
			//this.dataTime()
		}
	}
</script>

<style scoped="scoped">
	.Login{
		margin-top: 1.6rem;
		margin-bottom: 1.2rem;
	}
	
	.Login ul .logo{
		margin-bottom: .8rem;
	}
	
	.Login ul .logo img{
		width: 4rem;
	}
	
	.Login ul .tel,.Login ul .psd{
		height: .9rem;
		margin: 0 .28rem;
		text-align: left;
		margin-bottom: .62rem;
		border-bottom: #b8b8b8 1px solid;
		position: relative;
	}
	
	.Login ul .tel span,.Login ul .psd span{
		position: absolute;
		left: 0;
		bottom: 5px;
		color: #e5000c;
		font-size: .4rem;
	}
	
	.Login ul .tel input,.Login ul .psd input{
		position: absolute;
		left: 35px;
		bottom: 0;
		height: .6rem;
		width: 88%;
	}
	
	.Login ul .logining{
		height: .9rem;
		margin: 0 .28rem;
	}
	
	.Login ul .logining button{
		height: 100%;
		width: 100%;
		background-color: #eaeaea;
		color: #fff;
		font-size: .36rem;
		font-weight: bold;
		border-radius: .1rem;
	}
	
	.Login ul .logining .down{
		background-color: #e5000c;
	}
	
	.Login ul .help{
		height: .7rem;
		margin: 0 .28rem;
		line-height: .7rem;
		display: flex;
		justify-content: space-between;
		color: #e5000c;
		font-size: .28rem;
	}
</style>
