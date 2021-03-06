const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const path = require('path')

let app = express()

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})

//let entryUrl = 'http://gz.lianjia.com/ershoufang/'
let contentArr = []
let getPage = (url,callback) => {
	request(url,(err,res) => {
		let $ = cheerio.load(res.body)
		let list = $('.listContent').find('li').find('.info')
		// console.log(list.find('.flood').find('.positionInfo')[0].children[1].data)

		for(let i = 0, len = list.length;i < len; i++){
			let data = {
				title: {
					title: list.find('.title').find('a')[i].children[0].data,
					link: list.find('.title').find('a')[i].attribs.href
				},
				address: {
					address: list.find('.address').find('.houseInfo').find('a')[i].children[0].data,
					addressLink: list.find('.address').find('.houseInfo').find('a')[i].attribs.href
				},
				flood: {
					position: list.find('.flood').find('.positionInfo')[i].children[1].data
				},
				priceInfo: {
					totalPrice: list.find('.priceInfo').find('.totalPrice').find('span')[i].children[0].data + '万',
					unitPrice: list.find('.priceInfo').find('.unitPrice').find('span')[i].children[0].data
				}
			}
			contentArr.push(data)
		}
		callback(contentArr)
	})
}

app.get('/getData',(req,res) => {
	contentArr = []
	let entryUrl = req.query.targetUrl
	let sendData = data => {
		res.send(data)
	}
	getPage(entryUrl,sendData)
})



app.listen(3000,_ => {
	console.log('node is listening on port 3000')
})