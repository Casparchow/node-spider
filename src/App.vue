<template>
	<div class="echart-container">
		<echart :page-num="pageNum"></echart>
	</div>
	<div class="btn-group container">
		<button class="btn waves-effect waves-light" @click="--pageNum">上一页</button>
		<span style="margin: 0 15px;">{{pageNum}}</span>
		<button class="btn waves-effect waves-light" @click="++pageNum">下一页</button>
	</div>
</template>
<style lang="less" scoped>
  @import '../node_modules/materialize-css/dist/css/materialize.min.css';
  .echart-container{
  	width: 100%;
  }
  .btn-group{
  	margin-top: 20px;
  	width: 100%;
  	max-width: 100%;
  	text-align: center;
  }
</style>
<script lang="babel">
	export default{
		data(){
			return {
				pageNum: 1
			}
		},
		watch: {
			pageNum(val){
				if(val <=0 ) this.pageNum = 1
			}
		},
		components: {
			echart: require('./components/echart.vue')
		}
	}
</script>