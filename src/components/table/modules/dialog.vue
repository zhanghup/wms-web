<template>
  <div style="display:inline-block;">
    <el-button :type="type" @click="btn_click" size="mini">{{label||'新增'}}</el-button>

    <div v-if="dialogVisible">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="360">
        <el-form label-position="right" ref="form" label-width="80px" :rules="Rules" :model="model" >
          <el-form-item v-for="item in Columns" :key="item.key" :label="item.title" :prop="item.key">
            <el-input v-if="item.dtype == 'string'" size="small" v-model="model[item.key]"></el-input>
            <el-input v-if="item.dtype == 'number'" type="number" size="small" v-model="model[item.key]" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  dialog,
  dialogTypeFormat,
  dialogRules,
  add,
  edit,
  del
} from "./actions";
export default {
  name: "z-dialog",
  props: {
    type: String,
    label: String,
    extends:{ type: Object, default: ()=>{} },
    actionType: { type: String, default: "add" },
    column: { type: Object, required: true },
    inputValue: { type: Object,default: () =>{return {}} },
    rules: Array,

    dialogAdd: Function,
    onclick:Function,
  },
  data() {
    return {
      dialogVisible: false,
      model:{},
    };
  },
  model: {
    prop: "inputValue",
    event: "inputEvent"
  },
  computed: {
    Columns() {
      return dialog(this.column.cols);
    },
    Rules() {
      return dialogRules(this.column.cols);
    }
  },
  methods: {
    btn_click(){
      if(this.actionType == "add"){
        this.model = {}
      }else{
        this.model = {...this.inputValue}
      }
      if (this.onclick){
        this.onclick()
      }
      this.dialogVisible = true
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        this.$emit("inputEvent",this.model)
        if (this.actionType == "add") {
          this.add();
        } else if (this.actionType == "edit") {
          this.edit();
        }
      });
    },
    add() {
      let ext = {}
      for(let k in this.column.extends){
        let col = this.column.extends[k]
        if (col.indexOf("$") == 0){
          ext[k] = this.extends[col.substr(1)]
        }
      }
      add(this.column.action)(
        
        dialogTypeFormat(this.column.cols, this.model,ext)
      ).then(r => {
        this.dialogVisible = false;
        if (this.dialogAdd) {
          this.dialogAdd(r);
        }
      });
    },
    edit() {
      let ext = {}
      for(let k in this.column.extends){
        let col = this.column.extends[k]
        if (col.indexOf("$") == 0){
          ext[k] = this.extends[col.substr(1)]
        }
      }
      edit(this.column.action)(
        dialogTypeFormat(this.column.cols, this.model,ext)
      ).then(r => {
        this.dialogVisible = false;
        if (this.dialogEdit) {
          this.dialogEdit(r);
        }
      });
    }
  },

  created() {}
};
</script>
