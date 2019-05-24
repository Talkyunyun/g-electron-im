/**
 * 登录用户信息和登录服务端节点相关数据操作
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/01/24
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
module.exports = {
    /**
     * 获取token
     * @return {*}
     */
    getToken() {
        let node = this.getLoginNode();
        if (node == null) {
            return false;
        }

        return node.token;
    },

    /**
     * 获取节点信息
     * @return {string | null}
     */
    getLoginNode() {

        return JSON.parse(localStorage.getItem('_node'));
    },

    /**
     * 设置登录节点信息
     * @param data
     */
    setLoginNode(data) {
        return localStorage.setItem('_node', JSON.stringify(data));
    },

    /**
     * 获取登录用户信息
     * @return {any}
     */
    getLoginUser() {

        return JSON.parse(localStorage.getItem('_user'));
    },

    /**
     * 设置当前登录用户信息
     * @param user
     */
    setLoginUserInfo(user) {
        return localStorage.setItem('_user', JSON.stringify(user));
    }
};