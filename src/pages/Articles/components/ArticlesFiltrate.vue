<template>
	<div class="ArticlesFiltrate" :class="{searchBar: searchBar}" id="filtrate" ref="xx">
		<div>
			<!-- <div @click="showSort">排序
				<span class="iconfont" v-show="!sortShow">&#xe65e;</span>
				<span class="iconfont" v-show="sortShow">&#xe608;</span>
			</div> -->
			<div @click="toArticlesBrand">品牌
				<span class="iconfont">&#xe65e;</span>
			</div>
			<div @click="showState">{{msg1}}
				<span class="iconfont" v-show="!stateShow">&#xe65e;</span>
				<span class="iconfont" v-show="stateShow">&#xe608;</span>
			</div>
		</div>
		
		<!-- <ul class="sort" v-show="sortShow">
			<li :class="{fontColor: sortColor == 1}" @click="sort(1)">默认排序</li>
			<li :class="{fontColor: sortColor == 2}" @click="sort(2)">价格低</li>
			<li :class="{fontColor: sortColor == 3}" @click="sort(3)">价格高</li>
		</ul> -->
		
		<ul class="state" v-show="stateShow">
			<li 
			v-for="(item,index) in aclass"
			:key="index"
			:class="{fontColor: stateColor == index}" 
			@click="state(index);searchId(item.aclassid,$event)"
			>
			{{item.classname}}
			</li>
		</ul>
		
	</div>
</template>

<script>
	export default{
		name: 'ArticlesFiltrate',
		props:{
			aclass: Array
		},
		data(){
			return{
				msg1: "所有文章",
				sortColor: 0,
				stateColor: 0,
				sortShow: false,
				stateShow: false,
				searchBar: false
			}
		},
		methods:{
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
			
			showSort() {
				this.stateShow = false;
				this.sortShow = !this.sortShow;
			},
			
			sort(a) {
				this.sortColor = a;
				this.sortShow = false;
			},
			
			showState() {
				this.sortShow = false;
				this.stateShow = !this.stateShow;
			},
			
			state(a) {
				this.stateColor = a;
				this.stateShow = false;
			},
			
			searchId(a,e){
				const id = this.$route.query;
				this.$router.push({
					path: "/Articles",
					query: {
						l_id: id.l_id,
						c_id: a,
						m_id: id.m_id,
						sor: id.sor
					}
				});
				this.$emit("update",a);
				this.msg1 = e.target.innerText;
			},
			
			toArticlesBrand(){
				this.$router.push("/ArticlesBrand")
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

<style scoped="scoped">
	.ArticlesFiltrate {
		height: .74rem;
		line-height: .74rem;
		border-bottom: 1px #f0f0f0 solid;
		position: relative;
		font-size: .26rem;
	}
	
	.ArticlesFiltrate>div{
		display: flex;
	}
	
	.ArticlesFiltrate>div>div{
		flex: 1;
	}
	
	.searchBar{
		position: fixed;
		top: .9rem;
		z-index: 9999;
		background-color: #fff;
		width: 100%;
		height: .74rem;
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
