<template>
	<div class="waibaowai">
		<div class="waibao">
			<div class="TrolleyList" v-if="carList.length>0">
					<ul class="qingbao list-item" v-for="(item,oindex) in carList" data-type="0">
						<dl class="list list-box"  @touchstart.capture="touchStart" @touchend.capture="touchEnd">
							<dt>
								<div class="imgbox">
									<img :src="item.goods_img | fnName" alt="">
								</div>
								<h3>{{item.goods_name}} {{item.goods_attr}}</h3>
								<p>单价：<span class="money">{{item.goods_price | geshihua}}</span></p>
								<p>数量：<span>{{item.qty}}</span></p>
							</dt>
							<dd class="huishe">
								<div :class="{jiahei: item.step>=0}">
									<div class="label" :class="{heise:item.step>=0}">
										<span :class="{active: item.step>=0}"></span>
									</div>
									提车方式选择
								</div>
								<div  :class="{jiahei: item.step>=2}">
									<div class="label" :class="{heise: item.step>=2}">
										<span :class="{active: item.step>=2}"></span>
									</div>
									质保与商业险
								</div>
								<div  :class="{jiahei: item.step>=3}">
									<div class="label"  :class="{heise: item.step>=3}">
										<span :class="{active: item.step>=3}"></span>
									</div>
									配件升级
								</div>
								<div  :class="{jiahei: item.step>=4}">
									<div class="label" :class="{heise: item.step>=4}">
										<span :class="{active: item.step>=4}"></span>
									</div>
									保养养护
								</div>
								<p></p>
								<div class="zhezan">
									<span @click="togoupage(item.step,item.goods_id,item.cart_id)">继续购物</span>
								</div>
								
							</dd>
						</dl>
						<div class="delete" @click="deleteItem(item.cart_id)" :data-index="oindex">删除</div>
				   </ul>
				  
			</div>
		</div>
		 <div class="zhanweile" v-if="zhanweile"></div>
	</div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    
    
	export default{
		name: 'TrolleyList',
        data(){
        	return{
        		carList:[],
                startX : 0 ,
                endX : 0 ,
                zhanweile:false,
        	}
        },
        methods:{
            chushihua(){
                var _this = this;
                var oUrl = this.$store.state.Yi + "index/cart/CartList";
                var otoken= localStorage.token;
                if(typeof otoken =="undefined"){
                      this.showdenglu();
                      return ;
                }
                
                axios.post(oUrl,qs.stringify({
                    token:otoken,
                })).then(function(res){
                        // console.log(res.data);
                        _this.quchunamekongge(res.data.car.carList);
                        
                });
            },
            quchunamekongge(CartList){
                var rep = /&nbsp;/ig;
                CartList.forEach(function(item){
                    item.goods_attr = item.goods_attr.replace(rep," ");
                    item.goods_name = item.goods_name.replace(rep," ");
                });
                this.carList = CartList;
				this.$emit("change", this.carList);
                this.setTrolleyListmarginbottom();
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
            togoupage(step,goods_id,cart_id){
                var Opath = "";
                if(step==0){
                     Opath = "/OrderAddr";
                }else if(step==1){
                    Opath = "/OrderAddr";
                }else if(step==2){
                     Opath = "/OrderIns";
                }else if(step==3){
                       Opath = "/OrderIns";
                }else if(step==4){
                        Opath = "/OrderSum";
                }
                
                this.$router.push({path:Opath,query:{
                    goods_id:goods_id,
                    cart_id:cart_id
                }}); 
            },
            // dellist(cart_id){
            //    var  _this = this ;
            //     this.carList.forEach(function(item,key){
            //         if(item.cart_id==cart_id){
            //           _this.carList.splice(key,1);
            //           _this.delcartid(cart_id);
            //         }
            //     })
            // },
            delcartid(cart_id){
                var _this = this;
                var urldel = this.$store.state.Yi + "index/cart/CarCartDel";
                var otoken= localStorage.token;
                axios.post(urldel,qs.stringify({
                    cart_id:cart_id,
                    token:otoken
                })).then(function(res){
                    console.log(res.data);
                    if(res.data.error==0){
                         _this.$createToast({
							type: 'correct',
                            time: 1000,
                            txt: '删除成功'
                          }).show()
                    }else{
                        
                    }
                })
            },
			// 滑动开始
			touchStart(e){
				// 记录初始位置
				this.startX = e.touches[0].clientX;
			},
			// 滑动结束
			touchEnd(e){
				// 当前滑动的父级元素
				let parentElement = e.currentTarget.parentElement;
				// 记录结束位置
				this.endX = e.changedTouches[0].clientX;
				// 左滑
				if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
					this.restSlide();
					parentElement.dataset.type = 1;
				}
				// 右滑
				if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
					this.restSlide();
					parentElement.dataset.type = 0;
				}
				this.startX = 0;
				this.endX = 0;
			},  
			// 判断当前是否有滑块处于滑动状态
			checkSlide(){
				let listItems = document.querySelectorAll('.list-item');
					for( let i = 0 ; i < listItems.length ; i++){
						if( listItems[i].dataset.type == 1 ) {
							return true;
						}
					}
				return false;
			},
			// 复位滑动状态
			restSlide(){
					let listItems = document.querySelectorAll('.list-item');
						// 复位
						for( let i = 0 ; i < listItems.length ; i++){
						listItems[i].dataset.type = 0;
					}
			},
			// 删除
			deleteItem(cart_id){
				// 当前索引
				// let index = e.currentTarget.dataset.index;
				// 复位
				this.restSlide();
				// 删除
				// this.list.splice(index,1);
				console.log("删除哦了");
				var  _this = this ;
				this.carList.forEach(function(item,key){
					if(item.cart_id==cart_id){
						_this.carList.splice(key,1);
						_this.setTrolleyListmarginbottom();
						_this.delcartid(cart_id);
					}
				})
			},
			/////设置占位符的影藏状态
			setTrolleyListmarginbottom(){
			    if(this.carList.length>=3){
			       this.zhanweile=true;
			    }else{
			         this.zhanweile=false;
			    }
			}
        },
        mounted() {
            this.chushihua()
        },
        //过滤器
        filters: {
        	//给图加上logo
        	fnName: function(value) {
        		return value + "?x-oss-process=style/jietu";
        	}
        }
	}
</script>

<style scoped="scoped">
	.waibaowai{
		position:relative;
		width:100%;
		height:100%;
		/* background-color: #f9f9f9; */
		}
    div.waibao{
        width:92%;
        position: relative;
        margin:0 auto;
        overflow: hidden;
    }
    div.TrolleyList{
        position:relative;
        margin:1.0rem auto 0.3rem;
    }
    div.zhanweile{
        height:2rem;
        width:100%;
        position: relative;
        background:#fff;
    }
    ul.qingbao{
        position:relative;
        height: 4.25rem;
        margin: .24rem 0 ;
      
        background-color: #fff;
        
    }
    dd.huishe{
        color:#999;
    }
    div.jiahei{
        color:#333;
    }
	.list{
		position:absolute;
        top:0;
        left:0;
	}
	
	.list dt{
		float: left;
		width: 50%;
		padding: .2rem .2rem .2rem .2rem;
		text-align: left;
	}
	
	.list dt .imgbox{
		width: 100%;
		height: 2.2rem;
		position: relative;
		overflow: hidden;
	}
	
	.list dt .imgbox img{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		/* height: 100%; */
        width:100%;
	}
	
	.list dt h3{
		word-break: break-all;
		font-size: .26rem;
		line-height: .28rem;
		margin-top: .1rem;
		ext-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.list dt p{
		margin-top: .2rem;
	}
	
	.list dt p .money{
		color: #e5000c;
		font-size: .32rem;
		font-weight: 600;
	}
	
	.list dd{
		float: left;
		width: 35%;
		height: 100%;
		padding-left: .2rem;
	}
	
	.list dd>div{
		position: relative;
		height: .66rem;
		line-height: .66rem;
		text-align: left;
		text-indent: .4rem;
		font-size: .24rem;
	}
	
	.list dd>div .label{
		position: absolute;
		width: .2rem;
		height: .2rem;
		border: 1px solid #999;
		border-radius: 50%;
		top: 9px;
		left: 2px;
	}
	.list dd>div .label.heise{
        border: 1px solid #333;
    }
	.list dd>div .label .active{
		position: absolute;
		width: .12rem;
		height: .12rem;
		background-color: #e5000c;
		border-radius: 50%;
		left: 2px;
		top: 2px
	}
	
	.list dd p span{
		color: #e5000c;
		font-size: .32rem;
		font-weight: 600;
	}
	
	
    
    .list-item{
	  /* box-sizing: border-box; */
	
      position: relative;
      height: 1.6rem;

      transition: all 0.4s;
	   -ms-transition:all 0.4s; /* IE 9 */
	  -moz-transition:all 0.4s;/* Firefox */
	  -webkit-transition:all 0.4s; /* Safari 和 Chrome */
	  -o-transition:all 0.4s; /* Opera */
	  
    }
    .list-item[data-type="0"]{
      transform: translate3d(0,0,0);
	  -ms-transform: translate3d(0,0,0);	/* IE 9 */
	  -moz-transform: translate3d(0,0,0); 	/* Firefox */
	  -webkit-transform: translate3d(0,0,0); /* Safari 和 Chrome */
	  -o-transform: translate3d(0,0,0);	/* Opera */
	  
    }
    .list-item[data-type="1"]{
      transform: translate3d(-2rem,0,0);
	  -ms-transform:  translate3d(-2rem,0,0);	/* IE 9 */
	  -moz-transform: translate3d(-2rem,0,0);/* Firefox */
	  -webkit-transform: translate3d(-2rem,0,0); /* Safari 和 Chrome */
	  -o-transform: translate3d(-2rem,0,0);	/* Opera */
    }
    
    .list-item .delete{

      width: 2rem;
      height: 100%;
      line-height: 4.25rem;
      background: #ccc;
      font-size: 17px;
      color: #fff;
      text-align: center;
     
      position: absolute;
      top:0;
      right: -2rem;
	/* border-radius: 3px; */
		border-top-right-radius:3px ;
	  border-buttom-right-radius:3px ;
    }
	
	 .list-item dl{
		   border: 1px solid #ccc; 
		   box-sizing: border-box;
		   border-radius: 3px;
		   height:100%;
	 }
	  div.zhezan{
		  padding-top:0.4rem;
	  }
	 div.zhezan span{
		 display: inline-block;
		width: 1.9rem;
		height: .62rem;
		line-height: .62rem;
		color: #fff;
		background-color: #e5000c;
		font-size: .3rem;
	
		border-radius: .12rem;
	 }
	
</style>
