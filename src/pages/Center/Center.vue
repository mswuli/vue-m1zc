<template>
	<div class="Center">
		<div style="height: 1px;"></div>
		<center-user></center-user>
		<center-order></center-order>
		<!-- <center-msg></center-msg> -->
		<center-car></center-car>
		<center-setting></center-setting>
	</div>
</template>

<script>
	import CenterUser from '@/pages/Center/components/CenterUser'
	import CenterOrder from '@/pages/Center/components/CenterOrder'
	import CenterMsg from '@/pages/Center/components/CenterMsg'
	import CenterCar from '@/pages/Center/components/CenterCar'
	import CenterSetting from '@/pages/Center/components/CenterSetting'
	
	export default{
		name:'Center',
		components: {
			CenterUser,
			CenterOrder,
			CenterMsg,
			CenterCar,
			CenterSetting
		}
	}
</script>

<style scoped="scoped">
	.Center{
		padding-bottom: 1.1rem;
		background-color: #f8f8f8;
	}
</style>
