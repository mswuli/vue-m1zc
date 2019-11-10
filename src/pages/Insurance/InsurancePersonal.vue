<template>
  <div class="ins-per">

    <div class="header">
      <span class="iconfont" @click="toInsBus">&#xe606;</span>
      商业险资料
    </div>

    <div class="ins-cont">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :options="options" :data="update">

          <ul class="cont-list">
            <li class="list-val">
              <label for="phone">
                <span>手机号码：</span>
                <input type="text" placeholder="请输入您的手机号" maxlength="11" id="phone">
              </label>
            </li>

            <li class="list-val">
              <label for="engNum">
                <span>发动机号：</span>
                <input type="text" placeholder="请输入您汽车的发动机号" maxlength="11" id="engNum">
              </label>
            </li>

            <li class="list-val">
              <label for="vin">
                <span>车&nbsp;&nbsp;架&nbsp;&nbsp;号：</span>
                <input type="text" placeholder="请输入您汽车的车架号" maxlength="11" id="vin">
              </label>
            </li>

            <li class="list-title">
              <h3>身份证正反面</h3>
            </li>

            <li class="list-img">
              <div>
                <input @change="upload($event, 'img0')" type="file">
                <img :src="uploadImg.img0" alt="">
              </div>
              <div class="list-box"></div>
              <div>
                <input @change="upload($event, 'img1')" type="file">
                <img :src="uploadImg.img1" alt="">
              </div>
            </li>

            <li class="list-img">
              <div>
                <h3>示例</h3>
                <img :src="require('@/assets/img/ins/zhengmsfz.png')" alt="">
              </div>
              <div class="list-box"></div>
              <div>
                <h3>示例</h3>
                <img :src="require('@/assets/img/ins/fanzhao.png')" alt="">
              </div>
            </li>

            <li class="list-title">
              <h3>自拍照</h3>
            </li>

            <li class="list-img">
              <div>
                <input @change="upload($event, 'img2')" type="file">
                <img :src="uploadImg.img2" alt="">
              </div>
              <div class="list-box"></div>
              <div>
                <!-- <input @change="upload($event, 'img12')" type="file">
                <img :src="require('@/assets/img/ins/shenfaz2.png')" alt=""> -->
              </div>
            </li>

            <li class="ins-butt" @click="showClose">提交</li>

          </ul>

          <div class="ins-bottom"></div>

        </cube-scroll>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'InsurancePersonal',
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
        update: [],
        uploadImg: { // 待上传图片存储
          img0: require('@/assets/img/ins/shenfaz1.png'),
          img1: require('@/assets/img/ins/shenfaz2.png'),
          img2: require('@/assets/img/ins/file.png')
        },
      }
    },
    methods: {
      // 返回保险资料页
      toInsBus() {
        this.$router.push('/insbus');
      },
      // 商业险支付页面
      toInsBusPay() {
        this.$router.push('/insbuspay');
      },
      //上传图片
      upload(e, i) {
        let _self = this;
        // 利用fileReader对象获取file
        var file = e.target.files[0];
        if (file.type == "image/png" || file.type == "image/jpeg") {
          var filesize = file.size;
          var filename = file.name;
          // 2,621,440   2M
          if (filesize > 6304320) {
            // 图片大于6MB
            _self.$createToast({
              txt: '图片大小不能超过6！',
              type: 'warn',
              time: 1500,
              mask: true
            }).show();
            return false;
          }
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
            // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            _self.uploadImg[i] = e.target.result;
          }
        } else {
          this.$createToast({
            time: 1500,
            txt: '图片格式仅支持PNG或JPG',
            type: 'warn'
          }).show()
        }
      },
      showClose() {
        let str = '将于<span style="color: #e5000c;">30</span>分钟后生成微信付款码，保费直接转入相应保险公司账户。<br>付款码将发送至<span style="color: #e5000c;">个人中心-支付保险</span>';
        this.$createDialog({
          type: 'alert',
          icon: 'cubeic-alert',
          showClose: true,
          title: '温馨提示：',
          content: str,
          onConfirm: () => {
            this.$router.push('/insbuspay');
          },
          onClose: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '点击关闭按钮'
            }).show()
          },
        }).show()
      }
    },
    mounted() {
      // 解决内容太多滚动条不到底部问题
      setTimeout(() => {
        this.update = ['解决滑动问题'];
      }, 1000)
    }
  }
</script>

<style scoped="scoped">
  .ins-per .header {
    font-size: .3rem;
    height: .9rem;
    line-height: .9rem;
    position: relative;
    border-bottom: #eaeaea 1px solid;
  }

  .ins-per .header span {
    position: absolute;
    left: 0;
    width: .8rem;
    text-align: center;
  }

  .ins-per .ins-cont {
    position: fixed;
    width: 100%;
    top: .9rem;
    left: 0;
    bottom: 0;
  }

  .ins-per .ins-cont .scroll-list-wrap {
    height: 100%;
  }

  .cont-list .list-val {
    margin: 0 .2rem;
    border-bottom: #dfdfdf .1px solid;
  }

  .cont-list .list-val label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: .98rem;
    width: 90%;
    line-height: .98rem;
  }

  .cont-list .list-val span {}

  .cont-list .list-val input {
    background: none;
    height: .9rem;
    width: 4rem;
  }

  .cont-list .list-title {
    padding: .34rem 0;
    font-size: .3rem;
    text-align: left;
    text-indent: .2rem;
  }

  .cont-list .list-img {
    display: flex;
    padding: 0 .2rem;
  }

  .cont-list .list-img div {
    position: relative;
    flex: 1;
  }

  .cont-list .list-img .list-box {
    flex: .1;
  }

  .cont-list .list-img div img {
    width: 100%;
    max-height: 3rem;
  }

  .cont-list .list-img div h3 {
    padding: .4rem 0 .2rem 0;
    color: #8e9bb1;
  }

  .cont-list .list-img div input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }

  .cont-list .ins-butt {
    margin: 1rem .2rem 0 .2rem;
    background-color: #e5000c;
    height: .94rem;
    line-height: .94rem;
    border-radius: .1rem;
    font-size: .35rem;
    color: #fff;
  }

  .ins-bottom {
    height: .4rem;
  }


  /* iPhoneX,iPhoneXs的适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .ins-per .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .ins-per .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .ins-per .ins-cont {
      bottom: .54rem;
    }
  }
</style>
