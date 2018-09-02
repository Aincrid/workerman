import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './components/Index'

Vue.use(VueRouter)


const router = new VueRouter(
    [
        {
            path:"/",
            component: Index
        }
    ]
);

export default router