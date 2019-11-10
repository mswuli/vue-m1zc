<template>
	<div class="OrderIns">
		<ins-list :canobj="canobj"></ins-list>
		<ins-nav :canobj="canobj"></ins-nav>
	</div>
</template>

<script>
	
	import InsList from '@/pages/Order/components/InsList'
	import InsNav from '@/pages/Order/components/InsNav'
	
	
	export default{
		name: 'OrderIns',
		components:{
			InsList,
			InsNav
		},
        data() {
            return {
              haszhibao:0,
              ozhijia:0,
              canobj:{}
            };
       },
       methods:{
           setcanshu(){
               this.canobj.goods_id=this.$route.query.goods_id;
               this.canobj.cart_id=this.$route.query.cart_id;
           },
           
       },
       mounted(){
           this.setcanshu();
       },
	}
	
</script>

<style scoped="scoped">
	
</style>