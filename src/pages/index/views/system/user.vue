<template>
  <div class="login-container">
    <z-table :column="column" />
  </div>
</template>

<script>

export default {
  name: 'user',
  data() {
    return {
      column: {
        action:'user',
        cols:[
          { title: "用户类型", key: "type", dtype: "string", drule: true },
          { title: "账户", key: "account", dtype: "string", drule: true },
          { title: "名称", key: "name", dtype: "string", drule: true},
          { title: "密码", key: "password", dtype: "password", drule: true},
        ]
      },
    };
  },
  created() {
   
  },
  mounted() {
    
  },
  destroyed() {
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>

</style>
