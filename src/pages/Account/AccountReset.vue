<template>
	<div class="AccountReset">
		<reset-header></reset-header>
		<reset></reset>
	</div>
</template>

<script>
	import ResetHeader from '@/pages/Account/components/ResetHeader'
	import Reset from '@/pages/Account/components/Reset'
	
	export default{
		name: 'AccountReset',
		components: {
			ResetHeader,
			Reset
		}
	}
</script>

<style scoped="scoped">
</style>
