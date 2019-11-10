<template>
	<div class="MsgHeader">
		<strong><div class="navGo">
			<span class="iconfont" @click="toMall">&#xe606;</span>
			<span class="msgLogin" @click="toLogin">账号密码登录</span>
		</div></strong>
	</div>
</template>

<script>
	export default{
		name: 'MsgHeader',
		methods:{
			toMall(){
				if(this.$store.state.GoBack){
					this.$router.push(this.$store.state.GoBack);
					this.$store.dispatch("changeBack",null);
				}else{
					this.$router.push("/Center");
				}
			},
			
			toLogin(){
				this.$router.push("/AccountLogin");
			}
		}
	}
</script>

<style scoped="scoped">
	.MsgHeader {
		height: .9rem;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		font-size: .32rem;
		line-height: .9rem;
		text-align: center;
	}
	
	.MsgHeader .iconfont {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}
	
	.MsgHeader .msgLogin{
		position: absolute;
		height: .9rem;
		width: 2.3rem;
		text-align: center;
		line-height: .9rem;
		right: 0;
		top: 0;
	}
</style>
