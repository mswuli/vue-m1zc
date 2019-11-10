<template>
	<div class="DetailConf" v-if="Object.keys(DatailData).length != 0">
		<h3 id="top">车辆配置</h3>
		
		<ul class="menuBar">
			<li :class="{activeBar: active == 0}" @click="meunAct(0)">官方原厂选配</li>
			<li :class="{activeBar: active == 1}" @click="meunAct(1)" v-show="update.show">后期改装升级</li>
			<li :class="{activeBar: active == 2}" @click="meunAct(2)">官方原厂标配</li>
		</ul>
		
		<ul class="menuList" v-show="active == 0 && optional.show">
			<li v-for="(a,i) in optional.list" :key="i">
				<span class="text"><span class="zubao">{{a.name}} <i v-if="!!a.imgStr" class="iconbg" @click="tancpeizhi(a)"></i></span></span>
				<!-- <span v-if="a.imgStr" class="iconfont" style="color: #e5000c;font-size: .24rem;" @click="deployList(a)">&#xe624;</span> -->
				<span class="money" v-show="!cartype_value">{{a.price | geshihua}} ￥</span>
			</li>
			
			<!-- <li class="last">
				选配总价：
				<span>44600 ￥</span>
			</li> -->
		</ul>
		
		<ul class="menuList" v-show="active == 1">
			<li v-for="(b,n) in update.list" :key="n">
				<span class="text"><span class="zubao">{{b.name}} <i v-if="!!b.imgStr" class="iconbg" @click="tancpeizhi(b)"></i></span> </span>
				<span class="money">{{b.price | geshihua}} ￥</span>
			</li>
		</ul>
		
		<ul class="menuList"  v-show="active == 2">
			<li v-for="(c,m) in standard" :key="m">
				<span class="text">{{c.name}}</span>
				<!-- <span class="money">{{a.price}} ￥</span> -->
			</li>
		</ul>
		
		<p @click="more(DatailData.goodInfo.goods_id)">查看详细配置<span class="iconfont">&#xe65f;</span></p>
	</div>
</template>

<script>
	export default{
		name: 'DetailConf',
		props: {
			DatailData: Object,
			cartype_value: Boolean
		},
		data(){
			return{
				navbarTop: 0,
				active: 0,
				optional: {
					show: false,
					total: 0,
					list: []
					},  //官方原厂选配
				standard: [],  //官方原厂标配
				update: {
					show: false,
					total: 0,
					list: []
				}  ,//后期改装升级
				offPrice: 0
			}
		},
		watch:{
			DatailData(msg){
				const data = msg.attribute.conf
				// console.log(data)
				if(data.optional.length > 7){
					this.optional.show = true;
					for(let i = 0;i < 7;i++){
						this.optional.list.push(data.optional[i]);
					}
				}else{
					if(data.optional.length > 0) this.optional.show = true;
					for(let s in data.optional){
						this.optional.list.push(data.optional[s]);
					}
				}
				
				if(data.standard.length > 7){
					for(let o = 0;o < 6;o++){
						this.standard.push(data.standard[o])
					}
					this.standard.push({name: "......"})
				}else{
					for(let s in data.standard){
						this.standard.push(data.standard[s])
					}
				}
				
				if(data.update.length > 7){
					this.update.show = true;
					for(let n = 0;n < 7;n++){
						this.update.list.push(data.update[n]);
					}
				}else{
					if(data.update.length > 0) this.update.show = true;
					for(let m in data.update){
						this.update.list.push(data.update[m]);
					}
				}
				// console.log(this.optional,this.standard,this.update)
			}
		},
		methods: {
			meunAct(a){
				this.active = a;
				console.log(this.optional);
				
			},
			
			more(a){
				this.$router.push({
					path: "/DetailConfMore",
					query: {
						goods_id: a
					}
				})
			},
			
			deployList(a){
				console.log(a)
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
			
		}
		
	}
</script>

<style scoped="scoped">
	.DetailConf{
		border-bottom: .1rem solid #f5f5f5;
	}
	
	.DetailConf>h3{
		text-align: left;
		text-indent: 2px;
		font-size: .34rem;
		font-weight: 500;
		margin: .24rem;
		border-left: 2px solid #e5000c;
	}
	
	.menuBar{
		margin: .24rem;
		text-align: center;
		border: 1px solid #565f71;
		border-radius: 3px;
		display: flex;
		overflow: hidden;
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
		margin: .24rem .34rem;
		/* height: 3.48rem; */
	}
	
	.menuList li{
		padding: .14rem 0;
		font-size: .24rem;
		display: flex;
		justify-content: space-between;
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
</style>
