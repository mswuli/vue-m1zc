<template>
	<div class="ins-pay">
		<div class="header">
			<span class="iconfont" @click="toInsDet">&#xe606;</span>
			支付首页
		</div>

    <div class="ins-cont">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :options="options">

          <div class="title">
          	<h3>￥<span>8117.00</span></h3>
          	<p>应付定金（仅含质保险费用）</p>
          </div>

          <div class="bankpay">
          	<div>
          		<span class="iconfont">&#xe612;</span>
          		快捷支付
          	</div>
          	<!-- <span class="iconfont">&#xe65f;</span> -->
          	<span class="iconfont active">&#xe65e;</span>
          </div>

          <ul class="bank">
          	<li>
               <div class="bankli" :style="{backgroundImage:'url(' + require('@/assets/img/banklogo/jsyh.png') + ')'}"></div>
          	   <!-- <span class="iconfont">&#xe692;</span> -->
               <span class="iconfont active">&#xe626;</span>
          	</li>
          	<li>
          		<div>
          			<span class="iconfont">&#xe7fc;</span>
          			添加银行卡
          		</div>
          	</li>
          </ul>

          <ul class="pay">
          	<li>
          		<div>
          			<span class="iconfont" style="color: #22b190;">&#xe65a;</span>
          			微信支付
          		</div>
          		<!-- <span class="iconfont">&#xe692;</span> -->
          		<span class="iconfont active">&#xe626;</span>
          	</li>

          	<li>
          		<div>
          			<span class="iconfont" style="color: #4d90dd;">&#xe64c;</span>
          			支付宝支付
          		</div>
          		<!-- <span class="iconfont">&#xe692;</span> -->
          		<span class="iconfont active">&#xe626;</span>
          	</li>
          </ul>

          <p class="msg">请您在提交订单后30分钟内完成支付，逾期订单会自动取消</p>
          <div class="butt" @click="toInsBus">确定支付</div>

        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InsurancePay',
    data() {
      return {
        options: {
          observeDOM: true,
          click: true,
          probeType: 1,
          scrollbar: false,
          pullDownRefresh: false,
          pullUpLoad: false
        },
      }
    },
    methods: {
      // 回到保险详情页
      toInsDet() {
        this.$router.push('/insdet');
      },
      toInsBus() {
        this.$router.push('/insbus');
      }
    }
  }
</script>

<style scoped="scoped">
  .ins-pay .header {
  	font-size: .3rem;
  	height: .9rem;
  	line-height: .9rem;
  	position: relative;
  	border-bottom: #eaeaea 1px solid;
  }

  .ins-pay .header span {
  	position: absolute;
  	left: 0;
  	width: .8rem;
  	text-align: center;
  }

  .ins-pay .ins-cont {
    position: fixed;
    width: 100%;
    top: .9rem;
    left: 0;
    bottom: 0;
  }

  .ins-pay .ins-cont .scroll-list-wrap {
    height: 100%;
  }

  .ins-pay .title {
  	height: 2rem;
  	border-bottom: #eaeaea 1px solid;
  }

  .ins-pay .title h3 {
  	font-size: .36rem;
  	font-weight: 600;
  	margin-top: .7rem;
  }

  .ins-pay .title h3 span {
  	font-size: .5rem;
  	font-weight: 600;
  }

  .ins-pay .title p {
  	margin-top: .3rem;
  	color: #999;
  }

  .ins-pay .bankpay {
  	font-size: .3rem;
  	margin: .9rem .9rem 0 .9rem;
  	border-top: #eaeaea 1px solid;
    border-bottom:#eaeaea 1px solid;
  	display: flex;
  	justify-content: space-between;
  	height: .9rem;
  	line-height: .9rem;
  }

  .ins-pay .bankpay span {
  	/* padding-right: .1rem; */
  }

  .ins-pay .pay {
  	margin: 0 .9rem .9rem .9rem;
  	border-top: #eaeaea 1px solid;
  }

  .ins-pay .pay>li {
  	border-bottom: #eaeaea 1px solid;
  	height: .9rem;
  	line-height: .9rem;
  	font-size: .3rem;
  	display: flex;
  	justify-content: space-between;
  }

  .ins-pay .pay>li div span {
  	padding-right: .1rem;
  }

  .ins-pay .pay li>.active {
  	color: #e5000c;
  }

  .ins-pay .bank {
  	margin: 0 .9rem 0 1.3rem;
  }

  .ins-pay .bank li {
  	border-top: #eaeaea 1px solid;
  	height: .9rem;
  	line-height: .9rem;
  	font-size: .3rem;
  	display: flex;
  	justify-content: space-between;
  }

  .ins-pay .bank li .bankli {
    width: 100%;
    background-repeat: no-repeat;
  }

  .ins-pay .bank li:first-child {
    border-top:none;
  }

  .ins-pay .bank>li div span {
  	padding-right: .1rem;
  }

  .ins-pay .bank li>.active {
  	color: #e5000c;
  }

  .ins-pay .msg {
  	color: #999;
  	font-size: .24rem;
  	padding-top: .9rem;
  }

  .ins-pay .butt {
  	height: .9rem;
  	line-height: .9rem;
  	margin: .3rem;
  	color: #fff;
  	font-size: .32rem;
  	border-radius: .1rem;
  	background-color: #e5000c;
  }

  /* iPhoneX,iPhoneXs的适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .ins-pay .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .ins-pay .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .ins-pay .ins-cont {
      bottom: .54rem;
    }
  }
</style>
