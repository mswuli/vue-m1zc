<template>
	<div class="ArticlesDetail">
		<detail-header :tit="tit"></detail-header>
		<detail-content @change="title"></detail-content>
	</div>
</template>

<script>
	import DetailHeader from '@/pages/Articles/components/DetailHeader'
	import DetailContent from '@/pages/Articles/components/DetailContent'
	
	export default{
		name: 'ArticlesDetail',
		data(){
			return {
				tit: ""
			}
		},
		methods:{
			title(msg){
				this.tit = msg;
			}
		},
		components:{
			DetailHeader,
			DetailContent
		},
	}
</script>

<style scoped="scoped">
</style>
