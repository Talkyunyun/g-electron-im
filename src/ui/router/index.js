/**
 * 路由总模块
 * @author Gene
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

// 公共路由
import app from './module/app';

const routes = [
    ...app
];

Vue.use(VueRouter);
let router = new VueRouter({
    // mode: 'history',
    routes
});

//全局路由器钩子，跳转之前
router.beforeEach((to, from, next) => {
    //修改页面标题，通过
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }

    next();//必须调用next
});

export default router;
