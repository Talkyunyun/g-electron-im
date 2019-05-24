<template>
    <div class="g-container">
        <section class="g-left">
            <ul style="margin-top:12px">
                <li class="login-user">
                    <div class="avatar"><img :src="loginUser.avatar" alt=""></div>
                </li>
                <li v-bind:class="{'active' : tabIndex === 0}" @click="goTabPage(0, 'chat')">
                     <!-- mdi-wechat mdi-message mdi-message-processing -->
                    <i class="mdi mdi-wechat"></i>
                </li>
                <li v-bind:class="{'active' : tabIndex === 1}" @click="goTabPage(1, 'contact')">
                    <!-- mdi-file-tree -->
                    <i class="mdi mdi-file-tree"></i>
                </li>
                <li v-bind:class="{'active' : tabIndex === 2}" @click="goTabPage(2, 'apps')">
                    <!-- mdi-apps mdi-apple-keyboard-command -->
                    <i class="mdi mdi-apps"></i>
                </li>
            </ul>

            <ul>
                <li v-bind:class="{'active' : tabIndex === 3}" @click="goTabPage(3, 'setting')">
                    <!-- mdi-settings mdi-settings-outline mdi-settings-box -->
                    <i class="mdi mdi-settings"></i>
                </li>
            </ul>
        </section>

        <section class="g-right">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabIndex: -1
            };
        },

        computed: {
            loginUser() {
                return this.$store.getters.getCurrentUser
            }
        },

        created: function() {},

        methods: {
            // 打开指定tab页面
            goTabPage: function(index, link) {
                this.tabIndex = index;
                this.$router.push(link);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
