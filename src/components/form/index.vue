<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'z-form',
  props:{
    columns:Array,
    form: { required:true,Type: Object },
    rules: Object,
  },
  model:{
    prop:"form",
    event:"form-event"
  },
   data() {
      return {
      }
   }
}
</script>
