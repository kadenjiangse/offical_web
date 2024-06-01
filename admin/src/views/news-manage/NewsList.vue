<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" icon="" title="新闻管理"></el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column label="分类" width="180">
                    <template #default="scope">

                        {{ categoryFormt(scope.row.category) }}

                    </template>
                </el-table-column>
                <el-table-column label="更新时间" width="180">
                    <template #default="scope">

                        {{ formatTime.getTime(scope.row.editTime) }}

                    </template>
                </el-table-column>
                <el-table-column label="是否发布" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handelSwitchChange(scope.row)" />
                        {{ scope.row.isPublish }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

                        <el-button type="success" :icon="Star" circle @click="handelPreview(scope.row)" />

                        <el-button :icon="Edit" circle color="white" @click="handelEdit(scope.row)" />

                        <!-- <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button> -->
                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" circle />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>

                <!--<el-table-column prop="address" label="Address" />-->
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="预览新闻" width="500">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size:12px; color:gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider />
                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
        </el-dialog>


    </div>
</template>


<script setup>
import { Edit, Star, Delete } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import formatTime from "@/util/formatTime"
import {useRouter} from 'vue-router'
import {useStore} from "vuex"

const store = useStore()
const router = useRouter()
const tableData = ref([])
const previewData = ref({})

const dialogVisible = ref(false)




onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    //console.log(store.state.userInfo)
    const res = await axios.get(`/adminapi/news/authorlist/${store.state.userInfo.username}`)
    tableData.value = res.data.data

}

const categoryFormt = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"];
    return arr[category - 1]
}

const handelSwitchChange = async (item) => {
    //更新后端数据库的isPublish
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    })
    await getTableData()
}

const handelPreview = (data) => {
    previewData.value = data
    dialogVisible.value = true
}

const handleDelete = async (data) => {
    //console.log(data)
    await axios.delete(`/adminapi/news/list/${data._id}`)
    await getTableData()
}

const handelEdit = async (data) => {
    //跳转到编辑路由
    router.push(`/news-manage/editnews/${data._id}`)
}
</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlcontent img {
    max-width: 100%;
}
</style>