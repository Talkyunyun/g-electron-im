/**
 * 获取APP运行环境
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/12/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let path = require('path');

const env = 'dev'; // FIXME 运行需要修改值，当前系统运行环境
let host;
switch (env) {
    case 'dev':
        host = 'http://maomi-api.mmlogs.com/';
        break;
    default:
        host = 'http://maomi-api.mmlogs.com/';
}
module.exports = {
    env    : env,
    host   : host,
    APP_SRC: path.resolve(__dirname, '..')
};
