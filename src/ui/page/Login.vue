<template>
    <div class="login-container">
        <div class="logo"><img src="static/images/logo.png" alt=""></div>

        <div class="form">
            <div class="item">
                <i class="mdi mdi-account"></i>
                <input type="text" v-model="form.userName" placeholder="账号" />
            </div>
            <div class="item">
                <i class="mdi mdi-lock"></i>
                <input type="password" v-model="form.password" placeholder="密码" />
            </div>
            <div class="item">
                <i class="mdi mdi-google"></i>
                <input type="text" v-model="form.ggCode" placeholder="谷歌验证码" />
            </div>

            <div class="item" style="border-bottom:none">
                <button @click="login" type="button">
                    <span v-show="isLogon" class="mdi mdi-spin mdi-loading">登录中...</span>
                    <span v-show="!isLogon">立即登录</span>
                </button>
            </div>
        </div>

        <div class="footer">@Gene Yang v1.0.0</div>
    </div>
</template>

<script>
    let IM = window.IM;
    export default {

        data() {
            return {
                isLogon: false, // 是否登录中
                form: {
                    userName: 'gene.yang',
                    password: '232323',
                    ggCode  : 232323
                }
            };
        },

        methods: {
            // 登录处理
            login: function() {
                let self = this;
                let params = Object.assign({}, this.form);
                params.dvNumber   = '11111111';
                params.version    = '1.2.3';
                params.enc        = 1;
                params.clientType = 1;
                params.platform   = IM.params.platforms.mac;
                params.timestamp  = new Date().getTime();
                params.sign       = IM.utils.encrypt.sign(params, IM.params.secret);

                self.isLogon = true;
                IM.utils.request.send(IM.api.login, params, (res) => {
                    if (res.ret != 0) {
                        self.isLogon = false;
                        alert(res.msg);
                    } else {
                        // tcp连接和握手请求
                        IM.ipc.send('W2M_socketConnect', res.data);

                        // 监听tcp握手响应处理
                        IM.ipc.on('M2W_tcpLoginRes', (event, tcpRes) => {
                            self.isLogon = false;
                            console.log('收到tcp握手响应数据：', tcpRes);
                            if (tcpRes.ret != 0) {
                                alert(res.msg);
                                return false;
                            }
                            // 保存登录节点信息和用户信息
                            IM.utils.user.setLoginNode(res.data);
                            IM.utils.user.setLoginUserInfo(tcpRes.user);
                            // 跳转home页面
                            IM.ipc.send('W2M_loginSuccessGoHome', true);
                        });
                    }
                }, (err) => {// 网络请求失败，提示
                    self.isLogon = false;
                    alert('网络请求失败');
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-container{
        display: flex;
        align-items: center;
        flex-direction: column;
        -webkit-app-region: drag;

        .logo{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #e8e8e8;
            overflow: hidden;
            margin-top: 40px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .form{
            width: 80%;
            margin-top: 20px;
            overflow: hidden;
            .item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                border-bottom: 1px solid #d6d6d6;
                padding: 10px 0 2px 0;
                color: #d6d6d6;
                i {
                    font-size: 18px;
                }
                input{
                    width: calc(100% - 22px);
                    outline: none;
                    border: none;
                    font-size: 14px;
                    color: #797979;
                    -webkit-app-region: no-drag;
                }
                button{
                    width: 100%;
                    background: #1296db;
                    padding: 10px 0;
                    color: #fff;
                    font-size: 14px;
                    border: none;
                    border-radius: 2px;
                    outline: none;
                    cursor: pointer;
                    -webkit-app-region: no-drag;
                }
            }
        }
        .footer{
            color: #afafaf;
            font-size: 12px;
            margin-top: 10px;
        }
    }
</style>
