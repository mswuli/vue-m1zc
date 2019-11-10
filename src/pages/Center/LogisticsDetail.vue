<template>
	<div class="LogisticsDetail">
		<div class="header">
			<span class="iconfont" @click="toOrderDetail">&#xe606;</span>
			订单详情
		</div>
		
		<ul class="list">
			<li v-for="(item,index) in data">
				<span>{{item.status}}</span>
				<p>{{item.time}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'LogisticsDetail',
		data(){
			return{
				data: []
			}
		},
		methods:{
			//反回
			toOrderDetail(){
				this.$router.push({
					path: '/OrderDetail',
					query: {
						order_id: this.$route.query.order_id,
						current: this.$route.query.current
					}
				})
			},
			//获取物流信息
			logistics(){
				const url = this.$store.state.Yi + 'index/api/uptExpress';	
				let token = localStorage.token;
				if (!token) token = 0;
				axios.post(url,qs.stringify({
					token: token,
					exp_log_info_id: this.$route.query.exp_log_info_id
				})).then(
					(res) => {
						let data = JSON.parse(res.data.data.list)
						//console.log(data)
						this.data = data;
					}
				)
			}
		},
		mounted() {
			this.logistics();
		}
	}
</script>

<style scoped="scoped">
	.LogisticsDetail .header{
		height: .9rem;
		line-height: .9rem;
		position: fixed;
		font-size: .32rem;
		background-color: #fff;
		width: 100%;
	}
	
	.LogisticsDetail .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.LogisticsDetail .list{
		padding: .9rem .2rem 0 .2rem;
	}
	
	.LogisticsDetail .list li{
		text-align: left;
		line-height: .46rem;
		border-bottom: #999 1px dashed;
		margin: .2rem 0;
	}
	
	.LogisticsDetail .list li p{
		text-align: right;
	}
</style>
