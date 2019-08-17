<template>
  <div style="padding:5px 0;">
    <div>
      <div class="filter-select" v-if="Filters.length > 0">
        <div class="flex">
          <el-select size="mini" style="width:95px" v-model="select" placeholder="请选择" @change="filterChange">
            <el-option v-for="item in Filters" :key="item.key" :label="item.title" :value="item.key"></el-option>
          </el-select>
          <div v-for="item in Filters" :key="item.key" v-show="select == item.key" style="display:flex;">
            <el-input style="width:180px" v-if="item.type == 'string'" size="mini" v-model="query[item.key]" :placeholder="'请输入'+item.title" />
            <el-input-number style="width:180px" v-show="select == item.key" v-if="item.type == 'number'" size="mini" v-model="query[item.key]"  :label="'请输入' + item.title" />
            <el-button size="mini" @click="filterSearch(item)" icon="el-icon-search"></el-button>
          </div>
          
        </div>
      </div>
      
      <div style="float:right;">
        <slot name="right-btn"></slot>
        <el-button-group>
          <el-button type="primary" size="mini" icon="el-icon-download" @click="ExportExcel"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-tickets"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click="Refresh"></el-button>
        </el-button-group>
      </div>
      <div>
        <el-tag v-for="item in tags" style="margin-right:5px;" :key="item.key" closable type="success">{{item.title + ":"+item.value}}</el-tag>
      </div>
    </div>
  </div>
</template>
<script>
import { columns } from "./actions";
import zDialog from "./dialog";
import { setInterval, clearInterval } from "timers";
import {export_json_to_excel} from '@/actions/Export2Excel'
export default {
  name: "z-filter",
  components: { zDialog },
  data() {
    return {
      select: "",
      selectType:"",
      query: {},
      tags:[],

      Columns: [],  // 直接读取父组件的数据
      Refresh:Function, // 直接读取父组件的数据
      Datas:[], // 直接读取父组件的数据
      Query:{},
    };
  },
  computed: {
    Filters(){
      let columns = this.$parent.column.cols
      let fis = []
      for(let i = 0; i < columns.length; i++){
        let obj = columns[i]
        if (obj.filter){
          fis.push({title:obj.title,key:obj.key,type:obj.filter})
        }
      }
      return  fis;
    }
  },
  methods: {
    filterSearch(item){
      this.Query[this.select] = {title:item.title,value:this.query[this.select]}
      
      let datas = []
      for(let k in this.Query){
        let obj = this.Query[k]
        datas.push({
          key:k,
          ...obj,
        })
      }
      this.tags = datas
    },
    filterChange(val){
      for(let i = 0; i < this.Filters.length; i++){
        let obj = this.Filters[i]
        if (obj.key == val){
          this.selectType = obj.type
        }
      }
    },

    ExportFormat(){
      let header = []
      let keys = []

      for(let i = 0; i < this.Columns.length;i++){
        let obj = this.Columns[i]
        header.push(obj.title)
        keys.push(obj.key)
      }

      let data = this.Datas.map(v =>
        keys.map(j => {
            return v[j];
        })
      );
      
      return {
        header,
        data
      }
    },
    ExportExcel(){
        const data = this.ExportFormat()
        export_json_to_excel({
          ...data,
          filename: this.$route.name,
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
    }
   
  },
  mounted(){
    if (this.Filters && this.Filters.length > 0){
      this.select = this.Filters[0].key
    }
  },
  created(){
    this.Refresh = this.$parent.Refresh
    this.Columns = this.$parent.Columns
    this.Datas = this.$parent.Datas
  }
};
</script>
<style lang="scss" scoped>
$radius:4px;
$border:#C0C4CC;

.filter-select{
  display: inline-block;
  

  .flex{
    display: flex;
    border:1px solid $border;
    border-radius: $radius;

    /deep/ .el-select--mini{
      .el-input--mini input{
        background-color: #42b983;
        color: #fff;
      }
      .el-icon-arrow-up{
        color: #fff;
      }
      
    }
    /deep/ .el-input--mini input{
      border:none;
      border-radius: 0;
      border-bottom-left-radius: $radius;
      border-top-left-radius: $radius;
    }
    /deep/ .el-button--mini{
      border:none;
      border-left: 1px solid $border;
      border-radius: 0;
      border-bottom-right-radius: $radius;
      border-top-right-radius: $radius;
    }
  }
}
</style>

