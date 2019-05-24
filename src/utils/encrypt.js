/**
 * 加密和签名工具
 * @author Gene Yang
 */
let crypto = require('crypto');
module.exports = {
    /**
     * 签名工具
     * @param params
     * @param secret
     * @return {string}
     */
    sign: function(params, secret) {
        let newObj = {}, newKey = Object.keys(params).sort(), newKeyLength = newKey.length;
        for (let i = 0; i < newKeyLength; i++) {
            newObj[newKey[i]] = params[newKey[i]];
        }
        let text = secret;
        for (let item in newObj) {
            text += item + newObj[item];
        }
        text += secret;

        return (crypto.createHash('md5').update(text).digest('hex')).toUpperCase();
    },

    /**
     * md5加密
     * @param content
     * @return {PromiseLike<ArrayBuffer>}
     */
    md5: function(content) {
        return crypto.createHash('md5').update(content).digest('hex');
    },

    /**
     * 统一唯一会话id生成算法，和服务端统一
     * @param uid
     * @param targetId
     * @param type
     * @return {*|PromiseLike<ArrayBuffer>}
     */
    getSessionId: function(uid, targetId, type) {
        return this.md5(uid + '_' + targetId + '_' + type);
    },

    /**
     * 客户端消息唯一ID生成算法
     * @param uid
     * @param targetId
     * @param type
     * @return {*|PromiseLike<ArrayBuffer>}
     */
    getClientMsgId: function(uid, targetId, type) {
        let date = new Date();
        let str  = uid + '-' + targetId + '-' + type + ' 000 ' + date.getTime();

        return this.md5(str);
    }
};

