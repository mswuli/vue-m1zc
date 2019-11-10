<template>
	<div class="AccountLogin">
		<login-header></login-header>
		<login></login>
		<login-sanfang></login-sanfang>
	</div>
</template>

<script>
	import LoginHeader from '@/pages/Account/components/LoginHeader'
	import Login from '@/pages/Account/components/Login'
	import LoginSanfang from '@/pages/Account/components/LoginSanfang'
	
	export default{
		name: 'AccountLogin',
		data(){
			return{
				
			}
		},
		components:{
			LoginHeader,
			Login,
			LoginSanfang
		}
	}
</script>

<style scoped="scoped">
</style>
