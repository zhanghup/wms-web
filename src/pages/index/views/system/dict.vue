<template>
  <div class="content">
    <z-table :column="column" :page="false" :expand="expand" />
  </div>
</template>

<script>
export default {
  name: "system",
  data() {
    return {
      column: {
        action:'dict',
        cols:[
          { title: "字典编码", key: "id", dtype: "string" },
          { title: "名称", key: "name", dtype: "string", drule: true },
          { title: "排序", key: "weight", dtype: "number", drule: true }
        ]
      },
      expand: {
        type: "array",
        key: "values",
        title: "字典项",
        action:'dictitem',
        extends:{code:"$id"},
        cols: [
          { title: "名称", key: "name", dtype:'string',drule:true }, 
          { title: "值", key: "value", dtype:'string',drule:true}
        ]
      }
    };
  },

  created() {}
};
</script>
