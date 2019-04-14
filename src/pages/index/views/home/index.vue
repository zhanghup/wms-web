<template>
  <div class="login-container">
   ddddd
  </div>
</template>

<script>

export default {
  name: 'home',
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
