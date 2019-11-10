<template>
	<div class="LoginHeader">
		<div class="navGo">
			<span class="iconfont" @click="toMall">&#xe606;</span>
			<span class="msgLogin" @click="toMsg">短信登陆</span>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'LoginHeader',
		methods:{
			toMall(){
				if(this.$store.state.GoBack){
					this.$router.push(this.$store.state.GoBack);
					this.$store.dispatch("changeBack",null);
				}else{
					this.$router.push("/Center");
				}
			},
			toMsg(){
				this.$router.push("/AccountLoginMsg");
			},
			//返回调过来的页面
			setGoBack(){
				if(this.$route.query.redirect){
					this.$store.dispatch("changeBack",this.$route.query.redirect);
					const toast = this.$createToast({
						txt: '请登录后在进行操作！',
						type: 'warn',
						time: 1500,
						mask:true,
					}).show()
				}
			}
		},
		mounted(){
			this.setGoBack();
		}
	}
</script>

<style scoped="scoped">
	.LoginHeader {
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
	
	.LoginHeader .iconfont {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}
	
	.LoginHeader .msgLogin{
		position: absolute;
		height: .9rem;
		width: 1.7rem;
		text-align: center;
		line-height: .9rem;
		right: 0;
		top: 0;
	}
</style>
