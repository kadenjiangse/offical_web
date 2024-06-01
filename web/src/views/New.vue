<template>
    <div>
        <el-row>
            <el-col :span="17" :offset="1">
                <div>
                    <h2>
                        {{ currentNews.title }}
                    </h2>
                    <div class="time">
                        {{ formatTime(currentNews.editTime) }}
                    </div>

                    <el-divider>
                        <el-icon><star-filled /></el-icon>
                    </el-divider>
                    <div v-html="currentNews.content">

                    </div>
                </div>
            </el-col>
            <el-col :span="4" :offset="1" :pull="1">
                <el-card style="max-width: 480px">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size: 16px;font-weight:bold;">最近新闻</span>
                        </div>
                    </template>
                    <div  @click="handelChange(item._id)" v-for="item in topNews" :key="item._id" class="text item" style="padding:14px;">
                        <span>{{ item.title }}</span>
                        <div class="bottom">
                            <time class="time">{{ formatTime(item.editTime) }}</time>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

    <script setup>
    import { onMounted, ref, watchEffect } from 'vue'
    import axios from 'axios'
    import { useRoute, useRouter } from 'vue-router'
    import moment from 'moment'
    import { StarFilled } from '@element-plus/icons-vue'
    moment.locale("zh-cn")
    const route = useRoute()
    const router = useRouter()
    const currentNews = ref({})
    const topNews = ref([])
    watchEffect(async () => {
        const res = await axios.get(`/webapi/news/list/${route.params.id}`)
        const res1 = await axios.get(`/webapi/news/toplist?limit=4`)
        topNews.value = res1.data.data
        currentNews.value = res.data.data[0]
    })

    const formatTime = time => moment(time).format('lll')
    const handelChange = (id)=>{
        router.push(`/new/${id}`)
    }
</script>
    <style lang="scss" scoped>
    .el-row {
        margin-top: 30px;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
</style>