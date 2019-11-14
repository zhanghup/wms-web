<template>
  <div class="login-container">
    <z-table
      ref="table"
      :columns="columns"
      :data="data"
      :total="total"
      :loadData="loadData"
      :editFields="formUser"
      @on-delete="userDelete"
      @on-edit-confirm="userEdit"
      >

      <z-form
        slot="btns-left"
        width="680px"
        :fields="formUser"
        @on-confirm="onConfirm"/>
    </z-table>
  </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    var self = this
    return {
      columns: [
        { title: '用户类型', width: 80, key: 'type', format: 'dict:D0001' },
        { title: '名称', width: 120, key: 'name' },
        { title: '账户', width: 120, key: 'account' },
        { title: '手机号', width: 120, key: 'mobile' },
        { title: '排序', key: 'weight' }
      ],
      formUser: [
        {type: 'dict:D0001', title: '用户类型', key: 'type', span: 12},
        {type: 'input:text', title: '姓名', key: 'name', span: 12},
        {type: 'input:text', title: '用户名', key: 'account', span: 12},
        {type: 'input:password', title: '密码', key: 'password', span: 12},
        {type: 'input:text', title: '手机号', key: 'mobile', span: 12},
        {type: 'switch', title: '管理员', key: 'admin', span: 12, default: 0},
        {type: 'switch', title: '状态', key: 'status', span: 24, default: 1},
        {type: 'input:number', title: '排序', key: 'weight', span: 12, default: _ => self.total * 100}
      ],

      data: [],
      total: 0
    }
  },
  methods: {
    loadData (param, fn) {
      this.$query(`
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
        `, param).then(r => {
        this.data = r.users.data
        this.total = r.users.total
      }).catch(r => {

      })
    },
    onConfirm (input) {
      this.$mutate(`
        mutation UserCreate($input:NewUser!){
          user_create(input:$input){
            id
          }
        }
      `, {input}).then(r => {
        this.$refs.table.LoadData()
      })
    },
    userEdit(id,input){
      this.$mutate(`
        mutation UserUpdate($input:UpdUser!){
          user_update(id:"${id}",input:$input)
        }
      `, {input}).then(r => {
        this.$refs.table.LoadData()
      })
    },
    userDelete (rows, fn) {
      this.$mutate(`
        mutation UserRemoves($ids:[String!]){
          user_removes(ids:$ids)
        }
      `, {
        ids: rows.map(r => r.id)
      }).then(r => {
        this.$refs.table.LoadData()
      })
    }

  },
  created () {

  },
  mounted () {

  },
  destroyed () {
  }

}
</script>
<style lang="scss" scoped>

</style>

</style>
