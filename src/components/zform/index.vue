<template>
    <el-form ref="form" v-if="fields && fields.length > 0" :model="formObj" :rules="rules" :label-width="labelWidth|| '100px'">
      <el-form-item v-for="f in fields" :key="f.key" :label="!f.labelHide?f.title:''" :prop="f.key">
        <span v-if="f.icon" class="icon iconfont" :class="f.icon"></span>
        <!-- string -->
        <el-input v-if="f.type == 'input'" v-model="formObj[f.key]" :placeholder="f.placeholder || `请输入${f.title}`"></el-input>
        <!-- number -->
        <el-input v-if="f.type == 'number'" type="number" v-model="formObj[f.key]" :placeholder="f.placeholder || `请输入${f.title}`"></el-input>
        <!-- password -->
        <el-input v-if="f.type == 'password'" type="password" v-model="formObj[f.key]" :placeholder="f.placeholder || `请输入${f.title}`"></el-input>
        <!-- radio -->
        <el-radio-group v-if="f.type == 'radio'" v-model="formObj[f.key]">
            <el-radio v-for="o in item.ditems" :key="o.name" :label="o.value" :disabled="o.disabled">{{o.name}}</el-radio>
        </el-radio-group>
        <!-- checkbox -->
        <el-checkbox-group v-if="f.type == 'checkbox'" v-model="formObj[f.key]">
            <el-checkbox  v-for="o in item.ditems" :key="o.name" :label="o.value" :disabled="o.disabled">{{o.name}}</el-checkbox>
        </el-checkbox-group>
        <!-- select -->
        <el-select v-if="f.type == 'select'" v-model="formObj[f.key]" :placeholder="'请选择'+item.title">
            <el-option v-for="o in item.ditems" :key="o.name" :label="o.name" :value="o.value" :disabled="o.disabled" />
        </el-select>
        <!-- switch -->
        <el-switch v-if="f.type == 'switch'" v-model="formObj[f.key]" active-color="#13ce66" inactive-color="#ff4949" />
        <!-- slider -->
        <el-slider v-if="f.type == 'slider'" v-model="formObj[f.key]"></el-slider>
        <!-- date -->
        <el-date-picker v-if="f.type == 'date'" v-model="formObj[f.key]" :type="dkind||'date'" :placeholder="'选择'+item.title" :picker-options="{pickerOptions:item.ditems}"/>
        <!-- rate -->
        <el-rate v-if="f.type == 'rate'" v-model="formObj[f.key]" show-text/>
      </el-form-item>
    </el-form>
</template>
<script>
export default {
    name:"zform",
    props:{
        labelWidth:String,
        form:Object,
        fields:{ type: Array,required: true }
    },
    data(){
        return {
            formObj:{

            }
        }
    },
    model:{
        prop:"form",
        event:"input"
    },
    watch:{
        formObj(v){
            this.$emit("input",v)
        }
    },
    computed:{
        rules(){
            let rules = {}
            for (let f of this.fields){
                if(!f.rule) continue
                let ru = []
                
                if (f.rule instanceof Array) {
                for (let j = 0; j < f.rule.length; j++) {
                    ru.push(this.rulesFormat(f, f.rule[j]))
                }
                } else {
                    ru.push(this.rulesFormat(f, f.rule))
                }
                rules[f.key] = ru
            }
            return rules
        }
    },
    methods:{
        validate(fn){
            this.$refs.form.validate(fn);
        },
        rulesFormat(col, rule) {
            if (typeof rule === 'boolean') {
                let r = { required: true }
                if (['select'].indexOf(col.type) !== -1) {
                    r.message = `请选择${col.title}`
                    r.trigger = 'change'
                } else {
                    r.message = `请输入${col.title}`
                    r.trigger = 'blur'
                }
                return r
            } else if (typeof rule === 'string') {
                let pattern = ''
                let msg = ''
                switch (rule) {
                    case '$account': pattern = /^[a-zA-Z0-9_-]{4,16}$/; msg = '，4到16位（字母、数字、下划线、减号）'; break
                    case '$password': pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; msg = '，最少6位，包含有大写字母、小写字母、数字、特殊字符'; break
                    case '$number': pattern = /^-?\d*\.?\d+$/; break
                    case '$mobile': pattern = /^1[34578]\d{9}$/; break
                    case '$email': pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; break
                    case '$idcard': pattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; break
                    case '$ipv4': pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; break
                    case '$url': pattern = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/; break
                    case '$car': pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/; break
                    default: pattern = rule
                }
                return { pattern, message: `${col.title}验证错误${msg}`,trigger:'blur' }
            } else {
                return rule
            }
        }
    },
    created(){
        if (this.form){
            let obj = {}
            for(let o of this.fields){
                let key = o.alias || o.key
                obj[o.key] = ap.GetValue(key,this.form)
            }
            this.formObj = obj
        }
    }
}
</script>