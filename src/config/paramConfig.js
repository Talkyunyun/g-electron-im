/**
 * 参数配置
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/01/23
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
module.exports = {
    name : '猫咪IM',
    secret : '4d3Kdf0sd8dDS5ERFoSDKpJFlK4SDkFJ5KfSDJidFKoSJsF',
    version: 'v1.0.0',
    platforms : {
        unknown: 0,
        mac    : 1,
        windows: 2,
        ios    : 3,
        android: 4
    },


    toType: {
        singleChat: 1,
        groupChat : 3
    },


    tcpAction: {
        imChat: 'im_chat'
    },


    // tcp连接类型
    tcpCmd: {
        handshake: 1,  // 握手连接
        heartbeat: 2,  // 心跳
        msgDown  : 5,  // 消息下行
        msgUp    : 8   // 消息上行
    },



    msgType: {
        text: 1,
        img : 2,
        file: 3,
        systemMsg: 5
    }
};

