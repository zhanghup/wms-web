<template>
  <el-table-column :label="col.title" :width="col.width || ''" :align="col.align || 'left'">
    <template slot-scope="{$index,column,row}">
      <slot :$index="$index" :column="column" :row="row">
        <div v-if="type === 'default'">{{ GetValue(row)}}</div>
        <el-checkbox v-if="type === 'checkbox'" :value="row[col.key]" @change="v => NewValue(col,row,v)" />
        <render v-if="type === 'render'" :render="col.render" :col="col" :row="row" :level="1" />
      </slot>
    </template>
  </el-table-column>
</template>
<script>
import render from "./column_render";
export default {
  name: "component-table-modules-column",
  components: { render },
  props: {
    col: { required: true, type: Object }
  },
  data() {
    return {
      type: null
    };
  },
  methods: {
    NewValue(col, row, v) {
      row[col.key] = v;
      this.$emit("change", row, col, v);
    },
    GetValue(row) {
      return this.$valf(this.col.key, this.col.format, row);
    },
    InitType() {
      if (this.col.type) {
        this.type = this.col.type;
        return;
      }

      if (this.col.render) {
        this.type = "render";
        return;
      }

      this.type = "default";
    }
  },
  created() {
    this.InitType();
  }
};
</script>