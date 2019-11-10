 <template>
	 <div class="CenterMsg">
		 <h3>我的消息</h3>
		 <ul>
		 	<li @click="toMsgAll">
		 		<span class="iconfont icon">&#xe671;</span>
		 		所有信息
				<span class="iconfont next">&#xe65f;</span>
		 	</li>
		 	<li @click="toMsgUnread">
		 		<span class="iconfont icon">&#xe624;</span>
		 		未读信息
				<span class="iconfont next">&#xe65f;</span>
		 	</li>
		 	<li @click="toMsgOrder">
		 		<span class="iconfont icon">&#xe61f;</span>
		 		订单消息
				<span class="iconfont next">&#xe65f;</span>
		 	</li>
		 	<li @click="toNotice">
		 		<span class="iconfont icon">&#xe64b;</span>
		 		系统公告
				<span class="iconfont next">&#xe65f;</span>
		 	</li>
		 </ul>
	 </div>
</template>

<script>
	export default{
		name: 'CenterMsg',
		methods: {
			toNotice() {
				this.$router.push('/MsgNotice');
			},
			toMsgUnread() {
				this.$router.push('/MsgUnread');
			},
			toMsgAll(){
				this.$router.push('/MsgAll');
			},
			toMsgOrder(){
				this.$router.push('/MsgOrder');
			}
		},
	}
</script>

<style scoped="scoped">
	.CenterMsg{
		background-color: #fff;
		border: #f8f8f8 .24rem solid;
		border-top: none;
	}
	
	.CenterMsg h3{
		font-size: .32rem;
		font-weight: bold;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		margin: 0 .24rem;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterMsg ul{
		margin: 0 .24rem;
	}
	
	.CenterMsg ul li{
		font-size: .24rem;
		height: .86rem;
		line-height: .86rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}
	
	.CenterMsg ul li:last-child{
		border-bottom: none;
	}
	
	.CenterMsg ul li .icon{
		float: left;
		height: .86rem;
		line-height: .86rem;
		font-size: .5rem;
		margin-right: .2rem;
		width: .6rem;
	}
	
	.CenterMsg ul li .next{
		float: right;
		height: .86rem;
		width: .86rem;
		line-height: .86rem;
		text-align: right;
	}
</style>
