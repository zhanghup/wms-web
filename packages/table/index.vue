<template>
  <div class="wrap">
    <div class="filter">
      <div class="ff" v-if="showFilter && !showSimple">
        <z-filter :filters="filters" />
      </div>
      <div class="btns" v-if="showBottonTools && !showSimple">
        <slot name="btns-left"></slot>
        <el-dropdown v-if="showExport" size="small" @command="Export">
          <el-tooltip class="item" effect="dark" content="导出Excel" placement="top">
            <el-button size="mini" icon="el-icon-download" circle />
          </el-tooltip>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="page-current">本页</el-dropdown-item>
            <el-dropdown-item command="page-all">所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip v-if="showReset" class="item" effect="dark" content="重置" placement="top">
          <el-button @click="Refresh" size="mini" icon="el-icon-refresh-left" circle></el-button>
        </el-tooltip>
        <el-tooltip v-if="showColumnSet" class="item" effect="dark" content="列设置" placement="top">
          <el-button @click="Refresh" size="mini" icon="el-icon-s-tools" circle></el-button>
        </el-tooltip>
        <el-tooltip v-if="showRefresh" class="item" effect="dark" content="刷新" placement="top">
          <el-button @click="Refresh" size="mini" icon="el-icon-refresh" circle></el-button>
        </el-tooltip>
        <slot name="btns-right"></slot>
      </div>
    </div>
    <el-table ref="table" class="table" :height="tableHeight" :data="data" :highlight-current-row="true" @row-click="row => $emit('row-click',row)" style="width: 100%">

      <column v-for="item in Columns" :key="item.key" :col="item" @change="dataChange" />

      <el-table-column v-if="showOperate && !showSimple" label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <slot name="column-edit"></slot>
          <z-form v-if="showEdit" slot="btns-left" :type="'edit'" :form="editForm" :fields="editFields" @on-confirm="editConfirm" :beforeOpen="onEdit(scope.row)" width="480px">
            <i class="el-icon-edit" style="cursor:pointer;color:blue;margin-right:4px;"></i>
          </z-form>
          <i v-if="showDelete" class="el-icon-delete" style="cursor:pointer;color:red;" @click="onDelete([scope.row])"></i>
        </template>
      </el-table-column>
      <el-table-column v-for="item in ColumnActions" :key="item.key" :fixed="item.fixed" :align="item.align" :label="item.title" :width="item.width||'120px'">
        <template slot-scope="scope">
          <slot :name="item.key" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="isPage" @size-change="changeSize" @current-change="changePage" :current-page="tablePage.index" :page-sizes="[50, 100, 250, 500]" :page-size="tablePage.size" layout="total, sizes, prev, pager, next, jumper" :total="total" style="text-align:right;background-color:#fff;" />
  </div>
</template>
<script>
import { mapState } from "Vuex";
import zFilter from "../filter";
import zForm from "../form";
import excel from "../excel/excel.js";
import column from "./modules/column";
export default {
  name: "z-table",
  components: { zFilter, zForm, column },
  props: {
    showFilter: { type: Boolean, default: true },
    showBottonTools: { type: Boolean, default: true },
    showExport: { type: Boolean, default: true },
    showColumnSet: { type: Boolean, default: true },
    showRefresh: { type: Boolean, default: true },
    showReset: { type: Boolean, default: true },
    showOperate: { type: Boolean, default: true },
    showEdit: { type: Boolean, default: true },
    showDelete: { type: Boolean, default: true },
    showColumnIndex: { type: Boolean, default: true },
    showSimple: { type: Boolean, default: false }, // 简单构建模式

    loadData: { type: Function, required: true },
    data: Array,
    total: Number,
    isPage: { type: Boolean, default: true },
    columns: { type: Array, required: true },
    filters: { type: Array, required: false },

    editFields: Array
  },
  computed: {
    ...mapState("common", ["dictmap"])
  },
  data() {
    return {
      // 本地做一个数据缓存,必须有一个唯一主键id
      datalist: {},

      // 系统配置
      tableHeight: 0,
      timer: {},

      // 数据配置
      editForm: {},
      tablePage: { index: 1, size: 50, count: true },
      tableQuery: {}
    };
  },
  computed: {
    Columns() {
      return this.columns.filter(r => r.type != "custom");
    },
    ColumnActions() {
      return this.columns.filter(r => r.type == "custom");
    }
  },

  methods: {
    LoadData() {
      let param;
      if (this.isPage) {
        param = { ...this.tablePage, ...this.tableQuery };
      } else {
        param = { ...this.tableQuery };
      }
      this.loadData(param, this.loadDataSuccess);
    },
    LoadChange() {
      let result = [];
      for (let o of this.data) {
        let oo = this.datalist[o.id];
        if (oo) {
          result.push(oo);
        } else {
          result.push(o);
        }
      }
      return result;
    },
    dataChange(row, col, value) {
      this.datalist[row.id] = row;
    },
    Refresh() {
      this.LoadData();
    },
    Export(type) {
      function fn() {
        excel({
          columns: [],
          header: [],
          data: [],
          sheetName: "",
          fileName: ""
        });
      }
      switch (type) {
        case "page-current":
          fn();
        case "page-all":
      }
    },
    changePage(i) {
      this.tablePage.index = i;
      this.LoadData();
    },
    changeSize(i) {
      this.tablePage.size = i;
      this.LoadData();
    },

    onEdit(row) {
      return _ => {
        this.editForm = row;
        return row;
      };
    },
    editConfirm(input) {
      this.$emit("on-edit-confirm", this.editForm.id, input);
    },
    onDelete(rows) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("on-delete", rows);
          setTimeout(() => {
            this.LoadData();
          }, 300);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
    this.LoadData();
    this.timer = setInterval(function() {
      let height = self.$refs.table.$el.clientHeight;
      if (self.tableHeight !== height) {
        self.tableHeight = height;
      }
    }, 20);
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter {
    display: flex;
    padding-bottom: 5px;
    .ff {
      flex: 1;
    }
    .btns {
    }
  }
  .table {
    flex-grow: 1;
    /deep/ .el-table__row.current-row > td {
      background-color: #ddfd;
    }
  }
}
.el-button--mini.is-circle {
  margin-left: 0px;
}
</style>
