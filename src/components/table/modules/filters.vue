<template>
  <div style="padding:5px 0;">
    <el-input size="small" placeholder="请输入内容" style="width:400px;">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>

    <div style="float:right;">
      <slot name="right-btn"></slot>
      <el-button-group>
        <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
        <el-button type="primary" size="mini" icon="el-icon-tickets"></el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="refresh"></el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
import { columns } from "./actions";
import zDialog from "./dialog";
import { setInterval, clearInterval } from "timers";
export default {
  name: "z-filter",
  components: { zDialog },
  props: {
    column: { type: Object, required: true },
    refresh: { type: Function, required: true }
    // datas: { type: Array, required: true }
  },
  data() {
    return {
      select: "",
      query: {}
    };
  },
  computed: {},
  methods: {}
};
</script>
