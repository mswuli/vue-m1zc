<template>
	<div class="AccountReg">
		<reg-header></reg-header>
		<reg></reg>
		<!-- <login-sanfang></login-sanfang> -->
	</div>
</template>

<script>
	import RegHeader from '@/pages/Account/components/RegHeader'
	import Reg from '@/pages/Account/components/Reg'
	import LoginSanfang from '@/pages/Account/components/LoginSanfang'
	
	
	export default{
		name: 'AccountReg',
		components:{
			RegHeader,
			Reg,
			LoginSanfang
		}
	}
</script>

<style>
</style>
