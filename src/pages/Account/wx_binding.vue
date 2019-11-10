<template>
	<div class="wx_binding">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			绑定手机号
		</div>
		<ul>
			<li class="logo">
				<img :src="require('@/assets/img/account/yizhanche.png')" alt="">
			</li>
			<li class="tel">
				<span class="iconfont">&#xe60e;</span>
				<input type="text" placeholder="手机号" v-model="msg1" autocomplete="off" @blur="iPhone">
			</li>
			<li class="psd">
				<span class="iconfont">&#xe657;</span>
				<input type="text" placeholder="请输入验证码" v-model="msg2" autocomplete="off">
				<span class="getMsg" @click="verifyMsg">{{verify}}</span>
			</li>
			<li class="tel psds" v-show="show">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请设置密码" v-model="msg3" autocomplete="off">
			</li>
			<li class="tel psds" v-show="show">
				<span class="iconfont">&#xe614;</span>
				<input type="password" placeholder="请再次输入密码" v-model="msg4" autocomplete="off">
			</li>
			<li class="logining">
				<button :class="{downs: msg1&&msg2&&!show , down: msg1&&msg2&&msg3&&msg4 }" @click="registerInfo">绑定</button>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'wx_binding',
		data() {
			return {
				msg1: "",
				msg2: "",
				msg3: "",
				msg4: "",
				verify: "获取验证码",
				isGo: true,
				show: false,  //没注册就显示
				wxbang: false,  //判断绑定
				banding: 0  //绑定0,注册并绑定1
			}
		},
		methods: {
			//返回个人中心
			toCenter(){
				this.$store.dispatch("changeUsesdata",'');
				this.$router.push('/Center');
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
								this.show = true;
								this.wxbang = false;
								this.banding = 1;
								const toast = this.$createToast({
									txt: '您的手机号码未注册，输入密码后自动注册绑定！',
									type: 'warn',
									time: 2000,
									mask: false
								})
								toast.show();
							}else if(res.data.type == "1"){
								this.show = false;
								this.wxbang = false;
								this.banding = 0;
								if(res.data.dsf == "2"){
									this.wxbang = true;
									const toast = this.$createToast({
										txt: '您的手机号码已绑定过其它微信账号！',
										type: 'warn',
										time: 2000,
										mask: false
									})
									toast.show();
								}
							}else{
								this.show = false;
								this.wxbang = false;
								this.banding = 0;
							}
						}
					)
				}else{
					this.show = false;
				}
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
						this.msg()
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
			//验证验证码
			isMsg(msg){
				 if(msg == null || msg == ''){
					const toast = this.$createToast({
				    	txt: '请输入验证码！',
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
				if(p1.length < 6){
					const toast = this.$createToast({
						txt: '密码长度必须大于6个字符！',
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
			//传输数据
			registerInfo(){
				let _self = this;
				// console.log(this.$store.state.usesData);
				
				if(!_self.$store.state.usesData){
					const toast = _self.$createToast({
						txt: '服务器繁忙，请稍后重试！',
						type: 'error',
						time: 1500,
						mask: true,
						onTimeout: () => {   //回调
							this.$store.dispatch("changeUsesdata",'');
							this.$router.push('/AccountLogin');
						}
					})
					toast.show()
				}
				
				if(_self.wxbang){
					const toast = _self.$createToast({
						txt: '您的手机号码已绑定过其它微信账号,请更换手机号码！',
						type: 'warn',
						time: 2500,
						mask: false
					})
					toast.show();
					return
				}
				
				if(_self.banding == 0){
					if( _self.isPhone(_self.msg1) && _self.isMsg(_self.msg2) ){
						const url = _self.$store.state.Yi + 'index/api/ThirdParty_wx';
						axios.post(url, qs.stringify({
							token: '',
							binding: _self.banding,
							openid: _self.$store.state.usesData.openid,
							unionid: _self.$store.state.usesData.unionid,
							headimgurl: _self.$store.state.usesData.headimgurl,
							nickname: _self.$store.state.usesData.nickname,
							phone: _self.msg1,
							smscode: _self.msg2,
							password: '',
							password_com: '',
							country_code: '86',
							login_type: this.$store.state.login_type,
						})).then(
							(res) => {
								if(res.data.type == 2){
									const toast = _self.$createToast({
										txt: '验证码错误！',
										type: 'error',
										time: 1000,
										mask: true,
									})
									toast.show()
								}else if(res.data.type == 9){
									const toast = _self.$createToast({
										txt: 'QQ已有绑定账号！',
										type: 'error',
										time: 1000,
										mask: true,
									})
									toast.show()
								}else if(res.data.type == 10){
									// console.log(res.data.type)
									const toast = _self.$createToast({
										txt: '绑定登录成功！',
										type: 'correct',
										time: 1000,
										mask: true,
										onTimeout: () => {   //回调
											localStorage.expire = res.data.expire_time;
											localStorage.token = res.data.token;
											_self.$store.dispatch("changeExpireTime",true);  //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
											if(_self.$store.state.GoBack){
												_self.$router.push(_self.$store.state.GoBack);
												_self.$store.dispatch("changeBack",null);
											}else{
												_self.$router.push("/Center");
											}
										}
									})
									toast.show()
								}else{
									const toast = _self.$createToast({
										txt: '服务器繁忙，请稍后重试！',
										type: 'error',
										time: 1500,
										mask: true,
										onTimeout: () => {   //回调
											this.$store.dispatch("changeUsesdata",'');
											this.$router.push('/AccountLogin');
										}
									})
									toast.show()
								}
							}
						)
					}
				}else{
					if( this.isPhone(this.msg1) && this.isMsg(this.msg2) && this.psd1(this.msg3) && this.psd2(this.msg3,this.msg4) ){
						const url = this.$store.state.Yi + 'index/api/ThirdParty_wx';
						axios.post(url, qs.stringify({
							token: '',
							binding: _self.banding,
							openid: _self.$store.state.usesData.openid,
							unionid: _self.$store.state.usesData.unionid,
							headimgurl: _self.$store.state.usesData.headimgurl,
							nickname: _self.$store.state.usesData.nickname,
							phone: _self.msg1,
							smscode: _self.msg2,
							password: _self.msg3,
							password_com: _self.msg4,
							country_code: '86',
							login_type: _self.$store.state.login_type,
						})).then(
							(res) => {
								if(res.data.type == 2){
									const toast = _self.$createToast({
										txt: '验证码错误！',
										type: 'error',
										time: 1000,
										mask: true,
									})
									toast.show()
								}else if(res.data.type == 10){
									const toast = _self.$createToast({
										txt: '绑定登录成功！',
										type: 'correct',
										time: 1000,
										mask: true,
										onTimeout: () => {   //回调
											localStorage.expire = res.data.expire_time;
											localStorage.token = res.data.token;
											_self.$store.dispatch("changeExpireTime",true);  //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
											if(_self.$store.state.GoBack){
												_self.$router.push(_self.$store.state.GoBack);
												_self.$store.dispatch("changeBack",null);
											}else{
												_self.$router.push("/Center");
											}
										}
									})
									toast.show()
								}else{
									const toast = _self.$createToast({
										txt: '服务器繁忙，请稍后重试！',
										type: 'error',
										time: 1500,
										mask: true,
										onTimeout: () => {   //回调
											this.$store.dispatch("changeUsesdata",'');
											this.$router.push('/AccountLogin');
										}
									})
									toast.show()
								}
							}
						)
					}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.wx_binding .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.wx_binding .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.wx_binding{
		margin-bottom: 1.2rem;
	}
	
	.wx_binding ul{
		margin-top: .9rem;
	}
	
	.wx_binding ul .logo{
		margin-bottom: .8rem;
	}
	
	.wx_binding ul .logo img{
		width: 4rem;
	}
	
	.wx_binding ul .tel,.wx_binding ul .psd{
		height: .9rem;
		margin: 0 .28rem;
		text-align: left;
		margin-bottom: .62rem;
		border-bottom: #b8b8b8 1px solid;
		position: relative;
	}
	
	.wx_binding ul .psds{
		margin-bottom: .42rem;
	}
	
	.wx_binding ul .psd .getMsg{
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
	
	.wx_binding ul .tel span,.wx_binding ul .psd span{
		position: absolute;
		left: 0;
		bottom: 5px;
		color: #e5000c;
		font-size: .4rem;
	}
	
	.wx_binding ul .tel input,.wx_binding ul .psd input{
		position: absolute;
		left: 35px;
		bottom: 0;
		height: .6rem;
		width: 88%;
	}
	
	.wx_binding ul .logining{
		height: .9rem;
		margin: 0 .28rem;
	}
	
	.wx_binding ul .logining button{
		height: 100%;
		width: 100%;
		background-color: #eaeaea;
		color: #fff;
		font-size: .36rem;
		font-weight: bold;
		border-radius: .1rem;
	}
	
	.wx_binding ul .logining .downs{
		background-color: #e5000c;
	}
	
	.wx_binding ul .logining .down{
		background-color: #e5000c;
	}
	
	.wx_binding ul .help{
		height: .7rem;
		margin: 0 .28rem;
		line-height: .7rem;
		display: flex;
		justify-content: space-between;
		color: #e5000c;
		font-size: .28rem;
	}
	
	.wx_binding .protocol{
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
