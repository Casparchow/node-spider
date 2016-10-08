<template>
	<div class="contain-box">
		<div class="container loading-container" v-show="isLoading">
			<div class="preloader-wrapper big active">
			    <div class="spinner-layer spinner-blue-only">
			      	<div class="circle-clipper left">
			        	<div class="circle"></div>
			      	</div>
			      	<div class="gap-patch">
			        	<div class="circle"></div>
			      	</div>
			      	<div class="circle-clipper right">
			        	<div class="circle"></div>
			      	</div>
	    		</div>	
	  		</div>
		</div>
		<div id="echart_box" class="echart-box"></div>
	</div>

</template>
<style lang="less" scoped>
	.contain-box{
		position: relative;
		width: 100%;
		height: 500px;
		.loading-container{
			position: absolute;
			width: 100%;
			max-width: 100% !important;
			height: 100%;
			z-index: 1000;
			background: rgba(255,255,255,.6);
			.preloader-wrapper{
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -32px;
				margin-left: -32px;
			}
		}
		.echart-box{
			width: 100%;
			height: 500px;
		}
	}
</style>
<script lang="babel">
	import echarts from 'echarts'

	export default{
		props: {
			pageNum: {
				type: Number,
				default: 1,
				required: true
			}
		},
		data(){
			return {
				isLoading: false,
				addressList: [],
				priceList: [],
				echarts: require('echarts/lib/echarts'),
				dataUrl: 'http://localhost:3000/getData'
			}
		},
		watch: {
			pageNum(){
				this.getData()
			}
		},
		ready(){
			this.getData()
			require('echarts/lib/chart/bar')
			require('echarts/lib/component/tooltip')
			require('echarts/lib/component/title')
		},
		methods: {
			getData(){
				let that = this
				this.isLoading = true
				this.addressList = []
				this.priceList = []
				$.ajax({
					url: that.dataUrl,
					method: 'get',
					data: {
						targetUrl: 'http://fs.lianjia.com/ershoufang/pg' + that.pageNum
					},
					dataType: 'json',
					success: data => {
						for(let i = 0,len = data.length; i<len; i++){
							that.addressList.push(data[i].address.address)
							that.priceList.push(parseInt(data[i].priceInfo.totalPrice.replace('万',''),10))
						}
						var myChart = echarts.init(document.getElementById('echart_box'))
						myChart.setOption({
							    tooltip: {},
							    grid:{
							    	bottom: '20%'
							    },
							    xAxis: {
							        data: that.addressList,
							        axisLabel: {
							        	margin: 15,
							        	fontsize: 20,
							        	formatter:function(val){
										    return val.split("").join("\n")
										}
							        }
							    },
							    yAxis: {},
							    series: [{
							        name: '总价',
							        type: 'bar',
							        data: that.priceList
							    }],
							    color: ['#3398DB']
						})
						that.isLoading = false
					}
				})
			}
		}
	}
</script>