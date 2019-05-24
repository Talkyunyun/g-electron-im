/**
 * 首页页面
 *
 * @author  : Gene Yang <talkyunyun@126.com>
 * @date    : 2018/09/30
 * @version : v1.0.0
 * @link    : https://github.com/Talkyunyun
 */
const electron = require('electron');
const Base = require('../Base');
const {BrowserWindow} = electron;

class MainWindow extends Base{
    constructor() {
        super();
        this.window = new BrowserWindow({
            width          : 800,
            height         : 600,
            minWidth       : 800,
            minHeight      : 600,
            resizable      : true,
            center         : true,
            show           : false,
            frame          : true,
            movable        : true,
            minimizable    : true,
            maximizable    : true,
            closable       : true,
            autoHideMenuBar: true,
            backgroundColor: '#ffffff',
            titleBarStyle  : 'hiddenInset'
        });

        if (this.getEnvInfo().env === 'dev') {
            this.window.loadURL('http://127.0.0.1:8080#/home');
        } else {
            this.window.loadURL('file://' +  this.getEnvInfo().APP_SRC + '/ui_prd/index.html#/home');
        }
        this.init();
    }

    /** 初始化 */
    init() {
        this.eventInit();
        this.setAppMenu();
    }

    /** 初始化事件 */
    eventInit() {
        let self = this;
        self.window.on('closed', () => {
            self.window = null;
        });
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


module.exports = MainWindow;
