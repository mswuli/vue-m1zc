<template>
	<div class="DetailHeader">
		<div class="navGo">
			<span class="iconfont fanhui" @click="toArticles">&#xe606;</span>
			<span class="toubu">{{tit}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'DetailHeader',
		props:{
			tit: String
		},
		methods:{
			toArticles(){
				if(this.$route.query.key){
					this.$router.push({
						path: '/ArticlesSearchs',
						query:{
							key: this.$route.query.key
						}
					})
				}else{
					this.$router.push("/Articles")
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
	.DetailHeader {
		height: .9rem;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		font-size: .32rem;
		line-height: .9rem;
		text-align: center;
        z-index: 999;
	}
	
	.DetailHeader span.fanhui {
		position: absolute;
		height: .9rem;
		width: .7rem;
		text-align: center;
		line-height: .9rem;
		left: 0;
		top: 0;
	}
   
    span.toubu{
        float:left;
        width:90%;
         position:relative;
         margin-left:.7rem;
         text-align: center;
          overflow: hidden;/*超出部分隐藏*/
         white-space: nowrap;/*不换行*/
         text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
</style>
