<template>
    <div class="sidebar">
        <Introduce></Introduce>
        <p class="litter"></p>
        <Lately></Lately>
        <p class="litter"></p>
        <Hot></Hot>
        <p class="litter"></p>
        <Label></Label>
        <p class="litter"></p>
        <Total></Total>
    </div>
</template>

<script type="text/ecmascript-6">
    import Introduce from './Introduce.vue'
    import Lately from './Lately.vue'
    import Hot from './Hot.vue'
    import Label from './Label.vue'
    import Total from './Total.vue'
    export default{
        data(){
            return {}
        },
        components:{
            Introduce,Lately,Hot,Label,Total
        }
    }
</script>

<style scoped>
    .sidebar .litter{
        height:10px;
    }
</style>
