<template>
	<div class="DetailAnchor">
		<ul
		@touchstart="handleTouchStart"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
		id="mover"
		:class="{mover: !touchStatus}"
		>
			<li @click="onActive(0)">
				<p class="title" :class="{titleA: act == 0}">车辆配置</p>
				<p :class="{active: act == 0}"></p>
			</li>
			<li @click="onActive(1)">
				<p class="title" :class="{titleA: act == 1}">汽车参数</p>
				<p :class="{active: act == 1}"></p>
			</li>
			<li @click="onActive(2)">
				<p class="title" :class="{titleA: act == 2}">购车流程</p>
				<p :class="{active: act == 2}"></p>
			</li>
			<li @click="onActive(3)">
				<p class="title" :class="{titleA: act == 3}">售后质保</p>
				<p :class="{active: act == 3}"></p>
			</li>
			<li @click="onActive(4)">
				<p class="title" :class="{titleA: act == 4}">上牌流程</p>
				<p :class="{active: act == 4}"></p>
			</li>
			<li @click="onActive(5)">
				<p class="title" :class="{titleA: act == 5}">交付时刻</p>
				<p :class="{active: act == 5}"></p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'DetailAnchor',
		props:{
			top: Number,
			Listo: Array,
			navBar: Boolean
		},
		data(){
			return{
				act: 0,
				touchStatus: false,
				start: 0,
				left: 0,
				mover: false
			}
		},
		methods:{
			listenScroll(){
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				const w = document.body.offsetWidth;
				const width = document.getElementById("mover").offsetWidth;
				
				if(this.navBar){
					$(".DetailAnchor").show();
				}else{
					$(".DetailAnchor").hide();
				}
				
				if(scrollTop >= 315){
					this.act =0;
					document.getElementById("mover").style.left = "0px";
				}
				
				if(scrollTop >= 600){
					this.act =1
				}
				
				if(scrollTop >= (this.Listo[0]-79)){
					this.act =2
				}
				
				if(scrollTop >= (this.Listo[1]-75)){
					this.act =3
					document.getElementById("mover").style.left = w - width + "px";
				}
				
				if(scrollTop >= (this.Listo[2]-100)){
					this.act =4
				}
				
				if(scrollTop >= 2175){
					this.act =5
					
				}
			},
			
			onActive(a){
				this.act = a;
				// console.log(this.Listo)
				if(a==0) document.documentElement.scrollTop = 315;
				if(a==1) document.documentElement.scrollTop = 600;
				if(a==2) document.documentElement.scrollTop = this.Listo[0]-79;
				if(a==3) document.documentElement.scrollTop = this.Listo[1]-75;
				if(a==4) document.documentElement.scrollTop = this.Listo[2]-70;
				if(a==5) document.documentElement.scrollTop = 2175;
			},
			
			handleTouchStart(e){
			  this.touchStatus = true;
			  this.start = e.touches['0'].clientX;
			  const m = parseInt(document.getElementById("mover").style.left);
			  if(isNaN(m)){
				  this.left = 0;
			  }else{
				  this.left = m;
			  }
			},
			handleTouchMove(e){
			  if (this.touchStatus) {
			    const touchT=e.touches['0'].clientX;   //获取鼠标滑动Y轴的坐标
				const m = document.getElementById("mover");
				m.style.left = this.left + touchT-this.start + "px";
			  }
			},
			handleTouchEnd(){
			  this.touchStatus = false;
			  const width = document.getElementById("mover").offsetWidth;
			  const w = document.body.offsetWidth;
			  let left = parseInt(document.getElementById("mover").style.left);
			  if(isNaN(left)) left = 0;
			  if(left>0) document.getElementById("mover").style.left = "0px";
			  if(left< w - width) document.getElementById("mover").style.left = w - width + "px";
			},
		},
		mounted() {
			window.addEventListener('scroll',this.listenScroll);
		},
		destroyed() {
			window.removeEventListener('scroll',this.listenScroll);
		}
	}
</script>

<style scoped="scoped">
	.DetailAnchor{
		position: fixed;
		top: .67rem;
		z-index: 20;
		display: none;
		height: .68rem;
		width: 300%;
		overflow: hidden;
		background-color: #fff;
	}
	
	.DetailAnchor ul{
		position: absolute;
		height: .68rem;
		font-size: .32rem;
		left: 0;
	}
	
	.DetailAnchor ul li{
		float: left;
		height: .68rem; 
		padding-right: .3rem;
		color: #999;
	}
	
	.DetailAnchor ul li .title{
		float: left;
		height: .5rem;
		line-height: .5rem;
		width: 100%;
	}
	
	.DetailAnchor ul li .active{
		float: left;
		height: .1rem;
		margin-left: 24%;
		width: 50%;
		background-color: #333;
		border-radius: .05rem;
	}
	
	.DetailAnchor ul li .titleA{
		color: #333;
	}
	
	.mover{
		transition: all .3s linear;
	}
</style>
