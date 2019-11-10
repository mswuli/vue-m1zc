<template>
	<div class="OrderDetail">
		<div class="header">
			<span class="iconfont" @click="toOrderAll">&#xe606;</span>
			订单详情
			<span class="add iconfont" @click="kf">&#xe600;</span>
		</div>
		
		<div class="content">
			<!-- 滚动组件 -->
			<div class="scroll-list-wrap">
				<cube-scroll ref="scroll" :options="options">
					<div class="logistics" :style="{backgroundImage: 'url(' + require('@/assets/img/center/logistics.png') + ')'}">
						<h3 v-if="data.order_status == 2">
							订单已取消
						</h3>
						<h3 v-if="data.order_status == 3">
							订单已失效
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 0">
							待支付订金
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 0">
							待商家确认订单
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 0">
							订单已确认等待发货
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 1">
							汽车运输中
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 2">
							汽车已到达
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 3 && data.is_closed == 0">
							物流手续已寄出
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 3 && data.is_closed == 1">
							交易完成
							<span class="iconfont"></span>
						</h3>
						<h3 v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 2">
							因库存不足交易关闭
							<span class="iconfont"></span>
						</h3>
						
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 3 && data.is_closed == 0">暂无物流信息</p>
					</div>
					
					<div class="jieche">
						<p v-if="data.order_status == 2" class="wul">
							订单已取消
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 3" class="wul">
							订单已失效
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 0" class="wul">
							待支付订金
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 0" class="wul">
							待商家确认订单
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 0" class="wul">
							订单已确认等待发货
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 1" class="wul">
							汽车运输中
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 2" class="wul">
							汽车已到达
							<span class="iconfont"></span>
						</p>
						<p @click="getProcedureInfo(data.exp_log_info_id)" v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 3 && data.is_closed == 0" class="wul">
							查手续物流信息
							<span class="iconfont">&#xe65f;</span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 1 && data.status == 3 && data.is_closed == 1" class="wul">
							交易完成
							<span class="iconfont"></span>
						</p>
						<p v-if="data.order_status == 1 && data.pay_status == 1 && data.seller_confirm == 2" class="wul">
							因库存不足交易关闭
							<span class="iconfont"></span>
						</p>
						
						
						<p class="jec" v-if="data.receiver_tel">接车人：<span>{{data.receiver_contact_name}}</span> <span class="right">{{data.receiver_tel}}</span></p>
						<!-- <p class="jec">接车地址：<span class="right">蛇口港</span></p> -->
					</div>
					
					<dl class="imgbox">
						<dt>
							<img :src="data.goods_img" alt="">
						</dt>
						<dd>
							<h3>{{data.in_paragraph + "款"}} {{data.brand_name}} {{data.m_name}} {{data.fine_name}} {{data.displacement}} {{data.fine_drive}} {{data.fuel}} {{data.car_seats + "座"}}</h3>
							<p>￥ {{data.total_amount | format_number}} 元</p>
						</dd>
					</dl>
					
					<ul class="list">
						<li v-if="data.freight_fee">
							<p v-if="data.vehicle_region == 0">运费：<span class="dli">从 东区 到 {{data.destination}}</span></p>
							<p v-if="data.vehicle_region == 1">运费：<span class="dli">从 南区 到 {{data.destination}}</span></p>
							<p v-if="data.vehicle_region == 2">运费：<span class="dli">从 西区 到 {{data.destination}}</span></p>
							<p v-if="data.vehicle_region == 3">运费：<span class="dli">从 北区 到 {{data.destination}}</span></p>
							<span>￥{{data.freight_fee | format_number}} 元</span>
						</li>
						<li v-if="data.gua_price">
							<p>质保：<span class="dli">整车质保 3年6万公里</span></p>
							<span>￥{{data.gua_price | format_number}} 元</span>
						</li>
						<li v-if="data.ins_amount" @click="totalshow()">
							<p>商业险合计</p>
							<span>￥{{data.ins_amount | format_number}} 元 
								<span class="iconfont" v-show="!total">&#xe65f;</span>
								<span class="iconfont" v-show="total">&#xe65e;</span>
							</span>
						</li>
					</ul>
					
					<div class="shngye" v-show="total" v-if="data.ins_amount">
						<ul>
							<li style="border-bottom: #eaeaea 1px solid;">
								<span>保障项目</span>
								<span>保额</span>
								<span>一站车保费</span>
							</li>
							<li v-for="(item,index) in sahngye" :key="index">
								<span>{{item.ins_name}}</span>
								<span>{{item.coverage | format_number}}元</span>
								<span>{{item.amount | format_number}}元</span>
							</li>
						</ul>
					</div>
					
					<ul class="list">
						<li v-if="data.comp_amount">
							<p>交强险</p>
							<span>￥{{data.comp_amount | format_number}} 元</span>
						</li>
						<li v-if="data.veh_amount">
							<p>车船税</p>
							<span>￥{{data.veh_amount | format_number}} 元</span>
						</li>
						<li @click="payshow">
							<p>付款方式：</p>
							<span>订金 + 尾款购车 
								<span class="iconfont" v-show="!pay">&#xe65f;</span>
								<span class="iconfont" v-show="pay">&#xe65e;</span>
							</span>
						</li>
					</ul>
					
					<div class="shngye" v-show="pay">
						<div class="list">
							<p style="border-bottom: #eaeaea 1px solid;margin: 0 .2rem;">
								<span>订金 + 尾款购车：</span>
								100%支付全款
							</p>
							<p>
								订金:<span>￥ {{data.order_amount | format_number}}</span> 元 + 尾款:<span>￥ {{finalPayment | format_number}}</span> 元
							</p>
						</div>
					</div>
					
					<p class="total">
						<span>总金额：</span>
						<span>{{data.total_amount | format_number}}元</span>
					</p>
					<h3 class="drawup" v-if="data.order_amount && data.pay_status == 0">
						<span>应付订金：</span>
						<span>{{data.order_amount | format_number}}元</span>
					</h3>
					<h3 class="drawup" v-if="data.remaining_amount && data.pay_status == 1">
						<span>应付尾款：</span>
						<span>{{data.remaining_amount | format_number}}元</span>
					</h3>
			
				</cube-scroll>
			</div>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'OrderDetail',
		data(){
			return{
				data: {},
				sahngye: [],
				finalPayment: "",
				total: true,
				pay: true,
				options: { //配置垂直滑动
					observeDOM: true,
					click: true,
					probeType: 1,
					scrollbar: false,
					pullDownRefresh: false,
					pullUpLoad: false
				},
			}
		},
		methods:{
			//返回
			toOrderAll(){
				this.$router.push({
					path: '/OrderAll',
					query: {
						current: this.$route.query.current
					}
				})
			},
			//展开商业险合计
			totalshow(){
				this.total = !this.total;
			},
			//展开付款方式
			payshow(){
				this.pay = !this.pay;
			},
			//商业险合计
			dataList(id,sn){
				const url = this.$store.state.Yi + 'index/My/xiangxi';
				axios.post(url,qs.stringify({
					order_sn: sn,
					order_id: id,
					tag: 2
				})).then(
					(res) => {
						//console.log(res.data.data.bool)
						this.sahngye = res.data.data.bool;
					}
				)
			},
			// 请求数据
			getdataInfo(){
				if(localStorage.token){
					const url = this.$store.state.Yi + 'index/My/wuliuzhengche';
					axios.post(url,qs.stringify({
						token: localStorage.token,
						goodsid: this.$route.query.order_id
					})).then(this.getdataSuc)
				}
			},
			getdataSuc(res){
				console.log(res.data)
				this.data = res.data;
				this.finalPayment = parseFloat(res.data.total_amount) - parseFloat(res.data.order_amount);
				this.dataList(res.data.order_id,res.data.order_sn)
			},
			
			//手续物流信息
			getProcedureInfo(a){
				if(a == 0){
					const toast = this.$createToast({
						txt: '暂无物流信息！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
				}else{
					this.$router.push({
						path: '/LogisticsDetail',
						query: {
							exp_log_info_id: a,
							order_id: this.$route.query.order_id,
							current: this.$route.query.current
						}
					})
				}
			},
			//客服
			kf() {
				let isSdkReady = false;
				ysf('onready', function() {
					isSdkReady = true;
				})
				if (isSdkReady) {
					ysf('open');
					// location.href = ysf('url');
				} else {
					// 仅做参考
					alert('sdk尚未加载成功，请稍后再试');
				}
			},
			kel(w, d, n, a, j) {
				w[n] = w[n] || function() {
					return (w[n].a = w[n].a || []).push(arguments)
				};
				j = d.createElement('script');
				j.async = true;
				j.src = 'https://qiyukf.com/script/45195e7baee6ad8be789aa9b829aa568.js?hidden=1';
				d.body.appendChild(j);
			}
		},
		mounted() {
			this.getdataInfo();
			this.kel(window, document, 'ysf');
		}
	}
</script>

<style scoped="scoped">
	.OrderDetail .header{
		height: .9rem;
		line-height: .9rem;
		position: fixed;
		font-size: .32rem;
		background-color: #fff;
		width: 100%;
	}
	
	.OrderDetail .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.OrderDetail .header .add{
		position: absolute;
		left: auto;
		right: .1rem;
		height: .9rem;
		line-height: .9rem;
	}
	
	.OrderDetail .content{
		position: fixed;
		top: .9rem;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.scroll-list-wrap {
		height: 100%;
	}
	
	.OrderDetail .content .logistics{
		height: 2rem;
		/* background: url('~@/assets/img/center/logistics.png') no-repeat; */
		background-repeat: no-repeat;
		background-size: cover;
		overflow: hidden;
		text-align: left;
		color: #fff;
	}
	
	.OrderDetail .content .logistics h3{
		font-size: .32rem;
		padding-left: .3rem;
		margin-top: .6rem;
	}
	
	.OrderDetail .content .logistics p{
		font-size: .28rem;
		padding-left: .3rem;
		margin-top: .2rem;
	}
	
	.OrderDetail .content .jieche{
		border-top-left-radius: .2rem;
		border-top-right-radius: .2rem;
		background: #fff;
		margin-top: -.2rem;
		text-align: left;
		border-bottom: .1rem #e9e9e9 solid;
	}
	
	.OrderDetail .content .jieche p{
		height: .9rem;
		line-height: .9rem;
		text-indent: .2rem;
		position: relative;
	}
	
	.OrderDetail .content .jieche .wul{
		text-align: left;
		color: #1d4faa;
		border-bottom: #eaeaea 1px solid;
	}
	
	.OrderDetail .content .jieche .wul .iconfont{
		position: absolute;
		right: .2rem;
		line-height: .9rem;
		font-weight: 600;
		color: #333;
	}
	
	.OrderDetail .content .jieche .jec span{
		color: #666;
	}
	
	.OrderDetail .content .imgbox{
		height: 1.8rem;
		border-bottom: .1rem #e9e9e9 solid;
	}
	
	.OrderDetail .content .imgbox dt{
		float: left;
		height: 1.2rem;
		width: 24%;
		margin-top: .3rem;
		position: relative;
		margin-left: 3%;
	}
	
	.OrderDetail .content .imgbox dt img{
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		margin: auto;
	}
	
	.OrderDetail .content .imgbox dd{
		text-align: left;
		float: left;
		height: 1.2rem;
		width: 67%;
		margin-left: 3%;
		margin-top: .3rem;
	}
	
	.OrderDetail .content .imgbox dd h3{
		height: .8rem;
	}
	
	.OrderDetail .content .imgbox dd p{
		color: #e5000c;
		margin-top: .13rem;
	}
	
	.OrderDetail .content .list{
		
	}
	
	.OrderDetail .content .list li{
		padding: 0 .2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: #eaeaea 1px solid;
		height: .9rem;
	}
	
	.OrderDetail .content .list li>span{
		color: #e5000c;
		font-size: .26rem;
	}
	
	.OrderDetail .content .list li>span span{
		color: #666;
		font-size: .26rem;
	}
	
	.OrderDetail .content .list li .dli{
		color: #999;
		font-size: .24rem;
	}
	
	.OrderDetail .content .shngye{
		background-color: #f0eff5;
		padding: .3rem 0;
	}
	
	.OrderDetail .content .shngye ul{
		margin: 0 .3rem;
		border: #e5000c 1px solid;
		border-radius: .1rem;
		background-color: #fff;
	}
	
	.OrderDetail .content .shngye ul li{
		display: flex;
		height: .9rem;
		font-size: .24rem;
		align-items: center;
	}
	
	.OrderDetail .content .shngye ul li span{
		flex: 1;
	}
	
	.OrderDetail .content .shngye ul li span:first-child{
		flex: 1.4;
		text-align: left;
		margin-left: .2rem;
	}
	
	.OrderDetail .content .shngye .list{
		margin: 0 .3rem;
		border: #e5000c 1px solid;
		border-radius: .1rem;
		background-color: #fff;
		font-size: .26rem;
	}
	
	.OrderDetail .content .shngye .list p:first-child{
		text-align: left;
		height: .9rem;
		line-height: .9rem;
	}
	
	.OrderDetail .content .shngye .list p:first-child span{
		color: #666;
	}
	
	.OrderDetail .content .shngye .list p:last-child{
		text-align: right;
		height: .8rem;
		line-height: .8rem;
		padding-right: .2rem;
	}
	
	.OrderDetail .content .shngye .list p:last-child span{
		color: #e5000c;
	}
	
	.OrderDetail .content .total{
		padding: .3rem .2rem .2rem .2rem;
		display: flex;
		justify-content: space-between;
		color: #666;
	}
	
	.OrderDetail .content .drawup{
		padding: .1rem .2rem .4rem .2rem;
		display: flex;
		justify-content: space-between;
		font-size: .34rem;
	}
	
	.OrderDetail .content .drawup span:last-child{
		color: #e5000c;
	}
</style>
