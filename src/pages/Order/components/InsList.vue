<template>
	<div class="InsList">
        <div class="zanwei"></div>
        <div class="fixeded">
            <div class="navbar">
            	<span class="iconfont" @click="toPrev">&#xe606;</span>
            	<span class="title">保险</span>
            	<span v-if="!isonios" class="sel" :style="{backgroundImage: 'url(' + curbxgs.ins_img + ')' }" ></span>
				<span v-if="isonios" class="sel" :style="{backgroundImage: 'url(' + imglogosrc+ ')' }" ></span>
            </div>
             <div class="total">
                <span>本页保费总计：</span>
                <span>￥<code>{{ttljia | geshihua}}</code> 元</span>
            </div>
        </div>
		
        
		<div class="importCar" v-if="is_zhonggui==0">
			<h3>平行进口车质保<span>{{curzhibaodata.period}}</span></h3>
			<p><span>方案</span> <span>1站车售价</span></p>
			<P class="last">
                <span class="xuezbspan" v-if="curzhibaodata.content.indexOf('整车全保')!=-1">{{curzhibaodata.type}}(需搭配商业险) <span class="detail"  @click="showxiangqing(curzhibaodata.insurance_company_id,curzhibaodata.guarantee_id)">详情</span></span> 
				<span class="xuezbspan" v-else>{{curzhibaodata.type}} <span class="detail" @click="showxiangqing(curzhibaodata.insurance_company_id,curzhibaodata.guarantee_id)">详情</span></span> 
                
				<span @click="importCarShow">
					<span style="color: #e5000c;">{{curzhibaodata.guarantee_price | geshihua}} 元</span>
					<span class="ijian iconfont" v-show="ishowzhibao">&#xe65e;</span>
					<span class="ijian iconfont" v-show="!ishowzhibao">&#xe65f;</span>
				</span>	
			</P>
			<ul v-show="ishowzhibao" >
                <li v-for="(item,key) in zhibaodada"  @click="importCarActive(item.guarantee_id,$event)" class="ozbli" :class="{redborder:curzhibaodata.guarantee_id==item.guarantee_id}">
                    <span class="getdata" v-if="item.content.indexOf('整车全保')!=-1">{{item.type}}(需搭配商业险) </span>
                    <span class="getdata" v-else>{{item.type}} </span>   
                    <span>{{item.guarantee_price | geshihua}} 元</span>
                 </li>
			</ul>
		</div>
		
		<div class="commerce">
			<h3>商业险</h3>
			<ul class="title">
				<li :class="{active: 1 == taocantype}" @click="commerceActive(1)">
					<p>基本保障</p>
					<span></span>
				</li>
				<li :class="{active: 2 == taocantype}" @click="commerceActive(2)">
					<p>高性价比</p>
					<span></span>
				</li>
				<li :class="{active: 3 == taocantype}" @click="commerceActive(3)">
					<p>全面保障</p>
					<span></span>
				</li>
				<li :class="{active: 0 == taocantype}" @click="commerceActive(0)">
					<p>个性化定制</p>
					<span></span>
				</li>
			</ul>
			<div class="listTitle">
				<span class="project">保险项目</span>
				<span class="limit">保额</span>
				<span class="premium">1站车保费</span>
			</div>
			<ul class="list">
                <div v-for="item in ysxjcdata">                  
                    <ul class="zhus clearfix">
                         <ul class="ztd1" @click="tanchusm(item.insurance_id)">
                            <span class="iconfont wenhao">&#xe682; </span>                                  
                        </ul>
                        <ul class="ztd2">                       
                            <span class="xianming">{{item.insurance_name}}</span>                    
                        </ul>
                        <ul class="ztd3" @click="zhushowornot(item.insurance_id)">
                            <span class="xianjia" v-if="item.coverage!=0&&item.iszhutou">
                                <span class="shu">{{item.coverage  | geshihua}}</span>
                                <span class="danwei">元</span>&nbsp;
                               
                                 <span class="iconfont confu" v-if="item.iszhushow">&#xe65e;</span>
                                 <span class="iconfont confu" v-if="!item.iszhushow">&#xe65f;</span>
                            </span>
                            <span class="xianjia" v-if="item.coverage==0&&item.iszhutou">
                                <span class="shu">投保</span>
                                    &nbsp;
                               <span class="iconfont confu" v-if="item.iszhushow">&#xe65e;</span>
                               <span class="iconfont confu" v-if="!item.iszhushow">&#xe65f;</span>
                                
                            </span>
                             <span class="xianjia" v-if="!item.iszhutou">
                                <span class="shu">不投保</span>
                                    &nbsp;
                                 <span class="iconfont confu" v-if="item.iszhushow">&#xe65e;</span>
                                 <span class="iconfont confu" v-if="!item.iszhushow">&#xe65f;</span>
                            </span>
                        </ul>
                        <ul class="ztd4">
                            <li class="cankprice"><span class="shu">{{item.premium | geshihua}}</span><span class="danwei">元</span></li>
                            <li class="yzcprice"><span class="shu">{{item.yipremium | geshihua}}</span><span class="danwei">元</span></li>

                        </ul>
                    </ul>
                    <div class="baobaoe" v-show="item.iszhushow">
                         <ul class="xuebaoe" >
                            <li v-for="(subitem,kye) in item.rules" @click="xuanbaoe(item.insurance_id,subitem.id,subitem.rule)" class="xueli" :class="{redborder:item.id==subitem.id&&item.iszhutou}" v-if="item.rules[kye].coverage!=0&&item.insurance_name.indexOf('自燃')==-1"><span class="shu">{{parseInt(subitem.coverage) | geshihua}}</span></li>
                            
                            <li class="xueli" @click="zhuxtoubao(item.insurance_id)" v-if="item.rules[0].coverage==0||item.insurance_name.indexOf('自燃')!=-1" :class="{redborder:item.iszhutou}"><span class="shu">投保</span></li>  
                            <li class="xueli" :class="{redborder:!item.iszhutou}" @click="zhuxbtbao(item.insurance_id)"><span class="shu">不投保</span></li>                   
                        </ul>
                    </div>
                </div>   
		
			</ul>
		</div>
		
		<div class="aoad">
			<ul v-show="aoadShow">
                <div v-for="item in ysxjcdata" v-if="item.is_sdew==1">
                    <li>
                        <span class="project"><p>不计免赔险-{{item.insurance_name}}</p></span>
                        <span class="limit" @click="bujishowornot(item.insurance_id)" v-if="item.isbjtou==true">投保&nbsp;&nbsp;
                            <span class="iconfont confu" v-if="item.isbjshow">&#xe65e;</span>
                            <span class="iconfont confu" v-if="!item.isbjshow">&#xe65f;</span>
                        </span>
                         <span class="limit" @click="bujishowornot(item.insurance_id)" v-if="item.isbjtou==false">不投保&nbsp;&nbsp;
                            <span class="iconfont confu" v-if="item.isbjshow">&#xe65e;</span>
                            <span class="iconfont confu" v-if="!item.isbjshow">&#xe65f;</span>
                         </span>
                        <span class="premium">
                             <p>{{item.sdew | geshihua}} 元</p>
                             <p>{{item.yisdew | geshihua}} 元</p>

                        </span>
                    </li>
                    <div class="baobaoe" v-show="item.isbjshow">
                         <ul class="xuebaoe ">
                            <li class="xueli " :class="{redborder:item.isbjtou}" @click="bjmpcaozuo(item.insurance_id,1)">
                                <span class="shu">投保</span></li>
                            
                            <li class="xueli"  :class="{redborder:!item.isbjtou}" @click="bjmpcaozuo(item.insurance_id,0)">
                                <span class="shu" >不投保</span></li>                   
                        </ul>
                    </div>
                </div>
				
				
			</ul>
			
			<h3 @click="aoadDown">{{aoadText}}</h3>
		</div>
		
		<div class="totla">
            
			<span class="shtal">商业险1站车补贴高达 {{100-zhekou}}% &nbsp;&nbsp;</span>
			<span class="premium">
                <p class="butie delsa clearfix"><span class="btoub baoheji">保费合计:</span> <span class="shujia">{{shangyejia  | geshihua}} 元</span></p>
				<p class="butie clearfix"><span class="btoub">补贴后合计:</span> <span class="shujia oredcolor"> {{yishangejia | geshihua }} 元</span></p>
				
			</span>
		</div>
		
		<div class="sali">
			<ul>
				<li>
					<span class="project">
						<div class="label" @click="activeLab()">
							<span :class="{active: jqchcoff}"></span>
						</div>
						{{seatCondition.tax_name}}
					</span>
					<span class="limit">{{seatCondition.condition_name}}</span>
					<span class="premium">{{ parseInt(seatCondition.price) | geshihua}} 元</span>
				</li>
				<li>
					<span class="project">
						<div class="label" @click="activeLab()">
							<span :class="{active: jqchcoff}"></span>
						</div>
						{{disCondition.tax_name}}
						</span>
					<span class="limit">{{disCondition.condition_name}}</span>
					<span class="premium">{{ parseInt( disCondition.price) | geshihua}} 元</span>
				</li>
			</ul>
			<p><span>交强险及车船税合计：</span><span>{{jq_chectaxjia | geshihua}} 元</span></p>
		</div>
	
    
        <div class="weizanwei"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
	// import imglogosrc from '@assets/img/1zhanchelogo.png' 
    var oimurl = "https://www.1zhanche.com/static/uploads/ins_company_uploads/";
 
   
    
	export default{
		name: 'InsList',
        props:{
            canobj:Object 
        },
		data(){
			return{
				isonios:false,
                imglogosrc:require('@/assets/img/1zhanchelogo.png'),
				
                ttljia:13659,////总价
                zhibjia:1500,///质保  curzhibaodata.guarantee_price 替代
                shangyejia:6513,////商业险(原价参考价)
                yishangejia:32315,////商业险一站车售价
                jq_chectaxjia:2000,/////车船税和交强险
                zhekou:61, /////折扣率
                taocantype:1,/////当前套餐类型,设置初始套餐1。即基础套餐
                taocanlist:{1:[],2:[],3:[]},/////套餐清单，对应套餐1，套餐2，套餐3
                
                smarr:[],  ///////保险说明数组
              
                aoadShow: true, /////不计免赔是否显示
                aoadText: "收起不计免赔特约险", /////不计免赔点击处文字显示
                
                allbxgs:[{
                    ins_img:oimurl+"20180806/fe39edf5f79b5fe94a90aa1921cd7490.png",
                    insurance_company_id:3,
                    company_name:"",
                    ins_phone:"95512",
                    discount:99,                   
                }],
                curbxgs:{
                    // imgurl:oimurl+"20180806/fe39edf5f79b5fe94a90aa1921cd7490.png",
                    ins_img:oimurl+"20180806/4c64f49ce8f9f2051dd572ace5169019.png",
                    insurance_company_id:3,
                    company_name:"",
                    ins_phone:"95512",
                    discount:99,     
                },
                curzhibaodata:{
                    content:"整车全保",
                    guarantee_id:12,
                    guarantee_price:12350,
                    id:85,
                    info:"综合保修方案（整车全保）",
                    is_rel_insurance:1,////是否必须购买商业险
                    period:"3年6万公里",
                    status:1,/////质保启用状态 
                },
                zhibaodada:[{
                    content:"整车全保",
                    guarantee_id:12,
                    guarantee_price:12350,
                    id:85,
                    info:"综合保修方案（整车全保）",
                    is_rel_insurance:1,////是否必须购买商业险
                    period:"3年6万公里",
                    status:1,/////质保启用状态 
                },{
                    content:"经济适用险全保",
                    guarantee_id:13,
                    guarantee_price:17350,
                    id:86,
                    info:"综合保修方案（整车全保）",
                    is_rel_insurance:1,////是否必须购买商业险
                    period:"3年6万公里",
                    status:1,/////质保启用状态 
                }
                ],
                ishowzhibao:true,
                is_import:1,  /////进口非进口  1 为进口，0 为国产
                is_zhonggui:1,   //////1 为中规，0 为非中规
                seatCondition:{},/////交强险
                disCondition:{},/////车船税
                
                jqchcoff:true,//////交强险和车船税的开关
           
                
                               
                syxbasedata:[],  //////基础商业险数据
                ysxjcdata:[],////////显示商业险数据
                startrule:2,///////分为三个规则，定义为1,2,3;其中1为默认选中最小值，值2为一般值,值3为最大值；
                bxsyarr:[],///////必选商业险选项
                             
                
				importCar: {
					active: 0,
					title: "整车全保（需搭配商业险）",
					money: "950 元",
					show: true
				},

                
			}
		},
		methods:{
			////判断是否是ios
			isiosptai(){
				if(mui.os.ios){
					this.isonios= true;
				}else{
					this.isonios= false;
				}
			},
			
            //////显示详情,参数为保险公司id 和 方案类型
            showxiangqing(n,type){
                this.$router.push({path:"/Zbdetail",query:{
                    goods_id:this.$route.query.goods_id,
                     cart_id:this.$route.query.cart_id,
                    insid:n,
                    otype:type
                }})
            },
            //////点击问号弹出说明
            tanchusm(n){
                var obj={};
                this.smarr.forEach(function(item){
                    if(item.insurance_id==n){
                        obj.sid = n;
                        obj.name =item.insurance_name;
                        obj.info =item.info;
                        obj.info_u  =item.info_u;
                        obj.star =item.star;
                        obj.status =item.status;
                    }
                });
                
                console.log(obj);
                var str = this.createwenhstr(obj);
                 this.$createDialog({
                    type: 'alert',
                    icon: 'cubeic-alert',
                    //  word-break: break-all ;
                    // line-height: 0.5rem ;
                    // white-space: normal ;
                    title: obj.name,
                    content: str,
                    confirmBtn: {
                      text: '确定',
                      active: true,
                      disabled: false,
                      href: 'javascript:;'
                    },                  
                   
                  }).show();
                  $("p.cube-dialog-title-def").css({"line-height":"0.40rem","overflow":"visible","white-space":"pre-wrap"})
               
            },
            
            createwenhstr(obj){
                var str ="";
                str += '<div class="wenshuo">';
                str += '<li class="tktou" style="font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;">保什么？</li>';
                str +=' <ul class="abaoli" style="line-height: 0.45rem;margin:0.15rem 0">'+obj.info+'</ul>';
                str += '<li class="tktou" style="font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;">我需要么？</li>';
                str +=' <ul class="abaoli" style="line-height: 0.45rem;margin:0.15rem 0">'+obj.info_u+'</ul>';
                str += '</div>';
                return str;
            },
            
			//上一页
			toPrev(){
				this.$router.push({
					path: "/OrderAddr",
					query: {
						goods_id:this.$route.query.goods_id,
			            cart_id:this.$route.query.cart_id
					}
				})
			},
			
            //平行进口车质保 的选择
            importCarActive(a,e){
                var  _this=this;
                var opan = this.iszhengcheqb(a);//////是否是整车全保：true为是，false为否
                if(!opan){//////不是整车全保，则直接变更数组 
                    this.checkcurzhibao(a);
                }else{/////是整车全保，则判断商业险是否有选中三项必选项
                    
                     var oarr= this.getzhibaglxian();
                     console.log(oarr);
                     if(oarr.length==0){
                         this.zhibaodada.forEach(function(item,oindex){
                            if(item.guarantee_id==a){
                                _this.curzhibaodata=item;
                            }
                         });	 
                         this.hejittl(); 
                     }else{
                         
                         var str = this.createzbtankstr(a,oarr);
                        this.$createDialog({
                         type: 'confirm',
                         icon: 'cubeic-alert',
                         title: '1站车提示您：',
                         content: str,
                         confirmBtn: {
                           text: '确定',
                           active: true,
                           disabled: false,
                           href: 'javascript:;'
                         },
                         cancelBtn: {
                           text: '取消',
                           active: false,
                           disabled: false,
                           href: 'javascript:;'
                         },
                         onConfirm: () => {
                          _this.checkcurzhibao(a);
                          _this.tongbucaozuo(oarr,1);
                          
                         },
                         
                       }).show()
  
                     }
                }                              
            },
            /////选中当前质保
            checkcurzhibao(a){
                var _this = this;
                 this.zhibaodada.forEach(function(item,oindex){
                 if(item.guarantee_id==a){
                       _this.curzhibaodata=item;
                   }
                });	 
                this.hejittl(); 
            },

            //////创建tankuank的str 。参数：n 操作项；arr为操作序列；flag==1 为选中（即投保），flag==0 为取消即（不投保）;
            ///////iszhuxi 标示为是主项触发还是不计免赔触发:值为 1 时，表示为 主项触发，值为 0 时，表示为不计免赔触发
            createzbtankstr(n,arr){ 
                var ocaoname="";
                this.zhibaodada.forEach(function(item){
                    if(n==item.guarantee_id){
                        ocaoname = item.content;
                    }
                });
                
                if(ocaoname.indexOf("整车全保")!=-1){
                    ocaoname = ocaoname +"(需搭配商业险)";
                }
                
                var str =''; ;
                str += "<div class='tankbox'>";
                str += "<li class='tktou' style='font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;'>您将选中以下项目:</li>";
                str += "<ul class='tankbao'><li class='tankli' style='line-height: 0.45rem;'>"+ocaoname+"</li> </ul>";
                str += "<li class='tktou' style='font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;'>您将同步选中以下项目:</li>";
                str += "<ul class='tankbao'>";
                for(var i=0,len=arr.length;i<len;i++){
                    str += "<li class='tankli' style='line-height: 0.40rem;'>"+arr[i].name+"</li>";
                }
                str += "</ul>";
                return str;
                
            },
            
            
            /////获取质保关联项的未选中项目
            getzhibaglxian(){
               var  _this = this;
                var oarr=[];
                this.ysxjcdata.forEach(function(item){
                   var oid =  item.insurance_id;
                   if(_this.taocanlist[1].indexOf(oid)!=-1){
                       var curchecked = item.iszhutou;
                       if(!curchecked){
                          var ojson ={};
                          ojson.mark = 1;
                          ojson.miao="主项";
                          ojson.oid=oid;
                          ojson.name = _this.getcurdyzhuname(oid);
                          oarr.push(ojson);

                           // oarr.push(item);
                       }
                   }
                });
                return oarr;
            },
            
            xuanbaoe(sranceid,subid,rule){
               //////如果rule==0,则为独立项，改变当前项即可；如果rule!=0，则为关联选中，需要改变所有项目
               var _this=this;
               
               var iscuridchecked = this.getcurzhuxcheckstatus(sranceid); //////当前id 的选中状态：当为选中时，实际上是操作保额选择；
               //////当没有选中时，实际上是操作选中加保额选择
              if(iscuridchecked){  /////保额选择
              
               this.choosebaoe(sranceid,subid,rule);
 
             }else{
                 /////先进行此项选中：1.判断有没有关联的没有选中的项目
                 /////获取关联项目的数组；
                 var glarr = this.getglweixuxiang(sranceid);
                 if(glarr.length==0){
                     ////直接选中当前项和不计免赔项
                     this.ysxjcdata.forEach(function(item){
                         if(item.insurance_id==sranceid){
                             item.iszhutou=true;
                             item.isbjtou=true;
                         }
                     });
                     this.choosebaoe(sranceid,subid,rule);
                     
                 }else {
                     var str =this.createtankstr(sranceid,glarr,1,1);
                      this.$createDialog({
                        type: 'confirm',
                        icon: 'cubeic-alert',
                        title: '1站车提示您：',
                        content: str,
                        confirmBtn: {
                          text: '确定',
                          active: true,
                          disabled: false,
                          href: 'javascript:;'
                        },
                        cancelBtn: {
                          text: '取消',
                          active: false,
                          disabled: false,
                          href: 'javascript:;'
                        },
                        onConfirm: () => {
                          _this.curcaozuodong(sranceid,1,1);////当前项的操作
                          _this.tongbucaozuo(glarr,1);////关联项同步选中操作
                          _this.choosebaoe(sranceid,subid,rule);
                        },
                        
                      }).show()

                 }
                 
             }
            
            },
            
            /////选中保额操作
            choosebaoe(sranceid,subid,rule){
                  var _this=this;
                   var iscuridchecked = this.getcurzhuxcheckstatus(sranceid); //////当前id 的选中状态：当为选中时，实际上是操作保额选择；
                   if(rule==0){
                       this.ysxjcdata.forEach(function(item){
                           if(item.insurance_id==sranceid){
                               var ocurindex = 0;
                               for(var keys in item.rules){
                                   if(subid==item.rules[keys].id){
                                       ocurindex= keys;
                                   }
                               };
                               
                               var ocaobj = item.rules[ocurindex];
                               for(var key in ocaobj){
                                   item[key]=ocaobj[key];
                               };
                  
                           }
                       })
                  
                   }else{
                    this.ysxjcdata.forEach(function(item){
                       if(item.rule!=0){
                           var curindex=_this.getcurruleindex(item,rule);
                           for(var key in item.rules[curindex]){
                               item[key]=item.rules[curindex][key];
                           } 
                       } 
                    });
                  }
            },
            
            
            //////获取关联的未选中的项目数组
            getglweixuxiang(sranceid){
              var garr =[];
              var iszhu = this.getguanliantype(sranceid); //////为1 则为主险，为2 则为附加险
              if(iszhu==1){  ////主险时  理论上仅考虑不计免赔险：此处我们设置当主项选中时，不计免赔默认同步选中，所以此不计免赔不在提示范围
                  
              }else if(iszhu==2){ /////附加险时，
                    var ojson ={};
                    ojson.mark = 0;
                    ojson.miao="不计免赔项";
                    ojson.oid=sranceid;
                    ojson.name = "不计免赔率险-"+this.getcurdyzhuname(sranceid);
                    garr.push(ojson);
                    var oylid = this.getcuryilaiid(sranceid);
                    var oyindex = this.getposindex(oylid);
                    var oychecked = this.ysxjcdata[oyindex].iszhutou;
                    if(!oychecked){
                         var ozjson={};
                         ozjson.oid=oylid;
                         ozjson.mark = "1";
                         ozjson.miao= "主项";
                         ozjson.name =this.getcurdyzhuname(oylid);
                         garr.push(ozjson);
                         var objson={};
                         objson.oid=oylid;
                         objson.mark = "0";
                         objson.miao= "不计免赔项";
                         objson.name ="不计免赔率险-"+this.getcurdyzhuname(oylid);
                         garr.push(objson);
                    };             
              }
              return garr;
            },
            
            //////获取当前rule 在item 中的索引
            getcurruleindex(item,rule){
                var ruleindex = 0;
                for(var key in item.rules){
                    if(rule==item.rules[key].rule){
                        ruleindex = key;
                    }
                }
                return ruleindex;
            },
            /////主险投保，这里只会有附加险出现，所以不必考虑主险的情况
            zhuxtoubao(n){
                 var _this = this;
                 var oarr= this.getzhuxcheckedglarr(n);
                 if(oarr.length==0){
                      this.ysxjcdata.forEach(function(item){
                        if(item.insurance_id==n){
                            item.iszhutou=true;
                            item.isbjtou=true;
                        } 
                     });
                 }else{
                  var str = this.createtankstr(n,oarr,1,1);
                   this.$createDialog({
                     type: 'confirm',
                     icon: 'cubeic-alert',
                     title: '1站车提示您：',
                     content: str,
                     confirmBtn: {
                       text: '确定',
                       active: true,
                       disabled: false,
                       href: 'javascript:;'
                     },
                     cancelBtn: {
                       text: '取消',
                       active: false,
                       disabled: false,
                       href: 'javascript:;'
                     },
                     onConfirm: () => {
                       _this.curcaozuodong(n,1,1);////当前项的操作
                       _this.tongbucaozuo(oarr,1);////关联项选中操作
                     },                     
                   }).show()
                     
                 }
            },
            ////////获取主险选择时候的关联选项
             getzhuxcheckedglarr(n){
         
              var garr=[];
              var oylid= this.getcuryilaiid(n);
              var oyindex = this.getposindex(oylid);
              var oychecked = this.ysxjcdata[oyindex].iszhutou;
              if(!oychecked){
                   var ozjson={};
                   ozjson.oid=oylid;
                   ozjson.mark = "1";
                   ozjson.miao= "主项";
                   ozjson.name =this.getcurdyzhuname(oylid);
                   garr.push(ozjson);
                   var objson={};
                   objson.oid=oylid;
                   objson.mark = "0";
                   objson.miao= "不计免赔项";
                   objson.name ="不计免赔率险-"+this.getcurdyzhuname(oylid);
                   garr.push(objson);
                   
                   var ojson ={};
                   ojson.mark = 0;
                   ojson.miao="不计免赔项";
                   ojson.oid=n;
                   ojson.name = "不计免赔率险-"+this.getcurdyzhuname(n);
                   garr.push(ojson);
              };            
             
              return garr;
            },
            
            
            
            //////主险不投保///////////////888888888888888888888888
            zhuxbtbao(n){
              
                ///////1.为质保关联项时，不能取消；条件：其一 此项在质保关联项中，其二 质保项此时为整车车全保
                var _this=this;
                var iszhibaoglx = this.iszbglxiangmu(n);
                //////质保关联项排除
                
                if(this.is_zhonggui==0){
                     ////先确认有没有质保项，如果有则先进行质保关联
                    if(iszhibaoglx){
                        var str = this.getbixuanstr(n);
                        this.$createDialog({
                            type: 'alert',
                            icon: 'cubeic-alert',
                            title: '一站车提示您：',
                            content: str,
                            confirmBtn: {
                              text: '确定',
                              active: true,
                              disabled: false,
                              href: 'javascript:;'
                            },
                          }).show()
                        return false;
                    };
                }
               
                
                var iszhuxm = this.getguanliantype(n);
                var oglarr =  this.getzhuxbxglarr(n);
                console.log(oglarr);
                if(oglarr.length==0){ /////就只要取消自身
                    this.curcaozuodong(n,0,1)
                }else{
                    var str =this.createtankstr(n,oglarr,0,1);
                    this.$createDialog({
                       type: 'confirm',
                       icon: 'cubeic-alert',
                       title: '1站车提示您：',
                       content: str,
                       confirmBtn: {
                         text: '确定',
                         active: true,
                         disabled: false,
                         href: 'javascript:;'
                       },
                       cancelBtn: {
                         text: '取消',
                         active: false,
                         disabled: false,
                         href: 'javascript:;'
                       },
                       onConfirm: () => {
                         _this.curcaozuodong(n,0,1);////当前项的操作
                         _this.tongbucaozuo(oglarr,0);////关联项选中操作
                         
                         
                       },
                       
                     }).show()

                }
                             
            },
            
            getzhuxbxglarr(n){
               var _this=this;
              var iszhuxm = this.getguanliantype(n);
             
              var garr=[];
              if(iszhuxm==1){  /////主险
                  /////当为主险时，判断不计免赔项是否为选中状态，如果为选中状态，则把不计免赔项加入到arr(先经过json 转换)
                   var oindex = this.getposindex(n);
                   var objchecked = this.ysxjcdata[oindex].isbjtou;
                   if(objchecked){  /////不计免赔险为选中时
                        var ojson ={};
                        ojson.mark = 0;
                        ojson.miao="不计免赔项";
                        ojson.oid=n;
                        ojson.name = "不计免赔率险-"+this.getcurdyzhuname(n);
                        /////主险都有不计免赔率险，所以这里就不用判断不计免赔率险的价格了
                        garr.push(ojson);
                   }/////为没有选中时，则不管    
                    var tglarr = this.getyilaizhuxianarr(n);   
                    for(var i=0,len=tglarr.length;i<len;i++){
                        this.ysxjcdata.forEach(function(item,key){
                            if(item.insurance_id==tglarr[i]){
                                if(item.iszhutou){ ////关联副险为选中状态
                                     var ozjson={};
                                         ozjson.mark = "1";
                                         ozjson.miao= "主项";
                                         ozjson.oid=item.insurance_id;
                                         ozjson.name =_this.getcurdyzhuname(item.insurance_id);
                                         garr.push(ozjson);
                                         if(item.isbjtou){
                                            var objson={};
                                            objson.oid=item.insurance_id;
                                            objson.mark = "0";
                                            objson.miao= "不计免赔项";
                                            objson.name ="不计免赔率险-"+_this.getcurdyzhuname(item.insurance_id);
                                            var ishasshew = _this.ysxjcdata[key].sdew
                                            if(ishasshew>0){
                                                 garr.push(objson); 
                                            }
                                           
                                    }
                                }
                            }
                        });
                    }
                
                         
              }else if(iszhuxm==2){ /////附件险
                  ///////省的不计免赔项
                  var oindex = this.getposindex(n);
                  var objchecked = this.ysxjcdata[oindex].isbjtou;
                  if(objchecked){  /////不计免赔险为选中时
                       var ojson ={};
                       ojson.mark = 0;
                       ojson.miao="不计免赔项";
                       ojson.oid=n;
                       ojson.name = "不计免赔率险-"+this.getcurdyzhuname(n);
                       var ishasshew = this.ysxjcdata[oindex].sdew ;
                        //////当不计免赔率险为价格为0 时，说明 没有不计免赔率险
                       if(ishasshew>0){
                            garr.push(ojson);
                       }

                  }/////为没有选中时，则不管  
                  
                  // var oylid = this.getcuryilaiid(n);
                  // var oyindex = this.getposindex(oylid);
                  // var oychecked = this.ysxjcdata[oyindex].iszhutou;
                  // if(oychecked){
                  //      var ozjson={};
                  //      ozjson.oid=oylid;
                  //      ozjson.mark = "1";
                  //      ozjson.miao= "主项";
                  //      ozjson.name =this.getcurdyzhuname(oylid);
                  //      garr.push(ozjson);
                  //      var objson={};
                  //      objson.oid=oylid;
                  //      objson.mark = "0";
                  //      objson.miao= "不计免赔项";
                  //      objson.name ="不计免赔率险-"+this.getcurdyzhuname(oylid);
                  //      garr.push(objson);
                  // };                
              }
              return garr;
            },
            //////获取以n 为依赖的附加险的数组id
            getyilaizhuxianarr(n){
                var arr=[];
                this.ysxjcdata.forEach(function(item){
                    if(item.is_re_independent==n){
                        arr.push(item.insurance_id);
                    }
                });
                return arr;
            },
            
            //////质保关联str
            getbixuanstr(n){
               var oname = this.getcurdyzhuname(n);
               var str="";
               str +="<div class='axbli'><li class='zheboxli'> <strong> "+oname+" </strong>项 为平行进口车质保 ";
               str +="<strong> 整车全保(需搭配商业险)</strong> 必选项，故不能取消，请知悉~~</li></div>";
               return str;
            },
            
            /////当前项是否为基础套餐中的一项
            iszbglxian(n){
              return this.taocanlist[1].indexOf(n)!=-1;
            },
            
            ///////当前质保项是否为整车全保项
            iscurzbquanbao(n){
               return this.curzhibaodata.content.indexOf("整车全保")!=-1;
            },
                   
            //////是否是质保关联项
            iszbglxiangmu(n){
               /////1.当前状态为非选中状态2.当前项为必选项，3.当前质保项为整车全保
               var oindex = this.getposindex(n);
               var ochecked = this.ysxjcdata[oindex].iszhutou;
              
              return  ochecked&&this.iszbglxian(n)&&this.iscurzbquanbao(n);
            },
            
            //////商业险必选项是否全部选中
            getbxisallchecked(){
                //////设置必选项与基本套餐项目相同，基本套餐为套餐1
                var allchecked=true;
                for(var i=0,len=this.taocanlist[1].length;i<len;i++){
                    var oid = this.taocanlist[1][i];
                    this.ysxjcdata.forEach(function(item){
                        if(item.insurance_id==oid){
                           
                            allchecked=allchecked&&item.iszhutou
                        }    
                    });
                };
                return allchecked;
            },

           iszhengcheqb(a){
               var oflag = false;
               this.zhibaodada.forEach(function(item){
                   if(item.guarantee_id==a){
                      if( item.content.indexOf("整车全保")!=-1){
                          oflag = true;
                      }
                   }
               });
               return oflag;
           },
           
            
			//收起进口车质保
			importCarShow(){
			
                this.ishowzhibao=!this.ishowzhibao;
			},
			//商业险配置选择
			commerceActive(a){
				this.taocantype = a;
                this.diaoyongbasedata();/////套餐数据更新
               
                // 
                // this.hejittl(); /////本页小计计算
			},
			//不计免赔展开收起
			aoadDown(){
				this.aoadShow = !this.aoadShow;
				this.aoadText = this.aoadShow ? "收起不计免赔特约险" : "展开不计免赔特约险";
			},
            
			//车船税
			activeLab(){/////同时选中或者取消
                //////先判断是否有选择商业险，如果没有选则，则直接操作；如果有选择，则不能取消
                var ishassyx=false;
                this.ysxjcdata.forEach(function(item){
                    ishassyx=ishassyx||item.iszhutou;
                });
                
                if(!ishassyx){ ////没有商业险，则直接选中或者取消
                    this.jqchcoff = !this.jqchcoff;
                    this.hejittl();   
                }else{ /////有商业险
                    if(this.jqchcoff){//////选中状态
                        // alert("当选中商业险时，交强险和车船税不能取消");
                        this.$createDialog({
                            type: 'alert',
                            icon: 'cubeic-alert',
                            title: '1站车提示您：',
                            content: '当购买商业险时，交强险和车船税不能取消',
                            confirmBtn: {
                            text: '确定',
                            active: true,
                            disabled: false,
                            href: 'javascript:;'
                            },
                          }).show()
                    }else{/////未选状态
                        this.jqchcoff = !this.jqchcoff;
                        this.hejittl();   
                    }
                }
			},
            
            
            
            //////设置折扣价
            getzhekou(n,arr){
               var _this=this;
               arr.forEach(function(item,oindex){
                   if(item.company_id==n){
                       // _this.zhekou= 100 - parseInt( item.discount);
                       _this.zhekou= parseInt( item.discount);
                   }
               });
            },
           
           
            startdata(){
                var ourl = this.$store.state.Yi + "index/order/orderins";
                var ogoodsid =this.$route.query.goods_id||0;
                var ocartid= this.$route.query.cart_id||1349;
              
                var _this=this;
                axios.get(ourl,{
                    params: {
                        "goods_id":ogoodsid,
                        "cartid":ocartid
                    }
                }).then(function(res){
                    if(res.data.error==404){
                        _this.$router.push({path: '/Mall'});
                    }else{
                        
                       
                        
                        _this.zhibaodada=res.data.newGuaRes;
                        _this.is_import=res.data.is_import;
                        if(res.data.cartype_value=="中规"){
                            _this.is_zhonggui = 1;
                        }else {
                             _this.is_zhonggui = 0;
                        }
                        _this.curzhibaodata = _this.zhibaodada[0];//////默认第一项，综合质保方案
                        _this.seatCondition=res.data.seatCondition;
                        _this.disCondition=res.data.disCondition;
                        
                        _this.seatCondition.checkes=true;////默认选中交强险
                        _this.disCondition.checkes=true;////默认选中车船税
                        _this.getzhekou(res.data.seleteced_company_id,res.data.disInfoArr); /////折扣价初始化
                  
                        
                        var oarr = res.data.insRes;                        
                        _this.getsyxjcdata(oarr); /////设置商业险初始数据
                        
                        _this.smarr = res.data.insName;  ///////初始化保险说明数组
                    
                    }
                   
                  console.log(res.data);
                    
                }).catch(function(res){
                    
                      console.log("调用出错");
                     
                });
              
                
                // axios.post(url,qs.stringify({
                //     
                // }))
               
            },
            /////交强险和车船税加总
            jqxchetaxttl(){
                this.jq_chectaxjia = Number(this.jqchcoff)*(parseInt(this.seatCondition.price)+parseInt(this.disCondition.price));
            },
            //////质保加总
            zhibaottl(){
                 this.zhibjia= this.curzhibaodata.guarantee_price;    
            },
            //////商业险加总
            shanyexianttl(){
                this.shangyejia;
                var yitsum=0;
                var tsum=0;
               
                this.ysxjcdata.forEach(function(item){
             
                    yitsum+= Number(item.iszhutou)*(parseInt( item.yipremium) + Number(item.is_sdew)*Number(item.isbjtou)*parseInt(item.yisdew))
                 
                    tsum+= Number(item.iszhutou)*(parseInt( item.premium) + Number(item.is_sdew)*Number(item.isbjtou)*parseInt(item.sdew))
                });
        
                this.shangyejia=tsum;
                this.yishangejia=yitsum;
                
            },
            
            ///////小计加总
            hejittl(){
                this.zhibaottl();
                this.jqxchetaxttl();
                this.shanyexianttl();
                if(this.is_zhonggui==0){
                     this.ttljia= parseInt(this.zhibjia) + parseInt(this.yishangejia)+parseInt(this.jq_chectaxjia);
                }else if(this.is_zhonggui==1){
                    this.ttljia=  parseInt(this.yishangejia)+parseInt(this.jq_chectaxjia);
                }
               
            },
            
            //////获取初始商业险数据（即获取商业险页面基础数据）
            getsyxjcdata(oarr){
               
                var _this = this;
                var arr1=[];
                var arr2 =[];
                var arrdata=[]; 
                var newarrdata=[];                                 
                var arrkey1=["insurance_id","insurance_base","is_re_independent","insurance_name","recommend_type","is_sdew","info"],
                arrkey2=["id","coverage","premium","sdew","rule"];
                oarr.forEach(function(item){
                   var objson={}; 
                   var objsonrules={};
                   if(arr1.indexOf(item.insurance_id)==-1){
                       arr1.push(item.insurance_id);
                   }
                 
                   for(var i=0,len=arrkey1.length;i<len;i++){
                       var okeys=arrkey1[i];
                       objson[okeys]=item[okeys];
                   }
                   for(var j=0,lenj=arrkey2.length;j<lenj;j++){
                        var okeyj=arrkey2[j];
                        objsonrules[okeyj]=item[okeyj];
                   }
                   ////加入一站车保费 yipremium和 yisdew; 
                   objsonrules.yipremium = Math.ceil( _this.zhekou* parseInt(item.premium)/100);
                   objsonrules['yisdew'] = Math.ceil( _this.zhekou* parseInt(item.sdew)/100);
                   
                    
                  if(arr2.indexOf(item.insurance_id)==-1){
                        arr2.push(item.insurance_id);
                        objson.rules=[];
                        objson.rules.push(objsonrules); 
                        arrdata.push(objson);
                   }else{
                       var oindex=getindex(item.insurance_id,arrdata);
                       arrdata[oindex].rules.push(objsonrules);
                   }
                });
                arr1.sort();
                for(var i=0,len=arr1.length;i<len;i++){
                    arrdata.forEach(function(item){
                       if(item.insurance_id==arr1[i]){     
                           var curindex = _this.getstartrulezhi(_this.startrule,"premium",item.rules);
                           //////把当前默认选中的项目加入到显示页面上
                           item.coverage =parseInt( item.rules[curindex].coverage);
                           item.premium =parseInt( item.rules[curindex].premium);
                           item.yipremium = parseInt(item.rules[curindex].yipremium);
                           item.sdew =parseInt( item.rules[curindex].sdew);
                           item.yisdew = parseInt(item.rules[curindex].yisdew);
                           item.rule = item.rules[curindex].rule;
                           item.id = item.rules[curindex].id;
                           item.isbjtou=true; /////不计免赔书否投保，默认投保
                           item.iszhushow=false; /////主险选择项显示影藏的开关
                           item.isbjshow=false;  /////不计免赔项显示影藏的开关
                           item.iszhutou=true;  /////主项是否投保开关，默认都投
                           newarrdata.push(item);
                       }
                    });          
                }
                console.log(newarrdata);
                // this.ysxjcdata=newarrdata;
                this.syxbasedata = newarrdata;
                this.gettaocanobj(newarrdata);
                this.diaoyongbasedata();
                
                function getindex(oid,arr){
                    var oindex;
                    for(var i=0,len=arr.length;i<len;i++){
                        if(arr[i].insurance_id==oid){
                            oindex=i;
                        }
                    };
                    return oindex;
                }
            },
            //////获取初始规则的值:n表示去哪种规则，1 为最小，2为中间，3为最大
            getstartrulezhi(n,key,arr){
                var arrxuan=[];
                var oindex;
                for(var i=0,len=arr.length;i<len;i++){
                    var val = parseInt(arr[i][key]);
                    arrxuan.push(val);
                };
                //////数组排序获取索引
                var omin=Math.min(arrxuan[0],arrxuan[1],arrxuan[2]);
                var omax=Math.max(arrxuan[0],arrxuan[1],arrxuan[2]);
                var oindexmin= arrxuan.indexOf(omin);
                var oindexmax= arrxuan.indexOf(omax);
                var omax_min=[oindexmin,oindexmax];
                var omiddle=0;
              
                for(var j=0,lenj=arrxuan.length;j<lenj;j++){
                   if(omax_min.indexOf(j)==-1){
                       omiddle=j;
                   }
                };
             
                if(n==1){/////获取最小值索引
                    oindex=oindexmin;
                }else if(n==2){/////获取中间值索引
                     oindex=omiddle;
                }else if(n==3){/////获取最大值索引
                     oindex=oindexmax;
                }
                return oindex;
            },
            ////不计免赔操作: flag==1 为投保，flag==0 为取消,n为选中项的suranceid 
            bjmpcaozuo(n,flag){
                var _this=this;
               if(flag==1){
            
                   //////先判断主险是否已经选中，
                   var curzhuchecked =this.getcurzhuxcheckstatus(n);
                   if(curzhuchecked){//////当前主险选中时，直接选中不计免赔
                        this.ysxjcdata.forEach(function(item){
                          if(item.insurance_id==n){
                              item.isbjtou=true
                          } 
                       });  
                   }else{/////当前主险没有选中时，需要提示;
                    var ogarr =this.getyilaizhuxarr(n);
                    
             
                     var str =this.createtankstr(n,ogarr,1,0);
                     
                     this.$createDialog({
                        type: 'confirm',
                        icon: 'cubeic-alert',
                        title: '1站车提示您：',
                        content: str,
                        confirmBtn: {
                          text: '确定',
                          active: true,
                          disabled: false,
                          href: 'javascript:;'
                        },
                        cancelBtn: {
                          text: '取消',
                          active: false,
                          disabled: false,
                          href: 'javascript:;'
                        },
                        onConfirm: () => {
                            console.log("到这里了")
                          _this.curcaozuodong(n,1,0);////当前项的操作
                          _this.tongbucaozuo(ogarr,1);////关联项选中操作
                        },
                       
                      }).show()
  
                   }
                             
               }else if(flag==0){
                    console.log("不计免赔不投保");
                    this.ysxjcdata.forEach(function(item){
                       if(item.insurance_id==n){
                           item.isbjtou=false
                       } 
                    });  
               }
               
            },
            
            //////同步操作数组项
            /////参数：flag 为1 时，为同步选中（即投保），flag 为0 时，为同步取消（即不投保）
            tongbucaozuo(arr,flag){
                 for(var i=0,len=arr.length;i<len;i++){
                     var omark = arr[i].mark;
                     var oid = arr[i].oid;
                     this.ysxjcdata.forEach(function(item){
                         if(item.insurance_id==oid){
                             if(omark==1){ //////主项操作
                                if(flag==1){ /////选中操作
                                    item.iszhutou=true;
                                }else if(flag==0){ ///////取消操作 
                                     item.iszhutou=false;
                                }  
                             }else if(omark==0){ ////不计免赔项操作
                                 if(flag==1){
                                     item.isbjtou=true;
                                 }else if(flag==0){
                                      item.isbjtou=false;
                                 }
                             }
                         }
                     });
                     
                 }
            },
            
            //////当前项的选中操作和取消操作
            ///// n 为当前项的 suranceid,参数ischeck 为当前项是选中还是取消：1 选中，0 为取消；
            /////curp 为当前项的位置，为不计免赔还是主项：1 为主项，0 为不计免赔
            curcaozuodong(n,ischeck,curp){
               var oindex = this.getposindex(n);
               
               if(curp==1){
                       
                   if(ischeck==1){
                     
                        this.ysxjcdata[oindex].iszhutou = true;
                   }else if(ischeck==0){
                        this.ysxjcdata[oindex].iszhutou = false;
                   }
                   
                   
               }else if(curp==0){
                      
                  if(ischeck==1){
                       this.ysxjcdata[oindex].isbjtou = true;
                  }else if(ischeck==0){
                      this.ysxjcdata[oindex].isbjtou = false;
                  }
               }
            },
            
            //////创建tankuank的str 。参数：n 操作项；arr为操作序列；flag==1 为选中（即投保），flag==0 为取消即（不投保）;
            ///////iszhuxi 标示为是主项触发还是不计免赔触发:值为 1 时，表示为 主项触发，值为 0 时，表示为不计免赔触发
            createtankstr(n,arr,flag,iszhuxi){
                var oindex= this.getposindex(n);
                var curobj = JSON.parse(JSON.stringify(this.ysxjcdata[oindex]));
                var ocaotitle ='';
                var ocaoname ='';
                if(flag==1){
                    ocaotitle ='投保';
                }else if(flag==0){
                     ocaotitle ='取消投保';
                };
                if(iszhuxi==1){
                    ocaoname=curobj.insurance_name;
                }else if(iszhuxi==0){
                    ocaoname="不计免赔率险-"+curobj.insurance_name;
                }
                var str ='';
                str += "<div class='tankbox'>";
                str += "<li class='tktou' style='font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;'>您将"+ocaotitle+"以下项目:</li>";
                str += "<ul class='tankbao'><li class='tankli'  style='line-height: 0.45rem;'>"+ocaoname+"</li> </ul>";
                str += "<li class='tktou' style='font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;'>您将同步"+ocaotitle+"以下项目:</li>";
                str += "<ul class='tankbao'>";
                for(var i=0,len=arr.length;i<len;i++){
                    str += "<li class='tankli'  style='line-height: 0.45rem;'>"+arr[i].name+"</li>";
                }
                str += "</ul>";
                return str;
                
                  str += "<li class='tktou' style='font-size: 16px;font-weight: bold;line-height: 0.60rem;color:#000;'>您将选中以下项目:</li>";
                str += "<ul class='tankbao'><li class='tankli' style='line-height: 0.45rem;'>"+ocaoname+"</li> </ul>";
                
            },
            
            
            
            /////获取对主险依赖的项目
            getyilaizhuxarr(n){
                /////1 主项，2 对主项的依赖项，3 对主项依赖项的不计免赔
                var olei=this.getguanliantype(n);  ///// 为1 则是独立险，为2 则是附件险
                var okyindex = this.getposindex(n); /////获取当前对象在数组中的位置
              
                var garr=[];
                if(olei==1){/////独立险
                   var ozhucheck = this.ysxjcdata[okyindex].iszhutou;
                   if(!ozhucheck){
                       var ojson={};
                       ojson.oid=n;
                       ojson.mark = "1";
                       ojson.miao= "主项";
                       ojson.name = this.getcurdyzhuname(n);
                       garr.push(ojson);
                   }                   
                }else{ /////附加险
                    var ozhucheck = this.ysxjcdata[okyindex].iszhutou;
                    if(!ozhucheck){
                        var ojson={};
                        ojson.oid=n;
                        ojson.mark = "1";
                        ojson.miao= "主项";
                        ojson.name = this.getcurdyzhuname(n);
                        garr.push(ojson);
                    };
                    var oylid= this.getcuryilaiid(n);
                    var oyindex = this.getposindex(oylid);
                    var oychecked = this.ysxjcdata[oyindex].iszhutou;
                    if(!oychecked){
                         var ozjson={};
                         ozjson.oid=oylid;
                         ozjson.mark = "1";
                         ozjson.miao= "主项";
                         ozjson.name =this.getcurdyzhuname(oylid);
                         garr.push(ozjson);
                         var objson={};
                         objson.oid=oylid;
                         objson.mark = "0";
                         objson.miao= "不计免赔项";
                         objson.name ="不计免赔率险-"+this.getcurdyzhuname(oylid);
                         garr.push(objson);
                    }
                }
                return garr;
            },
            
            //////获取当前依赖项的suranceid
            getcuryilaiid(n){
                var oindex = this.getposindex(n);
                var oid =  this.ysxjcdata[oindex].is_re_independent;
                return oid;
            },
            ///////获取当前项对应的名称
            getcurdyzhuname(n){
              var oindex = this.getposindex(n);
              return this.ysxjcdata[oindex].insurance_name;
            },
            /////有两种关联类型:其一：为独立险is_re_independent 为0，  记录类型为 1;其二：为附加独立险，即需要依赖主险生存，记录为2.
            getguanliantype(n){
                var tag = 1;var otype=1;
                this.ysxjcdata.forEach(function(item){
                    if(item.insurance_id==n){
                       tag = item.is_re_independent;
                    }
                });
                
                if(tag==0){
                     otype=1
                }else{
                    otype=2;
                };
              
               return otype;
            },
            /////获取当前surancceid 在显示数组中的位置
            getposindex(n){
                var tarindex=0;
                this.ysxjcdata.forEach(function(item,index){
                    if(item.insurance_id==n){
                        tarindex = index;
                    }
                });
                return tarindex;
            },
            
            //////获取当前主险的选中状态
            getcurzhuxcheckstatus(n){
                var ochecked ;
                this.ysxjcdata.forEach(function(item){
                    if(item.insurance_id==n){
                        ochecked = item.iszhutou;
                    }
                });
                return ochecked;
            },
            
            /////主项项目的显示与影藏
            zhushowornot(n){
                this.ysxjcdata.forEach(function(item){
                   if(item.insurance_id==n){
                       item.iszhushow= !item.iszhushow;
                   } 
                });
            },
            //////不计免赔项目的显示与影藏
            bujishowornot(n){
                this.ysxjcdata.forEach(function(item){
                   if(item.insurance_id==n){
                       item.isbjshow= !item.isbjshow;
                   } 
                });
            },
            ////////获取套餐数组
            gettaocanobj(arr){
                var _this=this;
                var obj ={};
                obj[1]=[], obj[2]=[],obj[3]=[];
                arr.forEach(function(item){
                   var oid = item.insurance_id;
                   var arrtao= item.recommend_type.split(",");
                   for(var i=0,len=arrtao.length;i<len;i++){
                       
                       for(var key in obj){
                           if(key==arrtao[i]){
                               obj[key].push(oid);
                           }
                       }
                   }
                });
                this.taocanlist=JSON.parse(JSON.stringify(obj)) ;
                console.log(obj);//////套餐
            },
            diaoyongbasedata(){
               
                var _this=this;
                var jtaocan={};
                for(var key in _this.taocanlist){
                   jtaocan[key]=[];
                   this.syxbasedata.forEach(function(item){
                        if(_this.taocanlist[key].indexOf(item.insurance_id)!=-1){
                            jtaocan[key].push(item);
                        }
                    });
                } 
               
                console.log(jtaocan);  
                if(this.taocantype==1){
                    this.ysxjcdata = JSON.parse(JSON.stringify(jtaocan[1]));
                }else if(this.taocantype==2){
                    this.ysxjcdata = JSON.parse(JSON.stringify(jtaocan[2]));
                }else if(this.taocantype==3){
                    this.ysxjcdata = JSON.parse(JSON.stringify(jtaocan[3]));
                }else if(this.taocantype==0){
                    this.ysxjcdata = JSON.parse(JSON.stringify(this.syxbasedata));
                    /////taocantype  选择个性化定制时，除了必选项之外，全部不选中
                    if(this.curzhibaodata.content.indexOf("整车")!=-1){ //////整车全保，综合保修方案
                        this.syjichubaoqiyubutoub();
                    }else{//////其他方案
                        this.syqbbutoubao();
                    }
                    
                }
                
            },
            
            //////商业险全部不选中即不投保
            syqbbutoubao(){
                this.ysxjcdata.forEach(function(item){
                    item.iszhutou = false;
                    item.isbjtou = false;
                });
            },
            //////商业险基础投保，其他不投保
            syjichubaoqiyubutoub(){
                var _this=this;
                 this.ysxjcdata.forEach(function(item){
                     item.iszhutou = false;
                     item.isbjtou = false;
                    if(_this.taocanlist[1].indexOf(item.insurance_id)!=-1){
                          item.iszhutou = true;
                          item.isbjtou = true;
                    }
                });
            },
            getcanshu(){
                this.canobj.ins_company_id = this.curbxgs.insurance_company_id;
                this.canobj.gua_rel_id = this.curzhibaodata.id;
                this.canobj.rule_ids = this.getchuanid().zhuxuan;
                this.canobj.sdew_ids= this.getchuanid().buji;
                this.canobj.compulsory_id = this.seatCondition.id;
                this.canobj.vehicel_id =this.disCondition.id;
                console.log(this.canobj);
            },
            
            getchuanid(){
                var obj={};
                var zhuchuan=[];
                var bujimpei=[];
                this.ysxjcdata.forEach(function(item){
                    if(item.iszhutou){
                        zhuchuan.push(item.id);
                    };
                    if(item.isbjtou){
                        if(item.sdew!=0){
                             bujimpei.push(item.id);
                        }
                       
                    }
                });
                obj.zhuxuan= zhuchuan.join("-");
                obj.buji= bujimpei.join("-");
                return obj;
            }
            
		},
        mounted() {
            this.startdata();        
			  this.isiosptai();
        },
        updated() {
             this.hejittl();  
             this.getcanshu();
           
          
        },
       
      
	}
</script>

<style scoped="scoped">
    span.shtal{
        line-height:0.45rem;
    }
    span.oredcolor{
        color:#E5000c;
    }
    span.baoheji::before{
        content:"";
        display:inline-block;
        width:1.5em;
        height:100%;
    }
    span.btoub{
        float:left;
    }
    span.shujia{
        float:right;
    }
    span.confu{
        font-size: 0.24rem;
        position:absolute;
        right:-0.12rem;
    }
    
    span.xuezbspan{
        width:65%;
    }
    span.ijian{
        font-size: 0.24rem;
    }
    div.baobaoe{
           background-color:#f0eff5;
    }
    ul.xuebaoe {
        height:1.17rem;
        margin: 0 0.2rem;
        display:flex;
        justify-content:space-around;
        align-items: center;
    }
	div.baobaoe ul.xuebaoe li.xueli{
        height:0.60rem;
        line-height:0.60rem;
        border:1px solid #bcbcbe;
        border-radius: 3px;
        padding:0 0.24rem;
        background-color: #fff;
    }
    div.baobaoe ul.xuebaoe li.xueli.redborder{
         border:1px solid #e5000c;
         color:#e5000c;
    }
    ul.zhus {
        margin: 0 0.2rem;
    }
    ul.zhus>ul{
        float:left; 
        height:0.86rem;
        border-bottom:1px solid #eee;
        font-size: 0.24rem;
        color:#666;
    }
    .abaoli{
        display:none;
    }
    ul.zhus>ul.ztd3 ul.abaoli li{
        line-height:0.40rem;
        height:0.40rem;
        border-bottom: none;
        text-align: center;
        display: block;
    }
   
     ul.zhus>ul.ztd4 li{
         line-height:0.43rem;
         height:0.43rem;
         border-bottom: none;
         width:100%;
        text-align: right;
        display:block; 
     } 
     ul.zhus>ul.ztd4 li.yzcprice{
            font-size: .26rem;
            color: #e5000c;
            line-height: .45rem;
    }
    ul.zhus>ul.ztd4 li.cankprice{
            font-size: .24rem;
            text-decoration: line-through;
            line-height: .55rem;
     }
     span.toxyou{
         font-size: 0.24rem;
     }
    .ztd1{
        width:6%;
       
      
        position:relative;
    }
    span.wenhao{
        position:absolute;
        width:.036rem;
        height:0.36rem;
        bottom: 0;
        top:0;
        left:0.01rem;
        display: inline-block;
        margin:auto;
        color:#e5000c;
    }
     .ztd2{
        width:40%;
        position:relative;
        text-align: left;
        height:100%;
    }
      ul.zhus>ul.ztd2{
          display:flex;
          
      }
      
     ul.zhus>ul.ztd2 span.xianming  {
         -webkit-box-flex: 1.8;
        -ms-flex: 1.8;
        flex: 1.8;
        text-align: left;
        
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        line-height:0.32rem;
      }
      span.getdata{
          width:67%;
          text-align: left;
      }
    span.xianjia{
        line-height: 0.86rem;
      
    }
    .ztd3{
        width:29%;
        position:relative;
    }
     .ztd4{
        width:25%;
        position:relative;
    }
	.InsList{
		margin-bottom: 1rem;
	}
	.fixeded{
        position: fixed;
        width:100%;
        top: 0;
        background:#fff;
        z-index:999;
    }
	.navbar{
		height: .9rem;
		width: 100%;
		z-index: 15;
		background-color: #fcfcfc;
		display: flex;
	}
	
	.navbar span{
		flex: 1;
		line-height: .9rem;
		padding: 0 .2rem;
	}
	
	.navbar .iconfont{
		text-align: left;
		font-weight: 500;
	}
	
	.navbar .title{
		font-size: .32rem;
		font-weight: 500;
	}
	
	.navbar .sel{
		font-size: .24rem;
		text-align: right;
		color: #666;
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 100% auto;
        padding: 0 0 0 0.2rem;
        margin-right:0.2rem;
	}
	
	.total{

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .2rem;
		font-size: .3rem;
		height: .82rem;
		border-top: 1px solid #f5f5f5;
		border-bottom: .1rem solid #f5f5f5;
        width:100%;
        box-sizing: border-box;
	}
	
    
	.total span code{
		color: #e5000c;
	}
	
	.importCar{
	
        border-top: 1px solid #f5f5f5;
	}
	div.zanwei{
        height:1.49rem;
    }
	.importCar h3{
		height: .86rem;
		line-height: .86rem;
		font-size: .3rem;
		font-weight: 500;
		border-bottom: 1px solid #f5f5f5;
		padding: 0 .2rem;
		position: relative;
	}
	
	.importCar h3 span{
		position: absolute;
		font-size: .24rem;
		right: .2rem;
		color: #666;
	}
	
	.importCar>p{
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: .86rem;
		line-height: .36rem;
		padding: 0 .2rem;
		font-size: .3rem;
		border-bottom: 1px solid #f5f5f5;
        text-align: left;
	}
	
	.importCar .last{
		font-size: .26rem;
	}
	
	.importCar .last span .detail{
		color: #1D4FAA;
		font-size: .24rem;
	}
	
	.importCar ul{
		background-color: #f0eff5;
		padding: 1px 0;
	}
	
	.importCar ul li{
		min-height: .58rem;
		line-height: .36rem;
		margin: .26rem .24rem;
		border: #bcbcbe 1px solid;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
        align-items: center;
        padding: 0.06rem 0;
        background-color: #fff;
    }
	
   .importCar ul li.redborder{
       border:1px solid #e5000c;
       color: #E5000C;
   }
    
  
	.importCar ul li span{
		padding: 0 .2rem;
		font-size: .26rem;
	}
	
	.importCar ul .active{
		border: #e5000c solid 1px;
	}
	
	.importCar ul .active span{
		color: #e5000c;
	}
	div.commerce::before{
            content: "";
            display: block;
            /* height: 0.10rem; */
            background-color: #f5f5f5;
    }
	.commerce h3{
		height: .86rem;
		line-height: .86rem;
		font-size: .3rem;
		font-weight: 500;
		border-bottom: 1px solid #f5f5f5;
		padding: 0 .2rem;
	}
	
	.commerce .title{
		display: flex;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.commerce .title li{
		flex: 1;
		height: .86rem;
		line-height: .86rem;
		position: relative;
		color: #999;
		font-size: .28rem;
	}
	
	.commerce .title .active{
		color: #1D4FAA;
	}
	
	.commerce .title .active span{
		position: absolute;
		bottom: 0;
		left: 30%;
		width: 40%;
		height: 4px;
		background-color: #1D4FAA;
		border-radius: 2px;
	}
	
	.commerce .listTitle{
		height: .86rem;
		line-height: .86rem;
		font-size: .28rem;
		display: flex;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.commerce .listTitle .project{
		flex: 1;
	}
	
	.commerce .listTitle .limit{
		flex: 2;
		text-indent: 1.5rem;
	}
	
	.commerce .listTitle .premium{
		flex: 1;
	}
	
	.commerce .list li{
		height: .86rem;
		line-height: .86rem;
		font-size: .24rem;
		color: #666;
		display: flex;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.commerce .list li .project{
		flex: 1.8;
		text-align: left;
		padding-left: .2rem;
	}
	
	.commerce .list li .project .iconfont{
		font-size: .3rem;
		color: #e5000c;
	}
	
	.commerce .list .limit .iconfont{
		font-size: .24rem;
	}
	
	.commerce .list li .limit{
		flex: 1.2;
	}
	
	.commerce .list li .premium{
		flex: 1;
		text-align: right;
		padding-right: .2rem;
	}
	
	.commerce .list li .premium p{
		float: left;
		line-height: .43rem;
		height: 50%;
		width: 100%;
	}
	
	.commerce .list li .premium p:first-child{
		font-size: .26rem;
		color: #e5000c;
		line-height: .64rem;
	}
	
	.commerce .list li .premium p:last-child{
		font-size: .24rem;
		text-decoration: line-through;
		line-height: .4rem;
	}
	
	.aoad h3{
		height: .86rem;
		line-height: .86rem;
		font-size: .3rem;
		padding-left: .2rem;
		text-align: left;
		color: #1D4FAA;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.aoad ul li{
		height: .86rem;
		line-height: .86rem;
		font-size: .24rem;
		color: #666;
		display: flex;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.aoad ul li .project{
		flex: 1.8;
		text-align: left;
		padding-left: .2rem;
		display: flex;
		align-items: center;
	}
	
	.aoad ul li .project p{
		line-height: 120%;
	}
	
	.aoad ul li .limit{
		flex: 1.2;
        position:relative;
	}
	
	.aoad ul li .limit .iconfont{
		font-size: .24rem;
	}
	
	.aoad ul li .premium{
		flex: 1;
		text-align: right;
		padding-right: .2rem;
	}
	
	.aoad ul li .premium p{
		float: left;
		line-height: .43rem;
		
		width: 100%;
	}
	
	.aoad ul li .premium p:first-child{
		
        font-size: .24rem;
        text-decoration: line-through;
        line-height: .45rem;
	}
	
	.aoad ul li .premium p:last-child{
		font-size: .26rem;
		color: #e5000c;
		line-height: .40rem;
		
	}
	
	.totla{
		display: flex;
		font-size: .24rem;
		color: #666;
		height: .86rem;
		line-height: .86rem;
		border-bottom: 1px solid #f5f5f5;
        justify-content:space-between;
	}
	
	.totla>span:first-child{
		padding-left: .2rem;
	}
	
	.totla>span:last-child{
		text-align: right;
        min-width:40%;
	}
	
	.totla .premium{
		padding-right: .2rem;
	}
	
	.totla .premium p{
		/* float: left; */
		line-height: .43rem;
		/* height: 50%; */
		width: 100%;
        text-align: right;
	}
	
    
	.totla .premium p:first-child{
		
		font-size: .24rem;
		line-height: .45rem;
	}
	
	.totla .premium p:last-child{
		font-size: .26rem;
		line-height: .45rem;
       
	}
/* 	
	.totla .premium p span{
		text-decoration: line-through;
	}
	 */
    p.delsa span.shujia{
        text-decoration: line-through;
    }
	.sali ul li{
		display: flex;
		/* justify-content: space-between;
		align-items: center; */
		padding: 0 .2rem;
		font-size: .26rem;
		color: #666;
		height: .86rem;
		line-height: .86rem;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.sali ul li span{
		flex: 1;
	}
	
	.sali ul li span:first-child{
		text-align: left;
		text-indent: .5rem;
	}
	
	.sali ul li span:last-child{
		text-align: right;
		color: #e5000c;
	}
	
	.sali p{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 .2rem;
		font-size: .26rem;
		color: #666;
		height: .86rem;
		line-height: .86rem;
		border-bottom: 1px solid #f5f5f5;
	}
    	div.sali::after,
	div.sali::before{
        content: "";
        display:block;
        height:0.10rem;
        background-color: #f5f5f5;
    }
	.sali p span:first-child{
		font-size: .24rem;
	}
	
	.sali p span:last-child{
		font-size: .3rem;
		color: #e5000c;
	}
	
	.sali .project{
		position: relative;
	}
	
	.sali .project .label{
		position: absolute;
		width: .3rem;
		height: .3rem;
		border: 1px solid #333;
		border-radius: 50%;
		top: 12px;
		left: 0px;
	}
	
	.sali .project .label .active{
		position: absolute;
		width: .18rem;
		height: .18rem;
		background-color: #e5000c;
		border-radius: 50%;
		left: 3px;
		top: 3px
	}
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
    div.weizanwei{
        height:1rem;
        position:relative;
        width:100%;
    }
  
   body >>> .cube-dialog-icon+.cube-dialog-title p.cube-dialog-title-def{
      word-break: break-all ;
      line-height: 0.5rem ;
      white-space: normal ;
  }
    
</style>
