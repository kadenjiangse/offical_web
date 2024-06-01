<template>
    <div>
        <el-page-header content="编辑产品" @back="handelBack()" title="产品管理"></el-page-header>

        <el-form ref="productFormRef" style="max-width: 600px" :model="productForm" :rules="productFormRules"
            label-width="auto" class="demo-ruleForm" status-icon>
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详情描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>

            <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @kedongchange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'

import axios from 'axios';
//import router from '@/router';


const route = useRoute()
const productForm = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null,
})


const productFormRef = ref()

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入产品介绍', trigger: 'blur' }
    ],
    detail: [
        { required: true, message: '请输入产品细节', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' }
    ]
})

const handleChange = (file) => {
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}

const router = useRouter()
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            await upload("/adminapi/product/list", productForm)
            router.push("/product-manage/productlist")
        }
    })
}

const handelBack = () => {
    router.back()
}

onMounted(async () => {
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    Object.assign(productForm, res.data.data[0])
})
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>