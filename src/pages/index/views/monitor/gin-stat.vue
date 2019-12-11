<template>
    <div class="gin-stat">

    </div>
</template>
<script>
export default {
    name:"views-monitor-gin-stat",
    data(){
        return {

        }
    },
    methods:{
        loadData(){
            this.$query(`
                query Datas{
                    stat
                }
            `)
        }
    },
    created(){
        this.loadData()
    }
}
</script>
<style scoped>
.gin-stat{
    background-image: url(gin-stat/bg.jpg);
    background-repeat:no-repeat;
    background-size:100% 100%;
}
</style>