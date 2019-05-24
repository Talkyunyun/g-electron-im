/**
 * 项目接口地址配置文件
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/01/23
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let envConfig = require('./envConfig');
module.exports = {
    // 登录
    login: {
        method: 'POST',
        url : envConfig.host + 'login_v5'
    },
    // 退出登录
    logout: {
        method: 'GET',
        url : envConfig.host + 'logout'
    },

    // 会话相关接口
    session: {
        list: {
            method: 'POST',
            url : envConfig.host + '/session/list'
        },
        syncMsgList: {
            method: 'POST',
            url : envConfig.host + '/message/syn'
        }
    }
};