<template>
    <router-view></router-view>
</template>

<script>
    import TcpListenService from './service/TcpListenService';
    export default {
        mounted() {
            TcpListenService.run();
        }
    }
</script>

<style>
    @import "./static/css/style.min.css";
</style>
