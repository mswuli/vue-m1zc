<template>
	<div class="DetailList" v-if="Object.keys(DatailData).length != 0">
		<div class="liuchen" id="gouche">
			<h3>{{silde[0].name}}</h3>
			<div>
				<img :src="silde[0].imgUrl" alt="">
			</div>
		</div>

		<div class="liuchen" v-show="!cartype_value" id="shouhou">
			<h3>{{silde[1].name}}</h3>
			<div>
				<img :src="silde[1].imgUrl" alt="">
			</div>
		</div>

		<div class="liuchen" v-show="cartype_value">
			<h3>{{silde[2].name}}</h3>
			<div>
				<img :src="silde[2].imgUrl" alt="">
			</div>
		</div>

		<div class="liuchen" id="shangpai">
			<h3>{{silde[3].name}}</h3>
			<div @click="showImagePreview">
				<img :src="silde[3].imgUrl" alt="">
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'DetailList',
		props: {
			cartype_value: Boolean,
			DatailData: Object
		},
		data() {
			return {
				silde: [{
						name: "购车流程",
						imgUrl: require("@/assets/img/detail/liuchen.png")
					},
					{
						name: "售后质保",
						imgUrl: require("@/assets/img/detail/zhonggui.png")
					},
					{
						name: "售后质保",
						imgUrl: require("@/assets/img/detail/jinkou.png")
					},
					{
						name: "上牌流程",
						imgUrl: require("@/assets/img/detail/shangpai.png")
					}
				],
				imgz: [
					require("@/assets/img/detail/guo1.png"),
					require("@/assets/img/detail/guo2.png")
				],
				imgj: [
					require("@/assets/img/detail/jin1.png"),
					require("@/assets/img/detail/jin2.png")
				],
			}
		},
		methods: {
			// listTop() {
			// 	const gouche = document.getElementById("gouche").offsetTop;
			// 	const shouhou = document.getElementById("shouhou").offsetTop;
			// 	const shangpai = document.getElementById("shangpai").offsetTop;
			// 	let listo = [gouche, shouhou, shangpai];
			// 	return listo;
			// },
			showImagePreview() {
				if(!this.cartype_value){
					this.$createImagePreview({
						imgs: this.imgz,
						loop: false
					}).show()
				}else{
					this.$createImagePreview({
						imgs: this.imgj,
						loop: false
					}).show()
				}
			}
		},
		mounted() {
			// this.$emit("change", this.listTop())
		}
	}
</script>

<style scoped="scoped">
	.DetailList {
		/* margin-bottom: 1rem; */
		border-bottom: .1rem solid #f5f5f5;
	}

	.liuchen h3 {
		text-align: left;
		text-indent: 2px;
		font-size: .34rem;
		font-weight: 500;
		margin: .24rem;
		border-left: 2px solid #e5000c;
	}

	.liuchen div {
		padding: .24rem;
	}

	.liuchen div img {
		width: 100%;
	}
</style>
