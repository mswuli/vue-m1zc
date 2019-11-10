<template>
	<div class="CarInsurance">
		<div class="header">
			<span class="iconfont" @click="toCarAdmini">&#xe606;</span>
			保险详情
		</div>
		
		<div class="content" v-if="!false">
			<!-- 滚动组件 -->
			<div class="scroll-list-wrap">
				<cube-scroll ref="scroll" :options="options">
					
					<!-- <dl class="imgbox">
						<dt>
							<img :src="data.goods_img" alt="">
						</dt>
						<dd>
							<h3>{{data.in_paragraph + "款"}} {{data.brand_name}} {{data.m_name}} {{data.fine_name}} {{data.displacement}} {{data.fine_drive}} {{data.fuel}} {{data.car_seats + "座"}}</h3>
							<p>￥ {{data.total_amount | format_number}} 元</p>
						</dd>
					</dl> -->
					
					<ul class="list">
						<li>
							<p style="text-align: center;">商业险合计(中国人保)</p>
						
						</li>
					</ul>
					
					<div class="shngye">
						<ul>
							<li style="border-bottom: #eaeaea 1px solid;">
								<span>保障项目</span>
								<span>保额</span>
								<span>不计免赔特约险</span>
							</li>
							<li v-for="(item,index) in order_ins" :key="index">
								<span>{{item.ins_name}}</span>
								<span>{{item.coverage | format_number}}元</span>
								<span v-show="item.is_sdew == 0">未投保</span>
								<span v-show="item.is_sdew == 1">已投保</span>
							</li>
						</ul>
					</div>
					
					<ul class="list">
						<li>
							<p style="text-align: center;">车船税交强险(中国人保)</p>
						</li>
					</ul>
					
					<div class="shngye">
						<ul>
							<li style="border-bottom: #eaeaea 1px solid;">
								<span>保障项目</span>
								<span>保额</span>
								<span>不计免赔特约险</span>
							</li>
							<li v-for="(item,index) in order_tax" :key="index">
								<span>{{item.tax_name}}</span>
								<span>{{item.amount | format_number}}元</span>
								<span v-show="item.tax_status == 0">未生效</span>
								<span v-show="item.tax_status == 1">已生效</span>
							</li>
						</ul>
					</div>
					<p style="text-align: left;padding: 0 .3rem;font-size: .24rem; color: #999;word-break: break-all; line-height: .3rem;">车险报案所需材料: 被保险人身份证、 驾驶员《机动车辆驾驶证》、 被保险车辆《机动车辆行驶证》</p>
				</cube-scroll>
			</div>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'CarInsurance',
		data(){
			return{
				options: { //配置垂直滑动
					observeDOM: true,
					click: true,
					probeType: 1,
					scrollbar: false,
					pullDownRefresh: false,
					pullUpLoad: false
				},
				order_ins: [],
				order_tax: []
			}
		},
		methods: {
			toCarAdmini() {
				this.$router.push('/CarAdmini');
			},
			//获取保险数据
			getInsuranceInfo(){
				const url = this.$store.state.Yi + 'index/My/carinsurance';
				axios.post(url,qs.stringify({
					order_id: this.$route.query.oeder_id
				})).then(this.getInsuranceSuc)
			},
			getInsuranceSuc(res){
				console.log(res.data)
				this.order_ins = res.data.order_ins;
				this.order_tax = res.data.order_tax;
			}
		},
		mounted(){
			this.getInsuranceInfo()
		}
	}
</script>

<style scoped="scoped">
	.CarInsurance .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.CarInsurance .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.CarInsurance .content{
		position: fixed;
		top: .9rem;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.scroll-list-wrap {
		height: 100%;
	}
	
	.CarInsurance .content .logistics{
		height: 2rem;
		background: url('~@/assets/img/center/logistics.png') no-repeat;
		background-size: cover;
		overflow: hidden;
		text-align: left;
		color: #fff;
	}
	
	.CarInsurance .content .logistics h3{
		font-size: .32rem;
		padding-left: .3rem;
		margin-top: .6rem;
	}
	
	.CarInsurance .content .logistics p{
		font-size: .28rem;
		padding-left: .3rem;
		margin-top: .2rem;
	}
	
	.CarInsurance .content .jieche{
		border-top-left-radius: .2rem;
		border-top-right-radius: .2rem;
		background: #fff;
		margin-top: -.2rem;
		text-align: left;
		border-bottom: .1rem #e9e9e9 solid;
	}
	
	.CarInsurance .content .jieche p{
		height: .9rem;
		line-height: .9rem;
		text-indent: .2rem;
		position: relative;
	}
	
	.CarInsurance .content .jieche .wul{
		text-align: left;
		color: #1d4faa;
		border-bottom: #eaeaea 1px solid;
	}
	
	.CarInsurance .content .jieche .wul .iconfont{
		position: absolute;
		right: .2rem;
		line-height: .9rem;
		font-weight: 600;
		color: #333;
	}
	
	.CarInsurance .content .jieche .jec span{
		color: #666;
	}
	
	.CarInsurance .content .imgbox{
		height: 1.8rem;
		border-bottom: .1rem #e9e9e9 solid;
	}
	
	.CarInsurance .content .imgbox dt{
		float: left;
		height: 1.2rem;
		width: 24%;
		margin-top: .3rem;
		position: relative;
		margin-left: 3%;
	}
	
	.CarInsurance .content .imgbox dt img{
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		margin: auto;
	}
	
	.CarInsurance .content .imgbox dd{
		text-align: left;
		float: left;
		height: 1.2rem;
		width: 67%;
		margin-left: 3%;
		margin-top: .3rem;
	}
	
	.CarInsurance .content .imgbox dd h3{
		height: .8rem;
	}
	
	.CarInsurance .content .imgbox dd p{
		color: #e5000c;
		margin-top: .13rem;
	}
	
	.CarInsurance .content .list{
		
	}
	
	.CarInsurance .content .list li{
		/* padding: 0 .2rem; */
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
		line-height: .9rem;
		border-bottom: #eaeaea 1px solid;
		border-top: #eaeaea 1px solid;
		height: .9rem;
	}
	
	.CarInsurance .content .list li>span{
		color: #e5000c;
		font-size: .26rem;
	}
	
	.CarInsurance .content .list li>span span{
		color: #666;
		font-size: .26rem;
	}
	
	.CarInsurance .content .list li .dli{
		color: #999;
		font-size: .24rem;
	}
	
	.CarInsurance .content .shngye{
		/* background-color: #f0eff5; */
		padding: .3rem 0;
	}
	
	.CarInsurance .content .shngye ul{
		margin: 0 .3rem;
		border: #e5000c 1px solid;
		border-radius: .1rem;
		background-color: #fff;
	}
	
	.CarInsurance .content .shngye ul li{
		display: flex;
		height: .9rem;
		font-size: .24rem;
		align-items: center;
	}
	
	.CarInsurance .content .shngye ul li span{
		flex: 1;
	}
	
	.CarInsurance .content .shngye ul li span:first-child{
		flex: 1.4;
		text-align: left;
		margin-left: .2rem;
	}
	
	.CarInsurance .content .shngye .list{
		margin: 0 .3rem;
		border: #e5000c 1px solid;
		border-radius: .1rem;
		background-color: #fff;
		font-size: .26rem;
	}
	
	.CarInsurance .content .shngye .list p:first-child{
		text-align: left;
		height: .9rem;
		line-height: .9rem;
	}
	
	.CarInsurance .content .shngye .list p:first-child span{
		color: #666;
	}
	
	.CarInsurance .content .shngye .list p:last-child{
		text-align: right;
		height: .8rem;
		line-height: .8rem;
		padding-right: .2rem;
	}
	
	.CarInsurance .content .shngye .list p:last-child span{
		color: #e5000c;
	}
	
	.CarInsurance .content .total{
		padding: .3rem .2rem .2rem .2rem;
		display: flex;
		justify-content: space-between;
		color: #666;
	}
	
	.CarInsurance .content .drawup{
		padding: .1rem .2rem .4rem .2rem;
		display: flex;
		justify-content: space-between;
		font-size: .34rem;
	}
	
	.CarInsurance .content .drawup span:last-child{
		color: #e5000c;
	}
</style>
