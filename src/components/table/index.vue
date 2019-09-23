<template>
  <div class="wrap">
    <div  class="filter">
      <div class="ff"></div>
      <div class="btns">
        <el-button-group>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-share"></el-button>
          <el-button type="primary" @click="Refresh" size="mini" icon="el-icon-refresh"></el-button>
        </el-button-group>
      </div>
    </div>
    <!-- <z-filter :column="column" :refresh="Refresh">
      <template slot="right-btn">
        <z-dialog :dialogAdd="_rowAdd" :column="column" type="primary" size="small" />
      </template>
    </z-filter> -->
    <el-table ref="table" class="table" :height="tableHeight" :data="data" :highlight-current-row="true" style="width: 100%">
      <!-- <el-table-column v-if="expand" type="expand">
        <template slot-scope="props" style="background-color:#fbfbfb;" v-if="props.row[expand.key] && props.row[expand.key].length > 0"> -->
          <!--
            expand:{
              type:'array',
              title:'标题',
              key:'values',
              colunms:[
                {title:'列标题',key:'关联字段'},
              ]
            }
          -->
          <!-- <el-card v-if="expand && expand.type == 'array'" class="box-card">
            <div slot="header" class="clearfix"><span>{{expand.title}}</span></div>
            <el-table :show-header="false" :data="props.row[expand.key]" border style="width: 100%">
              <el-table-column type="index" width="50"/>
              <el-table-column v-for="item in ExpandColumns" :key="item.key" :prop="item.key" :label="item.title" :width="item.width" />
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <z-dialog type="primary" v-model="scope.row" :column="expand" actionType="edit" label="编辑" />
                  <el-button size="mini" type="danger" @click="_expandDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </template>
      </el-table-column> -->
      <el-table-column type="index" width="50"/>
      <el-table-column v-for="item in columns" :key="item.key" :label="item.title" >
        <template slot-scope="scope">
          <div>{{ GetValue(scope,item)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <z-dialog v-if="expand" :column="expand" :extends="scope.row" type="primary" />
          <z-dialog type="primary" v-model="scope.row" :column="column" actionType="edit" label="编辑" /> -->
          <i class="el-icon-delete" style="cursor:pointer;color:red;" @click="onDelete(scope.row)"></i>
          <!-- <el-button size="mini" type="danger">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="isPage"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="tablePage.index"
      :page-sizes="[50, 100, 250, 500]"
      :page-size="tablePage.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" style="text-align:right;background-color:#fff;" />
  </div>
</template>
<script>
// import { columns, add, del, edit, list } from "./modules/actions";
// import zFilter from "./modules/filters";
// import zDialog from "./modules/dialog";
export default {
  name: "z-table",
  // components: { zFilter, zDialog },
  props: {
    loadData:{ type: Function, required: true },
    data:Array,
    total: Number,
    isPage: { type: Boolean, default: true },
    columns: { type: Array, required: true },
    expand: { type: Object, required: false },
  },
  data() {
    return {
      // 系统配置
      tableHeight: 0,
      timer: {},

      // 数据配置
      addedData: [],
      datas: [],
      tablePage:{index:1,size:50,count:true},
      tableQuery:{}
    };
  },
  computed: {
   
  },
  methods: {
    GetValue({$index,col,row},column){
      return ap.GetValue(column.key,row)
    },
    Refresh() {
      console.log("-------")
      this.addedData = [];
      this.LoadData();
    },
    changePage(i){
      this.tablePage.index = i
      this.LoadData()
    },
    changeSize(i){
      this.tablePage.size = i
      this.LoadData()
    },
    LoadData() {
      let param;
      if (this.isPage) {
        param = { ...this.tablePage, ...this.tableQuery };
      } else {
        param = { ...this.tableQuery };
      }
      this.loadData(param)
    },
    onDelete(row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit("on-delete",row)
        setTimeout(()=>{
          this.LoadData()
        },1000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });         
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  created() {
    let self = this;
    this.LoadData();
    this.timer = setInterval(function() {
      let height = self.$refs.table.$el.clientHeight;
      if (self.tableHeight != height) {
        self.tableHeight = height;
      }
    }, 20);
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter{
    display: flex;
    padding-bottom: 5px;
    .ff{
      flex:1
    }
    .btns{

    }
  }
  .table {
    flex-grow: 1;
  }
}
</style>

