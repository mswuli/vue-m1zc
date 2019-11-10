<template>
	<div class="OrderAll">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			订单中心
		</div>

		<div class="content">
			<!-- 导航条组件 -->
			<cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler" />
			<!-- 轮播组件 -->
			<cube-slide ref="slide" :loop="false" :initial-index="index" :showDots="false" :auto-play="false" @change="changePage"
			 :speed="10" :threshold="0.1">
				<!-- 全部订单 -->
				<cube-slide-item>
					<!-- 滚动组件 -->
					<div class="scroll-list-wrap">
						<cube-scroll ref="scroll" :options="options">
							<!-- 没有订单 -->
							<div class="imgload" v-if="order.length == 0">
								<img :src="require('@/assets/img/center/noorder.png')" alt="" style="width: 100%;">
							</div>

							<!-- 接单 -->
							<div class="orderall" v-for="(item,index) in order" :key="index" v-if="item.order_status == 1">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">待支付定金</span>
										<span v-show="item.seller_confirm == 0 && item.pay_status == 1">订单确认中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 0">等待发车</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 1">汽车运输中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 2">汽车已到达</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 0">汽车已交付</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 1">订单已完成</span>
										<span v-show="item.seller_confirm == 2 && item.pay_status == 1">订单已拒绝</span>

									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<!-- <span v-show="item.refund_status == 0">未退款</span> -->
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1 && item.remaining_amount">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<!-- <p @click="showBtn" v-show="item.pay_status == 1 && item.seller_confirm == 1">更多</p> -->
									<span class="gray" v-show="item.seller_confirm == 0 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.seller_confirm == 2 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.pay_status == 0" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" v-show="item.pay_status == 0" @click="topayqian(item.order_id,item.order_sn)">支付定金</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id =='' " @click="toOrderPickone(item.order_id,item.order_sn)">填写接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id =='' " @click="toOrderInvoice(item.order_id,item.order_sn)">填写发票信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 3 && item.is_closed == 0 "
									 @click="getProcedureInfo(item.exp_log_info_id)">汽车手续跟踪</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 2"
									 @click="toOrderPickone(item.order_id,item.order_sn)">重新填写接车信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 2"
									 @click="toOrderInvoice(item.order_id,item.order_sn)">重新填写发票信息</span>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 0">接车人信息审核中</p>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 0">开票人信息审核中</p>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 0 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 1 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 2 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.is_closed == 0"
									 @click="toOrderPickones(item.order_id,item.order_sn)">查看接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 1"
									 @click="toOrderInvoices(item.order_id,item.order_sn)">查看发票信息</span>
								</div>
							</div>

							<!-- 取消 -->
							<!-- <div class="orderall" v-for="(item,index) in order" :key="index" v-if="item.order_status == 2">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span>订单已取消</span>
									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<img :src="require('@/assets/img/center/luhu.jpg')" alt="">
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<span v-show="item.refund_status == 0">未退款</span>
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<span class="red">

									</span>
								</div>
							</div> -->

							<!-- 过期 -->
							<div class="orderall" v-for="(item,index) in order" :key="index" v-if="item.order_status == 3">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">订单已过期</span>
									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<span class="gray" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" @click="toDatail(item.goods_id)">重新选购</span>
								</div>
							</div>

						</cube-scroll>
					</div>
				</cube-slide-item>

				<!-- 待付定金 -->
				<cube-slide-item>
					<!-- 滚动组件 -->
					<div class="scroll-list-wrap">
						<cube-scroll ref="scroll" :options="options">
							<!-- 这里是内容 -->
							<div class="orderall" v-for="(item,index) in paymoney" :key="index" v-if="item.order_status == 1">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">待支付定金</span>
										<span v-show="item.seller_confirm == 0 && item.pay_status == 1">订单确认中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 0">等待发车</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 1">汽车运输中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 2">汽车已到达</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 0">汽车已交付</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 1">订单已完成</span>
										<span v-show="item.seller_confirm == 2 && item.pay_status == 1">订单已拒绝</span>

									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<!-- <span v-show="item.refund_status == 0">未退款</span> -->
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1 && item.remaining_amount">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<!-- <p @click="showBtn" v-show="item.pay_status == 1 && item.seller_confirm == 1">更多</p> -->
									<span class="gray" v-show="item.seller_confirm == 0 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.seller_confirm == 2 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.pay_status == 0" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" v-show="item.pay_status == 0" @click="topayqian(item.order_id,item.order_sn)">支付定金</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id =='' " @click="toOrderPickone(item.order_id,item.order_sn)">填写接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id =='' " @click="toOrderInvoice(item.order_id,item.order_sn)">填写发票信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 3 && item.is_closed == 0 "
									 @click="getProcedureInfo(item.exp_log_info_id)">汽车手续跟踪</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 2"
									 @click="toOrderPickone(item.order_id,item.order_sn)">重新填写接车信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 2"
									 @click="toOrderInvoice(item.order_id,item.order_sn)">重新填写发票信息</span>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 0">接车人信息审核中</p>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 0">开票人信息审核中</p>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 0 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 1 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 2 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.is_closed == 0"
									 @click="toOrderPickones(item.order_id,item.order_sn)">查看接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 1"
									 @click="toOrderInvoices(item.order_id,item.order_sn)">查看发票信息</span>
								</div>
							</div>

						</cube-scroll>
					</div>
				</cube-slide-item>

				<!-- 待发货 -->
				<cube-slide-item>
					<!-- 滚动组件 -->
					<div class="scroll-list-wrap">
						<cube-scroll ref="scroll" :options="options">
							<!-- 这里是内容 -->
							<div class="orderall" v-for="(item,index) in shipments" :key="index" v-if="item.order_status == 1">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">待支付定金</span>
										<span v-show="item.seller_confirm == 0 && item.pay_status == 1">订单确认中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 0">等待发车</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 1">汽车运输中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 2">汽车已到达</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 0">汽车已交付</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 1">订单已完成</span>
										<span v-show="item.seller_confirm == 2 && item.pay_status == 1">订单已拒绝</span>

									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<!-- <span v-show="item.refund_status == 0">未退款</span> -->
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1 && item.remaining_amount">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<!-- <p @click="showBtn" v-show="item.pay_status == 1 && item.seller_confirm == 1">更多</p> -->
									<span class="gray" v-show="item.seller_confirm == 0 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.seller_confirm == 2 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.pay_status == 0" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" v-show="item.pay_status == 0" @click="topayqian(item.order_id,item.order_sn)">支付定金</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id =='' " @click="toOrderPickone(item.order_id,item.order_sn)">填写接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id =='' " @click="toOrderInvoice(item.order_id,item.order_sn)">填写发票信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 3 && item.is_closed == 0 "
									 @click="getProcedureInfo(item.exp_log_info_id)">汽车手续跟踪</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 2"
									 @click="toOrderPickone(item.order_id,item.order_sn)">重新填写接车信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 2"
									 @click="toOrderInvoice(item.order_id,item.order_sn)">重新填写发票信息</span>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 0">接车人信息审核中</p>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 0">开票人信息审核中</p>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 0 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 1 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 2 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.is_closed == 0"
									 @click="toOrderPickones(item.order_id,item.order_sn)">查看接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 1"
									 @click="toOrderInvoices(item.order_id,item.order_sn)">查看发票信息</span>
								</div>
							</div>

						</cube-scroll>
					</div>
				</cube-slide-item>

				<!-- 待收货 -->
				<cube-slide-item>
					<!-- 滚动组件 -->
					<div class="scroll-list-wrap">
						<cube-scroll ref="scroll" :options="options">
							<!-- 这里是内容 -->
							<div class="orderall" v-for="(item,index) in receiving" :key="index" v-if="item.order_status == 1">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">待支付定金</span>
										<span v-show="item.seller_confirm == 0 && item.pay_status == 1">订单确认中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 0">等待发车</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 1">汽车运输中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 2">汽车已到达</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 0">汽车已交付</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 1">订单已完成</span>
										<span v-show="item.seller_confirm == 2 && item.pay_status == 1">订单已拒绝</span>

									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<!-- <span v-show="item.refund_status == 0">未退款</span> -->
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1 && item.remaining_amount">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<!-- <p @click="showBtn" v-show="item.pay_status == 1 && item.seller_confirm == 1">更多</p> -->
									<span class="gray" v-show="item.seller_confirm == 0 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.seller_confirm == 2 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.pay_status == 0" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" v-show="item.pay_status == 0" @click="topayqian(item.order_id,item.order_sn)">支付定金</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id =='' " @click="toOrderPickone(item.order_id,item.order_sn)">填写接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id =='' " @click="toOrderInvoice(item.order_id,item.order_sn)">填写发票信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 3 && item.is_closed == 0 "
									 @click="getProcedureInfo(item.exp_log_info_id)">汽车手续跟踪</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 2"
									 @click="toOrderPickone(item.order_id,item.order_sn)">重新填写接车信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 2"
									 @click="toOrderInvoice(item.order_id,item.order_sn)">重新填写发票信息</span>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 0">接车人信息审核中</p>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 0">开票人信息审核中</p>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 0 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 1 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 2 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.is_closed == 0"
									 @click="toOrderPickones(item.order_id,item.order_sn)">查看接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 1"
									 @click="toOrderInvoices(item.order_id,item.order_sn)">查看发票信息</span>
								</div>
							</div>

						</cube-scroll>
					</div>
				</cube-slide-item>

				<!-- 待收发票 -->
				<cube-slide-item>
					<!-- 滚动组件 -->
					<div class="scroll-list-wrap">
						<cube-scroll ref="scroll" :options="options">
							<!-- 这里是内容 -->
							<div class="orderall" v-for="(item,index) in delivery" :key="index" v-if="item.order_status == 1">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">待支付定金</span>
										<span v-show="item.seller_confirm == 0 && item.pay_status == 1">订单确认中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 0">等待发车</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 1">汽车运输中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 2">汽车已到达</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 0">汽车已交付</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 1">订单已完成</span>
										<span v-show="item.seller_confirm == 2 && item.pay_status == 1">订单已拒绝</span>

									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<!-- <span v-show="item.refund_status == 0">未退款</span> -->
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1 && item.remaining_amount">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<!-- <p @click="showBtn" v-show="item.pay_status == 1 && item.seller_confirm == 1">更多</p> -->
									<span class="gray" v-show="item.seller_confirm == 0 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.seller_confirm == 2 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.pay_status == 0" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" v-show="item.pay_status == 0" @click="topayqian(item.order_id,item.order_sn)">支付定金</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id =='' " @click="toOrderPickone(item.order_id,item.order_sn)">填写接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id =='' " @click="toOrderInvoice(item.order_id,item.order_sn)">填写发票信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 3 && item.is_closed == 0 "
									 @click="getProcedureInfo(item.exp_log_info_id)">汽车手续跟踪</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 2"
									 @click="toOrderPickone(item.order_id,item.order_sn)">重新填写接车信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 2"
									 @click="toOrderInvoice(item.order_id,item.order_sn)">重新填写发票信息</span>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 0">接车人信息审核中</p>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 0">开票人信息审核中</p>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 0 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 1 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 2 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.is_closed == 0"
									 @click="toOrderPickones(item.order_id,item.order_sn)">查看接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 1"
									 @click="toOrderInvoices(item.order_id,item.order_sn)">查看发票信息</span>
								</div>
							</div>

						</cube-scroll>
					</div>
				</cube-slide-item>

				<!-- 已完成 -->
				<cube-slide-item>
					<!-- 滚动组件 -->
					<div class="scroll-list-wrap">
						<cube-scroll ref="scroll" :options="options">
							<!-- 这里是内容 -->
							<div class="orderall" v-for="(item,index) in achieve" :key="index" v-if="achieve.length > 0">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">待支付定金</span>
										<span v-show="item.seller_confirm == 0 && item.pay_status == 1">订单确认中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 0">等待发车</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 1">汽车运输中</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 2">汽车已到达</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 0">汽车已交付</span>
										<span v-show="item.seller_confirm == 1 && item.pay_status == 1 && item.status == 3 && item.is_closed == 1">订单已完成</span>
										<span v-show="item.seller_confirm == 2 && item.pay_status == 1">订单已拒绝</span>

									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<!-- <span v-show="item.refund_status == 0">未退款</span> -->
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1 && item.remaining_amount">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<!-- <p @click="showBtn" v-show="item.pay_status == 1 && item.seller_confirm == 1">更多</p> -->
									<span class="gray" v-show="item.seller_confirm == 0 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.seller_confirm == 2 && item.pay_status == 1" @click="kf">联系客服</span>
									<span class="gray" v-show="item.pay_status == 0" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" v-show="item.pay_status == 0">支付定金</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id =='' " @click="toOrderPickone(item.order_id,item.order_sn)">填写接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id =='' " @click="toOrderInvoice(item.order_id,item.order_sn)">填写发票信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 3 && item.is_closed == 0 "
									 @click="getProcedureInfo(item.exp_log_info_id)">汽车手续跟踪</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 2"
									 @click="toOrderPickone(item.order_id,item.order_sn)">重新填写接车信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 2"
									 @click="toOrderInvoice(item.order_id,item.order_sn)">重新填写发票信息</span>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 0">接车人信息审核中</p>
									<p v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 0">开票人信息审核中</p>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 0 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 1 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.invoice_status == 1 && item.status == 2 && item.remaining_amount "
									 @click="weikuan(item.order_id,item.order_sn)">尾款支付信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.contact_id && item.contact_status == 1 && item.is_closed == 0"
									 @click="toOrderPickones(item.order_id,item.order_sn)">查看接车人信息</span>
									<span class="red" v-show="item.pay_status == 1 && item.seller_confirm == 1 && item.invoice_id && item.invoice_status == 1"
									 @click="toOrderInvoices(item.order_id,item.order_sn)">查看发票信息</span>
								</div>
							</div>
							
							<!-- 过期 -->
							<div class="orderall" v-for="(item,index) in order" :key="index" v-if="item.order_status == 3">
								<div class="title">
									<div>
										<p>{{item.add_time | toTimes}}</p>
										<p>订单编号：{{item.order_sn}}</p>
									</div>
									<div>
										<span v-show="item.pay_status == 0">订单已过期</span>
									</div>
								</div>
								<div class="imagetext" @click="toOrderDetail(item.order_id)">
									<div class="imgbox">
										<div :style="{backgroundImage: 'url(' + item.goods_img + ')'}">
											<!-- <img :src="require('@/assets/img/center/luhu.jpg')" alt=""> -->
										</div>
										<h3>{{item.in_paragraph + "款"}} {{item.brand_name}} {{item.m_name}} {{item.fine_name}}</h3>
										<span v-show="item.refund_status == 1">退款中</span>
										<span v-show="item.refund_status == 2">已退款</span>
									</div>
									<div class="money">
										<p>商品总价： {{item.total_amount}}￥</p>
										<p>
											<span v-show="item.pay_status == 0">应付定金： {{item.order_amount}}￥</span>
											<span v-show="item.pay_status == 1">应付尾款： {{item.remaining_amount}}￥</span>
										</p>
									</div>
								</div>
								<div class="button">
									<span class="gray" @click="cancelOrder(item.order_id,item.pay_status)">取消订单</span>
									<span class="red" @click="toDatail(item.goods_id)">重新选购</span>
								</div>
							</div>

						</cube-scroll>
					</div>
				</cube-slide-item>
			</cube-slide>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
	import axios from 'axios'
	import qs from 'qs'

	export default {
		name: 'OrderAll',
		data() {
			return {
				current: '全部订单', //tab索引
				index: 0, //轮播索引
				labels: ['全部订单', '待付定金', '待发货', '待收货', '待收发票', '已完成'],
				options: { //配置垂直滑动
					observeDOM: true,
					click: false,
					probeType: 1,
					scrollbar: false,
					pullDownRefresh: false,
					pullUpLoad: false
				},
				order: [], //所有订单
				paymoney: [], //待付定金
				shipments: [], //待发货
				receiving: [], //待收货
				delivery: [], //待收发票
				achieve: [], //完成
			}
		},
		methods: {
			//跳转到支付页面
			topayqian(orderid, ordersn) {
				this.$router.push({
					path: "/PayOrder",
					query: {
						order_id: orderid,
						order_sn: ordersn
					}
				})
			},
			//个人中心
			toCenter() {
				this.$router.push('/Center')
			},
			//详细页
			toOrderDetail(id) {
				this.$router.push({
					path: '/OrderDetail',
					query: {
						order_id: id,
						current: this.current
					}
				})
			},
			//重新选购
			toDatail(a) {
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: a
					}
				});
			},
			//取消订单
			cancelOrder(a,b){
				const url = this.$store.state.Yi + 'index/my/del_myorder';
				let token = localStorage.token;
				if (!token) token = 0;
				axios.post(url, qs.stringify({
					token: token,
					del_id: a,
					pay_type: b 
				})).then(
					(res) => {
						console.log(res.data)
						if(res.data == "1"){
							this.$createToast({
								type: 'correct',
								time: 1000,
								txt: '已取消订单！',
								mask: true,
								onTimeout: () => {
									for(let i = 0;i<this.order.length;i++){
										if(this.order[i].order_id == a){
											this.order.splice(i,1)
										}
									}
									for(let i = 0;i<this.paymoney.length;i++){
										if(this.paymoney[i].order_id == a){
											this.paymoney.splice(i,1)
										}
									}
								}
							}).show()
						}else{
							this.$createToast({
								type: 'error',
								time: 1500,
								txt: '服务器繁忙，请稍后重试！',
								mask: true
							}).show()
						}
					}
				)
			},
			//点击导航将内容切换到对应选项
			changeHandler(cur) {
				this.current = cur;
				this.index = this.labels.indexOf(cur);
			},
			//滑动内容将导航切换到对应的选项
			changePage(current) {
				this.current = this.labels[current];
			},
			//手续物流信息
			getProcedureInfo(a) {
				const url = this.$store.state.Yi + 'index/api/uptExpress';
				let token = localStorage.token;
				if (!token) token = 0;
				axios.post(url, qs.stringify({
					token: token,
					exp_log_info_id: a
				})).then(
					(res) => {
						let data = JSON.parse(res.data.data.list)
						this.$createDialog({
							type: 'alert',
							title: data[data.length - 1].time,
							content: data[data.length - 1].status,
							icon: 'cubeic-alert'
						}).show()
					}
				)
			},
			//尾款信息
			weikuan(a, b) {
				if (localStorage.token) {
					const url = this.$store.state.Yi + 'index/My/bankinfo';
					axios.post(url, qs.stringify({
						token: localStorage.token,
						order_id: a,
						order_sn: b
					})).then(
						(res) => {
							console.log(res.data.data)
							let data = res.data.data;
							this.$createDialog({
								type: 'alert',
								confirmBtn: {
									text: '我知道了',
									active: true
								}
							}, (createElement) => {
								return [
									createElement('div', {
										'class': {
											'my-title': true
										},
										slot: 'title'
									}, [
										createElement('div', {
											'class': {
												'my-title-img': true
											},
											'style': {
												'line-height': '.6rem'
											}
										},'尾款支付信息'),
									]),
									createElement('div', {
										'class': {
											'my-content': true
										},
										'style':{
											'padding': '.1rem'
										},
										slot: 'content'
									},[
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'总额：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.paymentData.after_total_amount+'元')]),
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'已付定金：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.paymentData.order_amount+'元')]),
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'应付尾款：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.accountData[0].account_payment+'元')]),
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'备注：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.accountData[0].account_note)]),
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'户名：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.accountData[0].account_name)]),
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'开户行：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.accountData[0].account_bank)]),
										createElement('p',{
											'style':{
												'display': 'flex'
											},
										},[createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'right'
											},	
											},'账户：'),
											createElement('span',{
											'style':{
												'flex': '1',
												'text-align': 'left'
											},	
											},data.accountData[0].account_no)])
									])
								]
							}).show()
						}
					)
				}
			},

			//请求数据
			getOrderInfo() {
				if (localStorage.token) {
					const url = this.$store.state.Yi + 'index/My/myorderindex';
					axios.post(url, qs.stringify({
						token: localStorage.token,
						tag: 0,
						opage: 1
					})).then(this.getOrderSuc)
				} else {
					this.$createToast({
						type: 'error',
						time: 1000,
						txt: '请先登录！',
						mask: true
					}).show()
				}
			},
			//回调
			getOrderSuc(res) {
				let data = res.data.data.order;
				//console.log(data);
				this.order = data;

				for (let i in data) {
					if (data[i].pay_status == 0 && data[i].order_status == 1) {
						this.paymoney.push(data[i])
					}
				}
				//待发货
				for (let i in data) {
					if (data[i].pay_status == 1 && data[i].order_status == 1 && data[i].status == 0 && data[i].is_closed == 0) {
						this.shipments.push(data[i])
					}
				}
				//待收货
				for (let i in data) {
					if (data[i].pay_status == 1 && data[i].order_status == 1 && data[i].status == 1) {
						this.receiving.push(data[i])
					}
					if (data[i].pay_status == 1 && data[i].order_status == 1 && data[i].status == 2) {
						this.receiving.push(data[i])
					}
				}
				//待收发票
				for (let i in data) {
					if (data[i].pay_status == 1 && data[i].order_status == 1 && data[i].status == 3 && data[i].is_closed == 0) {
						this.delivery.push(data[i])
					}
				}
				//完成
				for (let i in data) {
					if (data[i].order_status == 2) {
						this.achieve.push(data[i])
					}
					// if (data[i].order_status == 3) {
					// 	this.achieve.push(data[i])
					// }
					if (data[i].pay_status == 1 && data[i].order_status == 1 && data[i].status == 3 && data[i].is_closed == 1) {
						this.achieve.push(data[i])
					}
					if (data[i].is_closed == 2) {
						this.achieve.push(data[i])
					}
				}

			},
			//填写接车人信息
			toOrderPickone(a, b) {
				this.$router.push({
					path: '/OrderPickone',
					query: {
						current: this.current,
						order_id: a,
						order_sn: b
					}
				});
			},
			//填写发票信息
			toOrderInvoice(a, b) {
				this.$router.push({
					path: '/OrderInvoice',
					query: {
						current: this.current,
						order_id: a,
						order_sn: b
					}
				});
			},
			//查看接车人信息
			toOrderPickones(a, b) {
				this.$router.push({
					path: '/OrderPickones',
					query: {
						current: this.current,
						order_id: a,
						order_sn: b
					}
				});
			},
			//查看发票信息
			toOrderInvoices(a, b) {
				this.$router.push({
					path: '/OrderInvoices',
					query: {
						current: this.current,
						order_id: a,
						order_sn: b
					}
				});
			},
			//跳转到对应选项
			toCurrent() {
				let _self = this;
				let cur = "全部订单";
				if (_self.$route.query.current) {
					cur = _self.$route.query.current
				}
				setTimeout(function() {
					_self.changeHandler(cur)
				}, 10)
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
			}
		},
		mounted() {
			this.toCurrent();
			this.getOrderInfo();
		},
	}
</script>

<style scoped="scoped">
	.OrderAll .header {
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}

	.OrderAll .header .iconfont {
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}

	.content>>>.cube-slide {
		position: fixed;
		top: 1.66rem;
		bottom: 0;
		height: auto;
		width: 100%;
	}

	.content>>>.cube-scroll-nav-bar-item {
		padding: 12px 15px;
	}

	.content>>>.cube-scroll-nav-bar-item_active {
		color: #e5000c;
	}

	.content>>>.cube-scroll-nav-bar-item_active span {
		padding-bottom: .14rem;
		border-bottom: #e5000c 3px solid;
	}

	.scroll-list-wrap {
		height: 100%;
	}

	.orderall .title {
		height: .82rem;
		border-top: #eaeaea 1px solid;
		display: flex;
		justify-content: space-between;
	}

	.orderall .title>div {
		text-align: left;
		margin-left: .2rem;
		height: .82rem;
		color: #999;
		font-size: .24rem;
		line-height: .41rem;
	}

	.orderall .title>div:last-child {
		text-align: right;
		line-height: .82rem;
		margin-right: .2rem;
		color: #e5000c;
		font-size: .32rem;
	}

	.orderall .imagetext {
		height: 2.6rem;
		border-top: #eaeaea 1px solid;
	}

	.orderall .imagetext .imgbox {
		position: relative;
		height: 1.76rem;
		background-color: #f9f9f9;
	}

	.orderall .imagetext .imgbox div {
		float: left;
		height: 1.2rem;
		width: 24%;
		margin-top: .28rem;
		margin-left: .2rem;
		/* background: url('~@/assets/img/center/luhu.jpg') no-repeat center; */
		background-size: cover;
		background-position: center;
	}

	.orderall .imagetext .imgbox h3 {
		float: right;
		width: 68%;
		height: 1.2rem;
		margin-right: .2rem;
		margin-top: .28rem;
		white-space: normal;
		text-align: left;
		line-height: .3rem;
	}

	.orderall .imagetext .imgbox span {
		position: absolute;
		right: .2rem;
		bottom: .2rem;
		color: #e5000c;
	}

	.orderall .imagetext .money p:first-child {
		color: #999;
		font-size: .24rem;
		text-align: right;
		margin-right: .2rem;
		margin-top: .16rem;
	}

	.orderall .imagetext .money p:last-child {
		color: #000;
		font-size: .3rem;
		text-align: right;
		margin-right: .2rem;
		margin-top: .02rem;
	}

	.orderall .button {
		height: .96rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-top: #eaeaea 1px solid;
		border-bottom: #f5f5f5 .1rem solid;
	}

	.orderall .button p {
		margin-right: .4rem;
	}

	.orderall .button span {
		height: .5rem;
		/* width: 1.42rem; */
		padding: 0 .1rem;
		line-height: .5rem;
		border-radius: .25rem;
		margin-right: .2rem;
	}

	.orderall .button span.gray {
		border: #999 solid 1px;
		color: #999;
	}

	.orderall .button span.red {
		border: #e5000c solid 1px;
		color: #e5000c;
	}
</style>
