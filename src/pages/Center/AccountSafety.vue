<template>
	<div class="AccountSafety">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			账户安全管理
		</div>
		
		<div class="content">
			<ul>
				<li class="list">
					<span>安全等级：</span>
					<span><img :src="require('@/assets/img/center/gaodeng.png')" alt="" width="110">&nbsp;&nbsp;高</span>
				</li>
				<li class="list">
					<span>账户信息：</span>
					<span>{{data.phone}}</span>
				</li>
				<!-- <li class="list">
					<span>绑定邮箱：</span>
					<span class="iconfont">&#xe65f;</span>
				</li> -->
				<li class="limit">
					<div class="con">
						<p>登录密码：</p>
						<p>安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，长度超过6位的密码</p>
					</div>
					<div class="but" @click="toAmendPsd">
						修改<span class="iconfont">&#xe65f;</span>
					</div>
				</li>
				<!-- <li class="limit">
					<div class="con">
						<p>绑定邮箱：</p>
						<p>绑定邮箱后，您可以享受1站车丰富的邮箱服务，如邮箱找回密码等</p>
					</div>
					<div class="but">
						绑定<span class="iconfont">&#xe65f;</span>
					</div>
				</li> -->
				<!-- <li class="limit">
					<div class="con">
						<p>第三方账号：</p>
						<p>绑定第三方账号，您即可享受三方账号登录</p>
					</div>
					<div class="but">
						查看<span class="iconfont">&#xe65f;</span>
					</div>
				</li> -->
				<li class="logout" @click="logout">
					<span>退出登录</span>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'AccountSafety',
		data(){
			return{
				data: ""
			}
		},
		methods: {
			//回到个人中心
			toCenter(){
				this.$router.push('/Center');
			},
			//修改密码
			toAmendPsd(){
				this.$router.push('/AmendPsd');
			},
			//退出登录
			logout(){
				let _self = this;
				_self.$createToast({
					txt: '已注销登录！',
					type: '',
					time: 1500,
					mask: true,
					onTimeout: () => {   //回调
						localStorage.removeItem('token');
						this.$store.dispatch("changeExpireTime",false);
						this.$router.push('/Center');
					}
				}).show()
			},
			//获取用户数据
			getUserInfo(){
				if(localStorage.token){
					const url = this.$store.state.Yi + 'index/My/zhsafemanger';
					axios.post(url,qs.stringify({
						token: localStorage.token
					})).then(this.getUserSuc)
				}
			},
			getUserSuc(res){
				this.data = res.data.data.bool;
			}
		},
		mounted() {
			this.getUserInfo();
		}
	}
</script>

<style scoped="scoped">
	.AccountSafety .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.AccountSafety .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.AccountSafety .content ul{
		margin: 0 .2rem;
		text-align: left;
	}
	
	.AccountSafety .content ul li{
		font-size: .28rem;
		border-bottom: #ececec 1px solid;
	}
	
	.AccountSafety .content ul .list{
		height: 1rem;
		line-height: 1rem;
	}
	
	.AccountSafety .content ul .logout{
		text-align: center;
		height: .8rem;
		line-height: .8rem;
		border-bottom: none;
		background-color: #e5000c;
		color: #fff;
		font-size: .36rem;
		border-radius: .1rem;
		margin-top: .2rem;
	}
	
	.AccountSafety .content ul .limit{
		height: 2rem;
		display: flex;
	}
	
	.AccountSafety .content ul .limit .con{
		flex: 3;
	}
	
	.AccountSafety .content ul .limit .con p:first-child{
		margin-top: .45rem;
	}
	
	.AccountSafety .content ul .limit .con p:last-child{
		font-size: .24rem;
		color: #8e9bb1;
		margin-top: .15rem;
	}
	
	.AccountSafety .content ul .limit .but{
		flex: 1;
		line-height: 2rem;
		text-align: right;
	}
</style>
