<template>
    <div>
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
            <textarea class="text-input" placeholder="请输入消息" v-model="send.content" @keyup.enter="sendMsg"></textarea>
        </div>
    </div>
</template>

<script>
    let IM = window.IM;
    export default {
        data() {
            return {
                send: {
                    content: ''
                }
            };
        },

        computed: {
            // 当前选择会话信息
            currentSession() {
                return this.$store.getters.getCurrentSessionInfo;
            },
        },

        methods: {
            // 发送消息操作
            sendMsg() {
                IM.socket.sendText(this.currentSession.targetId, this.send.content, this.currentSession.type);
                this.send.content = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
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
</style>
