<template>
    <div class="PayShortcut">
    	<div class="header">
    		<span class="iconfont" @click="fanhui">&#xe606;</span>
    		快捷支付
    	</div>
    	
    	<div class="title">
    		<p>抱歉，您无法完成本次交易</p>
            <p>原因：{{msg}}</p>
            <span class="fanghui" @click="fanhui">返回</span>
    	</div>
    	<div class="verify">
    		
    	</div>
    </div>
</template>

<script>
     import axios from 'axios'
    import qs from 'qs'
    export default{
    	name: 'PayShortcut',
    	data(){
    		return{
                msg:"",
    		}
    	},
        methods:{
            setmsg(){
                this.msg = this.$route.query.msg;
            },
            fanhui(){
                this.$router.push({path:"/PayShortcut",query:{
                    orderSn:this.$route.query.orderSn,
                    orderId:this.$route.query.orderId,
                    bankname:this.$route.query.bankname
                }})
            }
        },
        mounted() {
            this.setmsg()
        }
    }
    
</script>

<style scoped="scoped">
    span.fanghui{
        margin-top:1em;
       color: #4e98ec
    }
    .PayShortcut .header{
    	font-size: .3rem;
    	height: .9rem;
    	line-height: .9rem;
    	position: relative;
    	border-bottom: #eaeaea 1px solid;
    	background-color: #fff;
    }
    
    .PayShortcut .header span{
    	position: absolute;
    	left: 0;
    	width: .8rem;
    	text-align: center;
    }
    
    .PayShortcut .title{
    	height: 2.7rem;
    	background-color: #fff;

    }
    
    .PayShortcut .title h3{
    	padding-top: .7rem;
    	font-size: .36rem;
    	font-weight: 600;
    }
    
    .PayShortcut .title h3 span{
    	font-size: .46rem;
    	font-weight: 600;
    }
    
    .PayShortcut .title p{
    
        margin-top: .3rem;
        margin-bottom: 1em;
        color: #999;
    }
    
    .PayShortcut .verify{
    	
    }
    
    .PayShortcut .verify p{
    	background-color: #f7f7f7;
    	height: .55rem;
    	line-height: .55rem;
    	text-indent: .2rem;
    	text-align: left;
    	color: #999;
    }
    
    .PayShortcut .verify div{
    	display: flex;
    	height: .86rem;
    	line-height: .85rem;
    	border-top: #eaeaea 1px solid;
    	border-bottom: #eaeaea 1px solid;
    	background-color: #fff;
    }
    
    .PayShortcut .verify div input{
    	flex: 2;
    	text-align: center;
    }
    
    .PayShortcut .verify div span{
    	flex: 1;
    	color: #999;
    	font-size: .3rem;
    	border-left: #eaeaea 1px solid;
    }
    
    .PayShortcut .butt{
    	height: .9rem;
    	line-height: .9rem;
    	margin: 3rem .2rem 0 .2rem;
    	color: #fff;
    	font-size: .32rem;
    	border-radius: .1rem;
    	background-color: #e5000c;
    }
</style>
