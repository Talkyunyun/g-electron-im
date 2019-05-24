/**
 * 项目入口文件
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/05/06
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
import Vue from 'vue';
import App from './App.vue';
import Store from './store';
import Router from './router/index';

Vue.use(Store);
Vue.use(Router);

let vueObject = new Vue({
    el    : '#app',
    render: (h) => h(App),
    router: Router,
    store : Store.store
});

window.vue = vueObject;
