<template>
  <div class="dicts">
        <z-table class="item" ref="table" :columns=" [
          { title: '字典编码', key: 'code' },
          { title: '名称', key: 'name' },
          { title: '排序', key: 'weight'}
        ]"
        :loadData="loadData"
        :editFields="formDict"
        :total="total"
        :data="data"
        :filters="[
            { title:'名称',key:'name',type:'string'},
            { title:'名称2',key:'name2',type:'number'},
        ]"
        @on-delete="deleteDict"
        @row-click="rowClick"
        @on-edit-confirm="editConfirm"
        >
        <z-form slot="btns-left" :fields="formDict" @on-confirm="onConfirm" width="480px"></z-form>

        </z-table>
       <z-table class="item" :columns=" [
          { title: '名称', key: 'name' },
          { title: '值', key: 'value' },
          { title: '扩展', key: 'expression'}
        ]"
        :total="totalItems"
        ref="table"
        :data="dataItems||[]"
        :loadData="loadData"
        >
        <z-form  width="480px" :fields="formDictItem" @on-confirm="onConfirmDictItem" slot="btns-left"></z-form>
       </z-table>

  </div>
</template>

<script>
export default {
  name: 'system',
  data () {
    return {
      total: 0,
      data: [],

      totalItems: 0,
      dataItems: [],
      formDict: [
        {type: 'input:text', title: '字典编码', key: 'code', span: 24},
        {type: 'input:text', title: '字典名', key: 'name', span: 24},
        {type: 'input:textarea', title: '备注', key: 'remark', span: 24},
        {type: 'switch', title: '状态', key: 'status', span: 24, default: 1},
        {type: 'input:number', title: '排序', key: 'weight', span: 24, default: 1}
      ],
      formDictItem: [
        {type: 'input:text', title: '字典编码', key: 'code', span: 24},
        {type: 'input:text', title: '字典名', key: 'name', span: 24},
        {type: 'input:textarea', title: '备注', key: 'remark', span: 24},
        {type: 'switch', title: '状态', key: 'status', span: 24, default: 1},
        {type: 'input:number', title: '排序', key: 'weight', span: 24, default: 1}
      ]

    }
  },
  methods: {
    loadData (param, fn) {
      ap.$query(`
        query Dicts($query:QDict!){
          dicts(query:$query){
            total
            data{
              id
              code
              name
              remark
              created
              updated
              weight
              status
              values{
                id
                code
                name
                value
                extension
                created
                updated
                weight
                status
              }
            }
            }
        }
      `, param).then(r => {
        this.data = r.dicts.data
        this.total = r.dicts.total
      })
    },
    rowClick (row) {
      this.dataItems = row.values
    },
    onConfirm (input) {
      ap.$mutate(`
        mutation DictAdd($input:NewDict!){
          dict_create(input:$input){id}
        }
      `, {input}).then(r => {
        console.log(r)
        this.$refs.table.LoadData()
      })
    },
    editConfirm (id, input) {
      ap.$mutate(`
        mutation DictEdit($input:UpdDict!){
          dict_update(id:"${id}",input:$input)
        }
      `, {input}).then(r => {
        this.$refs.table.LoadData()
      })
    },
    deleteDict (row, fn) {
      ap.$mutate(`
        mutation DictRemoves($ids:[String!]){
          dict_removes(ids:$ids)
        }
      `, {
        ids: [row.id]
      }).then(r => {
        if (fn) {
          fn()
        }
      })
    },
    onConfirmDictItem (input) {
      ap.$mutate(`
        mutation DictItemCreate($input:NewDictItem!){
          dict_item_create(input:$input)
        }
      `, {input}).then(r => {
        this.$refs.table.LoadData()
      })
    },
    confirmDictitem (row, fn) {

    }
  },
  created () {}
}
</script>
<style lang="scss" scoped>
.dicts{
  width: 100%;
  height:100%;
  display: flex;
  .item{
    flex:1;
    padding:0 5px;
  }
}
</style>
