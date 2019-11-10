<template>
	<div class="LoginSanfang" v-show="!iswx">
		<h3>&nbsp;&nbsp;第三方账号登录</h3>
		<div style="margin-top: .4rem;">
			<span :class="{left: isapp}"><img :src="require('@/assets/img/account/qqbg.png')" alt="" @click="qqlogin"></span>
			<span v-show="isapp"><img :src="require('@/assets/img/account/wechatbg.png')" alt="" @click="weixinlogin"></span>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'LoginSanfang',
		data() {
			return {
				timeOut: '',
				iswx: false,
				isapp: false, //微信写好后填写到v-show里面
				aqq: null,
				auths: null,
				aweixin: null
			}
		},
		methods: {
			//判断是否为微信浏览器
			isweixin() {
				const ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					this.iswx = true;
					return true;
				} else {
					this.iswx = false;
					return false;
				}
			},
			//更新oauth服务
			updateServices() {
				let _self = this;
        mui.plusReady(function () {
          plus.oauth.getServices(function(services) {
          	_self.auths = services;
          	for (var i in services) {
          		if ('weixin' == services[i].id) {
          			_self.aweixin = services[i];
          		}
          	}
          	for (var i in services) {
          		if ('qq' == services[i].id) {
          			_self.aqq = services[i];
          		}
          	}
          	if(!localStorage.token){
          		_self.outlog();
          	}
          }, function(e) {
          	plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));
          });
        })
			},
			//拉起QQ客户端
			qqlogin() {
				let _self = this;
				if (window.plus) {
					_self.aqq.login(function(e) {
						_self.getUnionid(e.target.authResult, e.target.userInfo)
					}, function(e) {
						plus.nativeUI.alert("授权失败：" + JSON.stringify(e));
					});
				} else {
					window.location.href =
						'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101617606&redirect_uri=https%3A%2F%2Fm.1zhanche.com%2F%23%2Fqq_login%3F&state=STATE&display=mobile';
				}
			},
			// 微信授权登录
			weixinlogin() {
				let _self = this;
				if (window.plus) {
					_self.aweixin.login(function(e) {
						// _self.loginWeixin(e.target.userInfo);
            _self.authUserInfo();
					}, function(e) {
						plus.nativeUI.alert("授权失败：" + JSON.stringify(e));
					});
				} else {
					// window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc2cea0a106b90164&redirect_uri=http://www.1zhanche.com/index/account/wxlogin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect&display=mobile';
				}
			},
      // 微信需单独获取userInfo
      authUserInfo() {
        let _self = this;
        _self.aweixin.getUserInfo(function(e) {
          _self.loginWeixin(_self.aweixin.userInfo);
        }, function(e) {
          plus.nativeUI.alert("获取用户信息失败： "+JSON.stringify(e));
        });
      },
			// 注销登录
			outlog() {
				let _self = this;
				for (var i in _self.auths) {
					var s = _self.auths[i];
					if (s.authResult) {
						s.logout(function(e) {
							// plus.nativeUI.alert("注销登录认证成功!");
							console.log("注销成功!");
						}, function(e) {
							// plus.nativeUI.alert("注销登录认证失败: " + JSON.stringify(e));
							console.log("注销登录认证失败: " + JSON.stringify(e));
						});
					}
				}
			},
			// unionid获取
			getUnionid(data, userData) {
				const url = this.$store.state.QQtoken + 'oauth2.0/me';
				axios.get(url, {
					params: {
						access_token: data.access_token,
						unionid: "1"
					}
				}).then(
					(res) => {
						let userid = JSON.parse(res.data.replace('callback( ', '').replace(' );', ''));
						this.loginQQ(userid, userData, data)
					}
				)
			},
			//QQ登录判断用户是否绑定
			loginQQ(userid, userData, data) {
				let _self = this;
				const url = _self.$store.state.Yi + 'index/api/qq_loginapp';
				axios.post(url, qs.stringify({
					token: '0',
					accesstoken: data.access_token,
					openid: userid.openid,
					unionid: userid.unionid,
					userinfo: JSON.stringify(userData),
					login_type: this.$store.state.login_type,
				})).then(
					(res) => {
						console.log(res.data)
						if (res.data.type == 1) {
							const toast = _self.$createToast({
								txt: '登录成功！',
								type: 'correct',
								time: 1000,
								mask: true,
								onTimeout: () => { //回调
									localStorage.expire = res.data.expire_time;
									localStorage.token = res.data.token;
									_self.$store.dispatch("changeExpireTime", true); //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
									if (_self.$store.state.GoBack) {
										_self.$router.push(_self.$store.state.GoBack);
										_self.$store.dispatch("changeBack", null);
									} else {
										_self.$router.push("/Center");
									}
								}
							})
							toast.show()
						} else if (res.data.type == 8) {
							const toast = _self.$createToast({
								txt: '未绑定注册的QQ用户,跳转到绑定注册页！',
								type: 'error',
								time: 2000,
								mask: true,
								onTimeout: () => { //回调
									_self.$store.dispatch("changeUsesdata", userData)
									_self.$router.push({
										path: '/qq_binding',
										query: {
											accesstoken: userid.access_token,
											openid: userid.openid,
											unionid: userid.unionid,
											// user_data: encodeURIComponent(JSON.stringify(userData))
										}
									})
								}
							})
							toast.show()
						} else {
							const toast = _self.$createToast({
								txt: '服务器繁忙,请稍后重试！',
								type: 'error',
								time: 3000,
								mask: true,
								onTimeout: () => {
									if (_self.$store.state.GoBack) {
										_self.$router.push(_self.$store.state.GoBack);
										_self.$store.dispatch("changeBack", null);
									} else {
										_self.$router.push("/AccountLogin");
									}
								}
							})
							toast.show()
						}
					}
				)
			},
			// 微信判断是否绑定否则登录
			loginWeixin(userInfo) {
				let _self = this;
				const url = _self.$store.state.Yi + 'index/api/wx_loginapp';
				axios.post(url, qs.stringify({
					token: "0",
					headimgurl: userInfo.headimgurl,
					nickname: userInfo.nickname,
					unionid: userInfo.unionid,
					openid: userInfo.openid,
					login_type: this.$store.state.login_type,
				})).then(
					(res) => {
						console.log(res.data)
						if (res.data.type == 1) {
							const toast = _self.$createToast({
								txt: '登录成功！',
								type: 'correct',
								time: 1000,
								mask: true,
								onTimeout: () => { //回调
									localStorage.expire = res.data.expire_time;
									localStorage.token = res.data.token;
									_self.$store.dispatch("changeExpireTime", true); //这里是调用vuex里面actions里面的方法 改变登录状态 true 为登录 false 为注销
									if (_self.$store.state.GoBack) {
										_self.$router.push(_self.$store.state.GoBack);
										_self.$store.dispatch("changeBack", null);
									} else {
										_self.$router.push("/Center");
									}
								}
							})
							toast.show()
						} else if (res.data.type == 8) {
							const toast = _self.$createToast({
								txt: '未绑定注册的微信用户,跳转到绑定注册页！',
								type: 'error',
								time: 2000,
								mask: true,
								onTimeout: () => { //回调
									_self.$store.dispatch("changeUsesdata", userInfo)
									_self.$router.push({
										path: '/wx_binding',
									})
								}
							})
							toast.show()
						} else {
							const toast = _self.$createToast({
								txt: '服务器繁忙,请稍后重试！',
								type: 'error',
								time: 3000,
								mask: true,
								onTimeout: () => {
									if (_self.$store.state.GoBack) {
										_self.$router.push(_self.$store.state.GoBack);
										_self.$store.dispatch("changeBack", null);
									} else {
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
			this.isweixin();
			if (window.plus) {
				this.isapp = true;
				this.updateServices();
			}
		}
	}
</script>

<style scoped="scoped">
	.LoginSanfang {
		/* margin-top: 1.3rem; */
	}

	.LoginSanfang h3 {
		font-weight: 600;
	}

	.left {
		margin-right: 1rem;
	}
</style>
