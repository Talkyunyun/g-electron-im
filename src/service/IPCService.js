/**
 * 所有业务IPC公共处理
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2019/01/23
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
const electron = require('electron');
const {ipcMain} = electron;
const envConfig = require('../config/envConfig');
const paramConfig = require('../config/paramConfig');
const encrypt = require('../utils/encrypt');

let SOCKET, heartbeatT = 0;
class IPCService {
    /**
     * 运行tcp相关操作
     * @param mainObj
     */
    run(mainObj) {
        let self = this;
        // tcp连接处理
        ipcMain.on('W2M_socketConnect', (event, loginData) => {
            // 清除心跳
            self.cleanHeartbeat();

            SOCKET = require(envConfig.APP_SRC + '/socket/Socket');
            SOCKET.connect(loginData.port, loginData.host, () => {
                // TCP连接成功，发送握手数据
                let params = {};
                params.token     = loginData.token;
                params.timestamp = (new Date()).getTime();
                params.actionId  = paramConfig.tcpCmd.handshake;
                params.platform  = paramConfig.platforms.mac;
                params.sign      =  encrypt.sign(params, paramConfig.secret);
                SOCKET.write(JSON.stringify(params));
            });

            // 监听TCP消息下发数据
            SOCKET.onData((tcpRes) => {
                console.log('tcp收到数据[主进程]', tcpRes);
                switch (tcpRes.actionId) {
                    case paramConfig.tcpCmd.handshake:// 握手处理
                        mainObj.loginWindow.getWindow().webContents.send('M2W_tcpLoginRes', tcpRes);
                        break;
                    case paramConfig.tcpCmd.heartbeat:// 心跳数据
                        console.log('心跳数据: ', tcpRes);
                        break;
                    case paramConfig.tcpCmd.msgDown:// 消息下行
                        mainObj.homeWindow.getWindow().webContents.send('M2W_tcpData', tcpRes);
                        break;
                    default:
                        console.log('无法识别actionId[主进程]', tcpRes);
                }
            });

            // 监听tcp关闭
            SOCKET.onClose((err) => {
                console.log('tcp断开连接[主进程]', err);
                self.cleanHeartbeat();
            });
        });

        // 关闭登录页面，显示聊天首页
        ipcMain.on('W2M_loginSuccessGoHome', (event, data) => {
            // 开启心跳检测
            self.beginHeartbeat();

            mainObj.loginWindow.getWindow().close();
            mainObj.homeWindow.show();

            // 通知页面加载初始化数据
            mainObj.homeWindow.getWindow().webContents.send('M2W_loginInitData', true);
        });

        // TCP发送消息
        ipcMain.on('W2M_socketSendData', (event, data) => {
            data.actionId = 8;
            console.log('客户端发送消息[主进程]', data);
            SOCKET.write(JSON.stringify(data));
        });
    }

    /**
     * 开启心跳检测
     */
    beginHeartbeat() {
        this.cleanHeartbeat();
        heartbeatT = setInterval(function() {
            let params = {};
            params.actionId = paramConfig.tcpCmd.heartbeat;
            SOCKET.write(JSON.stringify(params));
        }, 5000);
    }

    /**
     * 清除心跳
     */
    cleanHeartbeat() {
        clearInterval(heartbeatT);
    }
}
module.exports = IPCService;