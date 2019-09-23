<template>
  <div class="dicts">
        <z-table class="item" :columns=" [
          { title: '字典编码', key: 'code' },
          { title: '名称', key: 'name' },
          { title: '排序', key: 'weight'}
        ]" 
        :total="total"
        :data="data"
        :loadData="loadData"
        :expand="expand" 
        @on-delete="deleteDict"
        />
       <z-table class="item" :columns=" [
          { title: '字典编码', key: 'code' },
          { title: '名称', key: 'name' },
          { title: '排序', key: 'weight'}
        ]" 
        :total="total"
        :data="data"
        :loadData="loadData"
        :expand="expand" 
        />
  </div>
</template>

<script>
export default {
  name: "system",
  data() {
    return {
      total:0,
      data:[],
      expand: {
        type: "array",
        key: "values",
        title: "字典项",
        action:'dictitem',
        extends:{code:"$id"},
        cols: [
          { title: "名称", key: "name", dtype:'string',drule:true }, 
          { title: "值", key: "value", dtype:'string',drule:true},
          { title: "排序", key: "weight", dtype: "number", drule: true }
        ]
      }
    };
  },
  methods:{
    loadData(param,fn){
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
      `,param).then(r=>{
        this.data = r.dicts.data
        this.total = r.dicts.total
      })
    },
    deleteDict(row){
      ap.$mutate(`
        mutation DictRemoves($ids:[String!]){
          dict_removes(ids:$ids)
        }
      `,{
        ids:[row.id]
      }).then(r=>{
        console.log(r)
      })
    }
  },
  created() {}
};
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
