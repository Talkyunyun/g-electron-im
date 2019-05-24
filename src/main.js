/**
 * 项目主进程入口文件
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/09/30
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
const electron = require('electron');
const {app, ipcMain} = electron;

const IPCService = require('./service/IPCService');
// 导入所有窗口
const LoginWindow = require('./windows/login/login');
const HomeWindow = require('./windows/home/home');
class GElectron {
    /** 初始化操作 */
    constructor() {
        this.loginWindow = null; // 登录窗口
        this.homeWindow = null;  // 聊天首页窗口
    }

    /** 运行程序 */
    run() {
        this.initApp(); // 初始化所有APP
        this.initIPC(); // 初始化IPC监听
    }

    /** 初始化需要提前开启的窗口 */
    initApp() {
        app.on('ready', () => {
            this.createWindow();
        });

        app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });
    }

    /** 初始化IPC */
    initIPC() {
        let self = this;
        ipcMain.on('close', (e) => {
            self.closeAllWindow();
        });
        (new IPCService()).run(this);
    }

    /** 创建窗口 */
    createWindow() {
        this.loginWindow = new LoginWindow();
        this.homeWindow = new HomeWindow();
    }

    /** 关闭所有窗口 */
    closeAllWindow() {
        this.loginWindow.getWindow().close();
        this.homeWindow.getWindow().close();
    }
}

(new GElectron()).run();
