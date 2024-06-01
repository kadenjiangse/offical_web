<template>
    <div>
        <el-container>
            <SideMenu/>
            <el-container direction="vertical">
                <TopHeader/>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>


    </div>
</template>

<script setup>
import TopHeader from '../components/mainbox/TopHeader'
import SideMenu from '../components/mainbox/SideMenu'
</script>
<style lang="scss" scoped>
.el-main {
    overflow: hidden;
    height: calc(100vh - 60px);
}
</style>