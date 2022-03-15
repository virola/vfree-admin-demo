<!-- 通知编辑弹窗 -->
<template>
  <a-modal
    :width="900"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改通知':'添加通知'"
    :body-style="{paddingBottom: '8px'}"
    @update:visible="updateVisible"
    @ok="save">
    <a-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{md: {span: 7}, sm: {span: 24}}"
      :wrapper-col="{md: {span: 17}, sm: {span: 24}}">
      <a-row :gutter="16">
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item
            label="通知标题："
            name="title">
            <a-input
              v-model:value="form.title"
              placeholder="请输入通知标题"
              allow-clear/>
          </a-form-item>
          <a-form-item label="通知状态：" name="status">
            <a-radio-group
              v-model:value="form.status">
              <a-radio :value="1">正常</a-radio>
              <a-radio :value="2">停用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item
            label="通知来源："
            name="source">
            <a-select
              v-model:value="form.source"
              placeholder="请选择通知来源"
              allow-clear>
              <a-select-option :value="1">内部通知</a-select-option>
              <a-select-option :value="2">站外通知</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="是否置顶：" name="isTop">
            <a-radio-group
              v-model:value="form.isTop">
              <a-radio :value="1">置顶</a-radio>
              <a-radio :value="2">不置顶</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        label="通知内容:"
        :label-col="{sm: {span: 3}, xs: {span: 6}}"
        :wrapper-col="{sm: {span: 21}, xs: {span: 18}}">
        <!-- 编辑器 -->
        <tinymce-editor
          v-model:value="form.content"
          :init="{height: 350}"/>
      </a-form-item>
      
    </a-form>
  </a-modal>
</template>

<script>
import TinymceEditor from '@/components/TinymceEditor';
export default {
  name: 'NoticeEdit',
  emits: [
    'done',
    'update:visible'
  ],
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object
  },
  components: {TinymceEditor},
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.data),
      // 表单验证规则
      rules: {
        name: [
          {required: true, message: '请输入通知名称', type: 'string', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序号', type: 'number', trigger: 'blur'}
        ]
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = Object.assign({}, this.data);
        this.isUpdate = true;
      } else {
        this.form = {status:1};
        this.isUpdate = false;
      }
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }
    }
  },
  methods: {
    /* 保存编辑 */
    save() {
      this.$refs.form.validate().then(() => {
        this.loading = true;
        this.$http[this.isUpdate ? 'put' : 'post'](this.form.id ? '/system/notice/edit' : '/system/notice/add', this.form).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.$message.success(res.data.msg);
            if (!this.isUpdate) {
              this.form = {};
            }
            this.updateVisible(false);
            this.$emit('done');
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          this.loading = false;
          this.$message.error(e.message);
        });
      }).catch(() => {
      });
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    }
  }
}
</script>

<style scoped>
</style>
