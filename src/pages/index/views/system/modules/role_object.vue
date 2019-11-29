<template>
    <div style="display:inline-block;">
        <i class="iconfont iconshujuduixiang" @click="onOpen" />
        <el-drawer title="对象权限" :visible.sync="open" direction="rtl" size="560px">
            <z-table ref="table" :columns="columns" :loadData="loadData" :isPage="false" :showSimple="true" :data="data" />
            <div class="bottom">
                <el-button :loading="loading" type="primary" @click="onOk" class="btn-confirm">确&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"system-modules-role-object",
    props:{
        role:{required:true,type:String}
    },
    computed:{
        ...mapState("common",["dictmap"])
    },
    data(){
        return {
            open:false,
            loading:false,
            columns:[],
            data:[]
        }
    },
    methods:{
        onOpen(){
            this.open = true
        },
        loadData(){
            this.data = []
            this.columns = [{title:"名称",key:"name"}]
            for (let o of this.dictmap["SYS0002"].values){
                this.columns.push({
                    title:o.name,
                    key:o.value,
                    align:'center',
                    type:'checkbox',
                })
            }

            for (let o of this.dictmap["SYS0003"].values){
                let obj = { }
                for (let oo of this.columns){
                    obj[oo.key] = true
                }
                obj.name = o.name
                obj.id = o.id
                this.data.push(obj)
            }
        },
        onOk(){
            console.log(this.data)
        }
    },
    created(){
    }
}
</script>
<style lang="less" scoped>
.btn-confirm{
    width:100%;
    border-radius:0px;
    position:absolute;
    bottom:0px;
    padding:10px 0;
    font-size:16px;
}
</style>