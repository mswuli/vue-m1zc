<template>
	<div class="DetailParameterMore">
		<div class="nav">
			<span class="iconfont" @click="toDetail">&#xe606;</span>
			<span class="iconfont" >&#xe656;</span>
			车辆参数
		</div>
		<div class="wrapper">
			<cube-scroll-nav @change="changeHandler" v-if="data.发动机">
				<cube-scroll-nav-panel 
				v-for="(item,key) in data" 
				:key="key" 
				:label="key">
					<ul class="content">
						<li v-for="(food,i) in item" :key="i">
							<div v-for="(cont,n) in food" :key="n">
								<span>{{cont.attr_name}}</span>
								<span v-show="cont.attr_value != ''">{{cont.attr_value}}</span>
								<span v-show="cont.attr_value == ''">-</span>
							</div>
						</li>
					</ul>
				</cube-scroll-nav-panel>
			</cube-scroll-nav>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	import DetailNav from '@/pages/Detail/components/DetailNav'

	export default {
		name: 'DetailParameterMore',
		data() {
			return {
				data:[]
				}
			
		},
		methods: {
			toDetail() {
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: this.$route.query.goods_id
					}
				});
			},

			changeHandler(label) {
				// console.log('changed to:', label)
			},

			getDatailInfo() {
				const url = this.$store.state.Yi + "index/Mall/detail";
				axios.get(url, {
					params: {
						goods_id: this.$route.query.goods_id
					}
				}).then(this.getDatailSuc);
			},
			getDatailSuc(res) {
				//console.log(res.data.data.parameterArr)
				this.data = res.data.data.parameterArr
			}
		},
		mounted() {
			this.getDatailInfo()
		}
	}
</script>

<style scoped="scoped">
	.DetailParameterMore{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 1rem;
		width: 100%;
		z-index: 100;
		background-color: #fff;
	}
	
	.nav{
		height: .67rem;
		width: 100%;
		line-height: .67rem;
		position: fixed;
		top: 0;
		z-index: 100;
		font-size: .34rem;
		background-color: #fff;
	}
	
	.nav span:first-child{
		float: left;
		height: .67rem;
		width: .67rem;
		line-height: .68rem;
		margin-left: 1px;
	}
	
	.nav span:last-child{
		float: right;
		height: .67rem;
		width: .67rem;
		line-height: .67rem;
		font-size: .42rem;
	}
	
	.wrapper {
		position: absolute;
		top: .67rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.wrapper >>> .cube-scroll-nav-bar-item{
		color: #999;
	}
	
	.wrapper >>> .cube-scroll-nav-bar-item_active{
		color: #000;
		font-size: .3rem;
	}
	
	.wrapper >>> .cube-sticky-ele{
		text-align: left;
		font-size: .34rem;
		padding-left: .24rem;
	}
	
	.wrapper >>> .cube-scroll-nav-panel-title{
		height: .85rem;
		line-height: .85rem;
	}
	
	.wrapper >>> .cube-scroll-nav-panel:last-child{
		/* margin-bottom: .2rem; */
	}

	.content {
		color: #666;
		text-align: left;
		margin: 0 .24rem;
	}

	.content li div {
		display: flex;
		border-bottom: #ebebeb 1px solid;
	}

	.content li div span {
		flex: 1;
		height: .6rem;
		line-height: .6rem;
	}
	
	/* iPhoneX,iPhoneXs的适配*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.DetailParameterMore {
			bottom: 77px;
		}
	}
	
	/* iPhoneXs Max的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.DetailParameterMore {
			bottom: 77px;
		}
	}
	
	/* iPhoneXr的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.DetailParameterMore {
			bottom: 77px;
		}
	}
</style>
