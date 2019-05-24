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
                <li v-for="(item, index) in session"
                    @click="switchSession(item, index)"
                    v-bind:class="{'active' : selectedSessionIndex == index}">
                    <div class="close"><i class="mdi mdi-close"></i></div>

                    <div class="session-info">
                        <div class="avatar"><img :src="item.avatar" alt=""></div>
                        <div class="info">
                            <div class="u-info">
                                <div class="name">{{item.name}}</div>
                                <div class="time">{{sessionTimeShow(item.lastMsg.sendTime)}}</div>
                            </div>
                            <div class="msg-box">
                                <div class="msg">{{item.lastMsg.msg}}</div>
                                <div class="unread" v-if="item.unreadCount > 0">
                                    {{item.unreadCount > 99 ? '99+' : item.unreadCount}}
                                </div>
                            </div>
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
                    <SingleChat v-if="currentSession.type == 1" :data="currentMsgList" />
                    <AppChat v-else-if="currentSession.type == 2" :data="currentMsgList" />
                    <GroupChat v-else-if="currentSession.type == 3" :data="currentMsgList" />
                </div>
            </div>

             <!-- 聊天输入框 -->
            <div class="msg-form"><BaseInput /></div>
        </div>
    </div>
</template>

<script>
    let IM = window.IM;
    import SingleChat from '../../components/chatList/SingleChat';
    import GroupChat from '../../components/chatList/GroupChat';
    import AppChat from '../../components/chatList/AppChat';
    import BaseInput from '../../components/chatInput/BaseInput';
    export default {
        components: {SingleChat, GroupChat, AppChat, BaseInput},
        data() {
            return {
                selectedSessionIndex: false
            };
        },

        computed:{
            // 用户所有会话列表数据
            session() {
                return IM.utils.arrayUtil.sortReverse(this.$store.getters.getSession, 'updateTime');
            },

            // 当前选择会话信息
            currentSession: {
                get() {
                    return this.$store.getters.getCurrentSessionInfo;
                },
                set(data) {
                    this.$store.commit('setCurrentSession', data);
                }
            },

            // 当前选择会话聊天消息列表
            currentMsgList: {
                get() {
                    return this.$store.getters.getCurrentSessionMsgList;
                    // return IM.utils.arrayUtil.sort(msgList, 'sendTime');
                },
                set(data) {
                    this.$store.commit('setCurrentSessionMsgList', data);
                }
            }
        },

        // 更新完成
        updated: function() {
            $('.chat-msg-container')[0].scrollTop = $(".chat-msg-container")[0].scrollHeight;
        },

        methods: {
            /** 切换会话 */
            switchSession(item, index) {
                let self = this;
                this.currentSession = item;
                this.selectedSessionIndex = index;

                // todo 从本地获取聊天记录信息
                IM.utils.request.send(IM.api.session.syncMsgList, {
                    nsId       : self.currentSession.nsId,
                    targetId   : self.currentSession.targetId,
                    type       : self.currentSession.type,
                    unreadCount: 0,
                    lastMsgId  : 0
                }, (res) => {
                    if (res.ret != 0) {
                        console.log('dddddd', res);
                        return false;
                    }
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

                            .msg-box{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .unread{
                                    color: white;
                                    background: #F44336;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    width: 18px;
                                    height: 18px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 11px;
                                    padding: 0;
                                    margin: 0;
                                    flex: none;
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
                }
                li:hover{
                    background-color: #f1f1f1;
                    .close{
                        visibility: initial;
                    }
                }
                li.active{
                    background-color: #f1f1f1;
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
            }
        }
    }
</style>
