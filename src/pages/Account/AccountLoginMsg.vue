<template>
	<div class="AccountLoginMsg">
		<msg-header></msg-header>
		<msg-login></msg-login>
		<login-sanfang></login-sanfang>
	</div>
</template>

<script>
	import MsgHeader from '@/pages/Account/components/MsgHeader'
	import MsgLogin from '@/pages/Account/components/MsgLogin'
	import LoginSanfang from '@/pages/Account/components/LoginSanfang'
	
	export default{
		name: 'AccountLoginMsg',
		components:{
			MsgHeader,
			MsgLogin,
			LoginSanfang
		}
	}
</script>

<style>
	
</style>
