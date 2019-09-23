<template>
  <div class="login-container">
    <z-table :columns="columns" :data="data" :total="total" :loadData="loadData" />
  </div>
</template>

<script>

export default {
  name: 'user',
  data() {
    return {
      columns: [
          { title: "用户类型", key: "type" },
          { title: "账户", key: "account" },
          { title: "名称", key: "name"},
          { title: "密码", key: "password"},
      ],
      data:[],
      total:0,
    };
  },
  methods: {
      loadData(param,fn){
        ap.$query(`
          query Users($query:QUser!){
            users(query:$query){
              total
              data{
                id
                type
                account
                password
                name
                avatar
                i_card
                birth
                sex
                mobile
                admin
                created
                updated
                weight
                status
              }
            }
          }
        `,param).then(r=>{
          this.data = r.users.data
          this.total = r.users.total
        }).catch(r=>{

        })
      }
  },
  created() {
   
  },
  mounted() {
    
  },
  destroyed() {
  },
  
}
</script>
<style lang="scss" scoped>

</style>

</style>
