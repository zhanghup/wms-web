<template>
    <z-table ref="table"
      :columns="[
        {title:'名称',key:'name',width:120},
        {title:'描述',key:'desc'},
        {title:'操作2',key:'action',type:'custom',fixed:'right',align:'center'}
      ]"
      :loadData="loadData"
      :total="total"
      :data="data"
    >
      <div slot="action"><i class="iconfount iconshujuduixiang"></i></div>
    </z-table>
</template>
<script>
export default {
  name:"system-role",
  data(){
    return {
      total:0,
      data:[]
    }
  },
  methods:{
    loadData(param,fn){
      ap.$query(`
        query Roles($query:QRole!){
          roles(query:$query){
            total
            data{
              id
              name
              desc
              created
              updated
              weight
              status
            }
          }
        }
      `,param).then(r=>{
        this.total = r.roles.total
        this.data = r.roles.data
      })
    }
  }
}
</script>