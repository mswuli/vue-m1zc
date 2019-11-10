<template>
	<div class="OrderSite">
		<div class="siteList">
			<h3>提车地点   <span @click="showSite"> <span class="iconfont" v-show="show">&#xe65e;</span><span class="iconfont" v-show="!show">&#xe65f;</span></span></h3>
			
			<div class="site" v-show="show">
				<div class="AD">
					<span :class="{active: active == 1}" @click="siteSelect(1)">深圳体验店</span>
					<span :class="{active: active == 2}" @click="siteSelect(2)">天津分部</span>
					<span :class="{active: active == 3}" @click="siteSelect(3);showAddressPicker()">送车上门</span>
				</div>
				<p>提车地点：<span>{{site}}</span></p>
				<h3>运费 + 保费：￥ <span>{{money}}</span>元</h3>
			</div>
		</div>
		
		<div class="list">
			<p><span>商品金额：</span><span>234,446元</span></p>
			<p><span>运费 + 保费：</span><span>{{money}}元</span></p>
			<h3><span>总计：</span><span style="color: #e5000c">249,892元</span></h3>
		</div>
		
	</div>
</template>

<script>
	import data from '@/assets/js/provincesData'
	
	const provinces = [];
	const city = [];
	
	for(let i in data.GP){
		provinces.push({
			value: data.GP[i],
			text: data.GP[i],
			children: []
			})
	}
	
	for(let n in data.GT){
		for(let j in data.GT[n]){
			provinces[n].children.push({
				value: data.GT[n][j],
				text: data.GT[n][j],
			})
		}
	}
	
	export default{
		name: 'OrderSite',
		data(){
			return{
				show: true,
				site: "",
				active: 0,
				money: "15,446"
			}
		},
		methods:{
			showSite(){
				this.show = !this.show
			},
			
			siteSelect(a){
				this.active = a;
				if(a == 1) this.site = "深圳体验店提车";
				if(a == 2) this.site = "天津分部提车";
			},
			
			showAddressPicker() {
				this.addressPicker.show()
			},
			//点击确定后触发
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.site = selectedVal.join('');
				// this.$createDialog({
				// 	type: 'warn',
				// 	content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
				// 	icon: 'cubeic-alert'
				// }).show()
			},
			//点击取消后触发
			cancelHandle() {
				this.active = 0;
				// this.$createToast({
				// 	type: 'correct',
				// 	txt: 'Picker canceled',
				// 	time: 1000
				// }).show()
			}
		},
		mounted() {
			this.addressPicker = this.$createCascadePicker({
				title: '选择城市',  //自定义标题
				data: provinces,
				swipeTime: 2000,
				// maskClosable: false,
				onSelect: this.selectHandle,
				onCancel: this.cancelHandle
			})
		}
	}
</script>

<style scoped="scoped">
	.OrderSite>.siteList{
		border-bottom: .1rem solid #f5f5f5;
	}
	
	.OrderSite>.siteList>h3{
		padding: .24rem;
		text-align: left;
		font-size: .3rem;
		display: flex;
		justify-content: space-between;
	}
	
	.OrderSite .siteList h3 span{
		color: #666;
	}
	
	.OrderSite .siteList .site{
		margin: .24rem;
		background-color: #fef7f7;
		padding: .24rem;
		margin-top: .2rem;
	}
	
	.OrderSite .siteList .site>.AD{
		display: flex;
		justify-content: space-between;
	}
	
	.OrderSite .siteList .site .AD span{
		border: #e5000c 1px solid;
		border-radius: 3px;
		color: #e5000c;
		padding: .16rem;
		font-size: .32rem;
		background-color: #fff;
	}
	
	.OrderSite .siteList .site .AD .active{
		color: #fff;
		background-color: #e5000c;
	}
	
	.OrderSite .siteList .site p{
		color: #666;
		font-size: .3rem;
		text-align: left;
		margin-top: .26rem;
	}
	
	.OrderSite .siteList .site h3{
		margin-top: .4rem;
		margin-bottom: .9rem;
		color: #e5000c;
		font-size: .34rem;
		font-weight: 600;
	}
	
	.OrderSite .siteList .site h3 span{
		color: #e5000c;
		font-weight: 600;
	}
	
	.list{
		padding: .24rem;
		margin-bottom: 1.1rem;
	}
	
	.list p,.list h3{
		display: flex;
		justify-content: space-between;
	}
	
	.list p{
		margin-bottom: .36rem;
		color: #666;
	}
	
	.list h3 span{
		font-size: .34rem;
		font-weight: 600;
	}
</style>
