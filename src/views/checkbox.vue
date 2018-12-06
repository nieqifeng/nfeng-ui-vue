<template>
    <div>
        <nf-checkbox-group v-model="cityCheck">
            <nf-checkbox v-for="(item,key) in cityList" :key="key" :label="item"></nf-checkbox>
        </nf-checkbox-group>{{checkedCities}}
        <nf-checkbox-object v-model="checkedCities" :list="cities" labelName="name"></nf-checkbox-object>
    </div>
</template>

<script>
    const cityOptions = [
        { name:"上海",value: 'sh' },
        { name:"北京",value: 'bj' },
        { name:"广州",value: 'gz' },
        { name:"深圳",value: 'sz' }
    ];
    export default {
        name: 'checkobx',
        data() {
            return {
                checkAll: false,
                checkedCities: [
                    { name:"上海",value: 'sh' },
                    { name:"北京",value: 'bj' }
                ],
                cities: cityOptions,
                isIndeterminate: true,
                lovingVue: [],
                cityList: ['sh','bj','gz','sz'],
                cityCheck: ['sh','bj']
            };
        }
    }
</script>

<style scoped>

</style>
