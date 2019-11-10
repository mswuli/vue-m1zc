<template>
	<div class="DetailTitle" v-if="DatailData.goodInfo">
		<div class="title">
			<h3>{{DatailData.goodInfo.in_paragraph + "款"}} {{DatailData.goodInfo.m_name}} {{DatailData.goodInfo.goods_name}} {{DatailData.goodInfo.displacement}} {{DatailData.goodInfo.fuel}}</h3>
			<div>
				<span>{{DatailData.goodInfo.cartype_value}}</span>
				<span>{{DatailData.goodInfo.carvarsion}}</span>
				<span>{{DatailData.goodInfo.car_seats + "座"}}</span>
				<span>{{DatailData.goodInfo.fine_drive}}</span>
				<span v-if="DatailData.goodInfo.vehicle_region == 0">东区</span>
				<span v-if="DatailData.goodInfo.vehicle_region == 1">南区</span>
				<span v-if="DatailData.goodInfo.vehicle_region == 2">西区</span>
				<span v-if="DatailData.goodInfo.vehicle_region == 3">北区</span>
				<span>{{DatailData.goodInfo.mark}}</span>
			</div>
		</div>
		
		<div class="money">
			<div>
				<h3>一站车售价<span  v-if="ishaoche" class="hanhaochetax">(含豪车税)</span></h3>
				<p>{{DatailData.goodInfo.shop_price}}<span>万</span></p>
			</div>
			<div v-show="DatailData.goodInfo.price != '0.00'">
				<h3>官方售价</h3>
				<p class="un">{{moneyAll(DatailData)}}<span>万</span></p>
			</div>
		</div>
		
		<div class="state">
			<div>
				<p>商品号</p>
				<p>{{DatailData.goodInfo.goods_sn}}</p>
			</div>
			<div>
				<p>销售区域</p>
				<p>{{DatailData.goodInfo.sales_areatext}}</p>
			</div>
			<div v-show="DatailData.attribute.status_time.stock_time != ''">
				<p>预估提车</p>
				<p>{{DatailData.attribute.status_time.stock_time}}</p>
			</div>
			<div v-show="DatailData.attribute.status_time.stock_time == ''">
				<p>车辆状态</p>
				<p>现车</p>
			</div>
			<div v-show="DatailData.attribute.status_time.procedure_time != ''">
				<p>预估手续齐全</p>
				<p>{{DatailData.attribute.status_time.procedure_time}}</p>
			</div>
			<div v-show="DatailData.attribute.status_time.procedure_time == ''">
				<p>手续状态</p>
				<p>齐全</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'DetailTitle',
		props: {
			DatailData: Object
		},
		data() {
			return {
				offPrice: 0,
				ishaoche:false
			}
		},
		methods: {
			moneyAll(msg) {
				const data = msg.attribute.conf
				let optionalTotal = 0;
				let  updateTotal = 0;
				
				for(let s in data.optional){
					optionalTotal += parseFloat(data.optional[s].price)
				}
				
				for(let m in data.update){
					updateTotal += parseFloat(data.update[m].price)
				}
				
				return (optionalTotal + updateTotal + parseFloat(msg.attribute.price.zong_price))/10000;
			},
			checkedhaoche(){
		
				if(this.DatailData.goodInfo.Price_type=="含豪车税价"){
					this.ishaoche=true;
				}
			
			}
			
		},
	
		watch: {
			DatailData:function(){
				this.checkedhaoche()
			}
		},

	}
</script>

<style scoped="scoped" lang="stylus">
	span.hanhaochetax{
		color:#e5000c;
		font-size:0.24rem;
	}
	.DetailTitle
		border-bottom .1rem solid #fff
		
	.title
		padding .2rem
	
	.title h3
		font-size .36rem
		font-weight 500
		text-align left
		line-height .48rem
	
	.title:after
		content:"."
		display:block
		height:0
		clear:both
		visibility:hidden
	
	.title div
		width 100%
		margin-top .1rem
	
	.title div span
		float left
		font-size .2rem
		border 1px solid #999
		border-radius 3px
		padding 2px 2px 0 2px
		margin-right .2rem
		
	.money
		width 100%
		height 1.28rem
		border-top 1px solid #eee
		border-bottom 1px solid #eee
	
	.money div
		float left
		width 50%
		height 100%
		box-sizing border-box
	
	.money div:first-child
		border-right 1px solid #eee
	
	.money div h3
		font-size .32rem
		margin-top .26rem
		
	.money div p
		font-size .36rem
		font-weight 500
		margin-top .16rem
		height .36rem
		color #e5000c
	
		span
			font-size .28rem
			
	.money div .un
		text-decoration line-through
	
	
	.state
		margin .24rem
		box-shadow 0 0 3px #ccc
		border-radius 5px
	
	.state:after
		content:"."
		display:block
		height:0
		clear:both
		visibility:hidden
	
	.state div
		float left
		width 25%
		height .95rem
		font-size .24rem
		
		p:first-child
			margin-top .24rem
			margin-bottom .1rem
</style>
