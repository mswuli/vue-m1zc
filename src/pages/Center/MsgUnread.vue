<template>
	<div class="MsgUnread">
		<div class="header">
			<span class="iconfont" @click="toCenter">&#xe606;</span>
			未读信息
		</div>
		
		<div class="content">
			<dl>
				<dt>
					<img :src="require('@/assets/img/center/1zhanche.png')" alt="">
				</dt>
				<dd>
					<h3>一站车团队</h3>
					<p>欢迎来到一站车商城</p>
					<span class="reply">1</span>
					<span class="time">23:60</span>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'MsgUnread',
		methods: {
			toCenter() {
				this.$router.push('/Center');
			}
		},
	}
</script>

<style scoped="scoped">
	.MsgUnread .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.MsgUnread .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.content{
		margin: 0 .2rem;
	}
	
	.content dl{
		position: relative;
		height: 1.6rem;
		border-bottom: #f0f0f0 1px solid;
	}
	
	.content dl dt{
		float: left;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		overflow: hidden;
		margin-top: .3rem;
	}
	
	.content dl dt img{
		width: 100%;
	}
	
	.content dl dd{
		float: left;
		text-align: left;
		margin-left: .3rem;
		width: 68%;
	}
	
	.content dl dd h3{
		font-size: .32rem;
		margin-top: .4rem;
		font-weight: 600;
	}
	
	.content dl dd p{
		margin-top: .14rem;
		color: #8e9bb1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.content dl .reply{
		position: absolute;
		right: 0;
		bottom: .4rem;
		padding: .04rem .08rem;
		background-color: #e5000c;
		color: #fff;
		border-radius: .1rem;
		font-size: .26rem;
	}
	
	.content dl .time{
		position: absolute;
		right: 0;
		top: .4rem;
		color: #8e9bb1;
	}
</style>
