<template>
  <div class="insurance-detail">

    <div class="header">
      <span class="iconfont" @click="toInsInd">&#xe606;</span>
      选择保险
      <span class="add">中国人民保险</span>
    </div>

    <div class="total">
      <span>本页保费总计：</span>
      <span>￥ <span>6,672</span> 元</span>
    </div>

    <div class="content">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :options="options">

          <div class="title">
            <span></span>
            <h3><span class=""></span> 中规 Cayenne 基础款（无空气悬挂）2019款 3.0T 汽油 四驱 <span>个人</span></h3>
            <span>更改</span>
          </div>

          <div class="ins-imp">
            <div class="imp-title">
              <span></span>
              <h3>平行进口车质保</h3>
              <span>3年6万公里</span>
            </div>

            <ul class="imp-scheme">
              <li>
                <span>方案</span>
                <span>1站车售价</span>
              </li>
              <li @click.self="ipmShows">
                <span @click.self="ipmShows">经济保修方案 <span>详情</span> </span>
                <span @click.self="ipmShows">
                  4100 元
                  <span @click.self="ipmShows" v-if="ipmShow" class="iconfont">&#xe65e;</span>
                  <span @click.self="ipmShows" v-else class="iconfont">&#xe65f;</span>
                </span>
              </li>
            </ul>

            <collapse-transition>
              <ul class="imp-select" v-show="ipmShow">
                <li :class="{active: impAct == 1}" @click="impSelect(1)">
                  <span>综合保修方案(需搭配商业险)</span>
                  <span>8,200 元</span>
                </li>
                <li :class="{active: impAct == 2}" @click="impSelect(2)">
                  <span>重要部件保修方案</span>
                  <span>5,740 元</span>
                </li>
                <li :class="{active: impAct == 3}" @click="impSelect(3)">
                  <span>经济保修方案</span>
                  <span>4,100 元</span>
                </li>
              </ul>
            </collapse-transition>

          </div>

          <div class="ins-list">
            <h3 class="ins-title">商业险</h3>
            <ul class="ins-class">
              <li class="active">基本保障</li>
              <li>高性价比</li>
              <li>全面保障</li>
              <li>个性化定制</li>
            </ul>

            <collapse-transition>
              <ul class="ins-pro" v-show="insShow">
                <li>
                  <div>保障项目</div>
                  <div>保额</div>
                  <div>1站车保费</div>
                </li>

                <li>
                  <div class="pro-first">
                    <div>
                      <span class="iconfont">&#xe624;</span>
                      <p>机动车辆损失险</p>
                    </div>
                    <div @click="insLimitShow">
                      36800 元
                      <span v-if="!insLimit" class="iconfont">&#xe65f;</span>
                      <span v-else class="iconfont">&#xe65e;</span>
                    </div>
                    <div>
                      <p class="ins-yzc">3249 元</p>
                      <p class="ins-rb">6630 元</p>
                    </div>
                  </div>
                  <collapse-transition>
                    <div class="pro-last" v-show="insLimit">
                      <span class="active">1,000,000</span>
                      <span>1,000,000</span>
                      <span>1,000,000</span>
                      <span>不投保</span>
                    </div>
                  </collapse-transition>
                </li>

              </ul>
            </collapse-transition>

            <div class="ins-total" @click="insShows">
              <div>{{insMsg}}</div>
              <div>
                <p class="total-money">4608 元</p>
                <p>商业险1站车补贴高达51% 原价:<span>9402元</span></p>
              </div>
            </div>

            <ul class="ins-footer">
              <li>
                <div>
                  <!-- <span class="iconfont">&#xe831;</span> -->
                  <span class="iconfont active">&#xe641;</span>
                  <p>交强险</p>
                </div>
                <div>
                  6座以下(含6座)
                </div>
                <div>
                  950 元
                </div>
              </li>
              <li>
                <div>
                  <span class="iconfont">&#xe831;</span>
                  <p>车船税</p>
                </div>
                <div>
                  1.6L-2.0L(含)
                </div>
                <div>
                  240 元
                </div>
              </li>
              <li>
                <div>
                  交强险及车船税合计：
                </div>
                <div></div>
                <div>
                  1190 元
                </div>
              </li>
            </ul>

            <p class="ins-remarks">
              注：商业险以实际出单为准
            </p>

          </div>

        </cube-scroll>
      </div>

      <div class="ins-footer-nav">
        <div class="first">
        	<div class="service">
        		<p><span class="iconfont">&#xe621;</span></p>
        		<p>客服</p>
        	</div>
        	<div class="shopCar service">
        		<p><span class="iconfont">&#xe610;</span></p>
        		<p>加入购物车</p>
        	</div>
        </div>
        <div class="go" @click="toInsPay">确认订单</div>
      </div>

    </div>

  </div>
</template>

<script>
  import collapseTransition from '@/assets/collapseTransition'

  export default {
    name: 'InsuranceDetail',
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
        ipmShow: true,
        impAct: 1,
        insShow: true,
        insMsg: '收起不计免赔特约险',
        insLimit: false,
      }
    },
    methods: {
      // 回到保险页
      toInsInd() {
        this.$router.push('/insind');
      },
      // 显示平行进口车方案
      ipmShows() {
        this.ipmShow = !this.ipmShow;
      },
      // 选择平行进口方案
      impSelect(a) {
        this.impAct = a;
      },
      // 显示商业保险
      insShows() {
        this.insShow = !this.insShow;
        if (this.insShow) {
          this.insMsg = '收起不计免赔特约险';
        } else {
          this.insMsg = '展开不计免赔特约险';
        }
      },
      // 显示保额
      insLimitShow() {
        this.insLimit = !this.insLimit;
      },
      // 如果是平行进口跳转到支付页
      toInsPay() {
        this.$router.push('/inspay');
      }
    },
    components: {
      collapseTransition
    },
  }
</script>

<style scoped="scoped">
  .insurance-detail .header {
    position: relative;
    height: .9rem;
    font-size: .32rem;
    line-height: .9rem;
    border-bottom: #dfdfdf 1px solid;
  }

  .insurance-detail .header .iconfont {
    position: absolute;
    height: .9rem;
    width: .9rem;
    left: 0;
    text-align: center;
  }

  .insurance-detail .header .add {
    position: absolute;
    left: auto;
    right: .2rem;
    height: .9rem;
    color: #999;
    font-size: .24rem;
    line-height: .9rem;
  }

  .insurance-detail .total {
    display: flex;
    padding: 0 .2rem;
    height: .8rem;
    border-bottom: #dfdfdf .1rem solid;
    line-height: .8rem;
    font-size: .3rem;
  }

  .insurance-detail .total>span {
    flex: 1;
    text-align: left;
  }

  .insurance-detail .total>span:last-child {
    text-align: right;
  }

  .insurance-detail .total>span span {
    color: #e5000c;
  }

  .insurance-detail .content {
    position: fixed;
    top: 1.8rem;
    left: 0;
    bottom: .98rem;
    width: 100%;
  }

  .scroll-list-wrap {
    height: 100%;
  }

  .scroll-list-wrap .title {
    display: flex;
    padding: 0 .2rem;
    border-bottom: #dfdfdf .1px solid;
    height: 1.08rem;
    line-height: 1.08rem;
    font-size: .24rem;
  }

  .scroll-list-wrap .title span {
    flex: 1;
    text-align: right;
    color: #1d4faa;
  }

  .scroll-list-wrap .title h3 {
    flex: 4;
    margin-top: 0.11rem;
    line-height: .44rem;
    display: -webkit-box;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .scroll-list-wrap .title h3 span {
    padding: 0 1px 0px 1px;
    border: #ccc .1px solid;
    color: #999;
    font-size: .18rem;
    border-radius: 2px;
  }

  .scroll-list-wrap .ins-imp {
    border-bottom: #dfdfdf 1px solid;
  }

  .scroll-list-wrap .ins-imp .imp-title {
    display: flex;
    padding: 0 .2rem;
    border-bottom: #dfdfdf .1px solid;
    height: .8rem;
    font-size: .3rem;
    line-height: .8rem;
  }

  .ins-imp .imp-title span {
    flex: 2;
    color: #999;
    font-size: .2rem;
  }

  .ins-imp .imp-title h3 {
    flex: 3;
  }

  .ins-imp .imp-scheme li {
    display: flex;
    padding: 0 .2rem;
    height: .8rem;
    line-height: .8rem;
    border-bottom: #dfdfdf 1px solid;
  }

  .ins-imp .imp-scheme li>span {
    flex: 1;
    text-align: left;
  }

  .ins-imp .imp-scheme li>span span {
    color: #1D4FAA;
    font-size: .22rem;
  }

  .ins-imp .imp-scheme li>span:last-child {
    text-align: right;
  }

  .ins-imp .imp-select {
    padding: .2rem .2rem;
    background-color: #f0eff5;
  }

  .ins-imp .imp-select li {
    display: flex;
    padding: .14rem .1rem;
    border: #999 1px solid;
    border-radius: .1rem;
    margin-top: .2rem;
  }

  .ins-imp .imp-select .active {
    border: #e5000c 1px solid;
  }

  .ins-imp .imp-select li:first-child {
    margin-top: 0;
  }

  .ins-imp .imp-select li span {
    flex: 2;
    color: #666;
    font-size: .24rem;
    text-align: left;
  }

  .ins-imp .imp-select .active span {
    color: #e5000c;
  }

  .ins-imp .imp-select li span:last-child {
    flex: 1;
    text-align: right;
  }

  .scroll-list-wrap .ins-list .ins-title {
    padding: 0 .2rem;
    border-bottom: #dfdfdf 1px solid;
    height: .8rem;
    font-size: .3rem;
    line-height: .8rem;
  }

  .scroll-list-wrap .ins-list .ins-class {
    display: flex;
    border-bottom: #dfdfdf 1px solid;
    height: .85rem;
    color: #999;
    line-height: .85rem;
  }

  .ins-list .ins-class li {
    flex: 1;
    font-size: .26rem;
  }

  .ins-list .ins-class .active {
    color: #1d4faa;
    font-weight: 500;
  }

  .scroll-list-wrap .ins-pro {}

  .scroll-list-wrap .ins-pro li:first-child {
    padding: 0 .2rem;
    display: flex;
    height: .85rem;
    color: #000;
    font-size: .24rem;
    line-height: .85rem;
    border-bottom: #dfdfdf .1px solid;
  }

  .ins-pro li:first-child div {
    flex: 3;
  }

  .ins-pro li:first-child div:first-child {
    flex: 4;
    text-align: left;
    display: flex;
  }

  .ins-pro li:first-child div:last-child {
    flex: 2;
    text-align: right;
  }

  .ins-pro li .pro-first {
    padding: 0 .2rem;
    display: flex;
    height: .85rem;
    color: #888;
    font-size: .24rem;
    line-height: .85rem;
    border-bottom: #dfdfdf .1px solid;
  }

  .ins-pro li .pro-first div {
    flex: 3;
  }

  .ins-pro li .pro-first div:first-child {
    flex: 4;
    text-align: left;
    display: flex;
  }

  .ins-pro li .pro-first div:last-child {
    flex: 2;
    text-align: right;
  }

  .ins-pro li .pro-first div span {
    font-size: .24rem;
    color: #000;
    font-weight: bold;
  }

  .ins-pro li .pro-first div:first-child {
    display: flex;
  }

  .ins-pro li .pro-first div:first-child span {
    flex: 1;
    color: #e5000c;
    font-size: .3rem;
    font-weight: normal;
  }

  .ins-pro li .pro-first div:first-child p {
    flex: 7;
  }

  .ins-pro li .pro-first div:last-child p {
    float: left;
    height: .42rem;
    width: 100%;
    line-height: .44rem;
    text-align: right;
  }

  .ins-pro li .pro-first div:last-child .ins-yzc {
    color: #e5000c;
  }

  .ins-pro li .pro-first div:last-child .ins-rb {
    text-decoration: line-through;
  }

  .ins-pro li .pro-last {
    background-color: #f0eff5;
    padding: 0 .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .85rem;
    color: #888;
    font-size: .24rem;
    border-bottom: #dfdfdf .1px solid;
  }

  .ins-pro li .pro-last span {
    background-color: #fff;
    padding: .16rem .1rem;
    border-radius: .08rem;
    border: #999 1px solid;
    font-weight: 500;
  }

  .ins-pro li .pro-last .active {
    border: #e5000c 1px solid;
    color: #e5000c;
  }

  .scroll-list-wrap .ins-total {
    display: flex;
    height: .86rem;
    line-height: .86rem;
    padding: 0 .2rem;
    border-bottom: #dfdfdf 1px solid;
  }

  .scroll-list-wrap .ins-total div {
    flex: 2;
    font-size: .24rem;
    text-align: left;
  }

  .scroll-list-wrap .ins-total div:first-child {
    color: #1d4faa;
  }

  .scroll-list-wrap .ins-total div:last-child {
    flex: 3;
  }

  .scroll-list-wrap .ins-total div:last-child p {
    float: left;
    height: .44rem;
    width: 100%;
    line-height: .44rem;
    text-align: right;
    font-size: .2rem;
  }

  .scroll-list-wrap .ins-total div:last-child p span {
    text-decoration: line-through;
  }

  .scroll-list-wrap .ins-total div:last-child .total-money {
    font-size: .24rem;
    color: #e5000c;
  }

  .scroll-list-wrap .ins-footer {
    border-top: #dfdfdf .1rem solid;
  }

  .scroll-list-wrap .ins-footer li {
    display: flex;
    padding: 0 .2rem;
    height: .85rem;
    color: #888;
    font-size: .24rem;
    line-height: .85rem;
    border-bottom: #dfdfdf .1px solid;
  }

  .ins-footer li div {
    flex: 3;
  }

  .ins-footer li div:first-child {
    flex: 4;
    text-align: left;
    display: flex;
  }

  .ins-footer li div:first-child span {
    flex: 1;
  }

  .ins-footer li div:first-child .active {
    color: #e5000c;
  }

  .ins-footer li div:first-child p {
    flex: 6;
  }

  .ins-footer li div:last-child {
    flex: 2;
    text-align: right;
    color: #e5000c;
  }

  .scroll-list-wrap .ins-remarks {
    padding: 0 .2rem;
    height: .8rem;
    line-height: .8rem;
    text-align: right;
    color: #e5000c;
  }

  .insurance-detail .ins-footer-nav {
    background-color: #f7f7f7;
    position: fixed;
    display: flex;
    z-index: 10;
    height: .98rem;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .ins-footer-nav>div {
  	flex: 1;
  }

  .ins-footer-nav .first {
  	flex: 1;
  }

  .ins-footer-nav .first div {
  	float: left;
  	width: 50%;
  	height: 100%;
  }

  .ins-footer-nav .first .service {
  	padding-top: 0.05rem;
  	border-right: 1px solid #e0e0e0;
  	box-sizing: border-box;
  	font-size: 0.24rem;
  }

  .ins-footer-nav .first .service p {
  	margin-top: 0.05rem;
  }

  .ins-footer-nav .first .service .iconfont {
  	font-size: 0.5rem;
  }

  .ins-footer-nav .first .shopCar .iconfont {
  	font-size: 0.5rem;
  }

  .ins-footer-nav .contrast {
  	line-height: 1rem;
  	background-color: #333333;
  	color: #fff;
  	font-size: 0.34rem;
  	position:relative;
  }

  .ins-footer-nav .contrast img{
  	position:absolute;
  	width:16px;
  	height:16px;
  	border-radius: 50%;
  	top:0;
  	left:50%;
  }

  .ins-footer-nav .go {
  	line-height: 1rem;
  	background-color: #e5000c;
  	color: #fff;
  	font-size: 0.34rem;
  }

  /* iPhoneX,iPhoneXs的适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .insurance-detail .ins-footer-nav {
      bottom: .54rem;
    }

    .insurance-detail .content {
      bottom: 1.52rem
    }
  }

  /* iPhoneXs Max的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .insurance-detail .ins-footer-nav {
      bottom: .54rem;
    }

    .insurance-detail .content {
      bottom: 1.52rem
    }
  }

  /* iPhoneXr的适配*/
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .insurance-detail .ins-footer-nav {
      bottom: .54rem;
    }

    .insurance-detail .content {
      bottom: 1.52rem
    }
  }
</style>
