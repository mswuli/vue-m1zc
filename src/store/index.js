import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultTime = false;

try {
	if (localStorage.token) {
		const time = Date.parse(new Date()) / 1000;
		if (time > localStorage.expire) {
			defaultTime = false; //过期退出登录
			localStorage.removeItem('token'); //清除登录的key
		} else {
			defaultTime = true;
		}
	} else {
		defaultTime = false; //没有token
	}
} catch (e) {
	//处理异常
	//this.$router.push('异常页面');
}

export default new Vuex.Store({
	state: {
		expireTime: defaultTime,  //记录是否登录
		orderNext: false,  //订单下一步
		GoBack: null, //记录跳入的页面路径
		usesData: "",  //QQ授权的个人信息暂存
		// Yi: "https://m.1zhanche.com/",  //打包APP时填写将域名填写再此　　https://m.1zhanche.com/
		// Maps: "https://restapi.amap.com/",  //打包APP时填写将域名填写再此   https://restapi.amap.com/
		// QQtoken: "https://graph.qq.com/",  //打包APP时填写将域名填写再此   https://graph.qq.com/
		Yi:"",
		login_type: "1",  //0为pc端 1为app  2为手机端
		isapp: true,   //是APP时true，否则false
		keepAliveOne: ['tabBar','MallSearchs',"ArticlesSearchs","InsuranceIndex"],  //页面缓存一级路由
		keepAliveTwo: ['Mall','Articles'],  //页面缓存二级路由
	},
	actions: {
		changeExpireTime(ctNx, expireTime) {
			this.commit("setExpireTime", expireTime); //这里是调用mutations里面的方法
		},
		changeNext(ctNx, orderNext) {
			this.commit("setNext", orderNext);
		},
		changeBack(ctNx, GoBack) {
			this.commit("setBack", GoBack);
		},
		changeUsesdata(ctNx, usesData) {
			this.commit("setUsesdata", usesData);
		},
	},
	mutations: {
		setExpireTime(state, expireTime) {
			this.state.expireTime = expireTime;
		},
		setNext(state, orderNext) {
			this.state.orderNext = orderNext;
		},
		setBack(state, GoBack) {
			this.state.GoBack = GoBack;
		},
		setUsesdata(state, usesData) {
			this.state.usesData = usesData;
		},
		setKeepAliveOne(state, keepAliveOne){
			this.state.keepAliveOne = keepAliveOne;
		},
		setKeepAliveTwo(state, keepAliveTwo){
			this.state.keepAliveTwo = keepAliveTwo;
		},
	}
})
