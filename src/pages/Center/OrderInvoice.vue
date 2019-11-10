<template>
	<div class="OrderInvoice">
		<div class="header">
			<span class="iconfont" @click="toOrderAll">&#xe606;</span>
			填写发票信息
		</div>
		<div class="select">
			<div :class="{checked: checkedA}" @click="selectInvA">个人户</div>
			<div :class="{checked: checkedB}" @click="selectInvB">公司户</div>
		</div>
		
		<ul v-show="checkedA">
			<li class="title">
				开票人信息：<span><input type="text" placeholder="请填写姓名" v-model="oneMen.msg1"></span>
			</li>
			<li class="title">
				开票人电话：<span><input type="text" placeholder="请填写电话" v-model="oneMen.msg2"></span>
			</li>
			
			<li class="add">
				<p>地址：</p>
				<div @click="showAddressPicker">
					<span><input type="text" placeholder="选择地址" readonly="readonly"  v-model="oneMen.msg3"></span>
					<span class="iconfont">&#xe65f;</span>
				</div>
				<textarea name="" id="" cols="30" rows="10" placeholder="请输入详细地址,如街道门牌号等"  v-model="oneMen.msg4"></textarea>
			</li>
			
			<li class="title">
				身份证号码：<span><input type="text" placeholder="请填写身份证号码"  v-model="oneMen.msg5"></span>
			</li>
			
			<li class="cred">
				<h3>身份证照片：</h3>
				<dl>
					<dt>
						<div>
							<input @change="uploadXin($event)" type="file">
							<img :src="example.xin" alt="">
						</div>
						<div>
							<input @change="uploadJia($event)" type="file">
							<img :src="example.jia" alt="">
						</div>
					</dt>
					<dd>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/zhengmsfz.png')" alt="">
						</div>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/fanzhao.png')" alt="">
						</div>
					</dd>
				</dl>
			</li>
			<li class="butt checked" @click="upPhoto">提交审核</li>
		</ul>
		
		<ul v-show="checkedB">
			<li class="title">
				公司名称：<span><input type="text" placeholder="请填写公司名称" v-model="corporation.msg1"></span>
			</li>
			<li class="title">
				联系人姓名：<span><input type="text" placeholder="请填写姓名" v-model="corporation.msg2"></span>
			</li>
			<li class="title">
				联系人电话：<span><input type="text" placeholder="请填写电话" v-model="corporation.msg3"></span>
			</li>
			<li class="add">
				<p>地址：</p>
				<div @click="showAddressPickers">
					<span><input type="text" placeholder="选择地址" readonly="readonly" v-model="corporation.msg4"></span>
					<span class="iconfont">&#xe65f;</span>
				</div>
				<textarea name="" id="" cols="30" rows="10" placeholder="请输入详细地址,如街道门牌号等" v-model="corporation.msg5"></textarea>
			</li>
			
			<li class="title">
				社会统一信用号：<span><input type="text" placeholder="请填写身份证号码" v-model="corporation.msg6"></span>
			</li>
			
			<li class="cred">
				<h3>营业执照照片：</h3>
				<dl>
					<dt>
						<div>
							<input @change="upLicense($event)" type="file">
							<img :src="example.yinye" alt="">
						</div>
					</dt>
					<!-- <dd>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/jias.png')" alt="">
						</div>
					</dd> -->
				</dl>
			</li>
			<li class="butt checked" @click="upPhotos">提交审核</li>
		</ul>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'OrderInvoice',
		data(){
			return{
				imgCode:{  //存储base64图片数据
					idcard_a: "",
					idcard_b: "",
					License: ""
				},
				example:{  //例子
					xin: require('@/assets/img/center/shenfaz1.png'),
					jia: require('@/assets/img/center/shenfaz2.png'),
					yinye: require('@/assets/img/center/yinye.png')
				},
				checkedA: true,
				checkedB: false,
				oneMen: {
					msg1: "",
					msg2: "",
					msg3: "",
					msg3_1: "",
					msg3_2: "",
					msg3_3: "",
					msg4: "",
					msg5: ""
				},
				corporation: {
					msg1: "",
					msg2: "",
					msg3: "",
					msg4: "",
					msg4_1: "",
					msg4_2: "",
					msg4_3: "",
					msg5: "",
					msg6: ""
				},
				toasts: this.$createToast({type: 'loading',mask: true,time: 0})
			}
		},
		methods:{
			toOrderAll(){
				this.$router.push({
					path: '/OrderAll',
					query: {
						current: this.$route.query.current
					}
				});
			},
			//切换公司或个人
			selectInvA(){
				this.checkedA = true;
				this.checkedB = false;
			},
			selectInvB(){
				this.checkedA = false;
				this.checkedB = true;
			},
			
			//上传身份证正面
			uploadXin(e) {
				const _self = this;
				// 利用fileReader对象获取file
				var file = e.target.files[0];
				var filesize = file.size;
				var filename = file.name;
				// 2,621,440   2M
				if (filesize > 2101440) {
					// 图片大于2MB
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function (e) {
					// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
					var imgcode = e.target.result;
					_self.imgCode.idcard_a = imgcode;
					_self.example.xin = imgcode;
				}
			},
			//上传身份证反面
			uploadJia(e) {
				const _self = this;
				// 利用fileReader对象获取file
				var file = e.target.files[0];
				var filesize = file.size;
				var filename = file.name;
				// 2,621,440   2M
				if (filesize > 2101440) {
					// 图片大于2MB
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function (e) {
					// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
					var imgcode = e.target.result;
					_self.imgCode.idcard_b = imgcode;
					_self.example.jia = imgcode;
				}
			},
			//上传营业执照
			upLicense(e){
				const _self = this;
				// 利用fileReader对象获取file
				var file = e.target.files[0];
				var filesize = file.size;
				var filename = file.name;
				// 2,621,440   2M
				if (filesize > 2101440) {
					// 图片大于2MB
				}
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function (e) {
					// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
					var imgcode = e.target.result;
					// console.log(imgcode)
					_self.imgCode.License = imgcode;
					_self.example.yinye = imgcode;
				}
			},
			//验证公司名
			msgNames(a) {
				if (a.length < 2) {
					const toast = this.$createToast({
						txt: '公司名称长度不少于2位！',
						type: 'error',
						time: 1500
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证身份证
			IdentityCodeValid(code) {
				var city = {
					11: "北京",
					12: "天津",
					13: "河北",
					14: "山西",
					15: "内蒙古",
					21: "辽宁",
					22: "吉林",
					23: "黑龙江 ",
					31: "上海 ",
					32: "江苏 ",
					33: "浙江 ",
					34: "安徽 ",
					35: "福建 ",
					36: "江西 ",
					37: "山东 ",
					41: "河南 ",
					42: "湖北 ",
					43: "湖南 ",
					44: "广东 ",
					45: "广西 ",
					46: "海南 ",
					50: "重庆 ",
					51: "四川 ",
					52: "贵州 ",
					53: "云南 ",
					54: "西藏 ",
					61: "陕西 ",
					62: "甘肃 ",
					63: "青海 ",
					64: "宁夏 ",
					65: "新疆 ",
					71: "台湾 ",
					81: "香港 ",
					82: "澳门 ",
					91: "国外 "
				};
				var tip = "";
				var pass = true;
				if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
					tip = "身份证号格式错误";
					pass = false;
				} else if (!city[code.substr(0, 2)]) {
					tip = "地址编码错误";
					pass = false;
				} else {
					//18位身份证需要验证最后一位校验位
					if (code.length == 18) {
						code = code.split('');
						//∑(ai×Wi)(mod 11)
						//加权因子
						var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
						//校验位
						var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
						var sum = 0;
						var ai = 0;
						var wi = 0;
						for (var i = 0; i < 17; i++) {
							ai = code[i];
							wi = factor[i];
							sum += ai * wi;
						}
						var last = parity[sum % 11];
						if (parity[sum % 11] != code[17]) {
							tip = "校验位错误";
							pass = false;
						}
					}
				}
				if (!pass) {
					const toast = this.$createToast({
						txt: '身份证号码输入有误！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
				}
			
				return pass;
			},
			//验证姓名
			msgName(a) {
				if (a.length < 2) {
					const toast = this.$createToast({
						txt: '姓名长度不少于2位！',
						type: 'error',
						time: 1500
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证地址
			addrs(a){
				if(a == ""){
					const toast = this.$createToast({
						txt: '请添选择地址！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//详细地址
			addrsList(a){
				if(a.length == 0){
					const toast = this.$createToast({
						txt: '请填写详细地址！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证手机号码
			isPhone(phone) {
				if (phone == null || phone == '') {
					const toast = this.$createToast({
						txt: '请输入手机号码！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				}
				//验证号码
				var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
				if (!phoneReg.test(phone)) {
					const toast = this.$createToast({
						txt: '请输入正确的手机号码！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证图片个人
			imgTrue() {
				if (!this.imgCode.idcard_a || !this.imgCode.idcard_b) {
					const toast = this.$createToast({
						txt: '请添加证件照片！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			//验证图片公司
			imgTrues() {
				if (!this.imgCode.License) {
					const toast = this.$createToast({
						txt: '请添加证件照片！',
						type: 'error',
						time: 1500,
						mask: true
					})
					toast.show();
					return false;
				} else {
					return true;
				}
			},
			
			
			//上传信息 个人
			getPhotoInfo(xin,jia){
				this.toasts.show()
				const url = this.$store.state.Yi + 'index/my/invoiceAjax';
				axios.post(url,qs.stringify({
					token: localStorage.token,
					order_id: this.$route.query.order_id,
					order_sn: this.$route.query.order_sn,
					acount_name: this.oneMen.msg1,
					contact_name: this.oneMen.msg1,
					tel: this.oneMen.msg2,
					province: this.oneMen.msg3_1,
					city: this.oneMen.msg3_2,
					district: this.oneMen.msg3_3,
					address: this.oneMen.msg4,
					card_no: this.oneMen.msg5,
					invoice_type: "1",
					idcard_a: this.imgCode.idcard_a,
					idcard_b: this.imgCode.idcard_b
				})).then(
					(res) => {
						//console.log(res.data)
						this.toasts.hide()
						if(res.data.error == "0"){
							const toast = this.$createToast({
								txt: '提交成功！',
								type: 'correct',
								time: 1000,
								mask: true,
								onTimeout: () => {   //回调
									this.toOrderAll();
								}
							})
							toast.show()
						}else if(res.data.error == "1"){
							const toast = this.$createToast({
								txt: '提交失败！',
								type: 'error',
								time: 1000,
								mask: true
							})
							toast.show()
						}else{
							const toast = this.$createToast({
								txt: '未知错误！',
								type: 'error',
								time: 1000,
								mask: true
							})
							toast.show()
						}
					}
				)
			},
			
			//上传信息 公司
			getPhotoInfos(xin,jia){
				this.toasts.show()
				const url = this.$store.state.Yi + 'index/my/invoiceAjax';
				axios.post(url,qs.stringify({
					token: localStorage.token,
					order_id: this.$route.query.order_id,
					order_sn: this.$route.query.order_sn,
					acount_name: this.corporation.msg1,
					contact_name: this.corporation.msg2,
					tel: this.corporation.msg3,
					province: this.corporation.msg4_1,
					city: this.corporation.msg4_2,
					district: this.corporation.msg4_3,
					address: this.corporation.msg5,
					card_no: this.corporation.msg6,
					invoice_type: "2",
					license: this.imgCode.License
				})).then(
					(res) => {
						//console.log(res.data)
						this.toasts.hide()
						if(res.data.error == "0"){
							const toast = this.$createToast({
								txt: '提交成功！',
								type: 'correct',
								time: 1000,
								mask: true,
								onTimeout: () => {   //回调
									this.toOrderAll();
								}
							})
							toast.show()
						}else if(res.data.error == "1"){
							const toast = this.$createToast({
								txt: '请输入正确的统一社会信用号！',
								type: 'error',
								time: 1000,
								mask: true
							})
							toast.show()
						}else{
							const toast = this.$createToast({
								txt: '未知错误！',
								type: 'error',
								time: 1000,
								mask: true
							})
							toast.show()
						}
					}
				)
			},
			
			//提交个人
			upPhoto(){
				if(this.msgName(this.oneMen.msg1)&&this.isPhone(this.oneMen.msg2)&&this.addrs(this.oneMen.msg3)&&this.addrsList(this.oneMen.msg4)&&this.IdentityCodeValid(this.oneMen.msg5)&&this.imgTrue()){
					this.getPhotoInfo();
				}
			},
			//提交公司
			upPhotos(){
				if(this.msgNames(this.corporation.msg1)&&this.msgName(this.corporation.msg2)&&this.isPhone(this.corporation.msg3)&&this.addrs(this.corporation.msg4)&&this.addrsList(this.corporation.msg5)&&this.imgTrues()){
					this.getPhotoInfos();
				}
			},

			//显示省级联动
			getPrvInfo(){
				const url = this.$store.state.Yi + 'index/My/tree';
				axios.post(url).then(
					(res) => {
						//console.log(res.data);
						let cascadeDate = [];
						let sheng = [];
						let shi = [];
						let qu = [];
						
						for(let i in res.data){
							if(res.data[i].type == 1){
								sheng.push({
									id: res.data[i].id,
									name: res.data[i].name,
								})
							}
							if(res.data[i].type == 2){
								shi.push({
									id: res.data[i].id,
									pid: res.data[i].pid,
									name: res.data[i].name,
								})
							}
							if(res.data[i].type == 3){
								qu.push({
									id: res.data[i].id,
									pid: res.data[i].pid,
									name: res.data[i].name,
								})
							}
						}
						
						for(let n in sheng){
							cascadeDate.push({
								value: sheng[n].name,
								text: sheng[n].name,
								children: []
							})
							for(let m in shi){
								if(sheng[n].id == shi[m].pid){
									cascadeDate[n].children.push({
										value: shi[m].name,
										text: shi[m].name,
										id: shi[m].id,
										children: []
									})
								}
							}
						}
						
						for(let b in cascadeDate){
							for(let v in cascadeDate[b].children){
								 //console.log(cascadeDate[b].children[v])
								for(let u in qu){
									if(cascadeDate[b].children[v].id == qu[u].pid){
										cascadeDate[b].children[v].children.push({
											value: qu[u].name,
											text: qu[u].name
										})
									}
								}
							}
						}
						
						//console.log(cascadeDate)
						
						//省级联动个人
						this.addressPicker = this.$createCascadePicker({
							title: '选择城市',  //自定义标题
							data: cascadeDate,
							swipeTime: 2000,
							// maskClosable: false,
							onSelect: this.selectHandle
						})
						
						//省级联动公司
						this.addressPickers = this.$createCascadePicker({
							title: '选择城市',  //自定义标题
							data: cascadeDate,
							swipeTime: 2000,
							// maskClosable: false,
							onSelect: this.selectHandles
						})
						
					}
				)
				
			},
			
			//显示省市选择个人
			showAddressPicker() {
				this.addressPicker.show()
			},
			//点击确定后触发
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.oneMen.msg3_1 = selectedVal[0];
				this.oneMen.msg3_2 = selectedVal[1];
				this.oneMen.msg3_3 = selectedVal[2];
				this.oneMen.msg3 = selectedVal.join(' ');
			},
			//显示省市选择公司
			showAddressPickers() {
				this.addressPickers.show()
			},
			//点击确定后触发
			selectHandles(selectedVal, selectedIndex, selectedText) {
				this.corporation.msg4_1 = selectedVal[0];
				this.corporation.msg4_2 = selectedVal[1];
				this.corporation.msg4_3 = selectedVal[2];
				this.corporation.msg4 = selectedVal.join(' ');
			},
			
		},
		mounted() {
			this.getPrvInfo();
		}
	}
</script>

<style scoped="scoped">
	.OrderInvoice .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.OrderInvoice .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.OrderInvoice .select{
		display: flex;
		margin: 0 .2rem;
		height: .58rem;
		line-height: .58rem;
		border: #565f71 1px solid;
		border-radius: .1rem;
	}
	
	.OrderInvoice .select div{
		flex: 1;
	}
	
	.OrderInvoice .select .checked{
		background-color: #565f71;
		color: #fff;
	}
	
	.OrderInvoice ul{
		margin: 0 .2rem;
	}
	
	.OrderInvoice ul .title{
		height: 1rem;
		font-size: .28rem;
		line-height: 1rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}
	
	.OrderInvoice ul .add p{
		height: 1rem;
		font-size: .28rem;
		line-height: 1rem;
		text-align: left;
	}
	
	.OrderInvoice ul .add div{
		height: .64rem;
		border: #8e9bb1 1px solid;
		border-radius: .1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.OrderInvoice ul .add div span{
		margin: 0 .2rem;
		color: #999;
	}
	
	.OrderInvoice ul .add textarea{
		border: #8e9bb1 1px solid;
		border-radius: .1rem;
		height: 1.94rem;
		width: 100%;
		box-sizing: border-box;
		margin-top: .2rem;
		padding: .2rem;
	}
	
	.OrderInvoice ul .title span input{
		width: 170px;
		height: .92rem;
		line-height: .92rem;
	}
	
	.OrderInvoice ul .title span input::-webkit-input-placeholder{
		color: #999;
	}
	
	.OrderInvoice ul .add textarea::-webkit-input-placeholder{
		color: #999;
	}
		
	.OrderInvoice ul .cred{
		padding-bottom: .2rem;
		border-bottom: #ececec 1px solid;
	}
	
	.OrderInvoice ul .cred h3{
		font-size: .3rem;
		height: 1rem;
		line-height: 1rem;
		text-align: left;
	}
	
	.OrderInvoice ul .cred dl dt{
		display: flex;
	}
	
	.OrderInvoice ul .cred dl dt div{
		flex: 1;
		position: relative;
	}
	
	.OrderInvoice ul .cred dl dt div input{
		position: absolute;
		height: 100%;
		width: 90%;
		left: 5%;
		top: 0;
		opacity: 0;
	}
	
	.OrderInvoice ul .cred dl dt div img{
		width: 90%;
	}
	
	.OrderInvoice ul .cred dl dd{
		display: flex;
	}
	
	.OrderInvoice ul .cred dl dd div{
		flex: 1;
		position: relative;
	}
	
	.OrderInvoice ul .cred dl dd div p{
		color: #8e9bb1;
		height: 1rem;
		line-height: 1rem;
	}
	.OrderInvoice ul .cred dl dd div img{
		width: 90%;
	}
	
	.OrderInvoice ul .butt{
		font-size: .32rem;
		color: #fff;
		font-weight: 600;
		margin-top: .4rem;
		margin-bottom: .4rem;
		height: 1rem;
		line-height: 1rem;
		border-radius: .1rem;
		background-color: #eaeaea;
	}
	
	.OrderInvoice ul .checked{
		background-color: #e5000c;
	}
</style>
