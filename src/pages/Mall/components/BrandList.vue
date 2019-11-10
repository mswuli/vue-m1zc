<template>
	<ul class="list">
		<li 
		v-for="(item,index) in areaCitys"
		class="item"
		:key="index"
		:ref="item"
		:class="{active:item===act}"
		@touchstart="handleTouchStart"
		@touchmove="handleTouchMove"
		@touchend="handleTouchEnd"
		@click="handleLetterClick"
		>{{item}}</li>
	</ul>
</template>

<script>
	export default{
		name:'Brandlist',
		props:{
			cities: Object
		},
		data(){
			return{
				act:'',
				touchStatus: false
			}
		},
		computed: {
		  areaCitys(){
		    const areaCitys=[];
		    for (let i in this.cities) {
		      areaCitys.push(i)
		    }
		    return areaCitys
		  }
		},
		methods:{
			handleLetterClick(e){
			  this.$emit("change",e.target.innerText);
			  this.act=e.target.innerText;  //发布事件传值
			},
			handleTouchStart(){
			  this.touchStatus=true;
			},
			handleTouchMove(e){
			  if (this.touchStatus) {
			    const startY=this.$refs['A'][0].offsetTop;   //获取第一个节点到顶部的距离
			    const touchT=e.touches['0'].clientY-20;   //获取鼠标滑动Y轴的坐标
			    let index=Math.floor((touchT-startY)/20);   //定位到第几个字母 20是字母高度
			    if (index>=this.areaCitys.length) index=(this.areaCitys.length-1);
			    if (index<0) index=0;
			    this.$emit("change",this.areaCitys[index]);  //发布事件传值
			    this.act=this.areaCitys[index];
			  }
			},
			handleTouchEnd(){
			  this.touchStatus=false;
			}
		}
	}
</script>

<style scoped="scoped">
	.list{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  position: absolute;
	  top: .4rem;
	  right: 0;
	  bottom: 0;
	}
	
	.item{
	  width: .4rem;
	  height: .4rem;
	  line-height: .4rem;
	  text-align: center;
	  color: #666;
	}
	
	/* .active{
	  background-color: rgba(0,0,0,.1);
	  border-radius: 50%;
	} */
</style>
