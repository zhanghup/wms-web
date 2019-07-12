<template>
  <div>
    <z-table :column="column" :list="list" :page="true" />
  </div>
</template>

<script>

export default {
  name: 'system',
  data() {
    return {
      list:[{id:"1"}],
      column: {
        cols:[
          { title: "字典编码", key: "id", dtype: "string" },
          { title: "名称", key: "name", dtype: "string", drule: true },
          { title: "排序", key: "weight", dtype: "number", drule: true }
        ]
      }
    };
  },
}
</script>
