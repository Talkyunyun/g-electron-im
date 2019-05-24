/**
 * TCP 数据监听业务处理
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/02/27
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let IM = window.IM;
export default class TcpListenService {
    /**
     * 运行TCP消息监听服务
     */
    static run() {
        this.doTcpData();
        // 监听登录，重连初始化数据操作
        IM.ipc.on('M2W_loginInitData', (event, data) => {
            IM.initLoginData();
        });
    }

    /**
     * 处理TCP下行消息逻辑
     */
    static doTcpData() {
        IM.ipc.on('M2W_tcpData', (event, data) => {
            console.log('tcp收到数据: ', data);
            if (typeof data.ret === 'undefined') {// 处理非自己请求的响应数据
                this.doServerToRes(data);
            } else {// 处理自己主动请求的响应数据
                this.doSelfRequestToRes(data);
            }

            IM.initLoginData();
        });
    }

    /**
     * 处理服务端主动下发的消息
     * @param data
     */
    static doServerToRes(data) {
        console.log('server -> res :', data);
    }

    /**
     * 处理客户端主动发起的请求响应数据
     * @param data
     */
    static doSelfRequestToRes(data) {
        console.log('req -> res :', data);
    }
}