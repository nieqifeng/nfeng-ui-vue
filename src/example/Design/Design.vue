<template>
    <div>
        <k-form-design :title.sync="title" @changeTitle="changeTitle" :designData="designData" @handleSaveJson="handleSaveJson"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            designData: {}
        }
    },
    methods: {
        changeTitle(title) {
            this.title = title
        },
        handleSaveJson(val) {
            console.log(val)
        }
    }
}
</script>  
