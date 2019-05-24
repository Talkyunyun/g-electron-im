/**
 * 应用业务入口文件
 * 1、管理主进程和渲染进程之间的通讯
 * 2、初始化配置和常用工具函数
 * 3、执行顺序必须是先实例化对象，在调用run方法，无法部分工具中无法调用IM对象
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/12/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let envConfig = require(global.process.cwd() + '/src/config/envConfig');
class IM {
    /** 初始化 */
    constructor() {
        this.ipc = null;
        if (window.require) {
            this.ipc = window.require('electron').ipcRenderer;
        }
        this.initConfig();
    }

    /** 初始化全局配置文件 */
    initConfig() {
        this.envInfo = envConfig;
        this.env     = envConfig.env;
        this.params  = require(this.envInfo.APP_SRC + '/config/paramConfig');
        this.api     = require(this.envInfo.APP_SRC + '/config/apiConfig');
    }

    /** 开始运行 */
    run() {
        this.initUtils();
        this.initSocketAction();
    }

    /** 初始化工具 */
    initUtils() {
        this.utils = {
            encrypt  : require(this.envInfo.APP_SRC + '/utils/encrypt'),
            request  : require(this.envInfo.APP_SRC + '/utils/request'),
            user     : require(this.envInfo.APP_SRC + '/utils/user'),
            arrayUtil: require(this.envInfo.APP_SRC + '/utils/arrayUtil'),
            dateUtil : require(this.envInfo.APP_SRC + '/utils/dateUtil')
        };
    }

    /** 登录或重连初始化数据 */
    initLoginData() {
        this.getSessionList();
        window.vue.$store.commit('setCurrentUser', this.utils.user.getLoginUser());
        window.vue.$store.commit('setCurrentNode', this.utils.user.getLoginNode());
    }

    /** 获取会话列表 */
    getSessionList() {
        this.utils.request.send(this.api.session.list, {
            lastUpdateTime: 0
        }, (res) => {
            if (res.ret != 0) {
                console.log('访问接口错误：', res.msg);
                return false;
            }
            window.vue.$store.commit('setSession', res.data);
        }, (err) => {
            console.log('请求错误', err);
        });
    }

    /**
     * 初始化客户端socket操作API
     */
    initSocketAction() {
        let self = this;
        this.socket = {
            /**
             * 发送文本消息
             * @param to     消息接收对象id
             * @param msg    消息内容
             * @param toType 接收对象类型，具体见对应枚举配置值
             */
            sendText(to, msg, toType) {
                let loginUser = self.utils.user.getLoginUser();

                let data = {
                    action     : self.params.tcpAction.imChat,
                    clientMsgId: self.utils.encrypt.getClientMsgId(loginUser.uid, to, toType),
                    from       : loginUser.uid,
                    to         : to,
                    msg        : msg,
                    type       : self.params.msgType.text,
                    toType     : toType
                };
                // TODO 把发送的数据写入本地DB,并同时通知UI显示该消息 currentMsgList
                window.vue.$store.commit('setCurrentSessionMsgList', [
                    {
                        msgId   : 33333333333,
                        from    : loginUser.uid,
                        to      : to,
                        msg     : msg,
                        sendTime: (new Date()).getTime(),
                        type    : 1,
                    }
                ]);

                self.ipc.send('W2M_socketSendData', data);
            },

            /**
             * 发送图片消息
             * @param to     消息接收对象id
             * @param msg    消息内容
             * @param toType 接收对象类型，具体见对应枚举配置值
             */
            sendImg(to, msg, toType) {
                let loginUser = self.utils.user.getLoginUser();

                let data = {
                    action     : self.params.tcpAction.imChat,
                    clientMsgId: self.utils.encrypt.getClientMsgId(loginUser.uid, to, toType),
                    from       : loginUser.uid,
                    to         : to,
                    msg        : msg,
                    type       : self.params.msgType.img,
                    toType     : toType
                };
                self.ipc.send('W2M_socketSendData', data);
            }
        };
    }
}

// 全局追加对象
window.IM = new IM();
window.IM.run();
