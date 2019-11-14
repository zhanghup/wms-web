<template>
  <div class="dicts">
        <z-table class="item" ref="table" :columns=" [
          { title: '字典编码', key: 'code' },
          { title: '名称', key: 'name' },
          { title: '排序', key: 'weight'}
        ]"
        :loadData="loadData"
        :showOperate="false"
        :total="total"
        :data="data"
        :filters="[
            { title:'名称',key:'name',type:'string'},
            { title:'名称2',key:'name2',type:'number'},
        ]"
        @row-click="dictRowClick"
        />

       <z-table class="item" ref="table"
        :columns=" [
          { title: '名称', key: 'name' },
          { title: '值', key: 'value' },
          { title: '扩展', key: 'extension'}
        ]"
        :isPage="false"
        :total="totalItems"
        :editFields="formDictItem"
        :data="dataItems||[]"
        :loadData="dictRefresh"
        @on-edit-confirm="dictItemEditConfirm"
        @on-delete="dictItemDelete"
        >
        <z-form  width="480px" :fields="formDictItem" @on-confirm="onConfirmDictItem" :beforeOpen="beforeOpenItem" slot="btns-left"></z-form>
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
      formDictItem: [
        {type: 'input:text', title: '字典编码', key: 'code', span: 24, action: 'add'},
        {type: 'input:text', title: '字典名', key: 'name', span: 24},
        {type: 'input:text', title: '字典值', key: 'value', span: 24},
        {type: 'input:text', title: '扩展', key: 'extension', span: 24},
        {type: 'switch', title: '状态', key: 'status', span: 24, default: 1},
        {type: 'input:number', title: '排序', key: 'weight', span: 24, default: 1}
      ],
      currentDict: null

    }
  },
  methods: {
    loadData (param, fn) {
      this.$query(`
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
    dictRowClick (row) {
      this.currentDict = row
      this.dictRefresh()
    },
    dictRefresh () {
      if (!this.currentDict) return
      this.$query(`
        query Dicts{
          dict(id:"${this.currentDict.id}"){
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
      `).then(r => {
        this.dataItems = r.dict.values
        this.$store.dispatch('common/initDict')
      })
    },
    dictItemEditConfirm (id, input) {
      this.$mutate(`
        mutation DictItemEdit($input:UpdDictItem!){
          dict_item_update(id:"${id}",input:$input)
        }
      `, {input}).then(r => {
        this.dictRefresh()
      })
    },
    onConfirmDictItem (input) {
      this.$mutate(`
        mutation DictItemCreate($input:NewDictItem!){
          dict_item_create(input:$input){
            id
          }
        }
      `, {input}).then(r => {
        this.dictRefresh()
      })
    },
    beforeOpenItem () {
      if (!this.currentDict) {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        })
        return false
      }
      return {
        code: this.currentDict.code
      }
    },
    dictItemDelete (rows, fn) {
      this.$mutate(`
        mutation DictItemRemoves($ids:[String!]){
          dict_item_removes(ids:$ids)
        }
      `, {
        ids: rows.map(r => r.id)
      }).then(r => {
        this.dictRefresh()
      })
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
