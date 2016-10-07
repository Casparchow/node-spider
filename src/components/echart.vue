<template>
	<div id="echart_box" class="echart-box">
		div
	</div>
</template>
<style lang="less" scoped>
	.echart-box{
		width: 100%;
		height: 500px;
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
					}
				})
			}
		}
	}
</script>