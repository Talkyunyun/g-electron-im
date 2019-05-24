<template>
    <div class="chat-container">
        <div class="chat-left">
            <!-- 搜索框 -->
            <div class="search">
                <div class="input">
                    <i class="mdi mdi-magnify"></i>
                    <input type="text" placeholder="搜索">
                </div>
                <div class="add-btn"><i class="mdi mdi-plus"></i></div>
            </div>

            <!-- 会话列表 -->
            <ul class="session">
                <li v-for="(item, index) in session" @click="switchSession(item, index)">
                    <div class="close"><i class="mdi mdi-close"></i></div>

                    <div class="session-info">
                        <div class="avatar"><img :src="item.avatar" alt=""></div>
                        <div class="info">
                            <div class="u-info">
                                <div class="name">{{item.name}}</div>
                                <div class="time">{{sessionTimeShow(item.lastMsg.sendTime)}}</div>
                            </div>
                            <div class="msg">{{item.lastMsg.msg}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 聊天窗口 -->
        <div class="chat-window">
            <div class="chat-content">
                <div class="chat-info">
                    <div class="name">{{currentSession.name}}</div>
                    <ul>
                        <li><i class="fa fa-search"></i></li>
                    </ul>
                </div>

                <!-- 聊天消息盒子 -->
                <div class="chat-msg-container">
                    <SingleChat :data="currentMsgList" />
                </div>
            </div>

            <div class="msg-form">
                <div class="msg-function">
                    <ul class="left">
                        <li><i class="mdi mdi-emoticon"></i></li>
                        <li><i class="mdi mdi-heart-outline"></i></li>
                        <li><i class="mdi mdi-json"></i></li>
                        <li><i class="mdi mdi-email-outline"></i></li>
                    </ul>

                    <ul>
                        <li><i class="fa fa-film"></i></li>
                    </ul>
                </div>

                <div class="msg-input">
                    <textarea class="text-input" placeholder="请输入消息" v-model="data.msg" @keyup.enter="sendMsg"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let IM = window.IM;
    import SingleChat from '../../components/chatList/SingleChat';
    export default {
        components: {SingleChat},
        data() {
            return {
                data: {
                    msg: ''
                }
            };
        },

        computed:{
            // 会话列表
            session() {
                return this.$store.getters.getSession;
            },

            currentSession: {
                get() {
                    return this.$store.getters.getCurrentSessionInfo;
                },
                set(data) {
                    this.$store.commit('setCurrentSession', data);
                }
            },

            currentMsgList: {
                get() {
                    return this.$store.getters.getCurrentSessionMsgList;
                },
                set(data) {
                    this.$store.commit('setCurrentSessionMsgList', data);
                }
            }
        },

        created: function() {
            console.log('-------');
        },

        methods: {

            // 发送消息操作
            sendMsg() {
                IM.socket().sendText(this.currentSession.targetId, this.data.msg, this.currentSession.type);
                this.data.msg = '';
            },

            /**
             * 切换会话
             */
            switchSession(item, index) {
                let self = this;
                this.currentSession = item;

                // todo 从本地获取聊天记录信息
                IM.utils.send(IM.api.session.syncMsgList, {
                    nsId: self.currentSession.nsId,
                    targetId: self.currentSession.targetId,
                    type: self.currentSession.type,
                    unreadCount: 0,
                    lastMsgId: 0
                }, (res) => {
                   console.log('dddddd', res);

                   self.currentMsgList = res.data;
                }, (err) => {
                    console.log('sync message: ', err);
                });
            },

            /**
             * 处理会话时间显示
             * @param time
             * @returns {string}
             */
            sessionTimeShow(time) {
                let oldTime = time / 1000;
                let currentTime = (new Date()).getTime() / 1000;
                let poor = currentTime - oldTime;

                let date =  new Date(time);
                if (poor <= 86400) {
                    let hour    = date.getHours();
                    let minutes = date.getMinutes();

                    return hour + ':' + minutes;
                } else {
                    let year = date.getFullYear();
                    let month= date.getMonth() + 1;
                    let day  = date.getDate();

                    return year + '/' + month + '/' + day;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chat-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;

        .chat-left{
            width: 240px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: #ffffff;
            border-right: 1px solid #e4e4e4;

            .search{
                height: 50px;
                display: flex;
                justify-content: space-between;
                padding: 0 5px 0 12px;
                align-items: center;
                color: #afafaf;

                .input{
                    background: #ececec;
                    position: relative;
                    height: 30px;
                    width: 180px;
                    border-radius: 2px;
                    padding: 0 6px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    i{
                        font-size: 2rem;;
                    }
                    input{
                        border: none;
                        outline: none;
                        width: 88%;
                        height: 24px;
                        background: rgba(0, 0, 0, 0);
                    }
                }
                .add-btn{
                    font-size: 28px;
                    cursor: pointer;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .add-btn:hover{
                    background-color: #efefef;
                }
            }

            /* 会话列表 */
            .session{
                width: 100%;
                height: calc(100% - 50px);
                overflow: hidden;
                overflow-y: auto;

                li{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    cursor: default;
                    padding-left: 5px;

                    .close{
                        color: #cecece;
                        font-size: 12px;
                        visibility: hidden;
                    }

                    .session-info{
                        width: calc(100% - 14px);
                        border-bottom: 1px solid #efefef;
                        display: flex;
                        padding: 8px 0;
                        justify-content: space-between;
                        .avatar{
                            width: 45px;
                            height: 45px;
                            background: #e6e6e6;
                            border-radius: 50%;
                            overflow: hidden;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .info{
                            width: calc(100% - 56px);
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            height: 45px;
                            padding-right: 6px;
                            .u-info{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .name{
                                    font-size: 14px;
                                    font-weight: 500;
                                    color: #636363;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                    -webkit-box-orient: vertical;
                                }
                                .time{
                                    color: #b5b5b5;
                                    font-size: 12px;
                                }
                            }
                            .msg{
                                font-size: 13px;
                                color: #909090;
                                height: 16px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
                li:hover{
                    background-color: #f1f1f1;

                    .close{
                        visibility: initial;
                    }
                }
            }
        }

        /* 聊天窗口 */
        .chat-window{
            width: calc(100% - 240px);
            background: #f5f6f7;
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            justify-content: space-between;

            .chat-content{
                width: 100%;
                height: calc(100% - 150px);
                overflow: hidden;
                display: flex;
                flex-direction: column;

                .chat-info{
                    background: #f3f3f3;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    border-bottom: 1px solid #e4e4e4;
                    -webkit-app-region: drag;

                    .name{
                        font-size: 1.7rem;
                    }
                    ul{
                        li{}
                    }
                }

                .chat-msg-container{
                    height: calc(100% - 50px);
                    overflow: hidden;
                    overflow-y: auto;
                }
            }

            .msg-form{
                height: 150px;
                overflow: hidden;
                border-top: 1px solid #e4e4e4;
                .msg-function{
                    height: 30px;
                    overflow: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;

                    ul{
                        display: flex;
                        align-items: center;
                        li{
                            color: #8e8e8e;
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    ul.left{
                        li{
                            margin-right: 15px;
                        }
                        li:hover{
                            color: #fbbe08;
                        }
                    }
                }
                .msg-input{
                    height: calc(100% - 30px);
                    position: relative;
                    overflow: hidden;

                    .text-input{
                        border: none;
                        outline: none;
                        height: 100%;
                        overflow-y: auto;
                        padding: 2px 10px;
                        color: #1d1d1d;
                        font-size: 14px;
                        display: flex;
                        width: -webkit-fill-available;
                        resize: none;
                        background: rgba(0,0,0,0);
                        font-weight: 500;
                    }
                }
            }
        }
    }
</style>
