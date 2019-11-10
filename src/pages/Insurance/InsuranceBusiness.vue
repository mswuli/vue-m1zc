<template>
  <div class="ins-bus">
    <div class="header">
      <span class="iconfont" @click="toInsDet">&#xe606;</span>
      商业险资料
    </div>

    <div class="ins-cont">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :options="options" :data="update">

          <ul class="cont-list">
            <li class="list-phone">
              <label for="phone">
                <span>手机号码：</span>
                <input type="text" placeholder="请输入您的手机号" maxlength="11" id="phone">
              </label>
            </li>

            <li class="cont-img">
              <h3>仪表盘当前里程数</h3>
              <p>注:点火时仪表盘当前里程数的视频（附上当前拍照日期）
                仪表盘当前公里数视频，需要附上当天的拍照日期（当天报纸/显示
                时间的扣费凭证/或注明日期的刷卡小条/或百度上搜索‘时间’）</p>
              <div>
                <div>
                  <input @change="upload($event, 'img0')" type="file">
                  <img :src="uploadImg.img0" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(0)">
                  <img :src="require('@/assets/img/ins/1.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>铭牌</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img1')" type="file">
                  <img :src="uploadImg.img1" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(1)">
                  <img :src="require('@/assets/img/ins/2.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>左下角的VIN号（车架号）</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img2')" type="file">
                  <img :src="uploadImg.img2" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(2)">
                  <img :src="require('@/assets/img/ins/3.png')" alt="">
                </div>
              </div>
            </li>

           <li class="cont-img">
              <h3>左下角的VIN号（车架号）</h3>
              <p>注:需要附上当天拍照日期（当天报纸/显示时间的扣费凭证/
                或注明日期的刷卡小条/或百度上搜索‘时间’）</p>
              <div>
                <div>
                  <input @change="upload($event, 'img3')" type="file">
                  <img :src="uploadImg.img3" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(3)">
                  <img :src="require('@/assets/img/ins/4.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <div>
                <div>
                  <input @change="upload($event, 'img4')" type="file">
                  <img :src="uploadImg.img4" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(4)">
                  <img :src="require('@/assets/img/ins/5.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <div>
                <div>
                  <input @change="upload($event, 'img5')" type="file">
                  <img :src="uploadImg.img5" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(5)">
                  <img :src="require('@/assets/img/ins/6.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <div>
                <div>
                  <input @change="upload($event, 'img6')" type="file">
                  <img :src="uploadImg.img6" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(6)">
                  <img :src="require('@/assets/img/ins/7.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>购车发票</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img7')" type="file">
                  <img :src="uploadImg.img7" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(7)">
                  <img :src="require('@/assets/img/ins/8.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>关单</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img8')" type="file">
                  <img :src="uploadImg.img8" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(8)">
                  <img :src="require('@/assets/img/ins/9.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>商检单</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img9')" type="file">
                  <img :src="uploadImg.img9" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(9)">
                  <img :src="require('@/assets/img/ins/10.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>一致性证书正面</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img10')" type="file">
                  <img :src="uploadImg.img10" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(10)">
                  <img :src="require('@/assets/img/ins/11.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>一致性证书反面</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img11')" type="file">
                  <img :src="uploadImg.img11" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(11)">
                  <img :src="require('@/assets/img/ins/12.png')" alt="">
                </div>
              </div>
            </li>

            <li class="cont-img">
              <h3>环保随车清单</h3>
              <div>
                <div>
                  <input @change="upload($event, 'img12')" type="file">
                  <img :src="uploadImg.img12" alt="">
                </div>
                <span>示例</span>
                <div @click="handleImgsClick(12)">
                  <img :src="require('@/assets/img/ins/13.png')" alt="">
                </div>
              </div>
            </li>

            <li class="ins-butt" @click="toInsPer">提交</li>

          </ul>

          <div class="ins-bottom"></div>

        </cube-scroll>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'InsuranceBusiness',
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
        update: [],  // 实时更新页滚动高度
        uploadImg: {  // 待上传图片存储
          img0 : require('@/assets/img/ins/file.png'),
          img1 : require('@/assets/img/ins/file.png'),
          img2 : require('@/assets/img/ins/file.png'),
          img3 : require('@/assets/img/ins/file.png'),
          img4 : require('@/assets/img/ins/file.png'),
          img5 : require('@/assets/img/ins/file.png'),
          img6 : require('@/assets/img/ins/file.png'),
          img7 : require('@/assets/img/ins/file.png'),
          img8 : require('@/assets/img/ins/file.png'),
          img9 : require('@/assets/img/ins/file.png'),
          img10 : require('@/assets/img/ins/file.png'),
          img11 : require('@/assets/img/ins/file.png'),
          img12 : require('@/assets/img/ins/file.png')
        },
        imgs: [  // 示例图片
          require('@/assets/img/ins/1.png'),
          require('@/assets/img/ins/2.png'),
          require('@/assets/img/ins/3.png'),
          require('@/assets/img/ins/4.png'),
          require('@/assets/img/ins/5.png'),
          require('@/assets/img/ins/6.png'),
          require('@/assets/img/ins/7.png'),
          require('@/assets/img/ins/8.png'),
          require('@/assets/img/ins/9.png'),
          require('@/assets/img/ins/10.png'),
          require('@/assets/img/ins/11.png'),
          require('@/assets/img/ins/12.png'),
          require('@/assets/img/ins/13.png')
        ],
        initialIndex: 0,  // 显示大图索引
        dataImg: false,  // 判断用户是否上传了图片
      }
    },
    methods: {
      // 返回支付页
      toInsDet() {
        if (this.dataImg) {
          this.$createDialog({
            type: 'confirm',
            icon: 'cubeic-alert',
            title: '是否放弃本次编辑？',
            content: '退出本页面后，已经编辑好的内容将被清空！',
            confirmBtn: {
              text: '是',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            cancelBtn: {
              text: '否',
              active: false,
              disabled: false,
              href: 'javascript:;'
            },
            onConfirm: () => {
              // 确定
              this.$router.push('/inspay');
            },
            onCancel: () => {
              // 取消
            }
          }).show()
        } else {
          this.$router.push('/inspay');
        }
      },
      // 提交用户信息页
      toInsPer() {
        this.$router.push('/insper');
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
            _self.dataImg = true;
          }
        } else {
          this.$createToast({
            time: 1500,
            txt: '图片格式仅支持PNG或JPG',
            type: 'warn'
          }).show()
        }
      },
      // 显示大图
      handleImgsClick(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.imgs,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false,
            speed: 100
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params
        }).show()
      }

    },
    mounted() {
      // 解决内容太多滚动条不到底部问题
      setTimeout(() => {
        this.update = ['解决滑动问题'];
      }, 1500)
    }
  }
</script>

<style scoped="scoped">
  .ins-bus .header {
    font-size: .3rem;
    height: .9rem;
    line-height: .9rem;
    position: relative;
    border-bottom: #eaeaea 1px solid;
  }

  .ins-bus .header span {
    position: absolute;
    left: 0;
    width: .8rem;
    text-align: center;
  }

  .ins-bus .ins-cont {
    position: fixed;
    width: 100%;
    top: .9rem;
    left: 0;
    bottom: 0;
  }

  .ins-bus .ins-cont .scroll-list-wrap {
    height: 100%;
  }

  .cont-list .list-phone {
    margin: 0 .2rem;
    border-bottom: #dfdfdf .1px solid;
  }

  .cont-list .list-phone label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: .98rem;
    width: 90%;
    line-height: .98rem;
  }

  .cont-list .list-phone span {}

  .cont-list .list-phone input {
    background: none;
    height: .9rem;
    width: 4rem;
  }

  .cont-list .cont-img {
    padding: 0 .2rem;
  }

  .cont-list .cont-img>h3 {
    padding-top: .64rem;
    height: .42rem;
    line-height: .42rem;
    text-align: left;
  }

  .cont-list .cont-img>p {
    word-break: break-all;
    text-align: left;
    line-height: .3rem;
    font-size: .2rem;
    color: #e5000c;
  }

  .cont-list .cont-img>div {
    margin-top: .24rem;
    display: flex;
    align-items: center;
  }

  .cont-list .cont-img>div div {
    flex: 4;
    overflow: hidden;
    /* max-height: 3rem; */
  }

  .cont-list .cont-img>div div img {
    height: 2.6rem;
    width: 100%;
  }

  .cont-list .cont-img>div div:first-child {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .cont-list .cont-img>div div:first-child input {
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  .cont-list .cont-img>div span {
    flex: 1;
    color: #aeb7c6;
    font-size: .2rem;
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
    .ins-bus .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .ins-bus .ins-cont {
      bottom: .54rem;
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .ins-bus .ins-cont {
      bottom: .54rem;
    }
  }
</style>
