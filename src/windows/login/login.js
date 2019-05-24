/**
 * 登录窗口
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/09/30
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
const electron = require('electron');
const Base = require('../Base');
const {BrowserWindow} = electron;
class LoginWindow extends Base {
    constructor() {
        super();
        let self = this;
        self.window = new BrowserWindow({
            width          : 300,
            height         : 400,
            resizable      : true,
            center         : true,
            show           : false,
            frame          : true,
            minimizable    : true,
            maximizable    : false,
            fullscreen     : false,
            closable       : true,
            fullscreenable : false,
            autoHideMenuBar: true,
            titleBarStyle  : 'hiddenInset',
            backgroundColor: '#ffffff'
        });
        if (this.getEnvInfo().env === 'dev') {
            self.window.loadURL('http://127.0.01:8080#/login');
        } else {
            self.window.loadURL('file://' + this.getEnvInfo().APP_SRC + '/ui_prd/index.html#/login');
        }
        self.init();
    }

    /** 初始化事件 */
    eventInit() {
        let self = this;
        self.window.once('ready-to-show', () => {
            self.window.show();
        });
        self.window.on('closed', () => {
            self.window = null;
        });
        // this.window.on('closed', () => {
        //     app.quit();
        // });
    }

    init() {
        this.eventInit();
        this.setAppMenu();
    }

    /** 设置菜单 */
    setAppMenu() {
        // let template = [
        //     {
        //         label: 'iSchool',
        //         submenu: [
        //             {
        //                 label: '关于iSchool'
        //             },
        //             {
        //                 label: '关闭应用',
        //                 click: function() {
        //                     dialog.showMessageBox({
        //                         type: 'info',
        //                         title: '温馨提示',
        //                         message: '确认要退出吗？',
        //                         buttons: ['取消', '确认']
        //                     }, function(res) {
        //                         if (res === 1) {
        //                             app.quit();
        //                         }
        //                     });
        //                 }
        //             }
        //         ]
        //     }
        // ];
        // let menu = Menu.buildFromTemplate(template);
        //
        // Menu.setApplicationMenu(menu);
    }
}

module.exports = LoginWindow;
