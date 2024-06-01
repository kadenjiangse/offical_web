<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage: `url(${require('@/assets/logo.png')})`
        }">
        </div>
        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" placeholder="请输入新闻关键字" :prefix-icon="Search" type="search"
                        size="large" @input="visible = true" @blur="visible = false" />
                </template>
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :key="data._id" class="search-item"
                        @click="handelChangePage(data._id)">
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="恭喜，您检索到了空气~" />
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewList" :key="item._id">
                    <el-card style="max-width: 480px" shadow="hover" @click="handelChangePage(item._id)">
                        <template #header>{{ item.title }}</template>
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                        </div>
                        <time class="time">{{ formatTime(item.editTime) }}</time>

                    </el-card>

                </el-col>
            </el-row>
        </div>
        <el-tabs style="margin:20px;" v-model="whichTab" class="demo-tabs">

            <el-tab-pane :label="item.label" :name="item.name" :key="item.name" v-for="item in tablelist">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="padding:10px;">
                            <el-card style="max-width: 480px;" shadow="hover" @click="handelChangePage(data._id)">
                                <template #header>{{ data.title }}</template>
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                </div>
                                <time class="tab-time" style="float:left">{{ formatTime(data.editTime) }}</time>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline style="max-width: 600px">
                            <el-timeline-item v-for="data in tabnews[item.name]" :key="data._id"
                                :timestamp="formatTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>

        </el-tabs>
        <el-backtop :visibility-height="100" />
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
moment.locale("zh-cn")
const searchText = ref("")
const visible = ref(false)
const newlist = ref([])
const whichTab = ref(1)
const router = useRouter()
onMounted(async () => {
    const res = await axios.get("/webapi/news/list")
    //console.log(res.data)
    newlist.value = res.data.data
})

const searchnewslist = computed(() => searchText.value ? newlist.value.filter(item => item.title.includes(searchText.value)) : [])

const topNewList = computed(() => newlist.value.slice(0, 4))

const formatTime = time => moment(time).format('lll')

const tablelist = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    },
]
const tabnews = computed(() => _.groupBy(newlist.value, item => item.category))
const handelChangePage = (id) => {
    router.push(`/new/${id}`)

}
</script>
<style lang="scss" scoped>
.container {
    position: relative;
}

.news-header {
    height: 400px;
    width: 100%;
    background-size: cover;
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        background: whitesmoke;
        color: red;
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>
