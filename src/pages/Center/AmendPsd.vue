<template>
	<div class="AmendPsd">
		<div class="header">
			<span class="iconfont" @click="toAccountSafety">&#xe606;</span>
			修改密码
			<span class="add" @click="getAmendPsdInfo">完成</span>
		</div>
		
		<div class="content">
			<ul>
				<li>
					<span>旧密码：</span>
					<input type="password" placeholder="请输入旧密码" v-model="msg1">
				</li>
				<li>
					<span>新密码：</span>
					<input type="password" placeholder="请输入新密码" v-model="msg2">
				</li>
				<li>
					<span>确认新密码：</span>
					<input type="password" placeholder="再次输入新密码" v-model="msg3">
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'AmendPsd',
		data(){
			return{
				msg1: "",
				msg2: "",
				msg3: ""
			}
		},
		methods:{
			//返回个人中心
			toAccountSafety(){
				this.$router.push('/AccountSafety');
			},
			//验证数据
			psd(p){
				if(p.length == 0){
					const toast = this.$createToast({
						txt: '请输入旧密码！',
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
			//修改密码
			getAmendPsdInfo(){
				if( this.psd(this.msg1) && this.psd1(this.msg2) && this.psd2(this.msg2,this.msg3) ){
					if(localStorage.token){
						const url = this.$store.state.Yi + 'index/My/chPassword';
						axios.post(url,qs.stringify({
							token: localStorage.token,
							old_password: this.msg1,
							password: this.msg2,
							password_confirm: this.msg3
						})).then(
							(res) => {
								if(res.data.error == 0){
									const toast = this.$createToast({
										txt: '密码修改成功！',
										type: 'correct',
										time: 1500,
										mask: true,
										onTimeout: () => {   //回调
											this.$router.push('/AccountSafety');
										}
									})
									toast.show();
								}else if(res.data.error == 1){
									const toast = this.$createToast({
										txt: '旧密码错误！',
										type: 'error',
										time: 1500,
										mask: true
									})
									toast.show();
								}else{
									const toast = this.$createToast({
										txt: '未知错误！',
										type: 'error',
										time: 1500,
										mask: true
									})
									toast.show();
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
	.AmendPsd .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.AmendPsd .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.AmendPsd .header .add{
		position: absolute;
		right: .2rem;
		height: .9rem;
		line-height: .9rem;
		color: #e5000c;
	}
	
	.AmendPsd .content ul{
		margin: 0 .2rem;
	}
	
	.AmendPsd .content ul li{
		display: flex;
		height: 1rem;
		line-height: 1rem;
		text-align: left;
		border-bottom: #eaeaea 1px solid;
	}
	
	.AmendPsd .content ul li span{
		flex: 1.5;
	}
	
	.AmendPsd .content ul li input{
		flex: 3;
	}
	
	.AmendPsd .content ul li input::-webkit-input-placeholder{
		color: #8e9bb1;
		font-size: .24rem;
	}
	
</style>
