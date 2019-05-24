/**
 * 请求工具类
 * @author Gene
 */
let $ = require('jquery');
let IM = window.IM;
module.exports = {
    /**
     * GET/POST请求工具
     * @param API
     * @param params
     * @param success
     * @param error
     */
    send: function(API, params, success, error) {
        let timeout = 5000;
        if (typeof arguments[4] !== 'undefined') {
            timeout = arguments[4];
        }
        params.token = IM.utils.user.getToken();
        $.ajax({
            type    : API.method,
            url     : API.url,
            data    : params,
            dataType: 'json',
            timeout : timeout,
            success : function (res) {
                success(res);
            },
            error: function (err) {
                error(err);
            }
        });
    }
};