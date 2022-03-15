<!-- 职级编辑弹窗 -->
<template>
  <a-form
    ref="genInfo"
    :model="form"
    :rules="rules"
    :label-col="{md: {span: 5}, sm: {span: 24}}"
    :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
    <a-row :gutter="16">
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item label="模板类型" name="tplCategory">
          <a-radio-group
            v-model:value="form.tplCategory">
            <a-radio value="crud">普通列表</a-radio>
            <a-radio value="tree">树状列表</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="生成模块名:"
          name="moduleName">
          <a-input
            v-model:value="form.moduleName"
            placeholder="请输入生成模块名"
            allow-clear/>
        </a-form-item>
        <a-form-item
          label="生成功能名:"
          name="functionName">
          <a-input
            v-model:value="form.functionName"
            placeholder="请输入生成功能名"
            allow-clear/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item
          label="生成包路径:"
          name="packageName">
          <a-input
            v-model:value="form.packageName"
            placeholder="请输入生成包路径"
            allow-clear/>
        </a-form-item>
        <a-form-item
          label="生成业务名:"
          name="businessName">
          <a-input
            v-model:value="form.businessName"
            placeholder="请输入生成业务名"
            allow-clear/>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'GenInfo',
  props: {
    // 基础信息
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.info),
      // 表单验证规则
      rules: {
        // tplCategory: [
        //   {required: true, message: '请输入模板类型', type: 'string', trigger: 'blur'}
        // ],
        // moduleName: [
        //   {required: true, message: '请输入生成模块名', type: 'string', trigger: 'blur'}
        // ],
        // functionName: [
        //   {required: true, message: '请输入生成功能名', type: 'string', trigger: 'blur'}
        // ],
        // packageName: [
        //   {required: true, message: '请输入生成包名', type: 'string', trigger: 'blur'}
        // ],
        // businessName: [
        //   {required: true, message: '请输入生成业务名', type: 'string', trigger: 'blur'}
        // ]
      }
    };
  }
}
</script>

<style scoped>
</style>
