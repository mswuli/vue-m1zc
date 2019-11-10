<template>
    <div class="Compare">
        <div class="otitle clearfix">
             <span class="iconfont fanhs" @click="toPrev">&#xe606;</span>
             <ul class="juzhong">
                 <li class="peizhi" :class="{qubg:!isdbcanshu}" @click="duibicanshu(1)">配置对比</li>
                 <li class="canshu " :class="{qubg:isdbcanshu}" @click="duibicanshu(2)">参数对比</li>
              </ul>
        </div>
        <div class="zuiwaibao clearfix">
            <div class="zubao" :len="len" :movelen="movelen">
                <div class="wqbao">
                    <div class="kaiguan">
                        <div class="xiany">
                            <div  class="switch-ellipse " :class="{active:isshowchayi}" @click="showchayi">
                                <span class="switch-circle "  :class="{active:isshowchayi}"></span>
                             </div>
                        </div>
                        <div class="xchayi">显示差异项</div>
                    </div>
                 
                      <div class="biming" v-for="(item,oindex) in resGoods" v-if="oxuanarr[oindex]">
                    
                        <ul class="bikuang">
                            <ul class="bishang">
                               {{item.name}}
                            </ul>
                            <ul class="bijia">
                                <span class="caojia">
                                    <span class="fuhao">￥</span><span class="shu">{{item.price |format_number}}</span>
                                    <span class="danwei">万</span>
                                </span>
                            </ul>
                            <span class="zhtai iconfont" @click="removecur(item.goods_id)">
                                &#xe8e8;
                            </span>
                        </ul>
                        
                    </div>
                    
                 
                </div>  
                 
                 <div class="neiduibi">
                     
                     <div class="dcanshu" >
                          <ul class="qlist" v-for="(items,keys) in caodata.canshu" v-if="isdbcanshu">
                             <ul class="thtou clearfix">
                               <li class="ttou"><span>{{keys}} </span></li> 
                            
                               <li class="heli"></li>
                             </ul>
                           
                             <ul class="zhebaoli clearfix"  v-for="(item1,key1) in items">
                                 <ul class="libox " >
                                     <li class="ttou"><span>{{item1.name}}  </span> </li>
                                     <li class="td" v-for="(item2,key2) in item1.arrlist" v-if="oxuanarr[key2]"> <span :class="{wenred:item1.haschayi&&isshowchayi}">{{item2.name}}</span></li>
                                   
                                 </ul>
                                
                              </ul>
                         </ul>
                         
                         <ul class="qlist" v-for="(items,keys) in caodata.peizhi" v-if="!isdbcanshu">
                             <ul class="thtou clearfix">
                               <li class="ttou"><span>{{keys}} </span></li> 
                               <li class="heli"><span class="youk" v-if="keys=='主/被动安全装备'">有</span> <span class="wuku" v-if="keys=='主/被动安全装备'">无</span></li>
                               
                             </ul>
                           
                             <ul class="zhebaoli clearfix"  v-for="(item1,key1) in items">
                                 <ul class="libox " >
                                     <li class="ttou"><span>{{item1.name}}</span> </li>
                                     <li class="td" v-for="(item2,key2) in item1.arrlist" v-if="oxuanarr[key2]"> 
                                     <span :class="{wenred:item1.haschayi&&isshowchayi}">{{item2.name}}</span>
                                     </li>

                                 </ul>
                                
                              </ul>
                         </ul>

                     </div>    
                    
                         
                 </div>
            </div>
       
             
            <div class="fuku">
                
                 <div class="wqbao">
                    <div class="kaiguan">
                        <div class="xiany">
                            <div  class="switch-ellipse " :class="{active:isshowchayi}" @click="showchayi">
                                <span class="switch-circle "  :class="{active:isshowchayi}"></span>
                             </div>
                        </div>
                        <div class="xchayi">显示差异项</div>
                    </div>
                </div>
                 <ul class="qlist" v-for="(items,keys) in caodata.canshu" v-if="isdbcanshu">
                    <ul class="thtou clearfix">
                      <li class="ttou"><span>{{keys}} </span></li> 
                    </ul>
                  
                    <ul class="zhebaoli clearfix"  v-for="(item1,key1) in items">
                        <ul class="libox " >
                            <li class="ttou"><span>{{item1.name}}  </span> </li>
                          
                          
                        </ul>
                       
                     </ul>
                </ul>
                
                <ul class="qlist" v-for="(items,keys) in caodata.peizhi" v-if="!isdbcanshu">
                    <ul class="thtou clearfix">
                      <li class="ttou"><span>{{keys}} </span></li> 
                   
                    </ul>
                  
                    <ul class="zhebaoli clearfix"  v-for="(item1,key1) in items">
                        <ul class="libox " >
                            <li class="ttou"><span>{{item1.name}}</span> </li>
            
                        </ul>
                       
                     </ul>
                </ul>
            </div>      
       
        </div>
        <div class="tozuoyi fuzuom" @click="tozuoyi(-1)" v-if="toleftshow">
            <span class="iconfont" >&#xe65f;</span>
        </div>
         <div class="toyouyi fuyoum" @click="tozuoyi(1)" v-if="torightshow">
            <span class="iconfont "  >&#xe606;</span>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    
    export default{
        name: 'Compare',
        components:{
 
        },
        data() {
        	return {
                oxuanarr:[true,true,true,true],//////主要四项是否选中
                isshowchayi:true, ////是否显示差异
                isdbcanshu:true,  /////是否是参数对比  true为参数对比，false为配置对比
                resGoods:[],  ////标题
                caodata:{},
                movelen:0, //////移动的个数 左移和右移
                len:4, //////移动清单的个数
                
                toleftshow:true,   /////是否显示左移
                torightshow:true,  //////是否显示右移
        	};
        },

    
        methods:{
            tozuoyi(n){
                this.movelen += n;
                this.setclickmovebtn();  
            },
            /////设置左移右移btn
            setclickmovebtn(){
                if(this.len==4){
                       if(this.movelen<=-2){
                           this.toleftshow = false;
                       }else{
                           this.toleftshow = true;
                       }  
                       if(this.movelen>=0){
                           this.torightshow = false;
                       }else{
                           this.torightshow = true;
                       }
                
                 }else if(this.len==3){
                        if(this.movelen<=-1){
                         this.toleftshow = false;
                         }else{
                             this.toleftshow = true;
                         }  
                         
                         if(this.movelen>=0){
                             this.torightshow = false;
                         }else{
                             this.torightshow = true;
                        }
                 }else if(this.len==1||this.len==2){
                       this.toleftshow = false;
                       this.torightshow =  false;
                 }
            },
            removecur(oid){
                var _this = this;
                this.resGoods.forEach(function(item,key){
                    if(oid==item.goods_id){
                        item.xuan = false;
                        _this.oxuanarr[key] = false;
                    }
                });
                 var  opn = this.resGoods.pop();
                 this.resGoods.push(opn );
                 /////没有作用，只是为了同步resGoods
                 this.caodata.title.forEach(function(item){
                     if(oid==item.goods_id){
                        item.xuan = false;
                    }
                });
                this.removegoodsid(oid);
                this.genxincyx();
                this.setzhilen();
                this.setclickmovebtn();
            },
             //////清除localstroge 中的 goodsid
             removegoodsid(oid){
                 var goodsIds =  localStorage.getItem("addui");
                 var arr = [];
                 if(goodsIds.indexOf("-")==-1){
                     arr.push(goodsIds);
                 }else{
                     arr = goodsIds.split("-");
                 };
                 var delindex = -1;
                 arr.forEach(function(item,index){
                     if(item==oid){
                         delindex = index
                     }
                 });
                 arr.splice(delindex,1);
               
                 if(arr.length==0){
                      localStorage.removeItem("addui");
                 }else{
                     goodsIds = arr.join("-");
                     localStorage.setItem("addui",goodsIds);
                 }
                
                
             },
            
            ///////获取并设置对比项目的数量
            setzhilen(){
                var olen = 0;
              this.resGoods.forEach(function(item){
                  if(item.xuan == true){
                      olen++;
                  }
              })  ;
              this.len = olen;
            },
            
            //////更细差异项目
            genxincyx(){
          
               // 更新参数和配置对比
               var gengxinarr = ["canshu","peizhi"];      
               for(var j=0,lenj=gengxinarr.length;j<lenj;j++){
                   var ogxarr = gengxinarr[j];
                   for(var key in this.caodata[ogxarr]){
                       var oarr = this.caodata[ogxarr][key];
                       for(var i=0,len=oarr.length;i<len;i++){
                            oarr[i].haschayi = this.isarrhaschayi(oarr[i].arrlist);
                       }
                   }
               }
            },
            
            /////判断数组中是否含有差异的项目
            isarrhaschayi(sarr){
                var flag = false;
                var oduibi = "";
                for(var i=0,len=sarr.length;i<len;i++){
                    var isjiadui = this.oxuanarr[i];
                    if(isjiadui){
                        if(oduibi==""){
                            oduibi = sarr[i].name;
                        }else{
                            if(oduibi!=sarr[i].name){
                                flag = true;
                            }
                        }
                    }
                }
                return flag;
            },

            startdata(){
                var _this =this;
                // http://localhost:8080/#/Compare?goodsIds=691-694-701
                var ourl = this.$store.state.Yi + 'index/mall/contrast';
                var goodsIds = this.$route.query.goodsIds;
               
                var _this = this;
                var otoken= localStorage.token;
                console.log(otoken);
                if(typeof otoken =="undefined"){
                     this.showPopup();
                     return ;
                }
                // this.toast.show();  //显示遮罩
                axios.post(ourl,qs.stringify({
                    goodsIds:goodsIds,
                    token:otoken,
                })).then(function(res){
					console.log("院士数据获取");
                    console.log(res.data);
					if(res.data.data==0&&res.data.error==1){
						_this.toredegnlu()
					}else{
						 _this.setchushi(res.data);
						_this.yicaodata(res.data);
					} 
                });
                
            },
			
			/////调回登录页面，重新登录
			toredegnlu(){
				this.$router.push({
					path: "/AccountLogin",
					query: {
							redirect: this.$route.fullPath
					}
				});
			},
			
            yicaodata(res){
                this.caodata.title=[];
                var  _this = this;
                /////获取名称
                var idarr = [];
                res.resGoods.forEach(function(item){
                    var json ={};
                    json.goods_id = item.goods_id; 
                    json.name = item.brand_name+item.m_name+item.fine_name+" "+item.in_paragraph+" "+item.cartype_value+" "+item.displacement+" "+item.fine_drive;           json.xuan = true;
                    json.imgsrc = item.image;
                    json.price = item.price;
                    _this.caodata.title.push(json);
                    idarr.push(json.goods_id);
                });
                //////获取基础参数
                
                 var canshu={};
                 for(var key in res.resPara){
                     canshu[key]=[];
                      var item = res.resPara[key];
                      for(var key1 in item){
                         var json ={}; 
                         json.name = key1;
                         var zhongzarr =[];
                         var item1 = item[key1];
                         item1.forEach(function(curitem,curkey){
                             var ocurjson ={};
                             ocurjson.goods_id = idarr[curkey];
                             ocurjson.name = curitem;  
                             zhongzarr.push(ocurjson);
                         });
                         json.arrlist=[];
                         json.arrlist.push.apply(json.arrlist,zhongzarr);
                         // /////确认对比项目是否有差异
                         json.haschayi= _this.isarrhaschayi(zhongzarr);
                         canshu[key].push(json);
                      }
                 }
                 this.caodata.canshu = canshu;
				
				 //////对选配的座椅进行替换操作，当seat 有值时，把seat 里的值替换到xuan (选择项中)
				 for(var i=0,len=res.xuanRes.length;i<len;i++){
					 var otyle = Object.prototype.toString.call(res.xuanRes[i].seat);
					 var itemp = res.xuanRes[i].xuan;
					 if( otyle=="[object Object]"){
							for(var keyx in itemp){
								var itemyi = itemp[keyx];
								for(var keyy in itemyi){
									var itemarr = itemyi[keyy];
									itemarr.forEach(function(item){
										if(item.c_code==res.xuanRes[i].seat.code){
											item.c_name = res.xuanRes[i].seat.c_name
										}
									});
								}
								
							}  
					 }
				 };
				 
				// console.log(res.xuanRes);
				//////去掉一层循环，转化为 简单一点的数组
				var orxarr = [];
				res.xuanRes.forEach(function(item){
					var obja = JSON.parse(JSON.stringify(item.xuan));
					orxarr.push(obja );
				});
			
				///////////获取另外添加的配置
				var linobg ={};
				for(var i=0,len=orxarr.length;i<len;i++){
					var otcan = orxarr[i];
					for(var keyla1 in otcan){
						if(!(keyla1 in linobg)){
							linobg[keyla1]={};
						}
						var ontan = otcan[keyla1];
						for(var keyl2 in ontan){
							for(var keyo1 in linobg){
								if(keyo1==keyla1){
									if(!(keyl2 in linobg[keyo1])){
										linobg[keyo1][keyl2]={};
									}
								}
							}
						}
					}
				}
				
			
				///////把后面添加的选配加入resCon 中
				for(var keyt1 in linobg){
					var ertcao = linobg[keyt1];
					for(var keyt2 in ertcao){
						for(var keyy1 in res.resCon){
							var keyycao = res.resCon[keyy1];
							var arrzh=[];
							for(var o in keyycao){
								if(arrzh.length==0){
									arrzh= JSON.parse( JSON.stringify(keyycao[o]));
								}
							}
							arrzh.forEach(function(itemd){
								itemd.f_name="";
								itemd.c_name="-";
								itemd.c_code="";
							})
							if(keyy1==keyt1){
								if(!(keyt2 in keyycao)){
									keyycao[keyt2]=JSON.parse( JSON.stringify(arrzh));
								}
							}
						}
					}
				}
							
				/////////当 c_type == 1 时为替换，当 c_type == 0 时为并列 
				for(var key1 in res.resCon){
					var obkey1 = res.resCon[key1];
					for(var key2 in obkey1){
						// console.log(key2);
						var obkey2 = obkey1[key2];
						obkey2.forEach(function(item,i){
							orxarr.forEach(function(itemarr,index){
								for(var keya1 in itemarr){
									var obdui1 = itemarr[keya1];
									for(var keya2 in obdui1){
										var obdui2 = obdui1[keya2];
										if(keya2==key2&&i==index){
											for(var k=0,lenk=obdui2.length;k<lenk;k++){
												var oscan = obdui2[k];
												if(oscan.c_type==1){
													item.c_name = oscan.c_name
												}else if(oscan.c_type==0){
													if(item.c_name=="-"){
														item.c_name = oscan.c_name;
													}else{
														item.c_name = item.c_name +'/'+oscan.c_name;
													}
												
												}	
											}
										}
									}
								}
							});
						});
					}
				}
				
				
                //////获取配置参数
              
                  var peizhi = {};
                  for(var keyp in  res.resCon){
                     peizhi[keyp]=[];
                     var opeijson= res.resCon[keyp];
                     // console.log(opeijson)
                    for(var keyp1 in opeijson){
                          var ojson= {};
                          ojson.name = keyp1;
                          ojson.arrlist =[];
                        
                          var arrlist = [];
                          var oarrpei = opeijson[keyp1];
                          for(var i=0,len=oarrpei.length;i<len;i++){
                              var ojsonp ={};
                              ojsonp.goods_id = idarr[i];
                              ojsonp.name = oarrpei[i].c_name;
                              arrlist.push(ojsonp);
                          }
                          ojson.arrlist.push.apply(ojson.arrlist,arrlist);
                          ojson.haschayi = _this.isarrhaschayi(arrlist);
                          
                          peizhi[keyp].push(ojson);
                    }
                  }
				  console.log("处理后的数据");
				  console.log(this.caodata);
                   this.caodata.peizhi = peizhi; 
				   console.log("配置");
				   console.log(  this.caodata.peizhi);
                  
                   this.tongbubiaoti();
            },
            /////同步标题
            tongbubiaoti(){
                this.resGoods.forEach(function(item,key){
                    item.name = item.brand_name+item.m_name+item.fine_name+" "+item.in_paragraph+" "+item.cartype_value+" "+item.displacement+" "+item.fine_drive;
                    item.xuan = true;
                });
            },

          
           
            /////判断当前id 是否 是选中状态，当为选中状态时，就可以加入对比，否则对比忽略此项
            iscurxinduibi(arr,oid){
                var oflag = false;
                var _this = this;
                
                arr.forEach(function(item,key){
                    if(oid==item.goods_id){
                        // oflag = item.xuan;
                        oflag = _this.oxuanarr[key];
                    }
                });

                return oflag;
            },
            
            setchushi(res){
                //  resGoods:[],  ////标题
                // resPara:{},   ////对比参数
                // redPeizhi:{},  ////对比配置
                this.resGoods = res.resGoods;
    
            },

            showPopup() {
				
              var _this=this;
              const toast = this.$createToast({
               txt: '您还未登录,请先登录！',
               type: 'warn',
               time: 2500,
               mask:true,
              $events: {
                  timeout: () => {
						_this.$router.push({
						path: "/AccountLogin",
						query: {
							redirect: this.$route.fullPath
						}
					})
                  }
                }
             }).show()
            },
          
            duibicanshu(n){
                if(n==1){
                    this.isdbcanshu = false;
                }else if(n==2){
                    this.isdbcanshu = true;
                }
                
            },
            showchayi(){
              this.isshowchayi =  !this.isshowchayi;
            },
    		//客服
    		kf() {
    			let isSdkReady = false;
    			ysf('onready', function() {
    				isSdkReady = true;
    			})
    			if (isSdkReady) {
    				ysf('open');
    				// location.href = ysf('url');
    			} else {
    				// 仅做参考
    				alert('sdk尚未加载成功，请稍后再试');
    			}
    		},
    		kel(w, d, n, a, j) {
    			w[n] = w[n] || function() {
    				return (w[n].a = w[n].a || []).push(arguments)
    			};
    			j = d.createElement('script');
    			j.async = true;
    			j.src = 'https://qiyukf.com/script/45195e7baee6ad8be789aa9b829aa568.js?hidden=1';
    			d.body.appendChild(j);
    		},
            toPrev(){
                this.$router.go(-1);
            },
            setnavheight(){
                var arr = [];
                $("div.dcanshu ul.qlist>ul").each(function(){
                    var owidth= $(this).height();
                    arr.push(owidth)
                });

                $("div.fuku ul.qlist>ul").each(function(index,item){
                   $(this).height(arr[index]+'px'); 
                });
            }
            
        },
        created() {
            this.startdata();
        },
        mounted() {
            this.kel(window, document, 'ysf');
        },
        updated() {
              this.setzhilen();  //////设置选项个数
              this.setclickmovebtn(); ////设置左浮 右浮的状态
              this.setnavheight();  ///////设置左侧标题的高
        }
       
    }
    
    
</script>

<style scoped="scoped">
	
    .clearfix:after{
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
    }
    .clearfix{
        zoom:1;
    }
    
    div.otitle{
        width:100%;
        height:0.80rem;
        position:fixed;
        border-bottom:1px solid #eee;
        top:0;
        left:0;
        z-index: 9999;
        background:#fff;
    }
    span.fanhs{
        float:left;
        line-height:0.71rem;
        padding-left:0.2rem
    }
    ul.juzhong{
        width:3.26rem;
        height:0.56rem;
        position:relative;
        margin: 0.120rem auto;
        display: flex;

        text-align: center;
        border-radius: 3px;
        border:1px solid #eee;
    }
    ul.juzhong>li{
       width:50%;
       height:100%;
       line-height:0.56rem;
       color:#565f71;
    }
    ul.juzhong>li:first-child{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
    }
      ul.juzhong>li:last-child{
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    ul.juzhong>li.qubg{
        background-color:#565f71;
        color:#fff;
    }
    div.zubao{
   
        background:#ffffff;
    }
   div.zuiwaibao{
       width:100%;
       position:relative;
       background: #f9f9f9;
	   overflow-x: hidden;
       min-height: 100vh;
   }
     
  
   div.zubao{
       width:170%;
       position:absolute;
       top:0.82rem;
       left:0;
       transition: all 0.5s;
	   -ms-transition:all 0.5s; /* IE 9 */
		-moz-transition:all 0.5s;/* Firefox */
		-webkit-transition:all 0.5s; /* Safari 和 Chrome */
		-o-transition:all 0.5s; /* Opera */
	  
   }
   div.zubao[movelen="-1"][len="3"]{
      transform: translate3d(-20.5%,0,0);
		-ms-transform:translate3d(-20.5%,0,0);	/* IE 9 */
		-moz-transform:translate3d(-20.5%,0,0); 	/* Firefox */
		-webkit-transform:translate3d(-20.5%,0,0); /* Safari 和 Chrome */
		-o-transform:translate3d(-20.5%,0,0); 	/* Opera */
   }
 
   div.zubao[movelen="0"][len="3"]{
      transform: translate3d(0,0,0);
	  -ms-transform:translate3d(0,0,0);	/* IE 9 */
	  -moz-transform:translate3d(0,0,0);	/* Firefox */
	  -webkit-transform:translate3d(0,0,0); /* Safari 和 Chrome */
	  -o-transform:translate3d(0,0,0); 	/* Opera */
   }
   
    div.zubao[movelen="-1"][len="4"]{
      transform: translate3d(-20.5%,0,0);
	   -ms-transform:translate3d(-20.5%,0,0);	/* IE 9 */
	  -moz-transform:translate3d(-20.5%,0,0);	/* Firefox */
	  -webkit-transform:translate3d(-20.5%,0,0);/* Safari 和 Chrome */
	  -o-transform:translate3d(-20.5%,0,0);	/* Opera */
   }
    div.zubao[movelen="-2"][len="4"]{
      transform: translate3d(-41%,0,0);
	   -ms-transform:translate3d(-41%,0,0);	/* IE 9 */
	  -moz-transform:translate3d(-41%,0,0);	/* Firefox */
	  -webkit-transform:translate3d(-41%,0,0);/* Safari 和 Chrome */
	  -o-transform:translate3d(-41%,0,0);	/* Opera */
   }
   
   div.zubao[movelen="0"][len="4"]{
      transform: translate3d(0,0,0);
	   -ms-transform: translate3d(0,0,0);	/* IE 9 */
	  -moz-transform: translate3d(0,0,0);/* Firefox */
	  -webkit-transform: translate3d(0,0,0);/* Safari 和 Chrome */
	  -o-transform: translate3d(0,0,0);	/* Opera */
   }
   div.zubao[len="2"]{
      transform: translate3d(0,0,0);
	   -ms-transform: translate3d(0,0,0);	/* IE 9 */
	  -moz-transform: translate3d(0,0,0);/* Firefox */
	  -webkit-transform: translate3d(0,0,0);/* Safari 和 Chrome */
	  -o-transform: translate3d(0,0,0);	/* Opera */
   }
   div.zubao[len="1"]{
      transform: translate3d(0,0,0);
	    -ms-transform: translate3d(0,0,0);	/* IE 9 */
	  -moz-transform: translate3d(0,0,0);/* Firefox */
	  -webkit-transform: translate3d(0,0,0);/* Safari 和 Chrome */
	  -o-transform: translate3d(0,0,0);	/* Opera */
   }
   
    div.wqbao{
        position:relative;
        width:100%;
        display:flex;
    }   
  
   div.kaiguan{
       width:18%;
       box-sizing: border-box;
   }
       
   div.biming{
       width:20.5%;
       box-sizing: border-box;
       padding-top:0.2rem;
       padding-bottom: 0.15rem;
   }
  .switch-ellipse.active{
       background-color: #e5000c;
       border-color: transparent;
       transition: all .2s ease .2s;
   }
   .switch-ellipse{
    align-self: center;
    flex: 0 0 auto;
    margin-top: 5px;
    display: inline-block;
    position: relative;
    height: 22px;
    width: 36px;
    background-color: #fff;
    border-radius: 1000px;
    border: 2px solid rgba(0,0,0,.1);
    transition: all .1s;
   }
   .switch-ellipse .switch-circle.active{
    left: 14px;
    border: 1px solid #fff;
    box-shadow: -1px 1px 1px #e8864c;
   
    transition: all .3s ease .05s;
   }
  .switch-ellipse .switch-circle{
    position: absolute;
    display: inline-block;
    height: 20px;
    width: 20px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: -1px 1px 1px #999;
    top: 0;
    left: 0;
    transition: all .3s;
   }
   ul.bikuang{
       height:2.2rem;
       width:95%;
       position:relative;
       margin:0 auto;
       box-sizing: border-box;
       border:1px solid #eee;
       border-radius: 5px;
       color:#666;
   }
       
   ul.bishang{
        position: relative;
        margin-top: 0.1rem;
        margin-left: 0.1rem;
        margin-right: 0.38rem;
        height: 64%;
        line-height: 0.32rem;

   }
   ul.bijia{
       line-height:0.66rem;
        border-top:1px solid #eee;
   }
    span.fuhao,span.shu{
        color:#e5000c;
    }
    span.zhtai{
        position:absolute;
        width:0.45rem;
        height:0.45rem;
        top:-2px;
        right:-2px;
        font-size: .45rem;
        z-index: 999;
        background:#fff;
        color:#bebebe;
    }
    div.xchayi{
        color:#333;
    }
    div.dcanshu,  
    div.neiduibi{
        position:relative;
        width:100%;
        margin-bottom:1rem;
    }
   ul.thtou,ul.libox,
   ul.qlist{
       position:relative;
       width:100%;
   }
   
   ul.thtou{
       min-height:0.70rem;
       background:#f9f9f9;
       border-bottom: 1px solid #eee;
   }
    ul.thtou,
    ul.libox{
       display: flex;
       box-sizing: border-box;
    }
   ul.libox{
            min-height:0.60rem;
            border-bottom:1px solid #eee;
        }
    li.ttou{
        width:18%;
        background:#f9f9f9;
    }    
     li.ttou{
         display:flex;
         align-items: center;
         justify-content: center;
         color: #666;
     }
     li.heli{
         display:flex;
         align-items: center;
         justify-content: center;
         color: #666;
     }
    li.td{
       width: 20.5%;
       box-sizing: border-box;
       border-right:1px solid #efefef;
       color:#333;
       display: flex;
      
       align-items: center;
       justify-content: center;
    }
    ul.thtou li.ttou>span,
    li.ttou>span,
    li.td>span{
        margin:0.12rem;
    }
    li.heli{
        padding-left:3rem;
    }
    ul.thtou  li.ttou{
        color:#333;
        font-size: 0.32rem;
        justify-content: left;
        padding-left: 0.32rem;
        box-sizing: border-box;
    }
    div.xiany{
        margin-top:0.6rem;
    }
    div.xchayi{
        line-height:0.7rem;
    }
    span.wenred{
        color:#e5000c;
    }
    span.youk,span.wuku{
        position:relative;
        margin-right:1rem
    }
    span.youk::after{
        content:" ";
        height:6px;
        width:6px;
        display:inline-block;
        border-radius: 50%;
        background:#333;
        position:absolute;
        left:-0.5rem;
        top:4px;
    }
    span.wuku::after{
        content:" ";
        height:1px;
        width:6px;
        display:inline-block;
        border-radius: 50%;
        background:#333;
        position:absolute;
        left:-0.5rem;
        top:4px;
    }
    div.fuzuom{
        position:fixed;
        z-index: 999;
        width:0.8rem;
        height:2rem;
        background:#bebebe;
        right:0;
        top:50%;
    }
    
    
    div.fuzuom span{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 0.56rem;
        color:#fff;
        font-weight: bold;
    } 
    
    div.fuyoum{
        position:fixed;
        z-index: 999;
        width:0.8rem;
        height:2rem;
        background:#bebebe;
        left:0;
        top:50%;
    }
    
    
    div.fuyoum span{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 0.56rem;
        color:#fff;
    } 
    
    div.fuku{
          width:30%;
          position:absolute;
          left:0;
          top:0.80rem;
          z-index:999;
          background:#fff;
    }    
    div.fuku  li.ttou,
    div.fuku ul.thtou{
        width:100%;
    }
     div.fuku  div.kaiguan{
            width:100%;
            box-sizing: border-box;
            padding-top: 0.2rem;
            padding-bottom: 0.15rem;
            
     }
    div.fuku ul.libox{
        height:100%;
    }
    
     div.fuku div.wqbao{
         height:2.57rem;
     }
  
    
    
</style>
