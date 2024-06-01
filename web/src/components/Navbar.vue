<template>
    <div class="navbar">
        <el-menu :default-active="route.fullpath" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻与服务</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item  @click="handelClick()">登录</el-menu-item>
        </el-menu>
        <div class="right">企业门户官网</div>
    </div>

</template>
<script setup>
import {useRoute} from "vue-router"

const route = useRoute()
const handelClick = ()=>{
    window.location = "http://localhost:8080"
}
</script>

<style lang="scss" scoped>
.navbar {
    position: sticky;
    top: 0px;
    z-index: 1000;;
}

.right {
    position: fixed;
    top: 0;
    right: 20px;
    widows: 100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
}
</style>