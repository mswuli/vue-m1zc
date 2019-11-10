<template>
	<div class="DetailConfMore">
		<div class="nav">
			<span class="iconfont" @click="toDetail">&#xe606;</span>
			车辆配置
		</div>
		
		<ul class="menuBar">
			<li :class="{activeBar: active == 0}" @click="meunAct(0)">官方原厂选配</li>
			<li :class="{activeBar: active == 1}" @click="meunAct(1)" v-show="update.show">后期改装升级</li>
			<li :class="{activeBar: active == 2}" @click="meunAct(2)">官方原厂标配</li>
		</ul>
		
		<ul class="menuList" v-show="active == 0">
			<li v-for="(a,i) in optional.list" :key="i">
				<span class="text"><span class="zubao">{{a.name}} <i v-if="!!a.imgStr" class="iconbg" @click="tancpeizhi(a)"></i></span></span>
				<span class="money">{{a.price | geshihua}} ￥</span>
			</li>
			
			<li class="last">
				官方原厂选配总价：
				<span>{{optional.total | geshihua}} ￥</span>
			</li>
		</ul>
		
		<ul class="menuList" v-show="active == 1">
			<li v-for="(b,n) in update.list" :key="n">
				<span class="text"><span class="zubao">{{b.name}} <i v-if="!!b.imgStr" class="iconbg" @click="tancpeizhi(b)"></i></span> </span>
				<span class="money">{{b.price | geshihua}} ￥</span>
			</li>
			
			<li class="last">
				后期改装升级总价：
				<span>{{update.total | format_number}} ￥</span>
			</li>
		</ul>
		
		<ul class="menuList double" v-show="active == 2">
			<li style="height: 1.4rem; width: 100%; padding: 0;"></li>
			<li v-for="(c,m) in standard" :key="m">
				<span class="text">{{c.name}}</span>
				<!-- <span class="money">111 ￥</span> -->
			</li>
			<li class="boxbott"></li>
		</ul>
		<detail-nav :DatailData="DatailData"></detail-nav>
	</div>
</template>

<script>
	import axios from 'axios'
	
	import DetailNav from '@/pages/Detail/components/DetailNav'
	
	export default{
		name: 'DetailConfMore',
		data(){
			return{
				active: 0,
				DatailData: {},
				optional: {  //官方原厂选配
					show: false,
					total: 0,
					list: []
					},
				standard: [],  //官方原厂标配
				update: {  //后期改装升级
					show: false,
					total: 0,
					list: []
				}
			}
		},
		watch:{
			DatailData(msg){
				const data = msg.attribute.conf
				
				if(data.optional.length > 0) this.optional.show = true;
				for(let s in data.optional){
					this.optional.total += parseFloat(data.optional[s].price)
					this.optional.list.push(data.optional[s]);
				}
				
				for(let i in data.standard){
					this.standard.push(data.standard[i])
				}
				
				if(data.update.length > 0) this.update.show = true;
				for(let m in data.update){
					this.update.total += parseFloat(data.update[m].price)
					this.update.list.push(data.update[m]);
				}
				
			}
		},
		methods:{
			toDetail(){
				this.$router.push({
					path: "/Detail",
					query: {
						goods_id: this.$route.query.goods_id
					}
				});
			},
			
			meunAct(a){
				this.active = a;
			},
			
			getDatailInfo() {
				const url = this.$store.state.Yi + "index/Mall/detail";
				axios.get(url, {
					params: {
						goods_id: this.$route.query.goods_id
					}
				}).then(this.getDatailSuc);
			},
			getDatailSuc(res) {
				this.DatailData = res.data.data
			},
			tancpeizhi(a){
				
				if(!!a.imgStr){
					this.showslot(a);
				}
			},
			showslot(objstr){
			     this.$createDialog({
			         type: 'alert',
			         confirmBtn: {
			           text: '确认',
			           active: true
			         }
			       }, (createElement) => {
			         return [
			           createElement('div', {
			             'class': {
			               'my-title': true
			             },
			             "style":{
			                "position":"relative",
			             },
			            
			             slot: 'title',
			             
			           }, [
			              createElement('h3',{'style':{
			                   "color":'#333',
			                   "font-weight":"bold",
			                   "height":"0.60rem",
			                   "line-height":"0.60rem",
			                   "white-space": "nowrap",
			                   "overflow": "hidden",
			                   "text-overflow":"ellipsis",
			               }}, objstr.name),
			             createElement('div', {
			               'class': {
			                 'my-title-img': true,
			                 "mylunbo":true
			               },
			               "style":{
			                  "position":"relative",
			                  "width":"90%",
			                  "height":"128px",
			                  "margin":"0 auto",
			                  
			               },
			              
			             }),
			            
			           ]),
			           createElement('div', {
			             'class': {
			               'my-content': true,
			               
			             },
			             'style':{
			                 'width':'90%',
			                 'margin':"0 auto",
			                 "position":"relative"
			             },
			             
			             slot: 'content'
			           }, objstr.optional_comment)
			         ]
			       }).show();
			       this.addlunbo(objstr.imgStr);
			},
			addlunbo(arr){
			    var str ="<div class='luntubox' style='width:100%;position:relative;height:100%;over-flow:hidden'><span style='position:absolute;left:0.12rem;top:38%;display:inline-block;width:0.6rem;height:0.6rem;z-index:999;line-height:0.6rem;color:#ffffff;font-weight:bold;' class='iconfont tozuo'>&#xe606;</span>";
			    str += "<ul class='imgbox' style='width:2000%;position:absolute;left:0;height:100%;left:0'>";
			    for(var i=0,len=arr.length;i<len;i++){
			        str += "<li class='dan' style='background:url("+arr[i]+")no-repeat center center;float:left;width:5%;height:100%;background-size:auto 95%'></li>";
			    }
			
			    str += "</ul>";
			    str +="<span class='iconfont toyou' style='position:absolute;right:0.12rem;top:38%;display:inline-block;width:0.6rem;height:0.6rem;z-index:999;line-height:0.6rem;color:#ffffff;font-weight:bold;' >&#xe65f;</span></div>";
			  $("div.mylunbo").find("div.luntubox").remove();
			   $(str).appendTo($("div.mylunbo"));
			   this.caozuolunbo()
			},
			caozuolunbo(){
			    var lenimg = $("ul.imgbox li").length;
							  
			    /////初始化
			    if(lenimg==1){
			        $("div.luntubox span").hide();
								     
			    }else{
			         $("div.luntubox span.tozuo").hide();
			    };
			    
			    $("body").on("click","span.toyou",function(){
			        var ismove =  $("ul.imgbox").is(':animated');
			        if(ismove){
			            return;
			        }
			        var owidth = $("ul.imgbox li").width();
			        var curleft = $("ul.imgbox").position().left;
			        var zuihouleft = (lenimg-1)*owidth;
			        var tarleft = curleft-owidth;
			        $("ul.imgbox").stop().animate({"left":tarleft+"px"},200,function(){
			            var curleft = $("ul.imgbox").position().left;
			            if(curleft>=0){
			                $("span.tozuo").hide();
			            }else {
			                $("span.tozuo").show();
			            }
			            if(zuihouleft==Math.abs(curleft)){
			                $("span.toyou").hide();
			            }else{
			                $("span.toyou").show();
			            }
			        });
			    });
			    
			     $("body").on("click","span.tozuo",function(){
			        var ismove =  $("ul.imgbox").is(':animated');
			        if(ismove){
			            return;
			        }
			        var owidth = $("ul.imgbox li").width();
			        var curleft = $("ul.imgbox").position().left;
			        var zuihouleft = (lenimg-1)*owidth;
			        var tarleft = curleft+owidth;
			        $("ul.imgbox").stop().animate({"left":tarleft+"px"},200,function(){
			            var curleft = $("ul.imgbox").position().left;
			            if(curleft>=0){
			                $("span.tozuo").hide();
			            }else {
			                $("span.tozuo").show();
			            }
			            if(zuihouleft==Math.abs(curleft)){
			                $("span.toyou").hide();
			            }else{
			                $("span.toyou").show();
			            }
			        });
			    }); 
			}
			
			
			
			
		},
		mounted() {
			this.getDatailInfo();
		},
		components:{
			DetailNav
		}
	}
</script>

<style scoped="scoped">
	/* .DetailConfMore{
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		bottom: 1rem;
		width: 100%;
		background-color: #fff;
	} */
	
	.nav{
		height: .8rem;
		width: 100%;
		line-height: .8rem;
		position: fixed;
		top: 0;
		font-size: .34rem;
		background-color: #fff;
	}
	
	.nav span{
		position: absolute;
		left: 0;
		height: .8rem;
		width: .67rem;
		line-height: .8rem;
	}
	
	.menuBar{
		position: fixed;
		width: 96%;
		top: .8rem;
		left: 2%;
		text-align: center;
		border: 1px solid #565f71;
		box-sizing: border-box;
		border-radius: 3px;
		display: flex;
		overflow: hidden;
		background-color: #fff;
	}
	
	.menuBar li{
		flex: 1;
		font-size: .28rem;
		font-weight: bold;
		color: #565f71;
		padding: .2rem;
		border-right: 1px solid #565f71;
	}
	
	.menuBar li:last-child{
		border-right: none;
	}
	
	.menuBar .activeBar{
		background-color: #565f71;
		color: #fff;
	}
	
	.menuList{
		padding: 1.57rem .34rem 1.24rem .34rem;
	}
	
	.menuList li{
		padding: .14rem 0;
		font-size: .24rem;
		display: flex;
		justify-content: space-between;
	}
	
	.double{
		display: inline;
	}
	
	.double li{
		float: left;
		width: 46%;
		padding: .14rem 2%;
	}
	
	.menuList li .text{
		flex: 5;
		text-align: left;
	}
	
	.menuList li .money{
		flex: 2;
		color: #e5000c;
		text-align: right;
	}
	
	.menuList .last{
		font-size: .26rem;
		justify-content: flex-end;
	}
	
	.menuList .last span{
		color: #e5000c;
	}
	
	.DetailConf>p{
		height: .82rem;
		line-height: .82rem;
		font-size: .34rem;
		border-top: 1px solid #f5f5f5;
	}
	
	.DetailConf>p span{
		color: #e5000c;
	}
	
	.boxbott{
		height: 1rem;
		width: 96% !important;
	}
	span.zubao{
		position:relative;
	}
	i.iconbg {
	    position: absolute;
	    right: -0.42rem;
	    bottom: 0px;
	    background: url(~@/assets/img/ibg/iiii.png)no-repeat ;
	    background-size: 50% auto;
	    background-position: center 0.19rem;
	    display: inline-block;
	    width: 0.5rem;
	    height: 0.5rem;
	    cursor: pointer;
	    font-style: normal;
	}
	
	
	/* iPhoneX,iPhoneXs的适配*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.boxbott {
			height: 77px;
			width: 96% !important;
		}
	}
	
	/* iPhoneXs Max的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.boxbott {
			height: 77px;
			width: 96% !important;
		}
	}
	
	/* iPhoneXr的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.boxbott {
			height: 77px;
			width: 96% !important;
		}
	}
</style>
