<template>
  <div id="app">
    <transition name="fade">
      <!-- 动态缓存 -->
      <keep-alive :include="keepAliveOne">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div class="box"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'App',
    watch: {
      '$route'(to, from) {
        if (to.name == "Mall" || to.name == "Articles") {
          this.$store.commit("setKeepAliveOne", ['tabBar'])
        }
        if (to.name == "MallSearchs" || to.name == "ArticlesSearchs") {
          this.$store.commit("setKeepAliveOne", ['tabBar', 'MallSearchs', "ArticlesSearchs"])
        }
      }
    },
    computed: {
      keepAliveOne() {
        return this.$store.state.keepAliveOne
      }
    },
    beforeCreate() {
      mui.plusReady(function() {
        plus.push.addEventListener("click", function(msg) {
          // 分析msg.payload处理业务逻辑
          console.log("You clicked: " + msg.content,msg.payload);
        }, false);
      })
    },
    methods: {
      //检查有没有在别的地方登入 如果有就删除token
      getTokenInfo() {
        let _self = this;
        const time = Date.parse(new Date()) / 1000;
        if (localStorage.token && localStorage.expire > time) {
          const url = this.$store.state.Yi + 'index/My/index';
          axios.post(url, qs.stringify({
            token: localStorage.token
          })).then(
            (res) => {
              if (res.data.type == "33") {
                localStorage.removeItem('token');
              }
            }
          )
        } else {
          localStorage.removeItem('token');
        }
      },
      //载入客服模块
      kel(w, d, n, a, j) {
        w[n] = w[n] || function() {
          return (w[n].a = w[n].a || []).push(arguments)
        };
        j = d.createElement('script');
        j.async = true;
        j.src = 'https://qiyukf.com/script/45195e7baee6ad8be789aa9b829aa568.js?hidden=1';
        d.body.appendChild(j);
      },
    },
    mounted() {
      this.kel(window, document, 'ysf');
    },
    updated() {
      this.getTokenInfo();
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
  }

  /* iPhoneX,iPhoneXs的适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .box {
      height: 27px;
      width: 100%;
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .box {
      height: 27px;
      width: 100%;
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .box {
      height: 27px;
      width: 100%;
    }
  }

  .fade-enter-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0.5;
  }
</style>
