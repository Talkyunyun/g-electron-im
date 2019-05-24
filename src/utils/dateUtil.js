/**
 * 时间相关函数操作
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/02/04
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
module.exports = {
    // 处理时间显示
    msgTimeShow: function(time) {
        let oldTime = time / 1000;
        let currentTime = (new Date()).getTime() / 1000;
        let poor = currentTime - oldTime;

        let date =  new Date(time);
        let hour    = date.getHours();
        let minutes = date.getMinutes();
        if (poor <= 86400) {
            return hour + ':' + minutes;
        }

        let year = date.getFullYear();
        let month= date.getMonth() + 1;
        let day  = date.getDate();

        return year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes;
    }
};
