<template>
	<div class="qq_login"></div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'qq_login',
		data(){
			return{
				code: '',
				userData: {}
			}
		},
		methods: {
			qqlogin() {
				let _self = this;
				let code = '';
				let str = location.href; //取得整个地址栏
				let num = str.indexOf("?");
				str = str.substr(num + 1); //取得所有参数
				let arr = str.split("&"); //各个参数放到数组里
				for (let i = 0; i < arr.length; i++) {
					if(arr[i].indexOf('code') != -1){
						_self.code = arr[i].split('=')[1];
						break
					}else{
						_self.code = '';
					}
				}
				
				if(_self.code){
					let url = _self.$store.state.QQtoken + 'oauth2.0/token';
					axios.get(url,{
						params: {
							grant_type: 'authorization_code',
							client_id: '101617606',
							client_secret: '3cc7fee5211a5d8fc66142882f44743c',
							code: _self.code,
							redirect_uri: 'https://m.1zhanche.com/#/qq_login'
						}
					}).then(
						(res) => {
							let url = res.data;
							if(res.data.indexOf('callback') == -1){
								url = url.split('&')
								_self.userData.access_token = url[0].split('=')[1];
								_self.userData.expires_in = url[1].split('=')[1];
								_self.userData.refresh_token = url[2].split('=')[1];
								_self.userOpenid(_self.userData.access_token);
							}else{
								const toast = _self.$createToast({
									txt: '服务器繁忙,3秒后返回登录页！',
									type: 'error',
									time: 3000,
									mask: true,
									onTimeout: () => {
										if(_self.$store.state.GoBack){
											_self.$router.push(_self.$store.state.GoBack);
											_self.$store.dispatch("changeBack",null);
										}else{
											_self.$router.push("/AccountLogin");
										}
									}
								})
								toast.show()
							}
						}
					)
				}else{
					const toast = _self.$createToast({
						txt: '服务器繁忙,3秒后返回登录页！',
						type: 'error',
						time: 3000,
						mask: true,
						onTimeout: () => {
							if(_self.$store.state.GoBack){
								_self.$router.push(_self.$store.state.GoBack);
								_self.$store.dispatch("changeBack",null);
							}else{
								_self.$router.push("/AccountLogin");
							}
						}
					})
					toast.show()
				}
			},
			userOpenid(token){
				const url = this.$store.state.QQtoken + 'oauth2.0/me';
				axios.get(url,{
					params: {
						access_token: token,
						unionid: "1"
					}
				}).then(
					(res) => {
						let url = res.data;
						this.userData.openid = JSON.parse(url.replace('callback( ','').replace(' );',''));
						this.login(this.userData);
					}
				)
			},
			login(data){
				let _self = this;
				const url = _self.$store.state.Yi + 'index/api/qq_login';
				axios.post(url, qs.stringify({
					token: '0',
					accesstoken: _self.userData.access_token,
					openid: _self.userData.openid.openid,
				})).then(
					(res) => {
						//console.log(res.data)
						if(res.data.type == 1){
							const toast = _self.$createToast({
								txt: '登录成功！',
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
						}else if(res.data.type == 8){
							const toast = _self.$createToast({
								txt: '未绑定注册的QQ用户,跳转到绑定注册页！',
								type: 'error',
								time: 2000,
								mask: true,
								onTimeout: () => {   //回调
									_self.$store.dispatch("changeUsesdata", res.data.user_data)
									_self.$router.push({
										path: '/qq_binding',
										query: {
											accesstoken: _self.userData.access_token,
											openid: _self.userData.openid.openid,
											unionid: _self.userData.openid.unionid,
											// user_data: encodeURIComponent(JSON.stringify(res.data.user_data))
										}
									})
								}
							})
							toast.show()
						}else{
							const toast = _self.$createToast({
								txt: '服务器繁忙,3秒后返回登录页！',
								type: 'error',
								time: 3000,
								mask: true,
								onTimeout: () => {
									if(_self.$store.state.GoBack){
										_self.$router.push(_self.$store.state.GoBack);
										_self.$store.dispatch("changeBack",null);
									}else{
										_self.$router.push("/AccountLogin");
									}
								}
							})
							toast.show()
						}
					}
				)
			}
		},
		mounted() {
			this.qqlogin()
		}
	}
</script>

<style scoped="scoped">
	.qq_login {
		height: 2rem;
		line-height: 2rem;
		margin: auto;
		font-size: .32rem;
	}
</style>
