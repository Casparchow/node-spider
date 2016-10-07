import Vue from 'vue'
import vueRouter from 'vue-router'
import $ from 'jquery'

window.$ = $

require('../node_modules/materialize-css/dist/js/materialize.min.js')

Vue.use(vueRouter)

var router = new vueRouter()

router.map({
	'/': {
		component: require('./App.vue'),
	}
})

router.start(Vue.extend({}),'#app')