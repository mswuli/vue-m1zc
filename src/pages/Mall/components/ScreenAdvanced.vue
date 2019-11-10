<template>
	<div class="advanced">
		<div class="header">
			<div class="navGo">
				<span class="iconfont" @click="toMallScreen">&#xe606;</span>
				高级筛选
				<span class="goMall" @click="toMall">确定</span>
			</div>
		</div>
		
		<div class="navLeft">
			<ul>
				<li 
				:class="{active: leftActive == index}" 
				@click="toRight($event,index);" 
				v-for="(item,index) in deploy"
				:key="index"
				>{{item}}</li>
			</ul>
		</div>
		
		<div class="navRight">
			<div class="list" ref="wrapper">
				<div>
				<!-- 车系 -->
				<dl>
					<dt class="mao">{{chexing.name}}</dt>
					<dd>
						<span 
						v-for="(item,index) in chexing.data" 
						:key="index" 
						:class="{active: chexing.active == index}"
						@click="chexingClick(index,item.fine_name)"
						>
						{{item.fine_name}}
						</span>
					</dd>
				</dl>
					<!-- 年款 -->
					<dl>
						<dt class="mao">{{niankuang.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in niankuang.data" 
							:key="index" 
							:class="{active: niankuang.active == index}"
							@click="niankuangClick(index,item.in_paragraph)"
							>
							{{item.in_paragraph}}
							</span>
						</dd>
					</dl>
					<!-- 版本 -->
					<dl>
						<dt class="mao">{{banben.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in banben.data" 
							:key="index" 
							:class="{active: banben.active == index}"
							@click="banbenClick(index,item.cartype_value)"
							>
							{{item.cartype_value}}
							</span>
						</dd>
					</dl>
					<!-- 车价 -->
					<dl>
						<dt class="mao">{{shop_price.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in shop_price.data" 
							:key="index" 
							:class="{active: shop_price.active == index}"
							@click="shop_priceClick(index,item.price_value)"
							>
							{{item.price_name}}
							</span>
						</dd>
					</dl>
					<!-- 外观 -->
					<dl>
						<dt class="mao">{{in_color.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in in_color.data" 
							:key="index" 
							:class="{active: in_color.active == index}"
							@click="in_colorClick(index,item.color_name)"
							>
							{{item.color_name}}
							</span>
						</dd>
					</dl>
					<!-- 内饰 -->
					<dl>
						<dt class="mao">{{outside_color.name}}</dt>
						<dd>
							<span 
							class="lei"
							v-for="(item,index) in outside_color.data" 
							:key="index" 
							:class="{active: outside_color.active == index}"
							@click="outside_colorClick(index,item.color_name)"
							>
							{{item.color_name}}
							</span>
						</dd>
					</dl>
					<!-- 排量 -->
					<dl>
						<dt class="mao">{{displacement.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in displacement.data" 
							:key="index" 
							:class="{active: displacement.active == index}"
							@click="displacementClick(index,item.displacement)"
							>
							{{item.displacement}}
							</span>
						</dd>
					</dl>
					<!-- 燃油 -->
					<dl>
						<dt class="mao">{{fuel.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in fuel.data" 
							:key="index" 
							:class="{active: fuel.active == index}"
							@click="fuelClick(index,item.fuel)"
							>
							{{item.fuel}}
							</span>
						</dd>
					</dl>
					<!-- 环保 -->
					<dl>
						<dt class="mao">{{mark.name}}</dt>
						<dd>
							<span 
							v-for="(item,index) in mark.data" 
							:key="index" 
							:class="{active: mark.active == index}"
							@click="markClick(index,item.mark)"
							>
							{{item.mark}}
							</span>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	
	import Bscroll from 'better-scroll'
	
	export default{
		name:'ScreenAdvanced',
		data(){
			return{
				leftActive: 0,
				deploy: ["车系","年款","版本","车价","外观","内饰","排量","燃油","环保"],
				chexing: {
					name: "车系",
					data: [],
					active: 999,
					actData: "0"
				},
				niankuang: {
					name: "年款",
					data: [],
					active: 999,
					actData: "0"
				},
				banben: {
					name: "版本",
					data: [],
					active: 999,
					actData: "0"
				},
				shop_price: {
					name: "车价",
					data: [],
					active: 999,
					actData: "0"
				},
				in_color: {
					name: "外观",
					data: [],
					active: 999,
					actData: "0"
				},
				outside_color: {
					name: "内饰",
					data: [],
					active: 999,
					actData: "0"
				},
				displacement: {
					name: "排量",
					data: [],
					active: 999,
					actData: "0"
				},
				fuel: {
					name: "燃油",
					data: [],
					active: 999,
					actData: "0"
				},
				mark: {
					name: "环保",
					data: [],
					active: 999,
					actData: "0"
				}
			}
		},
		methods:{
			toMallScreen(){
				this.$router.push("/MallScreen");
			},
			
			toRight(e,index){
				this.leftActive = index;
				let listTatil = e.target.innerText;
				let title = document.getElementsByClassName("mao")[index]; //找到点击的那个标签
				console.log(title)
				this.scroll.scrollToElement(title)
			},
			//车系chexing
			chexingClick(a,b){
				if(this.chexing.active == a){
					this.chexing.active = 999;
					this.chexing.actData = "";
				}else{
					this.chexing.active = a;
					this.chexing.actData = b;
				}
			},
			//年款
			niankuangClick(a,b){
				if(this.niankuang.active == a){
					this.niankuang.active = 999;
					this.niankuang.actData = "";
				}else{
					this.niankuang.active = a;
					this.niankuang.actData = b;
				}
			},
			//版本
			banbenClick(a,b){
				if(this.banben.active == a){
					this.banben.active = 999;
					this.banben.actData = "";
				}else{
					this.banben.active = a;
					this.banben.actData = b;
				}
			},
			//车价
			shop_priceClick(a,b){
				if(this.shop_price.active == a){
					this.shop_price.active = 999;
					this.shop_price.actData = "";
				}else{
					this.shop_price.active = a;
					this.shop_price.actData = b;
				}
			},
			//外观
			in_colorClick(a,b){
				if(this.in_color.active == a){
					this.in_color.active = 999;
					this.in_color.actData = "";
				}else{
					this.in_color.active = a;
					this.in_color.actData = b;
				}
			},
			//内饰
			outside_colorClick(a,b){
				if(this.outside_color.active == a){
					this.outside_color.active = 999;
					this.outside_color.actData = "";
				}else{
					this.outside_color.active = a;
					this.outside_color.actData = b;
				}
			},
			//内饰
			displacementClick(a,b){
				if(this.displacement.active == a){
					this.displacement.active = 999;
					this.displacement.actData = "";
				}else{
					this.displacement.active = a;
					this.displacement.actData = b;
				}
			},
			//燃油
			fuelClick(a,b){
				if(this.fuel.active == a){
					this.fuel.active = 999;
					this.fuel.actData = "";
				}else{
					this.fuel.active = a;
					this.fuel.actData = b;
				}
			},
			//环保
			markClick(a,b){
				if(this.mark.active == a){
					this.mark.active = 999;
					this.mark.actData = "";
				}else{
					this.mark.active = a;
					this.mark.actData = b;
				}
			},
			
			toMall(){
				this.$router.push({
					path: "/Mall",
					query: {
						in_color: this.in_color.actData,
						outside_color: this.outside_color.actData,
						fuel: this.fuel.actData,
						displacement: this.displacement.actData,
						mark: this.mark.actData,
						shop_price: this.shop_price.actData,
						fine_name: this.chexing.actData,
						in_paragraph: this.niankuang.actData,
						cartype_value: this.banben.actData,
						p_id: this.$route.query.p_id,
						m_id: this.$route.query.m_id,
					}
				});
			},
			
			getSearchInfo(){
				const url = this.$store.state.Yi + "index/Mall/searchOption";
				axios.get(url,{
					params: {
						m_id: this.$route.query.m_id
					}
				}).then(this.getSearchSuc)
			},
			getSearchSuc(msg){
				console.log(msg.data)
				this.fuel.data = msg.data.data.fuel;
				this.mark.data = msg.data.data.mark;
				this.banben.data = msg.data.data.banben;
				this.chexing.data = msg.data.data.chexing;
				this.niankuang.data = msg.data.data.niankuang;
				this.shop_price.data = msg.data.data.shop_price;
				this.displacement.data = msg.data.data.displacement;
				for(let i = 0;i < msg.data.data.in_color.length;i++){
					if(msg.data.data.in_color[i].color_name != ""){
						this.in_color.data.push(msg.data.data.in_color[i])
					}
				}
				for(let i = 0;i < msg.data.data.outside_color.length;i++){
					if(msg.data.data.outside_color[i].color_name != ""){
						this.outside_color.data.push(msg.data.data.outside_color[i])
					}
				}
			}
		},
		mounted() {
			this.scroll = new Bscroll(this.$refs.wrapper,{ click: true });
			this.getSearchInfo();
		}
	}
</script>

<style scoped="scoped">
	.advanced{
		position: fixed;
		background-color: #f3f3f3;
		width: 100%;
		height: 100%;
		top: 0;
	}
	
	.header {
		height: .9rem;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		font-size: .32rem;
		line-height: .9rem;
		text-align: center;
	}
	
	.header span {
		float: left;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
	}
	
	.navLeft{
		position: absolute;
		background-color: #f3f3f3;
		border-top: #dfdfdf 1px solid;
		top: .9rem;
		left: 0;
		width: 28%;
		height: 100%;
	}
	
	.navLeft ul{
		width: 100%;
	}
	
	.navLeft ul li{
		height: .88rem;
		line-height: .88rem;
	}
	
	.navLeft ul .active{
		background-color: #fff;
		color: #e5000c;
	}
	
	.navRight{
		position: absolute;
		background-color: #fff;
		border-top: #dfdfdf 1px solid;
		top: .9rem;
		right: 0;
		width: 72%;
		height: 100%;
	}
	
	.navRight dl{
		width: 100%;
		text-align: left;
		padding: 0 .2rem;
	}
	
	.navRight dl dt{
		height: .88rem;
		line-height: .88rem;
		font-size: .32rem;
	}
	
	.navRight dl dd{
		width: 100%;
		margin-bottom: .19rem;
	}
	
	.navRight dl dd:after{
		content: "";
		display: block;
		clear: both;
		visibility: hidden;
	}
	
	.navRight dl dd>span{
		float: left;
		width: 44%;
		line-height: .32rem;
		padding: .13rem 0;
		border: #e0e0e0 1px solid;
		text-align: center;
		margin-top: .19rem;
		margin-right: .17rem;
		font-size: .28rem;
		border-radius: 3px;
	}
	
	.navRight dl dd>.lei{
		width: 92%;
	}
	
	.navRight dl dd .active{
		background-color: #333;
		color: #fff;
	}
	
	.list{
		position: absolute;
		top: 0;
		bottom: 1.1rem;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.header .goMall{
		float: right;
		height: 100%;
		width: 1rem;
		font-size: .28rem;
	}
</style>
