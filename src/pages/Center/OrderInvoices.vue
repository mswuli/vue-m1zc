<template>
	<div class="OrderInvoice">
		<div class="header">
			<span class="iconfont" @click="toOrderAll">&#xe606;</span>
			查看发票信息
		</div>
		<div class="select">
			<div :class="{checked: checkedA}" v-show="checkedA">个人户</div>
			<div :class="{checked: checkedB}" v-show="checkedB">公司户</div>
		</div>
		
		<ul v-show="checkedA">
			<li class="title">
				开票人信息：<span><input type="text" placeholder="" v-model="dataList.contact_name" readonly></span>
			</li>
			<li class="title">
				开票人电话：<span><input type="text" placeholder="" v-model="dataList.tel" readonly></span>
			</li>
			
			<li class="add">
				<p>地址：</p>
				<div>
					<span style="color: #333;">{{dataList.province}} {{dataList.city}} {{dataList.district}}</span>
					<!-- <span class="iconfont">&#xe65f;</span> -->
				</div>
				<textarea name="" id="" cols="30" rows="10" placeholder="" v-model="dataList.address" readonly></textarea>
			</li>
			
			<li class="title">
				身份证号码：<span><input type="text" placeholder="" readonly v-model="dataList.card_no"></span>
			</li>
			
			<li class="cred">
				<h3>身份证照片：</h3>
				<dl>
					<dt>
						<div>
							<!-- <input @change="uploadXin($event)" type="file"> -->
							<img :src="dataList.card_a" alt="">
						</div>
						<div>
							<!-- <input @change="uploadJia($event)" type="file"> -->
							<img :src="dataList.card_b" alt="">
						</div>
					</dt>
					<!-- <dd>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/zhengmsfz.png')" alt="">
						</div>
						<div>
							<p>示例</p>
							<img :src="require('@/assets/img/center/fanzhao.png')" alt="">
						</div>
					</dd> -->
				</dl>
			</li>
			<!-- <li class="butt" :class="{checked: imgCode.xin&&imgCode.jia}" @click="upPhoto">提交审核</li> -->
		</ul>
		
		<ul v-show="checkedB">
			<li class="title">
				公司名称：<span><input type="text" placeholder="" readonly v-model="dataLists.acount_name"></span>
			</li>
			<li class="title">
				联系人姓名：<span><input type="text" placeholder="" readonly v-model="dataLists.contact_name"></span>
			</li>
			<li class="title">
				联系人电话：<span><input type="text" placeholder="" readonly v-model="dataLists.tel"></span>
			</li>
			<li class="add">
				<p>地址：</p>
				<div>
					<span style="color: #333;">{{dataLists.province}} {{dataLists.city}} {{dataLists.district}}</span>
					<!-- <span class="iconfont">&#xe65f;</span> -->
				</div>
				<textarea name="" id="" cols="30" rows="10" placeholder="" readonly v-model="dataLists.address"></textarea>
			</li>
			
			<li class="title">
				社会统一信用号：<span><input type="text" placeholder="" readonly v-model="dataLists.card_no"></span>
			</li>
			
			<li class="cred">
				<h3>营业执照照片：</h3>
				<dl>
					<dt>
						<div>
							<!-- <input @change="upLicense($event)" type="file"> -->
							<img :src="dataLists.business_license" alt="">
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
			<!-- <li class="butt" :class="{checked: imgCode.xin&&imgCode.jia}" @click="upPhoto">提交审核</li> -->
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
				checkedA: false,
				checkedB: false,
				dataList: {},
				dataLists: {}
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
					console.log(imgcode)
					_self.imgCode.License = imgcode;
					_self.example.yinye = imgcode;
				}
			},
			
			
			
			//上传图片
			getPhotoInfo(xin,jia){
				const url = this.$store.state.Yi + 'index/my/carrenzhen';
				axios.post(url,qs.stringify({
					Jias: xin,
					xins: jia,
					type1: 0,
					type2: 0
				})).then(
					(res) => {
						console.log(res)
					}
				)
			},
			//提交
			upPhoto(){
				if(this.imgCode.xin || this.imgCode.jia){
					const toast = this.$createToast({
						txt: '请添加证件照片！',
						type: 'error',
						time: 1500
					})
					toast.show();
				}else{
					console.log(this.imgCode.xin,this.imgCode.jia)
					//this.getPhotoInfo(this.imgCode.xin,this.imgCode.jia)
				}
			},
			
			
			//获取数据个人
			getInvInfo(){
				const url = this.$store.state.Yi + 'index/my/individualInvoice';
				axios.get(url,{
					params:{
						token: localStorage.token,
						orderId: this.$route.query.order_id,
						orderSn: this.$route.query.order_sn
					}
				}).then(
					(res) => {
						//console.log(res.data)
						if(res.data.error == "0"){
							this.checkedA = true;
							this.dataList = res.data.data;
						}
						
					}
				)
			},
			//获取数据公司
			getInvInfos(){
				const url = this.$store.state.Yi + 'index/my/companyInvoice';
				axios.get(url,{
					params:{
						token: localStorage.token,
						orderId: this.$route.query.order_id,
						orderSn: this.$route.query.order_sn
					}
				}).then(
					(res) => {
						console.log(res.data)
						if(res.data.error == "0"){
							this.checkedB = true;
							this.dataLists = res.data.data;
						}
					}
				)
			},
			
		},
		mounted() {
			this.getInvInfo()
			this.getInvInfos()
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
