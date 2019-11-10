<template>
	<div class="list" ref="wrapper">
		<div class="inventor">
			<div v-for="(item,key) in cities" :key="key">
				<div class="title" ref="key">{{key}}</div>
				<ul>
					<li 
					v-for="(n,i) in item" 
					@click="details();seriesId(n)"
					:key="i">
						<span><img :src="n.logo_img" alt=""></span>
						<span>{{n.logo_name}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'

	export default {
		name: 'BrandInventor',
		props: {
			cities: Object,
			listTatil: String
		},
		data(){
			return {
				
			}
		},
		watch:{
		  listTatil(){
			  let title = this.$refs.key  //找到点击的那个标签
			  for(let i = 0;i < title.length;i++){
				  if(this.listTatil == title[i].innerText){
					  this.scroll.scrollToElement(title[i]);  //将找到的标签传给scroll组件定位
				  }
			  }
		  }
		},
		methods: {
			details(){
				this.$emit("change",true);
			},
			seriesId(a){
				this.$emit("id",a);
			}
		},
		mounted() {
			this.scroll = new Bscroll(this.$refs.wrapper,{ click: true });
		}
	}
</script>

<style scoped="scoped">
	.list{
		position: absolute;
		top: .9rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}

	.inventor .title {
		height: .56rem;
		background-color: #f5f5f5;
		text-align: left;
		line-height: .56rem;
		text-indent: .3rem;
	}

	.inventor ul {
		width: 100%;
	}


	.inventor ul li {
		margin: 0 .3rem;
		height: .8rem;
		line-height: .8rem;
		text-align: left;
		border-bottom: 1px solid #ededed;
	}
	
	.inventor ul li span img{
		max-width: .7rem;
	}

	.inventor ul li:last-child {
		border-bottom: none;
	}
</style>
