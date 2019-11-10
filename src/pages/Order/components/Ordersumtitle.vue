<template>
    <div class="Ordersumtitle clearfix">
        <div class="imgtu">
            <div class="tubox" v-bind:style="{backgroundImage:'url('+oimg+')'}" >
                 <!-- <img :src="oimg" alt=""> -->
            </div>           
        </div>
        <div class="miaoshu">
            <ul class="cheming">
                <span> 2019款 路虎 行政揽胜 hse 3.0T 四驱 柴油五座 </span>
            </ul>
            <ul class="jiange">
                <span class="danjia">￥<span class="shu">1206397.00</span>元</span>
            </ul>
        </div>
        
    </div>
</template>

<script>
      import img from '@/assets/img/001.png'
    export default{
    	name: 'Ordersumtitle',
        data(){
        	return{
        		oimg:img,
                
        	}
        },
    	  	
    }
</script>

<style scoped="scoped"> 
    div.Ordersumtitle{
        position:relative;
        padding-top:0.9rem;
        height:1.77rem;
        width:100%;
        border-bottom:1px solid #eee;
         background:#fff;
         color:#666;
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
    div.imgtu{
        position:relative;
        float:left;
        width:32% ;
        height:100%;
        display:inline-block;
        
    }
    div.tubox{
       position:absolute;
       width:76.4%;
       height:92%;
       margin:auto;
       bottom:0;left:0;top:0;right:0;
       
       /* background:url('~@/assets/img/001.png')no-repeat center center; */
       background-repeat: no-repeat;
       background-position: center center;
       background-size: 100% auto;
       
    }
     div.imgtu img{
        
         width:100%;
     }
    div.miaoshu{
        float: left;
        width:68%;
        height:100%;
     
        display:inline-block;
        position:relative;
        
    }
    ul.cheming{
           width: 94%;
            word-break: break-all;
            padding: 0.26rem 0 0.24rem;
            font-size: 0.30rem;
            line-height: 0.34rem;
            text-align: left;
    
    }
    ul.jiange{
        text-align: left;
        color: #e5000c;
      
    }
    span.shu{
        margin-right:0.1rem;
    }
</style>
