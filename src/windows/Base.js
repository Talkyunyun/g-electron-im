/**
 * 窗口基类
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/12/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
const envConfig = require('../config/envConfig');
class Base {
    /**
     * 初始化操作
     */
    constructor() {
        this.window = null;
    }

    /**
     * 获取窗口
     * @returns {null}
     */
    getWindow() {
        return this.window;
    }

    /**
     * 隐藏窗口
     */
    hide() {
        this.window.hide();
    }

    /**
     * 显示窗口
     */
    show() {
        this.window.show();
    }

    /**
     * 获取运行环境
     * @return {null}
     */
    getEnvInfo() {
        return envConfig;
    }
}

module.exports = Base;
