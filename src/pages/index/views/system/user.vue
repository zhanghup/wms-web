<template>
  <div class="login-container">
   <div v-for="i in test">
     <div>用户管理{{i}}</div>
   </div>
  </div>
</template>

<script>

export default {
  name: 'user',
  data() {
      return {
        test:[]
      };
    },
  watch: {
    $route: {
      
    }
  },
  created() {
    for (var i = 0; i < 1000; i++){
      this.test.push(i)
    }
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
