<template>
	<div class="Reset">
		<ul>
			<li class="logo">
				<img :src="require('@/assets/img/account/yizhanche.png')" alt="">
			</li>
			<li class="tel">
				<span class="iconfont">&#xe60e;</span>
				<input type="text" placeholder="手机号" v-model="msg1" @blur="iPhone" maxlength="11">
			</li>
			<li class="psd">
				<span class="iconfont">&#xe657;</span>
				<input type="text" placeholder="请输入验证码" v-model="msg2" maxlength="4">
				<span class="getMsg" @click="verifyMsg">{{verify}}</span>
			</li>
			<li class="tel">
				<span class="iconfont">&#xe657;</span>
				<input type="password" placeholder="请设置新密码" v-model="msg3" maxlength="16">
			</li>
			<li class="tel">
				<span class="iconfont">&#xe657;</span>
				<input type="password" placeholder="请再次输入新密码" v-model="msg4" maxlength="16">
			</li>
			<li class="logining"><button :class="{down: msg1&&msg2&&msg3&&msg4}" @click="msgLogin">登录</button></li>
			<li class="help">
				<span @click="toAccountReg">注册</span>
				<span @click="toAccountReset">密码登录</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'Reset',
		data(){
			return{
				msg1: "",
				msg2: "",
				msg3: "",
				msg4: "",
				verify: "获取验证码",
				isGo: true,
				zuce: false
			}
		},
		methods:{
			toAccountReg(){
				this.$router.push({
					path: "/AccountReg",
					query: {
						name: this.$route.name,
						reset: this.$route.query.reset
					}
				});
			},
			toAccountReset(){
				this.$router.push("/AccountLogin");
			},
			//判断手机号注册
			iPhone(){
				if(this.isPhone(this.msg1)){
					const url = this.$store.state.Yi + 'index/api/seek';
					axios.post(url,qs.stringify({
						phone: this.msg1
					})).then(
						(res) => {
							// console.log(res.data)
							if(res.data.type == "0"){
								const toast = this.$createToast({
									txt: '您的手机号码未注册！',
									type: 'warn',
									time: 1500,
									mask: false
								})
								toast.show();
								this.zuce = true
							}else{
								this.zuce = false
							}
						}
					)
				}else{
					this.show = false;
				}
			},
			//获取验证码
			verifyMsg(){
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
			    var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
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
						time: 1500
					})
					toast.show();
				    return false;
				}else{
					return true;
				}
			},
			//重置密码
			msgLogin(){
				if(this.zuce){
					const toast = this.$createToast({
						txt: '您的手机号码未注册！',
						type: 'warn',
						time: 1500,
						mask: false
					})
					toast.show();
					return
				}
				
				if( this.isPhone(this.msg1) && this.isMsg(this.msg2) && this.psd1(this.msg3) &&this.psd2(this.msg3,this.msg4) ){
					const url = this.$store.state.Yi + "index/Api/retrieve_pwd";
					axios.post(url, qs.stringify({
						tel: this.msg1,
						smscode: this.msg2,
						npwd: this.msg3,
						cpwd: this.msg4
					})).then(this.loginInfo);
				}
			},
			//回调
			loginInfo(res){
				console.log(res.data);
				if(res.data.type == 1){
					const toast = this.$createToast({
						txt: '新密码修改成功！',
						type: 'correct',
						time: 1000,
						onTimeout: () => {   //回调
							//localStorage.expire = res.data.expire_time;
							//localStorage.token = res.data.token;
							//this.$store.dispatch("changeExpireTime",true);  //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
							this.$router.push('/AccountLogin');
						}
					})
					toast.show()
				}else if(res.data.type == 2){
					const toast = this.$createToast({
						txt: '验证码输入有误！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}else if(res.data.type == 3){
					const toast = this.$createToast({
						txt: '密码不一致！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}else if(res.data.type == 4){
					const toast = this.$createToast({
						txt: '手机号未注册！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}else if(res.data.type == 6){
					const toast = this.$createToast({
						txt: '验证码输入有误！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}else if(res.data.type == 0){
					const toast = this.$createToast({
						txt: '修改失败！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}else {
					const toast = this.$createToast({
						txt: '服务器繁忙，请稍后重试！',
						type: 'error',
						time: 1000
					})
					toast.show()
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.Reset{
		margin-top: 1.6rem;
		margin-bottom: 1.2rem;
	}
	
	.Reset ul .logo{
		margin-bottom: .8rem;
	}
	
	.Reset ul .logo img{
		width: 4rem;
	}
	
	.Reset ul .tel,.Reset ul .psd{
		height: .9rem;
		margin: 0 .28rem;
		text-align: left;
		margin-bottom: .32rem;
		border-bottom: #b8b8b8 1px solid;
		position: relative;
	}
	
	.Reset ul .psd .getMsg{
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
	
	.Reset ul .tel span,.Reset ul .psd span{
		position: absolute;
		left: 0;
		bottom: 5px;
		color: #e5000c;
		font-size: .4rem;
	}
	
	.Reset ul .tel input,.Reset ul .psd input{
		position: absolute;
		left: 35px;
		bottom: 0;
		height: .6rem;
		width: 88%;
	}
	
	.Reset ul .logining{
		height: .9rem;
		margin: 0 .28rem;
	}
	
	.Reset ul .logining button{
		height: 100%;
		width: 100%;
		background-color: #eaeaea;
		color: #fff;
		font-size: .36rem;
		font-weight: bold;
		border-radius: .1rem;
	}
	
	.Reset ul .logining .down{
		background-color: #e5000c;
	}
	
	.Reset ul .help{
		height: .7rem;
		margin: 0 .28rem;
		line-height: .7rem;
		display: flex;
		justify-content: space-between;
		color: #e5000c;
		font-size: .28rem;
	}
</style>
