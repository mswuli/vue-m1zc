<template>
	<div class="AccountProtocol">
		<div class="navGo">
			<span class="iconfont" @click="toReg">&#xe606;</span>
			用户协议
		</div>
		<div v-html="text.agreement" class="text"></div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		name: 'AccountProtocol',
		data() {
			return {
				text: ""
			}
		},
		methods: {
			//返回注册页
			toReg() {
				this.$router.push({
					path: '/' + this.$route.query.names,
					query: {
						name: this.$route.query.name,
					}
				})
			},
			getDataInfo(){
				const url = this.$store.state.Yi + 'index/Login/agreement';
				axios.get(url).then(this.getDataSuc)
			},
			getDataSuc(res){
				//console.log(res.data)
				this.text = res.data.data;
			}
		},
		mounted(){
			this.getDataInfo();
		}
	}
</script>

<style scoped="scoped">
	.navGo {
		height: .9rem;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		font-size: .32rem;
		line-height: .9rem;
		text-align: center;
	}

	.navGo .iconfont {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}

	.text{
		padding: 1rem .2rem 0 .2rem;
		text-align: left;
		line-height: .38rem;
	}
</style>
