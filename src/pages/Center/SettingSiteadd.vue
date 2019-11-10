<template>
	<div class="SettingSiteadd">
		<div class="header">
			<span class="iconfont" @click="toSettingSite">&#xe606;</span>
			新增收货地址
			<span class="add" @click="getSiteInfo">完成</span>
		</div>
		
		<ul>
			<li>
				<div class="title">您的姓名：</div>
				<div class="inp">
					<input type="text" placeholder="收货人姓名" v-model="msg9">
				</div>
			</li>
			<li>
				<div class="title">所在地区：</div>
				<div class="inp" @click='showAddressPicker()'>
					<input type="text" placeholder="点击选择" readonly :value="msg1">
				</div>
			</li>
			<li>
				<div class="title">详细地址：</div>
				<div class="inp">
					<input type="text" placeholder="如街道名称/门牌号码/等详细信息" v-model="msg2">
				</div>
			</li>
			<li>
				<div class="title">邮政编码：</div>
				<div class="inp">
					<input type="text" placeholder="000000" v-model="msg3">
				</div>
			</li>
			<li>
				<div class="title">手机号码：</div>
				<div class="inp">
					<input type="text" placeholder="请填写收货人手机号码" v-model="msg4">
				</div>
			</li>
			<li class="tel">
				<div class="title tel">电话号码：</div>
				<div class="inp telinp">
					<input type="text" placeholder="区号" v-model="msg5">
					<input type="text" placeholder="电话号码" v-model="msg6">
					<input type="text" placeholder="分机号码" v-model="msg7">
				</div>
			</li>
			<li class="checked">
					<div class="label" @click="checkedMsg8">
						<span :class="{active: msg8}"></span>
					</div>
					<p>设置为默认收货地址</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	
	export default{
		name: 'SettingSiteadd',
		data(){
			return{
				msg1: "",
				msg1_1: "",
				msg1_2: "",
				msg1_3: "",
				msg2: "",
				msg3: "",
				msg4: "",
				msg5: "",
				msg6: "",
				msg7: "",
				msg8: 0,
				msg9: ""
			}
		},
		methods: {
			toSettingSite() {
				this.$router.push('/SettingSite')
			},
			
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
						
						//省级联动
						this.addressPicker = this.$createCascadePicker({
							title: '选择城市',  //自定义标题
							data: cascadeDate,
							swipeTime: 2000,
							// maskClosable: false,
							onSelect: this.selectHandle,
							onCancel: this.cancelHandle
						})
						
					}
				)
				
			},
			
			//显示省市选择
			showAddressPicker() {
				this.addressPicker.show()
			},
			//点击确定后触发
			selectHandle(selectedVal, selectedIndex, selectedText) {
				this.msg1_1 = selectedVal[0];
				this.msg1_2 = selectedVal[1];
				this.msg1_3 = selectedVal[2];
				this.msg1 = selectedVal.join(' ');
			},
			//点击取消后触发
			cancelHandle() {} ,
			//设置默认地址
			checkedMsg8(){
				if(this.msg8 == 1){
					this.msg8 = 0;
				}else{
					this.msg8 = 1;
				}
			},
			//验证用户名
			userName(username){
				if(username.length < 2){
					const toast = this.$createToast({
						txt: '姓名必须大于2个字符！',
						type: 'error',
						time: 1500
					})
					toast.show();
				    return false;
				}else{
					return true;
				}
			},
			//验证地区
			site1(a){
				if(!a){
					const toast = this.$createToast({
						txt: '请填写所在地区！',
						type: 'error',
						time: 1500
					})
					toast.show();
					return false;
				}else{
					return true;
				}
			},
			//验证详细地址
			site2(a){
				if(!a){
					const toast = this.$createToast({
						txt: '请填写详细地址！',
						type: 'error',
						time: 1500
					})
					toast.show();
					return false;
				}else{
					return true;
				}
			},
			//验证手机号码
			isPhone(phone){
			    if(phone == null || phone == ''){
					const toast = this.$createToast({
			        	txt: '请输入手机号码！',
			        	type: 'error',
			        	time: 1500
			        })
			        toast.show();
			        return false;
			    }
			    //验证号码
			    var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
			    if(!phoneReg.test(phone)){
					const toast = this.$createToast({
						txt: '请输入正确的手机号码！',
						type: 'error',
						time: 1500
					})
					toast.show();
			        return false;
			    }else{
			        return true;
			    }
			},
			
			//提交数据
			getSiteInfo(){
				let token = localStorage.token;
				if (!token) token = 0;
				const url = this.$store.state.Yi + 'index/My/dzadd';
				
				if(this.userName(this.msg9)&&this.site1(this.msg1)&&this.site2(this.msg2)&&this.isPhone(this.msg4)){
					axios.post(url,qs.stringify({
						token: token,
						sheng: this.msg1_1,
						shi: this.msg1_2,
						xian: this.msg1_3,
						address: this.msg2,
						zipcode: this.msg3,
						shouhuoname: this.msg9,
						shoujihao: this.msg4,
						syu: '86',
						telquhao: this.msg5,
						telhao: this.msg6,
						telfenji: this.msg7,
						address_type: this.msg8
					})).then(this.getSiteSuc)
				}
			},
			getSiteSuc(res){
				if(res.data.error == 0){
					const toast = this.$createToast({
						txt: '添加成功！',
						type: 'correct',
						time: 1500,
						onTimeout: () => {   //回调
							this.$router.push('/SettingSite');
						}
					})
					toast.show()
				}else if(res.data.error == 1){
					const toast = this.$createToast({
						txt: '添加失败！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}else{
					const toast = this.$createToast({
						txt: '未知错误！',
						type: 'error',
						time: 1500
					})
					toast.show()
				}
			}
			
		},
		mounted() {
			this.getPrvInfo();
		}
	}
</script>

<style scoped="scoped">
	.SettingSiteadd .header{
		height: .9rem;
		line-height: .9rem;
		position: relative;
		font-size: .32rem;
	}
	
	.SettingSiteadd .header .iconfont{
		position: absolute;
		height: .9rem;
		width: .9rem;
		left: 0;
		text-align: center;
	}
	
	.SettingSiteadd .header .add{
		position: absolute;
		right: .2rem;
		height: .9rem;
		line-height: .9rem;
		color: #e5000c;
	}
	
	.SettingSiteadd ul{
		margin: 0 .2rem;
		text-align: left;
	}
	
	.SettingSiteadd ul li{
		position: relative;
		display: flex;
		border-bottom: #ececec 1px solid;
	}
	
	.SettingSiteadd ul>.tel{
		border-bottom: none;
	}
	
	.SettingSiteadd ul li .title{
		flex: 1;
		height: 1rem;
		line-height: 1rem;
	}
	
	.SettingSiteadd ul li>.tel{
		height: 3rem;
	}
	
	.SettingSiteadd ul li .inp{
		flex: 3;
		height: 1rem;
		line-height: 1rem;
	}
	
	.SettingSiteadd ul li .inp input{
		height: 92%;
		width: 100%;
	}
	
	.SettingSiteadd ul li .telinp input{
		border-bottom: #ececec 1px solid;
	}
	
	.SettingSiteadd ul li .inp input::-webkit-input-placeholder{
		color: #8e9bb1;
		font-size: .24rem;
	}
	
	.SettingSiteadd ul .checked{
		height: 1rem;
		line-height: 1rem;
		text-align: center;
	}
	
	.SettingSiteadd ul .checked p{
		/* width: 100%; */
		margin-left: 35%;
	}
	
	.SettingSiteadd ul .checked .label{
		position: absolute;
		width: .3rem;
		height: .3rem;
		border: 1px solid #333;
		border-radius: 50%;
		top: .32rem;
		left: 28%;
	}
	
	.SettingSiteadd ul .checked .label .active{
		position: absolute;
		width: .18rem;
		height: .18rem;
		background-color: #e5000c;
		border-radius: 50%;
		left: 3px;
		top: 3px
	}
</style>
