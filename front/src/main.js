import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import iView from 'iview'

import Md5 from 'md5'
import global_ from './globalConfig'
import WebSocket from  './websocket/websocket'
import socketSend from './websocket/socketsend'

import Vuex from 'vuex'
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(Md5);
Vue.use(Router);
Vue.use(WebSocket);
Vue.use(iView, {
    transfer:false,
});
Vue.use(Vuex);

Vue.prototype.global_ = global_;
new Vue({
    render: h => h(App),

}).$mount('#app')
