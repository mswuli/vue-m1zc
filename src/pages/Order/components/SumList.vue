<template>
    <div class="Sumlist" v-if="Object.keys(resdata).length!=0">
        <div class="qingdan">
           <ul class="uli clearfix">
                <li class="lizuo">
                    <span class="tiaomu">运费:</span><span class="cong"> 从<span class="beiqu">{{resdata.carInfo.vehicle_region}}</span>到<span class="totarg">{{resdata.carInfo.destination}}</span> </span>
                </li>
                <li class="liyou">
                    <span class="jian">￥<span class="shu">{{resdata.carInfo.freight_fee | geshihua}}</span>元</span>
                    <i class="iconfont jiantou" ></i>
                </li>
            </ul>
            <ul class="uli clearfix" v-if="resdata.guaInfo">
                <li class="lizuo">
                    <span class="tiaomu">质保:</span><span class="cong"> {{resdata.guaInfo.name}}</span>
                </li>
                <li class="liyou">
                    <span class="jian">￥<span class="shu">{{resdata.guaInfo.new_price | geshihua }}</span>元</span>
                    <i class="iconfont jiantou"></i>
                </li>
            </ul>
           
            <ul class="uli clearfix" @click="curshyeshow()">
                <li class="lizuo">
                    <span>商业险合计</span>
                </li>
                <li class="liyou">
                    <span class="jian">￥<span class="shu">{{resdata.insTotal  | geshihua }}</span>元</span>
                    <i class="iconfont jiantou" v-if="!shyeshow" >&#xe65f;</i>
                    <i class="iconfont jiantou"  v-if="shyeshow" >&#xe65e;</i>
                </li>
            </ul>
             <ul class="ulu " v-show="shyeshow">
                <ul class="unei">
                   <ul class="toubu clearfix">
                       <li class="td1u">保障项目</li>
                       <li class="td2u">保额</li>
                       <li class="td3u">一站车保费</li>
                   </ul>
                   <ul class="ulbaoli">
                       <ul class="ulist clearfix" v-for="item in resdata.insRes">
                           <li class="td1u">{{item.insurance_name}}</li>
                           <li class="td2u" v-if="item.coverage !=0"><span class="shu">{{item.coverage  | geshihua }}</span>元</li>
                           <li class="td2u" v-if="item.coverage ==0"><span class="shu">投保</span></li>
                           <li class="td3u"><span class="shu">{{item.total  | geshihua }}</span>元</li>
                       </ul>
                       <div v-if="resdata.sdewRes.length!=0">
                            <ul class="ulist clearfix" v-for="item in resdata.sdewRes">
                               <li class="td1u">不计免赔率险-{{item.insurance_name}}</li>
                               <li class="td2u" ><span class="shu"></span></li>
                               <li class="td3u"><span class="shu">{{item.total | geshihua  }}</span>元</li>
                           </ul>
                           
                       </div>
                       
                      
                   </ul>
                </ul>
            </ul>
            <ul class="uli clearfix">
                <li class="lizuo">
                    <span class="tiaomu">交强险和车船税</span>
                </li>
                <li class="liyou">
                    <span class="jian">￥<span class="shu">{{resdata.taxTotal  | geshihua }}</span>元</span>
                    <i class="iconfont jiantou"></i>
                </li>
            </ul>
        
             
            
            
         
                <ul class="uli clearfix" @click="curxuanpeishow()" v-if="oxuanpei.length!=0">
                    <li class="lizuo">
                        <span class="tiaomu">官方原厂选配</span>
                    </li>
                    <li class="liyou">
                        <!-- <span class="jian">￥<span class="shu">{{xuanpeiprice  | geshihua }}</span>元</span> -->
                      
                         <i class="iconfont jiantou" v-if="!xuanpeishow" >&#xe65f;</i>
                        <i class="iconfont jiantou"  v-if="xuanpeishow" >&#xe65e;</i>
                    </li>
                </ul>
                  <ul class="ulu " v-show="xuanpeishow"  v-if="oxuanpei.length!=0">
                    <ul class="unei">
                         <ul class="ulbaoli">
                           <ul class="ulist clearfix" v-for="item in oxuanpei">
                               <li class="ty1 ban" v-if="item.length>0"><span class="snei">{{item[0].name}} <i class="iconbg" @click="showpeizhi(1,item[0].name)" v-if="'imgStr' in item[0]"></i></span></li>
                               <li class="ty2 ban"  v-if="item.length>1" ><span class="snei">{{item[1].name}} <i class="iconbg" @click="showpeizhi(1,item[1].name)" v-if="'imgStr' in item[1]"></i></span></li>
                           </ul>
                           
                        </ul>
                    </ul>
                </ul>
           
                  <ul class="uli clearfix" @click="cursjishow()"  v-if="oshengji.length!=0">
                   <li class="lizuo">
                       <span class="tiaomu">后期配置升级</span>
                   </li>
                   <li class="liyou">
                       <!-- <span class="jian">￥<span class="shu">{{shengjiprice  | geshihua }}</span>元</span> -->
                  
                       <i class="iconfont jiantou" v-if="!sjishow" >&#xe65f;</i>
                       <i class="iconfont jiantou"  v-if="sjishow" >&#xe65e;</i>
                   </li>
               </ul>
                <ul class="ulu" v-show="sjishow"  v-if="oshengji.length!=0">
                   <ul class="unei">
                        <ul class="ulbaoli">
                          <ul class="ulist clearfix" v-for="item in oshengji">
                              <li class="ty1 ban" v-if="item.length>0"><span class="snei">{{item[0].name}} <i class="iconbg" @click="showpeizhi(2,item[0].name)" v-if="'imgStr' in item[0]"></i></span></li>
                              <li class="ty2 ban" v-if="item.length>1" ><span class="snei">{{item[1].name}} <i class="iconbg" @click="showpeizhi(2,item[1].name)" v-if="'imgStr' in item[1]"></i></span></li>
                          </ul>
                          
                       </ul>
                   </ul>
               </ul>
                
                <ul class="uli clearfix" @click="curbiaopeishow()" v-if="obiaopei.length!=0">
                    <li class="lizuo">
                        <span class="tiaomu">官方原厂标配</span>
                    </li>
                    <li class="liyou">
                        
                       <i class="iconfont jiantou" v-if="!biaopeishow" > &#xe65f;</i>
                       <i class="iconfont jiantou"  v-if="biaopeishow" >&#xe65e;</i>
                    </li>
                </ul>
                 <ul class="ulu " v-show="biaopeishow" v-if="obiaopei.length!=0">
                    <ul class="unei">
                         <ul class="ulbaoli">
                           <ul class="ulist clearfix" v-for="(item,key) in obiaopei">
                               <li class="ty1 ban"  v-if="item.length>0"><span class="snei">{{item[0].name}}</span></li>  
                               <li class="ty2 ban"  v-if="item.length>1"><span class="snei">{{item[1].name}}</span></li>
                           </ul>
                        </ul>
                    </ul>
                </ul>
         
            <ul class="uli fukuai clearfix" @click="curpayshow">
                <li class="lizuo">
                    <span class="tiaomu">付款方式</span>
                </li>
                <li class="liyou">
                    <span class="jian">定金 + 尾款</span>
                  
                    <i class="iconfont jiantou" v-if="!paystyleshow" >&#xe65f;</i>
                    <i class="iconfont jiantou"  v-if="paystyleshow" >&#xe65e;</i>
                </li>
            </ul>
             <ul class="ulu " v-show="paystyleshow">
                <ul class="unei">
                     <ul class="ulbaoli">
                            <ul class="dian borderbg" data-val="1">
                                <li class="shang">
                                     <span>定金 5% + 尾款到付 95%</span>
                                     <!-- <code>100% 支付全款</code> -->
                                </li>
                                <li class="xia">
                                        <span class="dinjin">定金：</span>
                                        <code class="fu">￥</code>
                                        <span class="shu">{{resdata.percentPrice  | geshihua }}</span>
                                        <code class="danwei">元</code>
                                        <span class="weikuan"> &nbsp;+ &nbsp; 尾款：</span>
                                        <code class="fu">￥</code>
                                        <span class="shu">{{resdata.remainPrice  | geshihua }}</span>
                                        <code class="danwei">元</code>
                                 </li>
                            </ul>
                    </ul>
                </ul>
            </ul>
            <div class="zhanwei" ></div>
            <ul class=" infomsg clearfix">
              <ul class="perinfo clearfix">
                 <span class="touxiang touspanbg iconfont">&#xe60f;</span>
                 <input class="nmsg shumsg" type="text" v-model="inputname" placeholder="请输入姓名" @input="getshuname">
              </ul>
               <ul class="perinfo clearfix">
                   <span class="shouji touspanbg iconfont">&#xe711;</span> 
                   <input class="nmsg shumsg" type="tel" v-model="inputtel"  @input="getshutel" placeholder="请输入手机号码">
              </ul>
                <ul class="perinfo clearfix">
                   <span class="yanma touspanbg iconfont">&#xe66c;</span>
                   <input class="nmsg nmsgget" type="text"  v-model="inputmsg"  @input="getshumsg" placeholder="请输入验证码"> 
                   <span class="getmsg" :class="{huishe:ishasyan}" @click="getyzm">{{yzmhtml}}</span>
              </ul>
            </ul>   
             <ul class="uli clearfix" style="border: none">
                
                <li class="liyou zuixia" @click="changecheck()">
                   <span class="checkexs">
                        <input type="checkbox" id="xuanzhe" v-model="curchecked">
                        <label for="xuanzhe" @click.stop="zhumao"></label>
                            我已经阅读并同意<a href="javascript:;" @click.stop="tiaoxieyi" >《一站车用户购买协议》</a>
                   </span>
                </li>
            </ul>   
            
            
               
              
        </div>   
        <div class="weibu">
              <ul class="uli ulis clearfix boxbt">
                
                <li class="liyou zuixia jiesuanwei">
                  总价：<span class="fuhao">￥</span><span class="shu">{{resdata.allTotal | geshihua }}</span>
                  <span class="danwei">元</span> <span @click="dianjiesuan" class="jiesuan">结算</span>
                </li>
            </ul>   
        </div>
           
      <div class="weizanwei"></div>
        
        
    </div>
    
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
   
   export default{
        name: 'InsList',
        props:{
            resdata:Object
        },
        watch:{
            resdata(a){
              this.setshuxing(a.attribute.conf);
              this.setshuxing(a.attribute.conf);
              console.log(this.oshengji);
               console.log(this.oxuanpei);
            }
        },
        data() {
           	return {
                   curchecked:true,
                   shyeshow:false,
                   sjishow:false,
                   biaopeishow:false,
                   xuanpeishow:false,
                   paystyleshow:false,
                   
                   oshengji:[],
                   oxuanpei:[],
                   obiaopei:[],
                   shengjiprice:0,
                   xuanpeiprice:0,
                   inputname:"",
                   inputtel:"",
                   inputmsg:"",
                   
                   
                   ishasyan:false,
                   yzmhtml:"获取验证码",
                   tis:-1,
                   
                   quarr:[],////中转数组   /////   升级
                   xquarr:[],////中转数组  //////  选配
                   bquarr:[]////中转数组   //////  标配
                   
           	};
           },
           methods:{
               ///////type 为1 时，为选配；为2 时，为配件升级
               showpeizhi(type,oname){
               
                   var zarr = [];
                   if(type==1){
                       zarr = this.oxuanpei
                   }else if(type==2){
                        zarr = this.oshengji
                   }
                   var objstr = {};
                   for(var i=0,len=zarr.length;i<len;i++ ){
                       zarr[i].forEach(function(item){
                           if(oname==item.name){
                               objstr = JSON.parse(JSON.stringify(item));
                           }
                       })
                   };
                 
                   this.showslot(objstr);
                   
            
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
               
               
               tiaoxieyi(){
                   this.$router.replace({path: '/OrderXieyi',query:{
                       cart_id:this.$route.query.cart_id
                   }})
               },
               
               changecheck(){
                   this.curchecked=!this.curchecked;
                   
               },
               zhumao(){
                    // console.log( this.curchecked)
               },
               curshyeshow(){
                   this.shyeshow=!this.shyeshow;
                },
               cursjishow(){
                    this.sjishow=!this.sjishow;
               },
               curbiaopeishow(){
                    this.biaopeishow=!this.biaopeishow;
               },
               curxuanpeishow(){
                   this.xuanpeishow=!this.xuanpeishow;
               },
               
               curpayshow(){
                   this.paystyleshow =  !this.paystyleshow ;
               },
              
               setshuxing(conf){
                   
                   if(conf.update){
                       var j=0;
                       for(var i=0,len=conf.update.length;i<len;i++){
                           
                          if(i%2==0){
                              if(i==0){
                                 j=0
                             }else{
                                 j++
                             }
                          };
                          if(!this.oshengji[j]){
                            this.oshengji[j]=[];  
                          }  
                      var oname = conf.update[i].name;
                          if(this.quarr.indexOf(oname)==-1){
                               this.quarr.push(oname);
                               this.oshengji[j].push(conf.update[i]);
                               this.shengjiprice += parseInt(conf.update[i].price);
                          }
                       }
                     
                     
                   }
                    if(conf.optional){
                         var j=0;
                    
                       for(var i=0,len=conf.optional.length;i<len;i++){
                           if(i%2==0){
                              if(i==0){
                                 j=0
                             }else{
                                 j++
                             }
                          };
                          if(!this.oxuanpei[j]){
                            this.oxuanpei[j]=[];  
                          }
                          var oname = conf.optional[i].name;
                          if(this.xquarr.indexOf(oname)==-1){
                              this.xquarr.push(oname);
                               this.oxuanpei[j].push(conf.optional[i]);
                              this.xuanpeiprice += parseInt(conf.optional[i].price);
                          }

                       }
                     
                   }
                    if(conf.standard){
                         var j=0;
                       for(var i=0,len=conf.standard.length;i<len;i++){           
                         if(i%2==0){
                             if(i==0){
                                 j=0
                             }else{
                                 j++
                             }
                         };
                          if(!this.obiaopei[j]){
                            this.obiaopei[j]=[];  
                          }
                          var oname = conf.standard[i].name;
                          if(this.bquarr.indexOf(oname)==-1){
                              this.bquarr.push(oname );
                              this.obiaopei[j].push(conf.standard[i]);
                          }
                       }
                     
                   };
                   
               },
               getshuname(){
                  
               },
                getshutel(){
                   
               },
                getshumsg(){
                   
               },
               dianjiesuan(){
                   var flag=0;
                   var resp = /^\s*|\s*$/ig;
                   this.inputmsg =   this.inputmsg.replace(resp,"");
                   this.inputname =   this.inputname.replace(resp,"");
                   this.inputtel =   this.inputtel.replace(resp,"");
                   
                   if(this.inputname.length==0){
                       flag=1;
                   }else if(this.inputtel.length==0){
                       flag=2;
                   }else if(this.inputmsg.length==0){
                        flag=3;
                   }else if(!this.isPhone(this.inputtel)){ /////手机号不正确
                        flag=4;
                   }else if(!this.curchecked){  //////未勾选一站车用户协议
                       flag=5;
                   }
                   
                   var objmsg={};
                   objmsg[1]="姓名不能为空，请输入姓名";
                   objmsg[2]="手机号不能为空，请输入手机号";
                   objmsg[3]="验证码不能为空，请输入验证码";
                   objmsg[4]="手机号输入错误，请重新输入";
                   objmsg[5]="您未勾选《1站车用户购买协议》，请阅读并勾选";
                   var str =objmsg[flag];
          
                   if(flag>0){
                       this.showPopup(str); 
                   }else{
                       this.gotonextpage();
                   }
               },
               
               gotonextpage(){
                   var _this = this;
                   var otoken= localStorage.token;
                    if(typeof otoken =="undefined"){
                         this.showdenglu();
                         return ;
                   }
                   var otourl = this.$store.state.Yi + 'index/order/orderwrite';
                   
                   axios.post(otourl,qs.stringify({
                       token:otoken,
                       mobile:this.inputtel,
                       consignne:this.inputname,
                       smscode:this.inputmsg,
                       cart_id:this.$route.query.cart_id,
                       order_way:1,
                       order_type:1
                   })).then(function(res){
                       console.log(res.data);
                       if(res.data.error==0){
                                                    
                           _this.$router.push({ path: '/PayOrder',query:{
                               order_id:res.data.data.order_id,
                               order_sn:res.data.data.order_sn
                           }});
                       }else{
                           var strmsg =res.data.errmsg;
                           _this.$createToast({
                             	txt: strmsg,
                             	type: 'warn',
                             	time: 2500,
                                mask:false,
                             }).show()
                       }
                       
                   })
                   
                   
                   
               },
               showdenglu() {
                 var _this=this;
                 const toast = this.$createToast({
                	txt: '您还未登录,请先登录！',
                	type: 'warn',
                	time: 2500,
                 mask:true,
                 $events: {
                     timeout: () => {
                       _this.$router.push({path: "/AccountLogin"});
                     }
                   }
                }).show()
               },
               
                isPhone(phone) {    
                   //验证号码
                   
                   var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
                   if (!phoneReg.test(phone)) {              
                       return false;
                   } else {
                       return true;
                   }
               },
               
               showPopup(str) {
                 var _this=this;
                 const toast = this.$createToast({
                	txt: str,
                	type: 'warn',
                	time: 2500,
                    mask:true,
                 }).show()
               },
               getyzm(){
      
                   if(this.tis>0){
                       return false;
                   }
                   var _this = this;
                   var resp = /^\s*|\s*$/ig;
                   this.inputtel = this.inputtel.replace(resp,"");
                   var ourl = this.$store.state.Yi + "index/Api/smsCode";
                   if(this.inputtel.length==0){
                       this.showPopup("手机号不能为空，请输入手机号");
                   }else if(!this.isPhone(this.inputtel)){
                        this.showPopup("手机号输入错误，请重新输入");
                   }else{
                 
                        axios.post(ourl,qs.stringify({
                           country_code:'086',
                           phone:this.inputtel
                       })).then(function(res){
                           console.log(res.data);
                           if(res.data=="OK"){
                              _this.setymhtml();
                              _this.$createToast({
                                     txt: "验证码已经发送成功，请注意查收",
                                     type:'correct',
                                     time: 1500,
                                     mask:false,
                                    }).show()
                           }else if(res.data=="FAILED"){
                                _this.$createToast({
                                      txt: "验证码获取失败,请刷新后重试",
                                      type:'error',
                                      time: 1500,
                                      mask:false,
                                     }).show()
                           }
                       })
                   }
               },
               //////倒计时
               setymhtml(){   
                   var _this = this;
                   clearInterval( _this.otimer);
                   this.tis = 60;
                   this.otimer =  setInterval(function(){
                      _this.tis--;
                      if(_this.tis>=0){
                          _this.ishasyan = true;
                          _this.yzmhtml = "倒计时："+  _this.tis + " 秒";
                      }else{
                        _this.ishasyan = false;
                        _this.yzmhtml = "获取验证码";
                        clearInterval( _this.otimer)
                      }
                  },1000)
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
             
           },
           updated(){
                // this.setchushihua()
           }
       
    }
</script>
<style scoped="scoped">
    div.weibu{
        position:fixed;
        bottom:0px;
        left:0px;
        width:100%;
        z-index: 999;
    }
    span.huishe{
        background:#999 !important;
    }
    input.nmsg.shumsg{
        width:85%;
    }
    input.nmsg.nmsgget{
        width:47%;
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
      
      
      div.qingdan::before{
          position:relative;
          display:block;
          content:"";
          height:0.10rem;
          width:100%;
          background:#eee;
      }
      
      li.tubiao{
          padding-top:0.15rem;
          line-height:0.30rem;
      }
      li.kefuzi{
          line-height: 0.35rem;
      }
      
      
      
      li.lizuo{
          float:left;
          position:relative;
      }
     ul.uli li.liyou{
          float:right;
          position:relative;
          padding-right: 0.4rem;
          font-size: 0.24rem;
      }
      i.jiantou{
          font-size: 0.12rem;
          position:absolute;
          display:inline-block;
          width:0.4rem;
          heihgt:0.6rem;
          bottom:0;
          top:0;right:0;
          margin:auto;
          text-align: right;
          
      }
      ul.uli{
          margin:0 auto;
          width:95%;
          min-height:0.97rem;
          line-height:0.97rem;
          background:#fff;
          border-top:1px solid #eee;
          color:#333;
          font-size: 0.32rem;
          
      }
	  
	  ul.ulis{
		  width:100%;
	  }
	  
      ul.uli:last-child{
            border-bottom:none;
      }
      span.cong{
          color:#666;
          font-size: 0.24rem;
      }
      span.shu{
          margin-right:0.10rem;
     
      }
      span.jian{
          color:#e5000c;
      }
      .ulu{
          width:100%;
          position:relative;
          padding:0.20rem;
          background:#f0eff5;    
            box-sizing: border-box;
          }
        .unei{
            position:relative;
            margin:0 auto;
            background:#fff;
            box-sizing: border-box;
            border:1px solid #e5000c;
            border-radius: 3px;
        }  
        .td1u{
            width:40%;
    
        }
        .td2u{
            width:34%;
             text-align: right;
              /* padding-right:0.14rem; */
             box-sizing: border-box;
        }
        .td3u{
            width:26%;
             text-align: right;
            
        }
         
        li.td1u{
            text-align: left;
        }
       .toubu{
           border-bottom:1px solid #eee;
             padding:0 0.24rem;
       }
      
      .toubu>li{
          float:left;
          height:0.70rem;
          line-height: 0.70rem;
      }
       .toubu>li.td2u{
           padding-right: 0.50rem;
           /* text-align: center; */
        }
      .ulist>li{
            float:left;
            word-break: break-all;
            color:#666;
      }
      ul.ulist{
         padding:0.12rem 0;
         
      }
       .ulbaoli{
          padding:0 0.24rem;
          line-height:0.36rem;
         
      }
        .ulist>li.ban{
            width:50%;
            text-align: left;
             box-sizing: border-box;
             position:relative;
        }
        .ulist>li.ban:nth-of-type(2n-1){
            padding-right: 0.18rem;
        }
        .ulist>li.ban:nth-of-type(2n){
            padding-left: 0.18rem;
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
      span.snei{
          position: relative;
      }
      ul.perinfo{
          height:0.98rem;
          margin: .32rem auto 0;
          width:94%;
          background-color:#f5f5f5 ;
          border-radius: 3px;
          position:relative;
      }
     ul.perinfo::first-child{
           padding-top:0.09rem;
       }
    
      input.nmsg{
          height:100%;
          display:inline-block;
          /* border-radius: 0.12rem; */
          background:#f5f5f5;
          border-bottom-right-radius: 0.12rem;
          border-top-right-radius: 0.12rem;
         
      }
    
      div.zhanwei{
          height:0.12rem;
          width:100%;
          background:#eee;
          margin-bottom: 0.39rem;
          position: relative;
      }
      span.touspanbg{
          position: relative;
        /*  left: 0px;
          bottom: 0;
          top: 0;
          margin: auto; */
          color: #999;
          width: 14%;
          height: 100%;
          line-height: 0.98rem;
          display: inline-block;   
      }
     
       ul.perinfo input{
           float:left;
           line-height: 0.98rem;
           display:inline-block;
          
       }
        ul.perinfo span{
             float:left;
        }
        ul.perinfo:last-child{
            background:#fff;
        }
        ul.perinfo span.getmsg{
             height:100%;
             width:33%;        
             line-height: 0.98rem;
             display:inline-block;
             border-radius: 3px;
             font-size: 0.28rem;
              
            background-color:#e5000c;
           
            float:right;
            color:#fff;
        }
        
         ul.perinfo span.yanma{
              background:#f5f5f5;
               border-top-left-radius: 0.12rem;
              border-bottom-left-radius: 0.12rem;
         }
        span.jiesuan{
            display:inline-block;
            width:2.28rem;
            background-color: #e5000c;
            height: 1rem;
            border-radius: 0.07rem;
            color:#fff;
            font-size: 0.36rem;
        }
     span.checkexs{
         position:relative;
     }
     span.checkexs input{
            position: absolute;
              visibility: hidden;
              display:none;
     }
      span.checkexs label{
         display: inline-block;
         border: 1px solid #ccc;
         background: #fff;
         width: 12px;
         height: 12px;
         position: relative;
         border-radius: 2px;  
         top:2px;
             
      }
      
      span.checkexs input:checked+label::before{
         position: absolute;
         left: 4px;
         display: inline-block;
         content: '';
         height: 7px;
         width: 3px;
         border: 1px solid red;
         border-width: 0 2px 2px 0;
         transform: rotate(45deg);          
                 
         }
      
     ul.uli li.liyou.zuixia{
       padding-right:0rem;
     }
     
    span.checkexs a{
         color:#1d4faa;
     }
     
      div.weizanwei{
         height:1rem;
         position:relative;
         width:100%;
     }
     li.jiesuanwei>span{
         color:#e5000c;
         font-size: 0.32rem;
     }
     
          
      li.jiesuanwei>span.jiesuan{
            color:#ffffff;
            font-size: 0.36rem;
      }
       
      ul.dian li {
            height: 50px;
            line-height: 50px;
            /* width: 90%; */
            border-bottom: 1px dashed #ddd;
            position: relative;
            margin: 0 15px;
        }
        ul.dian li.xia {
        border-bottom: 0;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        /* text-align: right; */
    }
    ul.dian li.shang span {
        font-weight: 600;
        color: rgb(51, 51, 51);
        font-size: 14px;
       
    }
    ul.dian li.xia code.fu, ul.dian li.xia span.shu {
        color: #e21414;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }
    ul.dian li.xia code.fu {
        font-family: "Microsoft YaHei";
    }
    
	/* iPhoneX,iPhoneXs的适配*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.boxbt {
			padding-bottom: 27px;
		}
	}
	
	/* iPhoneXs Max的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.boxbt {
			padding-bottom: 27px;
		}
	}
	
	/* iPhoneXr的适配*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.boxbt {
			padding-bottom: 27px;
		}
	}
</style>
