<template>
	<div class="Trolley">
		<trolley-header></trolley-header>
		<trolley-list @change="change"></trolley-list>
		<div v-if="datalist.length == 0">
			<img :src="require('@/assets/img/center/noshop.png')" alt="" style="width: 100%;">
		</div>
	</div>
</template>

<script>
	import TrolleyHeader from '@/pages/Trolley/components/TrolleyHeader'
	import TrolleyList from '@/pages/Trolley/components/TrolleyList'
	
	export default{
		name: 'Trolley',
		data(){
			return{
				datalist: [0]
			}
		},
		methods:{
			change(a){
				this.datalist = a;
			}
		},
		components: {
			TrolleyHeader,
			TrolleyList
		},
	}
</script>

<style scoped="scoped">
   
	.Trolley{
		background-color: #ffffff;
	}
	
</style>
