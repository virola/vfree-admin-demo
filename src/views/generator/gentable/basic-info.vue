<!-- 职级编辑弹窗 -->
<template>
  <a-form
    ref="basicInfo"
    :model="form"
    :rules="rules"
    :label-col="{md: {span: 5}, sm: {span: 24}}"
    :wrapper-col="{md: {span: 19}, sm: {span: 24}}">
    <a-row :gutter="16">
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item
          label="表名称:"
          name="tableName">
          <a-input
            v-model:value="form.tableName"
            placeholder="请输入表名称"
            allow-clear/>
        </a-form-item>
        <a-form-item
          label="表描述:"
          name="tableComment">
          <a-input
            v-model:value="form.tableComment"
            placeholder="请输入表描述"
            allow-clear/>
        </a-form-item>
        <a-form-item label="备注:">
          <a-textarea
            v-model:value="form.note"
            placeholder="请输入备注"
            :rows="4"/>
        </a-form-item>
      </a-col>
      <a-col :md="12" :sm="24" :xs="24">
        <a-form-item
          label="实体类名:"
          name="className">
          <a-input
            v-model:value="form.className"
            placeholder="请输入实体类名"
            allow-clear/>
        </a-form-item>
        <a-form-item
          label="作者名称:"
          name="functionAuthor">
          <a-input
            v-model:value="form.functionAuthor"
            placeholder="请输入作者名称"
            allow-clear/>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'BasicInfo',
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
        // tableName: [
        //   {required: true, message: '请输入表名称', type: 'string', trigger: 'blur'}
        // ],
        // tableComment: [
        //   {required: true, message: '请输入表描述', type: 'string', trigger: 'blur'}
        // ],
        // className: [
        //   {required: true, message: '请输入实体类型', type: 'string', trigger: 'blur'}
        // ],
        // functionAuthor: [
        //   {required: true, message: '请输入作者名称', type: 'string', trigger: 'blur'}
        // ]
      }
    };
  }
}
</script>

<style scoped>
</style>
