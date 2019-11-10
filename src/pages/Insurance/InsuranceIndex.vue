<template>
  <div class="Insurance">
    <div class="header">
      <span class="iconfont">&#xe606;</span>
      选择投保车辆
      <span class="add">寻找车辆</span>
    </div>
    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :options="options">

          <dl>
            <dt>
              <h3>车辆类型</h3>
            </dt>
            <dd class="type">
              <span :class="{active: carClass == '新车投保'}" @click="selectCar('新车投保')">新车投保</span>
              <span class="empty"></span>
              <span :class="{active: carClass == '旧车投保'}" @click="selectCar('旧车投保')">旧车投保</span>
            </dd>
          </dl>

          <dl>
            <dt>
              <h3>投保城市</h3>
            </dt>
            <dd>
              <p @click="showAddressPicker()">{{province}} {{city}}</p>
            </dd>
          </dl>

          <dl>
            <dt>
              <h3>投保类型</h3>
            </dt>
            <dd class="type">
              <span :class="{active: insClass == '个人'}" @click="selectIns('个人')">个人</span>
              <span class="empty"></span>
              <span :class="{active: insClass == '公司'}" @click="selectIns('公司')">公司</span>
            </dd>
          </dl>

          <dl>
            <dt>
              <h3>版本</h3>
            </dt>
            <dd class="versions">
              <div>
                <span
                :class="{first: index == 0, active: index == activeFirst}"
                :key="index"
                @click="selectVersions(index, 'first', item.fine_car_name)"
                v-for="(item,index) in versionsFirst">{{item.fine_car_name}}</span>
              </div>
              <div>
                <span
                :class="{first: index == 0, active: index == activeLast}"
                :key="index"
                @click="selectVersions(index, 'last', item.fine_car_name)"
                v-for="(item,index) in versionsLast">{{item.fine_car_name}}</span>
              </div>
            </dd>
          </dl>

          <dl v-if="dataPicker.logo_name.length > 0">
            <dt>
              <h3>品牌</h3>
              <!-- <span>选择 <span class="iconfont">&#xe65f;</span></span> -->
            </dt>
            <dd>
              <p @click="showPicker1">{{logo_name}}</p>
            </dd>
          </dl>

          <dl v-if="dataPicker.m_name.length > 0">
            <dt>
              <h3>车系</h3>
            </dt>
            <dd>
              <p @click="showPicker2">{{m_name}}</p>
            </dd>
          </dl>

          <dl v-if="dataPicker.fine_name.length > 0">
            <dt>
              <h3>系列</h3>
            </dt>
            <dd>
              <p @click="showPicker3">{{fine_name}}</p>
            </dd>
          </dl>

          <dl v-if="dataPicker.in_paragraph.length > 0">
            <dt>
              <h3>年款</h3>
            </dt>
            <dd>
              <p @click="showPicker4">{{in_paragraph}}</p>
            </dd>
          </dl>

          <dl v-if="dataPicker.displacement.length > 0">
            <dt>
              <h3>排量</h3>
            </dt>
            <dd>
              <p @click="showPicker5">{{displacement}}</p>
            </dd>
          </dl>

          <dl v-if="dataPicker.fuel.length > 0">
            <dt>
              <h3>油品</h3>
            </dt>
            <dd>
              <p @click="showPicker6">{{fuel}}</p>
            </dd>
          </dl>

          <div class="ins-butt" @click.self="toInsDet">提交</div>

        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '@/assets/provincesData' //导入城市数据
  import axios from 'axios'
  import qs from 'qs'

  // 转换城市数据格式
  const provinces = [];
  const city = [];
  for (let i in data.GP) {
    provinces.push({
      value: data.GP[i],
      text: data.GP[i],
      children: []
    })
  }
  for (let n in data.GT) {
    for (let j in data.GT[n]) {
      provinces[n].children.push({
        value: data.GT[n][j],
        text: data.GT[n][j],
      })
    }
  }

  export default {
    name: 'InsuranceIndex',
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
        carClass: '',  // 车辆类型
        insClass: '',  // 投保类型
        province: '点击选择投保城市...',  // 投保省
        city: '',  // 投保城市
				provinces: '',  // 投保省
				citys: '',  // 投保城市
        versionsFirst: [], // 版本第一行
        versionsLast: [], // 版本第二行
        activeFirst: 999, // 版本第一行选中
        activeLast: 999, // 版本第二行选中
        fine_car_name: "", // 车源版本
        logo_name: "点击选择品牌...", // 品牌
        m_name: "点击选择车系...", // 车系
        fine_name: "点击选择系列...", // 细分车型
        in_paragraph: "点击选择年款...", // 年款
        displacement: "点击选择排量...", // 排量
        fuel: "点击选择油品...",  // 油品
        dataPicker: {
          logo_name: [],
          m_name: [],
          fine_name: [],
          in_paragraph: [],
          displacement: [],
          fuel: []
        }, //储存Picker数据
      }
    },
    methods: {
      //跳转下一页
      toInsDet(){
        console.log(this.carClass, this.insClass, this.provinces ,this.citys ,this.fine_car_name, this.logo_name, this.m_name, this.fine_name, this.in_paragraph, this.displacement, this.fuel);

        if (this.carClass == 0) {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择车辆类型！'
          }).show()
          return false;
        }

        if (this.city == '') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择投保城市！'
          }).show()
          return false;
        }

        if (this.insClass == 0) {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择投保类型！'
          }).show()
          return false;
        }

        if (this.fine_car_name == '') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择版本！'
          }).show()
          return false;
        }

        if (this.logo_name == '点击选择品牌...') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择品牌！'
          }).show()
          return false;
        }

        if (this.m_name == '点击选择车系...') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择车系！'
          }).show()
          return false;
        }

        if (this.fine_name == '点击选择系列...') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择系列！'
          }).show()
          return false;
        }

        if (this.in_paragraph == '点击选择年款...') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择年款！'
          }).show()
          return false;
        }

        if (this.displacement == '点击选择排量...') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择排量！'
          }).show()
          return false;
        }

        if (this.fuel == '点击选择油品...') {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt:  '请选择油品！'
          }).show()
          return false;
        }


        this.$router.push('/insdet');
      },
      // 车辆类型
      selectCar(a) {
        this.carClass = a;
      },
      // 投保城市
      selectIns(a) {
        this.insClass = a;
      },
      // 显示省市选择
      showAddressPicker() {
        this.addressPicker.show()
      },
      //点击确定后触发
      selectHandle(selectedVal, selectedIndex, selectedText) {
				this.provinces = selectedText[0];
				this.citys = selectedText[1];
        this.province = selectedText[0] + '省 - ';
        this.city = selectedText[1] + '市';
      },
      //请求版本
      getBanbenInfo() {
        const url = this.$store.state.Yi + 'index/VehicleInsurance/getBanben';
        axios.post(url).then(
          (res) => {
            for (let i in res.data.data) {
              if (i < 4) {
                this.versionsFirst.push(res.data.data[i]);
              } else {
                this.versionsLast.push(res.data.data[i]);
              }
            }
          }
        )
      },
      // 选择版本
      selectVersions(a, b, c) {
        if (b == "first") {
          this.activeLast = 999;
          this.activeFirst = a;
          this.fine_car_name = c;
          this.logo_name = "点击选择品牌...";
          this. m_name = "点击选择车系...";
          this.dataPicker.m_name = [];
          this.fine_name =  "点击选择系列..."
          this.dataPicker.fine_name = [];
          this.in_paragraph =  "点击选择年款..."
          this.dataPicker.in_paragraph = [];
          this.displacement =  "点击选择排量..."
          this.dataPicker.displacement = [];
          this.fuel =  "点击选择油品..."
          this.dataPicker.fuel = [];
          this.getConditionInfo(1);
        }
        if (b == "last") {
          this.activeFirst = 999;
          this.activeLast = a;
          this.fine_car_name = c;
          this.logo_name = "点击选择品牌...";
          this. m_name = "点击选择车系...";
          this.dataPicker.m_name = [];
          this.fine_name =  "点击选择系列..."
          this.dataPicker.fine_name = [];
          this.in_paragraph =  "点击选择年款..."
          this.dataPicker.in_paragraph = [];
          this.displacement =  "点击选择排量..."
          this.dataPicker.displacement = [];
          this.fuel =  "点击选择油品..."
          this.dataPicker.fuel = [];
          this.getConditionInfo(1);
        }
      },
      // 请求其它详细数据
      getConditionInfo(a) {
        const url = this.$store.state.Yi + 'index/VehicleInsurance/conditionAjax';
        axios.post(url, qs.stringify({
          fine_car_name: this.fine_car_name,
          logo_name: this.logo_name,
          m_name: this.m_name,
          fine_name: this.fine_name,
          in_paragraph: this.in_paragraph,
          displacement: this.displacement,
          towhere: a
        })).then(
          (res) => {
            // console.log(res.data.res);
            if(a == 1){
              this.dataPicker.logo_name = [];
              for (let i in res.data.res) {
                this.dataPicker.logo_name.push({
                  text: res.data.res[i].logo_name,
                  value: res.data.res[i].logo_name
                })
              }
            }

            if(a == 2){
              this.dataPicker.m_name = [];
              for (let i in res.data.res) {
                this.dataPicker.m_name.push({
                  text: res.data.res[i].m_name,
                  value: res.data.res[i].m_name
                })
              }
            }

            if(a == 3){
              this.dataPicker.fine_name = [];
              for (let i in res.data.res) {
                this.dataPicker.fine_name.push({
                  text: res.data.res[i].fine_name,
                  value: res.data.res[i].fine_name
                })
              }
            }

            if(a == 4){
              this.dataPicker.in_paragraph = [];
              for (let i in res.data.res) {
                this.dataPicker.in_paragraph.push({
                  text: res.data.res[i].in_paragraph,
                  value: res.data.res[i].in_paragraph
                })
              }
            }

            if(a == 5){
              this.dataPicker.displacement = [];
              for (let i in res.data.res) {
                this.dataPicker.displacement.push({
                  text: res.data.res[i].displacement,
                  value: res.data.res[i].displacement
                })
              }
            }

            if(a == 6){
              this.dataPicker.fuel = [];
              for (let i in res.data.res) {
                this.dataPicker.fuel.push({
                  text: res.data.res[i].fuel,
                  value: res.data.res[i].fuel
                })
              }
            }
          }
        )
      },
      // 选择品牌
      showPicker1() {
        if (!this.picker1) {
          this.picker1 = this.$createPicker({
            title: '选择品牌',
            maskClosable: false,
            data: [this.dataPicker.logo_name],
            onSelect: this.selectHandle1
          })
        }
        this.picker1.show()
        this.picker1.$updateProps({
          title: '选择品牌',
          data: [this.dataPicker.logo_name],
        })
      },
      selectHandle1(selectedVal, selectedIndex, selectedText) {
        this. m_name = "点击选择车系...";
        this.fine_name =  "点击选择系列..."
        this.dataPicker.fine_name = [];
        this.in_paragraph =  "点击选择年款..."
        this.dataPicker.in_paragraph = [];
        this.displacement =  "点击选择排量..."
        this.dataPicker.displacement = [];
        this.fuel =  "点击选择油品..."
        this.dataPicker.fuel = [];
        this.logo_name = selectedVal.join(', ');
        this.getConditionInfo(2);
      },
      // 选择品牌
      showPicker2() {
        if (!this.picker2) {
          this.picker2 = this.$createPicker({
            title: '选择车系',
            maskClosable: false,
            data: [this.dataPicker.m_name],
            onSelect: this.selectHandle2
          })
        }
        this.picker2.show()
        this.picker2.$updateProps({
          title: '选择车系',
          data: [this.dataPicker.m_name],
        })
      },
      selectHandle2(selectedVal, selectedIndex, selectedText) {
        this.fine_name =  "点击选择系列..."
        this.in_paragraph =  "点击选择年款..."
        this.dataPicker.in_paragraph = [];
        this.displacement =  "点击选择排量..."
        this.dataPicker.displacement = [];
        this.fuel =  "点击选择油品..."
        this.dataPicker.fuel = [];
        this.m_name = selectedVal.join(', ');
        this.getConditionInfo(3);
      },
      // 选择系列
      showPicker3() {
        if (!this.picker3) {
          this.picker3 = this.$createPicker({
            title: '选择系列',
            maskClosable: false,
            data: [this.dataPicker.fine_name],
            onSelect: this.selectHandle3
          })
        }
        this.picker3.show()
        this.picker3.$updateProps({
          title: '选择系列',
          data: [this.dataPicker.fine_name],
        })
      },
      selectHandle3(selectedVal, selectedIndex, selectedText) {
        this.in_paragraph =  "点击选择年款..."
        this.displacement =  "点击选择排量..."
        this.dataPicker.displacement = [];
        this.fuel =  "点击选择油品..."
        this.dataPicker.fuel = [];
        this.fine_name = selectedVal.join(', ');
        this.getConditionInfo(4);
      },
      // 选择年款
      showPicker4() {
        if (!this.picker4) {
          this.picker4 = this.$createPicker({
            title: '选择系列',
            maskClosable: false,
            data: [this.dataPicker.in_paragraph],
            onSelect: this.selectHandle4
          })
        }
        this.picker4.show()
        this.picker4.$updateProps({
          title: '选择系列',
          data: [this.dataPicker.in_paragraph],
        })
      },
      selectHandle4(selectedVal, selectedIndex, selectedText) {
        this.displacement =  "点击选择排量..."
        this.fuel =  "点击选择油品..."
        this.dataPicker.fuel = [];
        this.in_paragraph = selectedVal.join(', ');
        this.getConditionInfo(5);
      },
      // 选择排量
      showPicker5() {
        if (!this.picker5) {
          this.picker5 = this.$createPicker({
            title: '选择系列',
            maskClosable: false,
            data: [this.dataPicker.displacement],
            onSelect: this.selectHandle5
          })
        }
        this.picker5.show()
        this.picker5.$updateProps({
          title: '选择系列',
          data: [this.dataPicker.displacement],
        })
      },
      selectHandle5(selectedVal, selectedIndex, selectedText) {
        this.fuel =  "点击选择油品..."
        this.displacement = selectedVal.join(', ');
        this.getConditionInfo(6);
      },
      // 选择油品
      showPicker6() {
        if (!this.picker6) {
          this.picker6 = this.$createPicker({
            title: '选择系列',
            maskClosable: false,
            data: [this.dataPicker.fuel],
            onSelect: this.selectHandle6
          })
        }
        this.picker6.show()
        this.picker6.$updateProps({
          title: '选择系列',
          data: [this.dataPicker.fuel],
        })
      },
      selectHandle6(selectedVal, selectedIndex, selectedText) {
        this.fuel = selectedVal.join(', ');
      },
    },
    mounted() {
      //省级联动
      this.addressPicker = this.$createCascadePicker({
        title: '选择城市', //自定义标题
        data: provinces,
        swipeTime: 1000,
        maskClosable: false,
        selectedIndex: [4, 14],
        onSelect: this.selectHandle
      })
      //请求车源版本数据
      this.getBanbenInfo()
    }
  }
</script>

<style scoped="scoped">
  .Insurance .header {
    position: relative;
    height: .9rem;
    font-size: .32rem;
    line-height: .9rem;
    border-bottom: #dfdfdf 1px solid;
  }

  .Insurance .header .iconfont {
    position: absolute;
    height: .9rem;
    width: .9rem;
    left: 0;
    text-align: center;
  }

  .Insurance .header .add {
    position: absolute;
    left: auto;
    right: .2rem;
    height: .9rem;
    color: #3562b7;
    font-size: .24rem;
    line-height: .9rem;
  }

  .Insurance .content {
    position: fixed;
    top: .9rem;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .scroll-list-wrap {
    height: 100%;
  }

  .scroll-list-wrap dl {
    padding: 0 .2rem;
  }

  .scroll-list-wrap dl dt {
    display: flex;
    height: .98rem;
    line-height: .98rem;
    text-align: left;
  }

  .scroll-list-wrap dl dt h3 {
    flex: 4;
    font-size: .32rem;
  }

  .scroll-list-wrap dl dt span {
    flex: 1;
    text-align: right;
    color: #3562b7;
    font-size: .24rem;
  }

  .scroll-list-wrap dl dd {
    height: .98rem;
    line-height: .98rem;
  }

  .scroll-list-wrap dl dd span {
    font-size: .28rem;
    border: #e0e0e0 1px solid;
    box-sizing: border-box;
  }

  .scroll-list-wrap dl dd .active {
    background-color: #333;
    color: #fff;
  }

  .scroll-list-wrap dl .type {
    display: flex;
  }

  .scroll-list-wrap dl .type span {
    flex: 1;
    margin-top: .19rem;
    height: .6rem;
    line-height: .6rem;
    border-radius: .1rem;
  }

  .scroll-list-wrap dl .type .empty {
    flex: .1;
    border: none;
  }

  .scroll-list-wrap dl .versions {
    height: auto;
  }

  .scroll-list-wrap dl .versions div {
    display: flex;
    margin-bottom: .2rem;
  }

  .scroll-list-wrap dl .versions div:last-child {
    margin-bottom: 0;
  }

  .scroll-list-wrap dl .versions span {
    align-items: center;
    justify-content: center;
    width: 22%;
    height: .6rem;
    line-height: .6rem;
    border-radius: .1rem;
    margin-left: 4%;
  }

  .scroll-list-wrap dl .versions .first {
    margin-left: 0%;
  }

  .scroll-list-wrap dl dd p {
    display: inline-block;
    height: .6rem;
    line-height: .6rem;
    box-sizing: border-box;
    width: 100%;
    border: #e0e0e0 1px solid;
    border-radius: .1rem;
  }

  .scroll-list-wrap .ins-butt {
    margin: .3rem .2rem .2rem .2rem;
    background-color: #e5000c;
    height: .94rem;
    line-height: .94rem;
    border-radius: .1rem;
    font-size: .35rem;
    color: #fff;
  }

  /* iPhoneX,iPhoneXs的适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .Insurance .content {
      bottom: .54rem;
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .Insurance .content {
      bottom: .54rem;
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .Insurance .content {
      bottom: .54rem;
    }
  }
</style>
