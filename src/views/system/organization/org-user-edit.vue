<!-- 用户编辑弹窗 -->
<template>
  <a-modal
    :width="680"
    :visible="visible"
    :confirm-loading="loading"
    :title="isUpdate?'修改用户':'新建用户'"
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
          <a-form-item label="用户账号:" name="username">
            <a-input
              v-model:value="form.username"
              placeholder="请输入用户账号"
              allow-clear/>
          </a-form-item>
          <a-form-item label="用户名:" name="nickname">
            <a-input
              v-model:value="form.nickname"
              placeholder="请输入用户名"
              allow-clear/>
          </a-form-item>
          <a-form-item label="性别:" name="sex">
            <a-select
              v-model:value="form.sex"
              placeholder="请选择性别"
              allow-clear>
              <a-select-option :value="1">男</a-select-option>
              <a-select-option :value="2">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="角色:" name="roleIds">
            <a-select
              v-model:value="form.roleIds"
              placeholder="请选择角色"
              allow-clear
              mode="multiple">
              <a-select-option
                v-for="(item, index) in roleList"
                :key="index"
                :value="item.roleId">
                {{ item.roleName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="邮箱:" name="email">
            <a-input
              v-model:value="form.email"
              placeholder="请输入邮箱"
              allow-clear/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24" :xs="24">
          <a-form-item label="手机号:" name="phone">
            <a-input
              v-model:value="form.phone"
              placeholder="请输入手机号"
              allow-clear/>
          </a-form-item>
          <a-form-item label="出生日期:" name="birthday">
            <a-date-picker
              v-model:value="form.birthday"
              placeholder="请选择出生日期"
              class="ele-fluid"/>
          </a-form-item>
          <a-form-item label="个人简介:">
            <a-textarea
              v-model:value="form.introduction"
              placeholder="请输入个人简介"
              :rows="4"/>
          </a-form-item>
          <a-form-item
            v-if="!isUpdate"
            label="登录密码:"
            name="password">
            <a-input-password
              v-model:value="form.password"
              placeholder="请输入登录密码"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'OrgUserEdit',
  emits: [
    'done',
    'update:visible'
  ],
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object,
    // 全部机构
    organizationList: Array,
    // 机构id
    organizationId: Number
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({}, this.data, {
        organizationId: this.organizationId
      }),
      // 表单验证规则
      rules: {
        username: [
          {required: true, message: '请输入用户账号', type: 'string', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入用户名', type: 'string', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', type: 'number', trigger: 'blur'}
        ],
        roleIds: [
          {required: true, message: '请选择角色', type: 'array', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', type: 'string', trigger: 'blur'}
        ]
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: []
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = Object.assign({}, this.data, {
          roleIds: this.data.roles.map(d => d.roleId)
        });
        this.isUpdate = true;
      } else {
        this.form = {organizationId: this.organizationId};
        this.isUpdate = false;
      }
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }
    },
    organizationId() {
      if (!this.isUpdate) {
        this.form = {organizationId: this.organizationId};
      }
    }
  },
  mounted() {
    this.queryRoles();  // 查询角色列表
  },
  methods: {
    /* 保存编辑 */
    save() {
      this.$refs.form.validate().then(() => {
        this.loading = true;
        this.$http[this.isUpdate ? 'put' : 'post']('/sys/user', this.form).then(res => {
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
    },
    /* 查询角色列表 */
    queryRoles() {
      this.$http.get('/sys/role').then(res => {
        if (res.data.code === 0) {
          this.roleList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
</style>
