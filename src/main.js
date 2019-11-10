// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import axios from 'axios' //引入Ajax组件
import qs from 'qs' //引入qs组件
import vueSwiper from 'vue-awesome-swiper' //引入轮播组件
import store from './store/index.js' //引入vuex组件

import $ from 'jquery'
import Mui from 'vue-awesome-mui';
import 'swiper/dist/css/swiper.css' //引入轮播样式
import '@/assets/styles/reset.css' //初始化样式
import '@/assets/styles/iconfont.css' //引入字体图标

Vue.config.productionTip = false
Vue.use(vueSwiper) //使用轮播插件
Vue.use(Cube) //注册Cube
Vue.use(Mui)

//解决打包后点击返回就退出问题
mui.init({keyEventBind: {backbutton: true}})  //关闭back按键监听
let first = null;
let routeName = '';
const pagename = ['Mall','Articles','Trolley','Center'];
mui.back = function() {
	if(pagename.indexOf(routeName) == -1){
		history.go(-1);
	}else{
		if (!first) {
			first = new Date().getTime();
			mui.toast("再按一次退出应用");
			setTimeout(function() {first = null}, 1500);
		} else {
			if (new Date().getTime() - first < 1500) {
				plus.runtime.quit(); //那么就退出app
			}
		}
	}
}

//导航守卫
router.beforeEach((to, from, next) => {
	//将当前页面的name传给上面的函数做返回键监听
	routeName = to.name;

	//百度统计
	window._hmt.push(['_trackPageview','/#' + to.fullPath]);

	// 如果登录事件过期则清除并跳转到登录页面
	if (to.meta.requireAuth) {
		if (localStorage.token) {
			next()
		} else {
			next({
				path: '/AccountLogin',
				query: {
					redirect: from.fullPath
				}
			})
		}
	} else {
		next()
	}
});

//时间转换过滤器 年月日
const toTime = function(timestamp) {
	var date;
	if (timestamp !== undefined) {
		if (timestamp.toString().length < 13) {
			// 13位表示毫秒时间戳，10位表示秒数时间戳
			date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		} else {
			date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		}
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y + M + D;
	}
}

//时间转换过滤器 年月日 时分秒
const toTimes = function(timestamp) {
	var date;
	if (timestamp !== undefined) {
		if (timestamp.toString().length < 13) {
			// 13位表示毫秒时间戳，10位表示秒数时间戳
			date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		} else {
			date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		}
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y + M + D + h + m + s;
	}
}

//金额过滤器
const format_number = function(n) {
	if (n !== undefined) {
		var j = n.toString().indexOf(".") === -1 ? ".00" : n.toString().substring(n.toString().indexOf("."));
		var b = parseInt(n).toString();
		var len = b.length;
		if (len <= 3) {
			return (b + j) === "00" ? 0 : (b + j);
		}
		var r = len % 3;
		var s = r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(
			",");
		return s + j
	}
}

//金额过滤器：这个是不要小数点的
const geshihua = function(onum) {
	onum = onum + '';
	// onum=onum.toString();
	var res = /\s*/ig;
	onum = onum.replace(res, '');
	var oindex = onum.indexOf(".");
	if (oindex > -1) {
		onum = onum.slice(0, oindex);
	};

	if (onum.length == 0) {
		onum = "";
		return onum;
	};
	if (onum.indexOf(",") == -1) { /////如果输入的是带逗号的东西，那么默认这是不需要再进行转化的，直接原样返回
		var dataval = parseInt(onum);
		var isfeishu = isNaN(dataval);
		if (isfeishu) {
			return onum; ///////如果是非数字，则原样输出
		}
		var data2 = dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		return data2;
	} else {
		return onum;
	}
}

//每隔4个字符，增加一个空格显示
const setinputval = function(oval) {
	oval = delkongge(oval);
	var newval = "";
	for (var i = 0, len = oval.length; i < len; i++) {
		newval += oval[i];
		if ((i + 1) % 4 == 0) {
			newval += " ";
		}
	};
	return newval;
};


Vue.filter('toTime', toTime) //注册全局过滤器 年月日
Vue.filter('toTimes', toTimes) //注册全局过滤器 年月日时分秒
Vue.filter('format_number', format_number) //注册金额过滤器，带小数点
Vue.filter('geshihua', geshihua) //注册金额过滤器，不带小数点
Vue.filter('setinputval', setinputval) //每隔4个字符，增加一个空格显示

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store, //引入vuex组件
	components: {
		App
	},
	template: '<App/>'
})
