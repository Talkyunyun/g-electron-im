/**
 * TCP连接管理
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/12/17
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
let net = require('net');
let client = new net.Socket();
let BuffCode = require('./tools/BuffCode');

class Socket {
    connect(port, host, callback) {
        client.connect(port, host, function() {
            callback(true);
        });
    }

    write(data) {
        client.write(BuffCode.BuffCode.encode(data));
    }

    close() {
        client.close();
    }

    // 监听TCP消息事件
    onData(callback) {
        client.on('data', (data) => {
            // TODO 粘包问题
            console.log('收到TCP原始数据[主进程]', BuffCode.BuffCode.decode(data));
            let res = JSON.parse(BuffCode.BuffCode.decode(data));
            callback(res);
        });
    }


    onClose(callback) {
        client.on('close', (err) => {
            callback(err);
        });
    }

    onError(callback) {
        client.on('error', (err) => {
            callback(err);
        });
    }


    onEnd(callback) {
        client.on('end', (err) => {
            callback(err);
        });
    }
}

module.exports = new Socket();

