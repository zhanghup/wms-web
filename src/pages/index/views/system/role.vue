<template>
  <z-table ref="table" :columns="[
      { title: '名称', key: 'name', width: 120 },
      { title: '描述', key: 'desc' },
      {
        title: '操作2',
        key: 'action',
        type: 'custom',
        fixed: 'right',
        align: 'center'
      }
    ]" :loadData="loadData" :total="total" :data="data" :editFields="formRole" @on-edit-confirm="onEdit" @on-delete="onDelete">
    <z-form width="480px" :fields="formRole" @on-confirm="onConfirmRole" slot="btns-left"></z-form>
    <div slot="action">
      <role-menu />
      <i class="iconfont iconshujuduixiang" />
    </div>
  </z-table>
</template>
<script>
import RoleMenu from "./modules/role_menu";
export default {
  name: "system-role",
  components: { RoleMenu },
  data() {
    return {
      formRole: [
        { title: "角色名称", key: "name", type: "input", span: 24, role: true },
        { title: "描述", key: "desc", type: "input", span: 24, role: true }
      ],

      total: 0,
      data: []
    };
  },
  methods: {
    loadData(param, fn) {
      this.$query(
        `
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
      `,
        param
      ).then(r => {
        this.total = r.roles.total;
        this.data = r.roles.data;
      });
    },
    onConfirmRole(input) {
      this.$mutate(
        `
        mutation RoleCreate($input:NewRole!){
          role_create(input:$input){id}
        }
      `,
        { input }
      ).then(r => {
        this.$refs.table.LoadData();
      });
    },
    onEdit(id, input) {
      this.$mutate(
        `
        mutation Edit($input:UpdRole!){
          role_update(id:"${id}",input:$input)
        }
      `,
        { input }
      ).then(r => {
        this.$refs.table.LoadData();
      });
    },
    onDelete(rows) {
      this.$mutate(
        `
        mutation Delete($ids:[String!]){
          role_removes(ids:$ids)
        }
      `,
        {
          ids: rows.map(r => r.id)
        }
      ).then(r => {
        this.$refs.table.LoadData();
      });
    }
  }
};
</script>
