<template>
	<div class="CenterUser" :class="{CenterUserLogin: login.ok}">
		<dl v-show="!login.ok">
			<dt @click="toAccountLogin"><img :src="require('@/assets/img/center/sprit.png')" alt=""></dt>
			<dd @click="toAccountLogin">
				<h3>登录</h3>
				<p>登录一站车，畅想更多体验</p>
			</dd>
		</dl>

		<dl v-show="login.ok" class="longin" v-if="login.data" @click="toUserMsg">
			<dt :style="backUrl"></dt>
			<dd>
				<h3>{{login.data.user.phone | fnNameTel}}</h3>
				<p>{{login.data.user.user_name}}</p>
				<span class="iconfont detail">&#xe65f;</span>
			</dd>
		</dl>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'CenterUser',
		data() {
			return {
				login: {ok: false,data: ""},
				backUrl: {backgroundImage: 'url(' + require('@/assets/img/center/sprit.png') + ')'},
			}
		},
		methods: {
			//登录
			toAccountLogin() {
				this.$router.push("/AccountLogin")
			},
			//修改用户信息
			toUserMsg(){
				this.$router.push("/UserMsg")
			},
			getLoginInfo() {
				if (localStorage.token) {
					const url = this.$store.state.Yi + 'index/My/index';
					axios.post(url, qs.stringify({
						token: localStorage.token
					})).then(
						(res) => {
							//console.log(res.data)
							if (res.data.error == "0") {
								this.login.ok = true;
								this.login.data = res.data.data;
								if(res.data.data.user.head_portrait == ""){
									this.backUrl = {backgroundImage: 'url(' + require('@/assets/img/center/sprit.png') + ')'}
								}else{
									this.backUrl = {backgroundImage: 'url(' + res.data.data.user.head_portrait + ')'}
								}
							}
						}
					)
				}else{
					this.login.ok = false;
				}
			}
		},
		mounted() {
			this.getLoginInfo();
		},
		filters: {
			fnNameTel(value) {
				var tel = value;
				tel = "" + tel;
				var tel1 = tel.substr(0, 3) + "****" + tel.substr(7);
				return tel1;
			}
		},
		activated(){
			this.getLoginInfo();
		}
	}
</script>

<style scoped="scoped">
	.CenterUser {
		height: 2.75rem;
		background-color: #fff;
		margin: .24rem;
		border-radius: .1rem;
	}

	.CenterUser dl {
		position: relative;
		display: flex;
		justify-content: inherit;
		align-items: center;
	}
	
	.CenterUser dl .detail{
		position: absolute;
		top: 1.04rem;
		right: .2rem;
		font-size: .5rem;
		font-weight: 600;
		color: rgba(255,255,255,.8);
	}

	.CenterUser dl dt {
		overflow: hidden;
		width: 1.2rem;
		height: 1.2rem;
		margin-top: .6rem;
		margin-left: .3rem;
		border-radius: 50%;
		border: #f0f0f0 .08rem solid;
	}

	.CenterUser dl dt img {
		width: 100%
	}

	.CenterUser dl dd {
		text-align: left;
		margin-left: .2rem;
	}

	.CenterUser dl dd h3 {
		margin-top: .6rem;
		font-size: .34rem;
		font-weight: 500;
	}

	.CenterUser dl dd p {
		margin-top: .2rem;
		font-size: .3rem;
	}

	.CenterUserLogin {
		color: #fff;
		background: linear-gradient(to right, #e96069, #e5010d);
	}

	.CenterUserLogin dl dt {
		/* border: rgba(255, 255, 255, .4) .08rem solid; */
		background: url('~@/assets/img/center/sprit.png') no-repeat center center;
		background-size: cover;
	}
</style>
