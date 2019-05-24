import Vuex from 'vuex';

// 引入模块
// 模块文件名与相关的vue组件名称保持一致。
import app from './module/app';

export default {
    install(Vue) {
        // 使用Vuex插件
        Vue.use(Vuex);

        // 创建store实例
        this.store = new Vuex.Store({
            modules: { app }
        });
    },

    store: null// 把store实例传递出去，用于Vue实例化方法的参数
}
