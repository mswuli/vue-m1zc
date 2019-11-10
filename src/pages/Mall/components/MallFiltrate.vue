<template>
	<div class="filtrate" :class="{searchBar: searchBar}" id="filtrate" ref="xx">
		<div>
			<div @click="showSort">{{sorts}}
				<span class="iconfont" v-show="!sortShow">&#xe65e;</span>
				<span class="iconfont" v-show="sortShow">&#xe608;</span>
			</div>
			<div @click="toMallBrand">品牌
				<span class="iconfont">&#xe65e;</span>
			</div>
			<div @click="showState">{{states}}
				<span class="iconfont" v-show="!stateShow">&#xe65e;</span>
				<span class="iconfont" v-show="stateShow">&#xe608;</span>
			</div>
			<div @click="toScreen">高级筛选
				<span class="iconfont">&#xe65e;</span>
			</div>
		</div>
		
		<ul class="sort" v-show="sortShow">
			<li :class="{fontColor: sortColor == 1}" @click="sort(1,'价格低')">价格低</li>
			<li :class="{fontColor: sortColor == 0}" @click="sort(0,'价格高')">价格高</li>
		</ul>
		
		<ul class="state" v-show="stateShow">
			<li :class="{fontColor: stateColor == 100}" @click="state(100);zhuant('0',$event)">所有状态</li>
			<li 
			:class="{fontColor: stateColor == index}" 
			@click="state(index);zhuant(item,$event)"
			v-for="(item,index) in zhaunt"
			:key="index"
			>{{item}}</li>
		</ul>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default {
		name: "MallFiltrate",
		props: {
			zhaunt: Array
		},
		data() {
			return {
				sorts: "排序",
				states: "车辆状态",
				sortColor: 1,
				stateColor: 100,
				sortShow: false,
				stateShow: false,
				searchBar: false,
			}
		},
		watch:{
			// scrollT(){
			// 	this.$refs.xx.scrollIntoView()
			// }
		},
		methods: {
			zhuant(a,e){
				this.$emit("upzhuant",a);
				this.states = e.target.innerText;
			},
			
			showSort() {
				this.stateShow = false;
				this.sortShow = !this.sortShow;
			},
			
			sort(a,b) {
				this.$emit("sort",a);
				this.sortColor = a;
				this.sortShow = false;
				this.sorts = b;
			},
			
			showState() {
				this.sortShow = false;
				this.stateShow = !this.stateShow;
			},
			
			state(a) {
				this.stateColor = a;
				this.stateShow = false;
			},
			
			showFiltrate() {
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = this.$refs.xx.offsetTop;
				if(scrollTop>145){
					this.searchBar = scrollTop > (offsetTop - 45);
				}else{
					this.searchBar = false;
				}
				this.$emit("change",this.searchBar);
			},
			
			toMallBrand() {
				this.$router.push("/MallBrand");
			},
			
			toScreen(){
				this.$router.push("/MallScreen");
			},
			
			getSearchSel(){
				url = this.$store.state.Yi + "index/Mall/searchSel";
				axios.get(url,{
					params: {
						m_id: 0
					}
				})
			}
			
		},
		mounted() {
			window.addEventListener('scroll',this.showFiltrate);
		},
		destroyed() {
			window.removeEventListener('scroll',this.showFiltrate);
		}
	}
</script>

<style scoped>
	.filtrate {
		height: .74rem;
		border-bottom: 1px #f0f0f0 solid;
		position: relative;
		font-size: .26rem;
		background-color: #fff;
	}
	
	.searchBar{
		position: fixed;
		top: .9rem;
		z-index: 9999;
		background-color: #fff;
		width: 100%;
		height: .74rem;
	}

	.filtrate>div {
		height: 100%;
	}

	.filtrate>div div {
		float: left;
		width: 25%;
		height: .74rem;
		line-height: .74rem;
	}

	.sort,.state {
		width: 100%;
		left: 0;
		top: .74rem;
		position: absolute;
		background-color: #fff;
		z-index: 999;
	}

	.sort li,.state li {
		height: .74rem;
		line-height: .74rem;
		border-bottom: 1px #f0f0f0 solid;
	}

	.fontColor {
		color: #e5000c;
	}
</style>
