<template>
    <div class="wrap">
        <nf-form class="nf-form" :model="ruleForm" ref="ruleForm" :rules="ruleForm.rules" label-width="70px">
            <nf-form-item label="邮箱" prop="email">
                <nf-input v-model="ruleForm.email"></nf-input>
            </nf-form-item>
            <nf-form-item label="密码" prop="password">
                <nf-input v-model="ruleForm.password"></nf-input>
            </nf-form-item>
            <nf-form-item label="城市" prop="checkedList">
                <nf-checkbox-object v-model="ruleForm.checkedList"
                                    :list="ruleForm.list"
                                    label="name"></nf-checkbox-object>
            </nf-form-item>
            <nf-form-item>
                <div>对象城市选择的值:{{ruleForm.checkedList}}</div>
            </nf-form-item>
            <nf-form-item label="城市" prop="checkedCities">
                <nf-checkbox-group v-model="ruleForm.checkedCities">
                    <nf-checkbox v-for="city in ruleForm.cities" :label="city" :key="city">{{city}}</nf-checkbox>
                </nf-checkbox-group>
            </nf-form-item>
            <nf-form-item>
                <div>数组城市选择的值:{{ruleForm.checkedCities}}</div>
            </nf-form-item>
            <nf-form-item>
                <nf-button @click="submitForm('ruleForm')">提交</nf-button>
                <nf-button @click="resetForm('ruleForm')">重置</nf-button>
            </nf-form-item>
        </nf-form>
    </div>
</template>

<script>
    import { ValidateModel } from '../model/ValidateModel'
    export default {
        data () {
            return {
                ruleForm: new ValidateModel()
            }
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                });
                this.ruleForm.validate((valid, message) => {
                    if (!valid) {
                        console.log(message)
                    }
                })
            },
            resetForm (formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>
