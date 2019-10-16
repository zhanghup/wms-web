<template>
  <div class="zform">
    <span @click="onOpen">
      <slot>
        <el-button :size="btnSize" :type="btnType"  icon="el-icon-plus">
          {{type | Ftype}}
        </el-button>
      </slot>
    </span>
        <el-drawer
      class="zform-drawer"
      :append-to-body="true"
      :destroy-on-close="true"
      :size="width"
      :visible.sync="showForm"
      :title="type|Ftitle(title)"
      >
      <div class="zform-body">
        <el-form ref="form" :model="form" :label-width="fLabelWidth">
          <el-col v-for="item in fields" :key="item.key" :span="item.span || 12">
            <el-form-item :label="item.title">
              <el-input v-if="formType(item.type) === 'input'" :type="formKind(item.type)" v-model="obj[item.field||item.key]"></el-input>
              <!-- radio -->
              <el-radio-group v-if="formType(item.type) === 'radio'" v-model="obj[item.field||item.key]">
                <el-radio v-for="o in item.items||[]" :key="o.title" :label="o.value" :disabled="o.disabled">{{o.title}}</el-radio>
              </el-radio-group>
              <el-switch v-if="formType(item.type) === 'switch'" v-model="obj[item.field||item.key]"></el-switch>

            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="zform-footer">
        <el-button-group>
          <el-button @click="onCancel">取消</el-button>
          <el-button @click="onConfirm" type="primary">确定</el-button>
        </el-button-group>
      </div>
      </el-drawer>
  </div>
</template>
<script>

export default {
  name: 'z-form',
  props: {
    width: {type: String, default: '720px'},

    btnIcon: {type: String, default: 'el-icon-plus'},
    btnType: {type: String, default: 'primary'},
    btnSize: {type: String, default: 'mini'},

    fLabelWidth: {type: String, default: '100px'},

    title: String,
    type: {type: String, default: 'add'},
    fields: Array,

    beforeOpen: Function
  },
  filters: {
    Ftype (value) {
      switch (value) {
        case 'add': return '新增'
        case 'edit': return '编辑'
      }
    },
    Ftitle (value, title) {
      if (title) return title
      switch (value) {
        case 'add': return '新增'
        case 'edit': return '编辑'
      }
    }
  },
  data () {
    return {
      showForm: false,

      // 返回的form对象
      form: {},
      obj: {}
    }
  },
  methods: {
    onOpen () {
      if (this.beforeOpen) {
        this.form = this.beforeOpen()
      }
      this.initForm()
      this.showForm = true
    },
    formType (item, kind) {
      let [ty] = item.type.split(':')
      return ty
    },
    formKind (val) {
      let [ty, kind] = val.split(':')
      switch (ty) {
        case 'input':return kind || 'text'
        default:
          return kind
      }
    },
    onConfirm () {
      this.$emit('on-confirm', this.getForm())
      setTimeout(_ => {
        this.showForm = false
      }, 100)
    },
    onCancel () {
      this.showForm = false
    },
    getForm () {
      let o = {}
      for (let k in this.obj) {
        let fd = this.fields.find(r => r.key === k)
        if (!fd) continue
        let [ty] = fd.type.split(':')
        console.log(ty)
        switch (ty) {
          case 'switch':this.obj[k] ? 1 : 0; break
          default:
            o[k] = this.obj[k]
        }
      }
      return o
    },
    initForm () {
      if (!this.fields) return
      let obj = {}
      for (let o of this.fields) {
        let [ty] = o.type.split(':')
        let val = o.default
        let v2 = ap.GetValue(o.key, this.form)
        if (v2 != undefined) {
          val = v2
        }

        switch (ty) {
          case 'switch':obj[o.field || o.key] = !!val; break
          default:
            obj[o.field || o.key] = val
        }
      }

      this.obj = obj
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scope>
.zform{
  display:inline-block;

  }
</style>
<style lang="scss">
  .zform-drawer{
    .el-drawer__body{
      display:flex;
      flex-direction:column;
    }
  }
  .zform-body{
    padding-right:20px;
    flex:1;
  }
  .zform-footer .el-button-group{
    display:flex;
    button{
      flex:1;
      margin:0px;
      border-radius:0px;
      padding:12px 0;
      font-size:14px;
    }
  }
</style>
