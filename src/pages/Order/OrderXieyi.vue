<template>
    
    <div class="abbaonei">
          <span class="iconfont fanhui" @click="fanhui">&#xe606;</span>
        <div class="neirong" v-html="odata.agreement">
            
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    
    export default {
        name: 'OrderXieyi',
        data(){
              return {
                 odata:{}
              };
            },
        methods:{
           chushihua(){
               var _this = this;
               var ourl = this.$store.state.Yi + "index/order/buyAgreement";
              axios.post(ourl,
                 qs.stringify({  }
             )).then(function(res){
                 console.log(res.data)
                 _this.odata = res.data;
             });
               
           },   
           fanhui(){
               this.$router.push({path:"/OrderSum",query:{
                   cart_id:this.$route.query.cart_id
               }})
           }
            
        },
        mounted() {
            this.chushihua();    
        }
    }
    
</script>

<style scoped="scoped">
    div.neirong{
        position:relative;
        margin: 0 auto;
        width:90%;
        padding:0.36rem 0.12rem;
        text-align: left;
        word-break: break-all;
        line-height: 0.45rem;
    }
     div.neirong h4:first-child{
         display:none;
     }
    
    span.fanhui{
      position: absolute;
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      top: 0.25rem;
      left: 0.1rem;
      line-height: 0.7rem;
      z-index: 999;
    }
</style>
