<template>
	<div class="CarEcho">
		<div class="header">
			<span class="iconfont" @click="toCarAdmini">&#xe606;</span>
			车主认证
			<span v-show="license_type == 0">(未提交认证)</span>
			<span v-show="license_type == 1">(成功)</span>
			<span v-show="license_type == 2">(失败)</span>
			<span v-show="license_type == 3">(审核中)</span>
		</div>
		
		<ul>
			<li class="title">
				品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：<span>{{name}}</span>
			</li>
			<li class="title">
				车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<span>{{series}}</span>
			</li>
			<li class="cred">
				<h3>证件图</h3>
				<dl>
					<!-- <dt>
						<div>
							<input @change="uploadXin($event)" type="file">
							<img :src="example.xin" alt="">
						</div>
						<div>
							<input @change="uploadJia($event)" type="file">
							<img :src="example.jia" alt="">
						</div>
					</dt> -->
					<dd>
						<div>
							<p>驾驶证</p>
							<img :src="example.jia" alt="">
						</div>
						<div>
							<p>行驶证</p>
							<img :src="example.xin" alt="">
						</div>
					</dd>
				</dl>
			</li>
			<!-- <li class="butt" :class="{checked: imgCode.xin&&imgCode.jia}" @click="upPhoto">提交</li> -->
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'CarEcho',
		data(){
			return{
				imgCode:{  //存储base64图片数据
					xin: "",
					jia: ""
				},
				example:{  //例子
					xin: require('@/assets/img/center/exgxinshi.png'),
					jia: require('@/assets/img/center/exgjiashi.png')
				},
				name: "",
				series: "",
				license_type: ""
			}
		},
		methods: {
			toCarAdmini(){
				this.$router.push('/CarAdmini');
			},
			
			getname(){
				const url = this.$store.state.Yi + 'index/My/carownercheck';
				axios.post(url,qs.stringify({
					token: localStorage.token,
					id: this.$route.query.id
				})).then(
					(res) => {
						console.log(res.data)
						this.name = res.data.data.autocertification.logo_name;
						this.series = res.data.data.autocertification.m_name;
						this.example.jia = res.data.data.autocertification.driver_license;
						this.example.xin = res.data.data.autocertification.driving_license;
						this.license_type = res.data.data.autocertification.license_type;
					}
				)
				
				
			},
			
			//上传行驶证
			// uploadXin(e) {
			// 	let _self = this;
			// 	// 利用fileReader对象获取file
			// 	var file = e.target.files[0];
			// 	var filesize = file.size;
			// 	var filename = file.name;
			// 	// 2,621,440   2M
			// 	if (filesize > 2101440) {
			// 		// 图片大于2MB
			// 	}
			// 	var reader = new FileReader();
			// 	reader.readAsDataURL(file);
			// 	reader.onload = function (e) {
			// 		// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
			// 		var imgcode = e.target.result;
			// 		_self.imgCode.xin = imgcode;
			// 		_self.example.xin = imgcode;
			// 	}
			// },
			// //上传驾驶证
			// uploadJia(e) {
			// 	const _self = this;
			// 	// 利用fileReader对象获取file
			// 	var file = e.target.files[0];
			// 	var filesize = file.size;
			// 	var filename = file.name;
			// 	// 2,621,440   2M
			// 	if (filesize > 2101440) {
			// 		// 图片大于2MB
			// 	}
			// 	var reader = new FileReader();
			// 	reader.readAsDataURL(file);
			// 	reader.onload = function (e) {
			// 		// 读取到的图片base64 数据编码 将此编码字符串传给后台即可
			// 		var imgcode = e.target.result;
			// 		_self.imgCode.jia = imgcode;
			// 		_self.example.jia = imgcode;
			// 	}
			// },
			// //上传图片
			// getPhotoInfo(xin,jia){
			// 	const url = this.$store.state.Yi + 'index/my/carrenzhen';
			// 	let token = localStorage.token;
			// 	if (!token) token = 0;
			// 	axios.post(url,qs.stringify({
			// 		token: token,
			// 		id: this.id,
			// 		jias: xin,
			// 		xins: jia,
			// 		type1: 0,
			// 		type2: 0
			// 	})).then(
			// 		(res) => {
			// 			//console.log(res)
			// 			if (res.data.error == 0) {
			// 				const toast = this.$createToast({
			// 					txt: '提交成功！',
			// 					type: 'correct',
			// 					time: 1000,
			// 					onTimeout: () => { //回调
			// 						this.$router.push('/CarAdmini');
			// 					}
			// 				})
			// 				toast.show()
			// 			} else if (res.data.error == 1) {
			// 				const toast = this.$createToast({
			// 					txt: '提交失败！',
			// 					type: 'error',
			// 					time: 1500
			// 				})
			// 				toast.show()
			// 			} else {
			// 				const toast = this.$createToast({
			// 					txt: '未知错误！',
			// 					type: 'error',
			// 					time: 1500
			// 				})
			// 				toast.show()
			// 			}
			// 		}
			// 	)
			// },
			// //提交
			// upPhoto(){
			// 	if(!this.imgCode.xin || !this.imgCode.jia){
			// 		const toast = this.$createToast({
			// 			txt: '请添加证件照片！',
			// 			type: 'error',
			// 			time: 1500
			// 		})
			// 		toast.show();
			// 	}else{
			// 		this.getPhotoInfo(this.imgCode.xin,this.imgCode.jia)
			// 	}
			// }
		},
		mounted() {
			this.getname()
		}
	}
</script>

<style scoped="scoped">
	.CarEcho .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.CarEcho .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.CarEcho ul{
		margin: 0 .2rem;
	}
	
	.CarEcho ul .title{
		height: 1rem;
		font-size: .28rem;
		line-height: 1rem;
		text-align: left;
		border-bottom: #ececec 1px solid;
	}
	
	.CarEcho ul .cred{
		padding-bottom: .2rem;
		border-bottom: #ececec 1px solid;
	}
	
	.CarEcho ul .cred h3{
		font-size: .3rem;
		height: 1rem;
		line-height: 1rem;
		text-align: left;
	}
	
	.CarEcho ul .cred dl dt{
		display: flex;
	}
	
	.CarEcho ul .cred dl dt div{
		flex: 1;
		position: relative;
	}
	
	.CarEcho ul .cred dl dt div input{
		position: absolute;
		height: 100%;
		width: 90%;
		left: 5%;
		top: 0;
		opacity: 0;
	}
	
	.CarEcho ul .cred dl dt div img{
		width: 90%;
	}
	
	.CarEcho ul .cred dl dd{
		display: flex;
	}
	
	.CarEcho ul .cred dl dd div{
		flex: 1;
		position: relative;
	}
	
	.CarEcho ul .cred dl dd div p{
		color: #8e9bb1;
		height: 1rem;
		line-height: 1rem;
	}
	.CarEcho ul .cred dl dd div img{
		width: 90%;
	}
	
	.CarEcho ul .butt{
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
	
	.CarEcho ul .checked{
		background-color: #e5000c;
	}
</style>
