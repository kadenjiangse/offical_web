<template>
    <div>
        <el-page-header content="创建新闻" icon="" title="新闻管理"></el-page-header>
        <el-form ref="newsFormRef" style="max-width: 600px" :model="newsForm" :rules="newsFormRules" label-width="auto"
            class="demo-ruleForm" status-icon>
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <Editor @event="handelChange" />
            </el-form-item>

            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" placeholder="Select" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                        :disabled="item.disabled" />
                </el-select>
            </el-form-item>

            <el-form-item label="封面图面" prop="cover">
                <Upload :avatar="newsForm.cover" @kedongchange="handleUploadChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { useRouter } from 'vue-router'
import Editor from '@/components/editor/Editor.vue'
import {useStore} from 'vuex'

const store = useStore()
const newsFormRef = ref()
const router = useRouter()
const newsForm = reactive({
    title: "",
    content: "",
    category: 1,
    cover: "",
    file: null,
    isPublish: 0,
    author: store.state.userInfo.username
})

const newsFormRules = reactive({
    title: [
        { required: true, message: "请输入标题", trigger: "blur" }
    ],
    content: [
        { required: true, message: "请输入内容", trigger: "blur" }
    ],
    category: [
        { required: true, message: "请输入分类", trigger: "blur" }
    ],
    cover: [
        { required: true, message: "请上传图片", trigger: "blur" }
    ]

})

const options = [
    {
        label: "最新动态",
        value: 1
    },
    {
        label: "典型案例",
        value: 2
    },
    {
        label: "通知公告",
        value: 3
    },
]

const handleUploadChange = (file) => {
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}

const submitForm = () => {
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(newsForm)
            await upload("/adminapi/news/add", newsForm)
            router.push("/news-manage/newslist")

        }
    })
}

const handelChange = (data) => {
    // console.log(data)
    newsForm.content = data
}
</script>
