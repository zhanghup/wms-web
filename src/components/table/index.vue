<template>
  <div id="wrap">
    <z-filter class="filter" :column="column" :refresh="Refresh">
      <template slot="right-btn">
        <z-dialog :dialogAdd="_rowAdd" :column="column" type="primary" size="small" />
      </template>
    </z-filter>
    <el-table id="table" :height="tableHeight" :data="Datas" :highlight-current-row="true" style="width: 100%">
      <el-table-column v-if="expand" type="expand">
        <template slot-scope="props" style="background-color:#fbfbfb;">
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
          <el-card v-if="expand && expand.type == 'array'" class="box-card">
            <div slot="header" class="clearfix"><span>{{expand.title}}</span></div>
            <el-table :show-header="false" :data="props.row[expand.key]" border style="width: 100%">
              <el-table-column type="index" width="50"/>
              <el-table-column v-for="item in ExpandColumns" :key="item.key" :prop="item.key" :label="item.title" :width="item.width" />
            </el-table>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"/>
      <el-table-column v-for="item in Columns" :key="item.key" :label="item.title" :prop="item.key"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <z-dialog :column="expand" :extends="scope.row" type="primary" />
          <z-dialog type="primary" v-model="scope.row" :column="column" actionType="edit" label="编辑" />
          <el-button size="mini" type="danger" @click="_rowDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { columns, add, del, edit, list } from "./modules/actions";
import zFilter from "./modules/filters";
import zDialog from "./modules/dialog";
export default {
  name: "z-table",
  components: { zFilter, zDialog },
  props: {
    page: { type: Boolean, default: true },
    column: { type: Object, required: true },
    expand: Object // {type: 'array',key:'values',columns:[{title:"",key:""}]}
  },
  data() {
    return {
      tableHeight: 0,
      timer: {},
      dialogModel: {},
      addedData: [],
      datas: [],
      query: {
        page: {},
        param: {}
      }
    };
  },
  computed: {
    ExpandColumns() {
      if (this.expand) {
        return columns(this.expand.cols);
      }
    },
    Columns() {
      return columns(this.column.cols);
    },
    Datas() {
      return [...this.addedData, ...this.datas];
    },
  },
  methods: {
    Refresh() {
      this.addedData = [];
      this.loadData();
    },
    loadData() {
      let param;
      if (this.page) {
        param = { ...this.query.page, ...this.query.param };
      } else {
        param = { ...this.query.param };
      }
      list(this.column.action)(param).then(r => {
        if (this.page) {
          this.datas = r.datas;
          this.total = r.total;
        } else {
          this.datas = r;
        }
      });
    },
    _rowAdd(r) {
      this.addedData.push(r);
    },
    _rowDel(r) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        del(this.column.action)({ id: r.id }).then(r => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.loadData();
        });
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  created() {
    let self = this;
    this.loadData();
    this.timer = setInterval(function() {
      let height = document.getElementById("table").clientHeight;
      if (self.tableHeight != height) {
        self.tableHeight = height;
      }
    }, 20);
  }
};
</script>
<style lang="scss" scoped>
#wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  #table {
    flex-grow: 1;
  }
}
</style>

