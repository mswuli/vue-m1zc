<template>

	<div class="series" v-show="true" @click.self="seriesHide">
		<div class="seriesList">
			<div class="list" ref="wrapper">
				<div>
					<div class="title">
						<span><img :src="logo_id.logo_img" alt=""></span>
						<span>{{logo_id.logo_name}}</span>
					</div>
					<!-- <div class="unlimited" @click="goArticles(logo_id.logo_id)">不限车系</div> -->
					<ul>
						<li @click="goScreenCar(item.m_id,item.m_name)" v-for="(item,index) in logoList" :key="index">
							<span><img :src="item.m_img" alt=""></span>
							<span>{{item.m_name}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import Bscroll from 'better-scroll'
	import qs from 'qs'
	import axios from 'axios'

	export default {
		name: 'ScreenSeries',
		props: {
			cities: Object,
			seriesShow: Boolean,
			logo_id: Object
		},
		data() {
			return {
				logoList: [],
				logoid: "",
				logo_name: "",
				m_id: "",
				m_name: "",
				in_paragraph: "",
				displacement: "",
				fuel: ""
			}
		},
		watch: {
			seriesShow() {
				if (this.seriesShow) {
					document.getElementsByClassName("series")[0].style.left = "0";
				} else {
					document.getElementsByClassName("series")[0].style.left = "120%";
				}
			},
			logo_id() {
				this.getSearchMInfo();
			}
		},
		methods: {
			seriesHide() {
				this.$emit("change", false)
			},
			//调用联动
			goScreenCar(a,b) {
				this.m_id = a;
				this.m_name = b;
				this.getListInfo(a);
			},
			//获取车型
			getSearchMInfo() {
				this.logoid = this.logo_id.logo_id;
				this.logo_name = this.logo_id.logo_name;
				const url = this.$store.state.Yi + "index/My/motorcycle";
				axios.post(url, qs.stringify({
					id: this.logo_id.logo_id
				})).then(this.getSearchMSuc);
			},
			getSearchMSuc(res) {
				//console.log(res.data.data.motorcycle);
				this.logoList = res.data.data.motorcycle;
			},
			//选择排量年款
			getListInfo(a) {
				const url = this.$store.state.Yi + "index/My/finemotorcycle";
				axios.post(url, qs.stringify({
					id: a
				})).then(this.getListSuc);
			},
			getListSuc(res) {
				if(res.data.error == 1){
					const toast = this.$createToast({
						txt: '未上架该车辆！',
						type: 'error',
						time: 1000
					})
					toast.show();
				}else{
					const _self = this;
					const Data = res.data.data.finemotorcycle;
					const Picker = [];
					for (let i in Data) {
						Picker.push({
							value: Data[i].displacement + " " + Data[i].fuel,
							text: Data[i].displacement + " " + Data[i].fuel,
							children: []
						})
						for (let n in Data[i].in_paragrapharr) {
							Picker[i].children.push({
								value: i+n,
								text: Data[i].in_paragrapharr[n].in_paragraph + " 款"
							})
						}
					}
					//console.log(Picker)
					//省级联动
					_self.addressPicker = _self.$createCascadePicker({
						title: '',  //自定义标题
						data: Picker,
						swipeTime: 2000,
						// maskClosable: false,
						onSelect: this.selectHandle,
						onCancel: this.cancelHandle
					})
					_self.showAddressPicker()
				}
			},
			//显示省市选择
			showAddressPicker() {
				this.addressPicker.show()
			},
			//点击确定后触发
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.in_paragraph = selectedText[1].substring(0,selectedText[1].indexOf(" "));
				this.displacement = selectedText[0].substring(0,selectedText[0].indexOf(" "));
				this.fuel = selectedText[0].substring(selectedText[0].indexOf(" "));
				//console.log(this.displacement,this.fuel,this.in_paragraph)
				
				let token = localStorage.token;
				if (!token) token = 0;
				const url = this.$store.state.Yi + 'index/My/caradd';
				axios.post(url,qs.stringify({
					token: token,
					logo_id: this.logoid,
					logo_name: this.logo_name,
					car_id: this.m_id,
					car_name: this.m_name,
					ninakuan: this.in_paragraph,
					fule_opailiang: this.displacement,
					fule_oyoupin: this.fuel,
				})).then(
					(res) => {
						//console.log(res.data.error)
						if (res.data.error == 0) {
							const toast = this.$createToast({
								txt: '添加成功！',
								type: 'correct',
								time: 1000,
								onTimeout: () => { //回调
									this.$router.push('/CarAdmini');
								}
							})
							toast.show()
						} else if (res.data.error == 1) {
							const toast = this.$createToast({
								txt: '添加失败！',
								type: 'error',
								time: 1500
							})
							toast.show()
						} else {
							const toast = this.$createToast({
								txt: '未知错误！',
								type: 'error',
								time: 1500
							})
							toast.show()
						}
					}
				)

			},
			//点击取消后触发
			cancelHandle() {} ,
		},
		mounted() {
			this.scroll = new Bscroll(this.$refs.wrapper, {
				click: true
			});
		}
	}
</script>

<style scoped="scoped">
	.series {
		position: fixed;
		height: 100%;
		width: 120%;
		background-color: rgba(0, 0, 0, .1);
		top: .9rem;
		left: 120%;
		transition: all .5s cubic-bezier(.25, .1, .3, 1.5);
	}

	.list {
		position: absolute;
		top: 0;
		bottom: 1rem;
		left: 0;
		width: 100%;
		overflow: hidden;
	}

	.seriesList {
		position: absolute;
		height: 100%;
		width: 72%;
		background-color: #fff;
		top: 1px;
		right: 0;
		text-align: left;

	}

	.showList {
		right: 0;
	}

	.seriesList .title {
		height: .82rem;
		line-height: .82rem;
		padding-left: .2rem;
		border-bottom: .2rem #ededed solid;
	}

	.seriesList .title span img {
		max-width: .7rem;
	}

	.seriesList .unlimited {
		height: .82rem;
		line-height: .82rem;
		border-top: .2rem #ededed solid;
		border-bottom: .2rem #ededed solid;
		padding-left: .2rem;
	}

	.seriesList ul li {
		height: 1rem;
		line-height: 1rem;
		border-bottom: 1px #ededed solid;
	}

	.seriesList ul li span img {
		max-width: 1.5rem;
	}
</style>
