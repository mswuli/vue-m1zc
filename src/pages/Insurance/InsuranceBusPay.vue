<template>
  <div class="ins-bus-pay">
    <div class="header">
      <span class="iconfont" @click="toInsPer">&#xe606;</span>
      商业险付款信息
    </div>

    <div class="ins-cont">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :options="options" :data="update">

          <ul class="cont-list">

            <li class="ins-img">
              <img :src="require('@/assets/img/ins/erwm.png')" alt="">
              <p> <span class="iconfont">&#xe64a;</span> 微信支付</p>
              <h3>￥ <span>28117.00</span> </h3>
            </li>

            <li class="ins-msg">请于当日23点59分59秒前使用微信扫码支付，逾期未支付则订单失效。</li>

            <li class="ins-butt" @click="showClose">支付成功</li>

            <li class="ins-butt error">支付失败</li>

          </ul>

        </cube-scroll>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'InsuranceBusPay',
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
        update: []
      }
    },
    methods: {
      // 返回保险嗯信息页
      toInsPer() {
        this.$router.push('/insper')
      },
      showClose() {
        let str = '等待客服核实支付结果，结果请在<span style="color: #e5000c;">个人中心</span>查看';
        this.$createDialog({
          type: 'alert',
          icon: 'cubeic-alert',
          showClose: true,
          title: '温馨提示：',
          content: str,
          // onClose: () => {
          //   this.$createToast({
          //     type: 'warn',
          //     time: 1000,
          //     txt: '点击关闭按钮'
          //   }).show()
          // },
          onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击确认按钮'
          }).show()
        },
        }).show()
      }
    }
  }
</script>

<style scoped="scoped">
  .ins-bus-pay .header {
    font-size: .3rem;
    height: .9rem;
    line-height: .9rem;
    position: relative;
    border-bottom: #eaeaea 1px solid;
  }

  .ins-bus-pay .header span {
    position: absolute;
    left: 0;
    width: .8rem;
    text-align: center;
  }

  .ins-bus-pay .ins-cont {
    position: fixed;
    width: 100%;
    top: .9rem;
    left: 0;
    bottom: 0;
  }

  .ins-bus-pay .ins-img img {
    padding-top: .7rem;
    width: 2.8rem;
  }

  .ins-bus-pay .ins-img p {
    padding-top: .1rem;
  }

  .ins-bus-pay .ins-img p span {
    color: #23c727;
  }

  .ins-bus-pay .ins-img h3 {
    padding-top: .7rem;
    font-size: .32rem;
  }

  .ins-bus-pay .ins-img h3 span {
    font-size: .52rem;
  }

  .ins-bus-pay .ins-cont .scroll-list-wrap {
    height: 100%;
  }

  .ins-bus-pay .ins-msg {
    padding: 2.8rem .2rem 0 .2rem;
    font-size: .22rem;
  }

  .ins-bus-pay .ins-butt {
    margin: .7rem .2rem .7rem .2rem;
    background-color: #e5000c;
    height: .94rem;
    line-height: .94rem;
    border-radius: .1rem;
    font-size: .35rem;
    color: #fff;
  }

  .ins-bus-pay .error {
    background-color: #999;
  }

  /* iPhoneX,iPhoneXs的适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .ins-bus-pay .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .ins-bus-pay .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .ins-bus-pay .ins-cont {
      bottom: .54rem;
    }
  }
</style>
