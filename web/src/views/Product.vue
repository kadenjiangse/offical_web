<template>
    <div>
        <el-carousel height="calc(100vh - 60px)" direction="vertical" motion-blur :autoplay="false"
            v-if="looplist.length">
            <el-carousel-item v-for="item in looplist" :key="item">
                <div class="item" :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`
            }">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h2>{{ item.title }}</h2>
                            </div>
                        </template>
                        <div>{{ item.introduction }}</div>
                        <div class="detail">{{ item.detail }}</div>

                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无产品" v-else />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const looplist = ref([])

onMounted(async () => {
    const res = await axios.get("webapi/product/list")
    looplist.value = res.data.data
})

</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.item {
    width: 100%;
    height: 100%;
    background-image: cover;
}
.box-card {
    width:50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
}
.detail {
    margin-top: 20px;
}
</style>
