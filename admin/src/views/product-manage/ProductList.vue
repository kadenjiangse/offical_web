<template>
    <div>
        <el-card>
            <el-page-header content="产品列表" icon="" title="产品管理"></el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" width="180" />

                <el-table-column prop="introduction" label="简要描述" width="180" />

                <el-table-column label="更新时间" width="180">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

                        <el-button :icon="Edit" circle color="white" @click="handelEdit(scope.row)" />

                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" circle />
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="是否发布" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handelSwitchChange(scope.row)" />
                        {{ scope.row.isPublish }}
                    </template>
                </el-table-column> -->

            </el-table>
        </el-card>

        <!-- <el-dialog v-model="dialogVisible" title="预览新闻" width="500">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size:12px; color:gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider />
                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
        </el-dialog> -->


    </div>
</template>


<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import formatTime from "@/util/formatTime"
import { useRouter } from 'vue-router'



const router = useRouter()
const tableData = ref([])


onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get("/adminapi/product/list")
    tableData.value = res.data.data

}

const handleDelete = async (data) => {
    //console.log(data)
    await axios.delete(`/adminapi/product/list/${data._id}`)
    await getTableData()
}

const handelEdit = async (data) => {
    //跳转到编辑路由
    router.push(`/product-manage/editproduct/${data._id}`)
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