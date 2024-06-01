<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理"></el-page-header>

        <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules" label-width="auto"
            class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="Select" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                        :disabled="item.disabled" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userForm.avatar" @kedongchange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup>
import {useRouter} from 'vue-router'
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
//import router from '@/router';



const userForm = reactive({
    username: "",
    password: "",
    role: 2,
    introduction: "",
    avatar: "",
    file: null,
    gender: 0
})

const options = [
    {
        label: "管理员",
        value: 1
    },
    {
        label: "编辑",
        value: 2
    }
]

const userFormRef = ref()

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入您的名字', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入您的密码', trigger: 'blur' }
    ],
    roel: [
        { required: true, message: '请输入您的角色', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入您的介绍', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '请上传您的头像', trigger: 'blur' }
    ]
})

const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const router = useRouter()
const submitForm = () => {
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            console.log(userForm)
            await upload("/adminapi/user/add", userForm)
            router.push("/user-manage/userlist")
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 20px;
}
</style>