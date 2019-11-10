<template>
	<div class="AddrSite" v-if="addrData.goods_id">
		<div class="siteList">
			<h3>选择提车地点<span @click="showSite"> <span class="iconfont" v-show="show">&#xe65e;</span><span class="iconfont" v-show="!show">&#xe65f;</span></span></h3>

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
			<p><span>商品金额：</span><span>{{addrData.shop_price | format_number}} 元</span></p>
			<p><span>运费 + 保费：</span><span>{{money}} 元</span></p>
			<h3><span>总计：</span><span style="color: #e5000c">{{totleMoney | format_number}} 元</span></h3>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	import Vue from 'vue'

	import data from '@/assets/provincesData' //导入城市数据



	//转换城市数据格式
	const provinces = [];
	const city = [];
	for (let i in data.GP) {
		provinces.push({
			value: data.GP[i],
			text: data.GP[i],
			children: []
		})
	}
	for (let n in data.GT) {
		for (let j in data.GT[n]) {
			provinces[n].children.push({
				value: data.GT[n][j],
				text: data.GT[n][j],
			})
		}
	}

	export default {
		name: 'AddrSite',
		props: {
			addrData: Object,
			goCity: String,
			goods_id: Number,

			oMobis: Object
		},
		data() {
			return {
				show: true,
				site: "",
				active: 0,
				money: 0,
				totleMoney: 0,
				toCity: "", ////起始地址
				cityTo: "", ////结束地址
				distance: 0,
				type: 1,
				Address: "",
				toast: this.$createToast({
					time: 0,
					txt: '',
					mask: true
				})  //遮罩层函数
			}
		},
		methods: {
			//收起物流信息
			showSite() {
				this.show = !this.show
			},
			//选择提车地点
			siteSelect(a) {
				this.active = a;
				if (a == 1) {
					this.toCity = "深圳";
					this.cityTo = "广东-深圳";
					this.site = "深圳体验店提车";
					this.getLogisticsInfo();
				}
				if (a == 2) {
					this.toCity = "天津";
					this.cityTo = "天津-天津";
					this.site = "天津分部提车";
					this.getLogisticsInfo();
				};

			},
			//显示省市选择
			showAddressPicker() {
				this.addressPicker.show()
			},
			//点击确定后触发
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.site = selectedVal.join(' ');
				this.toCity = selectedVal[1];
				this.cityTo = selectedVal.join('-');
				this.getLogisticsInfo();
			},
			//点击取消后触发
			cancelHandle() {
				this.active = 0;
				this.$store.dispatch("changeNext", false);
			},
			//物流公司费用接口
			getLogisticsInfo() {
				this.$store.dispatch("changeNext", true);
				this.toast.show();  //显示遮罩
				//const url = "ap/apiMan/data/dataStroke/api/v1/getStroke2?jsonpCallback=bb";
				const url = this.$store.state.Yi + "index/order/calFreightCrul2";
				axios.get(url, {
					params: {
						departure: this.goCity,
						destination: this.toCity
					}
				}).then(this.getLogisticsSuc).catch(this.getDistanceInfo)
			},
			getLogisticsSuc(msg) {
				
				const data = JSON.parse(msg.data.replace("bb(", "").replace(")", ""));
				if (data.data == null || data.data[0].price == "暂无线路") {
					//console.log("没有线路，调用自定义接口");
					this.getDistanceInfo();

				} else {
					const cityGo = this.addrData.Source_carprovince.name + "-" + this.addrData.Source_carcity.name;
					this.getAddrInfo(1, this.goods_id, cityGo, this.cityTo, data.data[0].price, 0);
				}
			},
			//计算距离
			getDistanceInfo() {
				const url = this.$store.state.Maps + "v3/geocode/geo";
				axios.post(url, qs.stringify({
					address: this.addrData.Source_carcity.name + "|" + this.toCity,
					output: 'JSON',
					key: '3eac2241aca3b6f67079173fe3f3b8ec',
					batch: true
				})).then(this.getDistanceSuc)
			},
			getDistanceSuc(res) {
				const url = this.$store.state.Maps + "v3/distance";
				axios.get(url, {
					params: {
						origins: res.data.geocodes[0].location,
						destination: res.data.geocodes[1].location,
						output: "json",
						key: "3eac2241aca3b6f67079173fe3f3b8ec"
					}
				}).then(this.getDistanceSucc)
			},
			getDistanceSucc(res) {
				const cityGo = this.addrData.Source_carprovince.name + "-" + this.addrData.Source_carcity.name;
				this.getAddrInfo(2, this.goods_id, cityGo, this.cityTo, 0, res.data.results[0].distance / 1000);
			},
			//计算运费
			getAddrInfo(type, goods_id, ostartaddr, oendaddr, apiTotal, kDistance) {
				const url = this.$store.state.Yi + "index/order/cfreight";
				axios.post(url, qs.stringify({
					type: type,
					goods_id: goods_id,
					ostartaddr: ostartaddr,
					oendaddr: oendaddr,
					apiTotal: apiTotal,
					kDistance: kDistance
				})).then(this.getAddrSuc)

				this.distance = kDistance || 0;
				this.goods_id = goods_id;
				this.cart_id = this.cart_id;
				this.type = type;
				this.Address = oendaddr;
			},
			/////设置参数
			getAddrSuc(msg) {
				this.toast.hide(); //关闭遮罩
				this.next = true;
				this.money = msg.data.freight;
				this.totleMoney = msg.data.total;
				//this.$store.dispatch("changeNext", true);

				var objc = {};
				this.oMobis.distance = this.distance;
				// this.oMobis.goods_id=this.goods_id ;
				// this.oMobis.cart_id=this.cart_id;
				this.oMobis.type = this.type;
				this.oMobis.Address = this.Address;

				//console.log(this.oMobis)
			}
		},
		mounted() {
			//省级联动
			this.addressPicker = this.$createCascadePicker({
				title: '选择城市', //自定义标题
				data: provinces,
				swipeTime: 2000,
				// maskClosable: false,
				onSelect: this.selectHandle,
				onCancel: this.cancelHandle
			})
		},
		filters: {
			fnName: function(value) {
				let a = value.toString()
				let b = a.substring(0,a.indexOf("."))
				let c = a.substring(a.indexOf(".")+1)
				return b + c + '00';
			}
		}
	}
</script>

<style scoped="scoped">
	.AddrSite>.siteList {
		border-bottom: .1rem solid #f5f5f5;
	}

	.AddrSite>.siteList>h3 {
		padding: .24rem;
		text-align: left;
		font-size: .3rem;
		display: flex;
		justify-content: space-between;
	}

	.AddrSite .siteList h3 span {
		color: #666;
	}

	.AddrSite .siteList .site {
		margin: .24rem;
		background-color: #fef7f7;
		padding: .24rem;
		margin-top: .2rem;
	}

	.AddrSite .siteList .site>.AD {
		display: flex;
		justify-content: space-between;
	}

	.AddrSite .siteList .site .AD span {
		border: #e5000c 1px solid;
		border-radius: 3px;
		color: #e5000c;
		padding: .16rem;
		font-size: .32rem;
		background-color: #fff;
	}

	.AddrSite .siteList .site .AD .active {
		color: #fff;
		background-color: #e5000c;
	}

	.AddrSite .siteList .site p {
		color: #666;
		font-size: .3rem;
		text-align: left;
		margin-top: .26rem;
	}

	.AddrSite .siteList .site h3 {
		margin-top: .4rem;
		margin-bottom: .9rem;
		color: #e5000c;
		font-size: .34rem;
		font-weight: 600;
	}

	.AddrSite .siteList .site h3 span {
		color: #e5000c;
		font-weight: 600;
	}

	.list {
		padding: .24rem;
		padding-bottom: 1.2rem;
	}

	.list p,
	.list h3 {
		display: flex;
		justify-content: space-between;
	}

	.list p {
		margin-bottom: .36rem;
		color: #666;
	}

	.list h3 span {
		font-size: .34rem;
		font-weight: 600;
	}
</style>
