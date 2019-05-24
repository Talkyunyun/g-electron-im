<template>
    <ul>
        <li v-for="(item, index) in data">
            <!-- 系统消息 -->
            <section v-if="item.type == 5" class="sys_msg">{{item.msg}}</section>

            <!-- 别人发的消息 -->
            <section v-if="item.type != 5 && item.from != loginUser.uid">
                <div class="avatar"><img src="http://img.ugainian.com/1238/593f9aa9a4bd7.jpg" alt=""></div>
                <div class="msg-info">
                    <div class="u-info">
                        <div class="name">会计师对方</div>
                        <div class="time">{{msgTimeShow(item.sendTime)}}</div>
                    </div>

                    <div class="msg-box">
                        <div class="msg">{{item.msg}}</div>
                        <div class="more">...</div>
                    </div>
                </div>
            </section>

            <!-- 自己发的消息 -->
            <section class="self" v-if="item.type != 5 && item.from == loginUser.uid">
                <div class="avatar"><img :src="loginUser.avatar" alt=""></div>
                <div class="msg-info">
                    <div class="time">{{msgTimeShow(item.sendTime)}}</div>
                    <div class="msg-box">
                        <div class="msg">{{item.msg}}</div>
                        <div class="more">...</div>
                    </div>
                    <div class="receipt">全部已读</div>
                </div>
            </section>
        </li>
    </ul>
</template>

<script>
    let IM = window.IM;
    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },

        data() {
            return {};
        },

        computed: {
            loginUser() {
                return this.$store.getters.getCurrentUser
            }
        },

        methods: {
            // 处理时间显示
            msgTimeShow(time) {
                return IM.utils.dateUtil.msgTimeShow(time);
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul{
        padding-bottom: 20px;

        li{
            display: flex;
            padding: 8px 20px;

            section{
                display: flex;
                flex-direction: row;
                flex: 1;
                max-width: 100%;

                .avatar{
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: #cacaca;
                    margin-right: 8px;
                    margin-top: 15px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .msg-info{
                    max-width: 80%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    .u-info{
                        height: 30px;
                        display: flex;
                        align-items: flex-end;
                        font-size: 1.2rem;
                        margin-bottom: 2px;
                        .name{
                            color: #464646;
                        }
                        .time{
                            color: #9e9e9e;
                            font-size: 12px;
                            visibility: hidden;
                            margin-left: 5px;
                        }
                    }
                    .msg-box{
                        display: flex;
                        align-items: flex-end;
                        .msg{
                            background: #ffffff;
                            border-radius: 3px;
                            padding: 8px 10px;
                            color: #252525;
                            font-size: 14px;
                            flex-wrap: wrap;
                            display: flex;
                            flex: 1;
                            white-space: normal;
                            word-break: break-all;
                        }
                        .more{
                            background: white;
                            border-radius: 2px;
                            height: 10px;
                            color: #969696;
                            font-size: 20px;
                            line-height: 0;
                            border: 1px solid #e2e2e2;
                            overflow: hidden;
                            cursor: pointer;
                            margin-left: 5px;
                            visibility: hidden;
                        }
                    }
                }
            }
            section.sys_msg{
                color: #8a8a8a;
                font-size: 12px;
                justify-content: center;
                flex: 1;
                text-align: center;
            }

            section.self{
                justify-content: flex-start;
                flex-flow: row-reverse;

                .avatar{
                    margin-right: 0;
                    margin-left: 8px;
                }
                .msg-info{
                    align-items: flex-end;
                    .msg-box{
                        align-items: flex-end;
                        flex-direction: row-reverse;
                        .msg{
                            background: #ff8b00;
                        }
                        .more{
                            margin-right: 5px;
                            margin-left: 0;
                        }
                    }
                    .receipt{
                        font-size: 1rem;
                        color: #a2a2a2;
                    }
                }
            }

            section:hover{
                .time{
                    visibility: initial !important;
                }
                .more{
                    visibility: initial !important;
                }
            }
        }
    }
</style>
