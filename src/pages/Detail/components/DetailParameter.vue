<template>
	<div class="DetailParameter" v-if="Object.keys(DatailData).length != 0">
		<h3>汽车参数</h3>
		
		<div class="par" @click="more(DatailData.goodInfo.goods_id)">
			<div>
				<p class="iconfont">&#xe638;</p>
				<p>基本参数</p>
			</div>
			<div>
				<p class="iconfont">&#xe649;</p>
				<p>车身</p>
			</div>
			<div>
				<p class="iconfont">&#xe619;</p>
				<p>发动机</p>
			</div>
		</div>
		
		<div class="par" @click="more(DatailData.goodInfo.goods_id)">
			<div>
				<p class="iconfont">&#xe648;</p>
				<p>变速箱</p>
			</div>
			<div>
				<p class="iconfont">&#xe63a;</p>
				<p>底盘转向</p>
			</div>
			<div>
				<p class="iconfont">&#xe640;</p>
				<p>车轮制动</p>
			</div>
		</div>
		
		<p @click="more(DatailData.goodInfo.goods_id)">查看全部参数<span class="iconfont">&#xe65f;</span></p>
	</div>
</template>

<script>
	export default{
		name: 'DetailParameter',
		props: {
			DatailData: Object,
		},
		methods:{
			more(a){
				this.$router.push({
					path: "/DetailParameterMore",
					query: {
						goods_id: a
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.DetailParameter{
		border-bottom: .1rem solid #f5f5f5;
	}
	
	.DetailParameter>h3{
		text-align: left;
		text-indent: 2px;
		font-size: .34rem;
		font-weight: 500;
		margin: .24rem;
		border-left: 2px solid #e5000c;
	}
	
	.par{
		display: flex;
	}
	
	.par>div{
		margin-top: .3rem;
		flex: 1;
	}
	
	.par>div p:first-child{
		font-size: .5rem;
		padding: .1rem;
	}
	
	.par>div p:last-child{
		margin-top: .2rem;
		font-size: .32rem;
	}
	
	.DetailParameter>p{
		margin-top: .2rem;
		height: .82rem;
		line-height: .82rem;
		font-size: .34rem;
		border-top: 1px solid #f5f5f5;
	}
	
	.DetailParameter>p span{
		color: #e5000c;
	}
</style>
