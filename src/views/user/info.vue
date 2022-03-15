<template>
  <div class="ele-body ele-body-card">
    <a-row :gutter="16">
      <a-col :lg="6" :md="8" :sm="24" :xs="24">
        <a-card :bordered="false">
          <div class="ele-text-center">
            <div class="user-info-avatar-group" @click="showCropper=true">
              <a-avatar :size="110" :src="form.avatar"/>
              <upload-outlined class="user-info-avatar-icon"/>
            </div>
            <h1>{{ $store.state.user.user.realname }}</h1>
            <div>为梦想而创作，海纳百川，有容乃大!</div>
          </div>
          <div class="user-info-list">
            <div class="ele-cell">
              <user-outlined/>
              <div class="ele-cell-content">资深JAVA架构师</div>
            </div>
            <div class="ele-cell">
              <home-outlined/>
              <div class="ele-cell-content">JavaWeb研发中心 - 架构设计部 - 资深架构师</div>
            </div>
            <div class="ele-cell">
              <environment-outlined/>
              <div class="ele-cell-content">中国 • 江苏省 • 南京市</div>
            </div>
            <div class="ele-cell">
              <tag-outlined/>
              <div class="ele-cell-content">SpringBoot、MybatisPlus、Shiro、Vue、AntDesign</div>
            </div>
          </div>
          <a-divider dashed/>
          <h6>标签</h6>
          <div class="user-info-tags">
            <a-tag>很有想法的</a-tag>
            <a-tag>专注设计</a-tag>
            <a-tag>辣~</a-tag>
            <a-tag>大长腿</a-tag>
            <a-tag>川妹子</a-tag>
            <a-tag>海纳百川</a-tag>
          </div>
        </a-card>
      </a-col>
      <a-col :lg="18" :md="16" :sm="24" :xs="24">
        <a-card :bordered="false" class="user-info-tabs">
          <a-tabs v-model:active-key="active" size="large">
            <a-tab-pane tab="基本信息" key="info">
              <a-form
                ref="form"
                :model="form"
                :rules="rules"
                :label-col="{md: {span: 6}, sm: {span: 24}}"
                :wrapper-col="{md: {span: 18}, sm: {span: 24}}">
                <a-form-item label="真实姓名:" name="realname">
                  <a-input
                    v-model:value="form.realname"
                    placeholder="请输入真实姓名"
                    allow-clear/>
                </a-form-item>
                <a-form-item label="昵称:" name="nickname">
                  <a-input
                    v-model:value="form.nickname"
                    placeholder="请输入昵称"
                    allow-clear/>
                </a-form-item>
                <a-form-item label="性别:" name="gender">
                  <a-select
                    v-model:value="form.gender"
                    placeholder="请选择性别"
                    allow-clear>
                    <a-select-option :value="1">男</a-select-option>
                    <a-select-option :value="2">女</a-select-option>
                    <a-select-option :value="3">保密</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="邮箱:" name="email">
                  <a-input
                    v-model:value="form.email"
                    placeholder="请输入邮箱"
                    allow-clear/>
                </a-form-item>
                <a-form-item label="联系电话:" name="mobile">
                  <a-input
                    v-model:value="form.mobile"
                    placeholder="请输入联系电话"
                    allow-clear/>
                </a-form-item>
                <a-form-item label="个人简介:">
                  <a-textarea
                    v-model:value="form.intro"
                    placeholder="请输入个人简介"
                    :rows="4"/>
                </a-form-item>
                <a-form-item label="街道地址:">
                  <a-input
                    v-model:value="form.address"
                    placeholder="请输入街道地址"
                    allow-clear/>
                </a-form-item>
                <a-form-item :wrapper-col="{md: {offset: 6}}">
                  <a-button
                    type="primary"
                    @click="save"
                    :loading="loading">
                    {{ loading ? '保存中..' : '保存更改' }}
                  </a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane tab="账号绑定" key="account">
              <div class="user-account-list">
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保手机</div>
                    <div class="ele-cell-desc">已绑定手机：138****8293</div>
                  </div>
                  <a>去修改</a>
                </div>
                <a-divider/>
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保邮箱</div>
                    <div class="ele-cell-desc">已绑定邮箱：1175401194@qq.com</div>
                  </div>
                  <a>去修改</a>
                </div>
                <a-divider/>
                <div class="ele-cell">
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">密保问题</div>
                    <div class="ele-cell-desc">未设置密保问题</div>
                  </div>
                  <a>去设置</a>
                </div>
                <a-divider/>
                <div class="ele-cell">
                  <qq-outlined class="user-account-icon"/>
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定QQ</div>
                    <div class="ele-cell-desc">当前未绑定QQ账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
                <a-divider/>
                <div class="ele-cell">
                  <wechat-outlined class="user-account-icon"/>
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定微信</div>
                    <div class="ele-cell-desc">当前未绑定绑定微信账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
                <a-divider/>
                <div class="ele-cell">
                  <alipay-outlined class="user-account-icon"/>
                  <div class="ele-cell-content">
                    <div class="ele-cell-title">绑定支付宝</div>
                    <div class="ele-cell-desc">当前未绑定绑定支付宝账号</div>
                  </div>
                  <a>去绑定</a>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
    <!-- 头像裁剪弹窗 -->
    <ele-cropper-modal
      v-model:visible="showCropper"
      :src="form.avatar"
      @done="onCrop"/>
  </div>
</template>

<script>
import {
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  TagOutlined,
  QqOutlined,
  WechatOutlined,
  AlipayOutlined
} from '@ant-design/icons-vue';
import validate from 'ele-admin-pro/packages/validate';
import EleCropperModal from 'ele-admin-pro/packages/ele-cropper-modal';

export default {
  name: 'UserInfo',
  components: {
    UploadOutlined,
    UserOutlined,
    HomeOutlined,
    EnvironmentOutlined,
    TagOutlined,
    QqOutlined,
    WechatOutlined,
    AlipayOutlined,
    EleCropperModal
  },
  data() {
    return {
      // tab页选中
      active: 'info',
      // 表单数据
      form: {},
      // 表单验证规则
      rules: {
        realname: [
          {required: true, message: '请输入真实姓名', type: 'string', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入用户名', type: 'string', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', type: 'number', trigger: 'blur'}
        ],
        mobile: [
          {pattern: validate.phone, message: '手机号格式不正确', type: 'string', trigger: 'blur'}
        ],
        email: [
          {pattern: validate.email, message: '邮箱格式不正确', type: 'string', trigger: 'blur'}
        ]
      },
      // 保存按钮loading
      loading: false,
      // 是否显示裁剪弹窗
      showCropper: false
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    /**
     * 获取用户信息
     */
    getUserInfo() {
      if (this.$setting.userUrl) {
        this.$http.get(this.$setting.userUrl).then(res => {
          if (res.data.code === 0) {
            if (this.$setting.parseUser) {
              res.data = this.$setting.parseUser(res.data);
            }
            this.form = JSON.parse(JSON.stringify(res.data.data))
            let user = res.data.data;
            this.$store.dispatch('user/setUser', user);
            this.$store.dispatch('user/setRoles', user ? user.roles : null);
            this.$store.dispatch('user/setAuthorities', user ? user.authorities : null);
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          this.$message.error(e.message);
        });
      }
    },
    /* 保存更改 */
    save() {
      this.$refs.form.validate().then(() => {
        this.loading = true;
        this.$http.put('/system/index/updateUserInfo', this.form).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.$message.success('保存成功');
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          this.loading = false;
          this.$message.error(e.message);
        });
        // setTimeout(() => {
        //   this.loading = false;
        //   this.$message.success('保存成功');
        // }, 800);
      }).catch(() => {
      });
    },
    /* 头像裁剪完成回调 */
    onCrop(res) {
      this.form.avatar = res;
      this.showCropper = false;
    }
  }
}
</script>

<style scoped>
/* 用户资料卡片 */
.user-info-avatar-group {
  margin: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.user-info-avatar-group .user-info-avatar-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  display: none;
  z-index: 2;
}

.user-info-avatar-group:hover .user-info-avatar-icon {
  display: block;
}

.user-info-avatar-group:hover:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .3);
}

.user-info-avatar-group + h1 {
  margin-bottom: 8px;
}

/* 用户信息列表 */
.user-info-list {
  margin: 52px 0 32px 0;
}

.user-info-list .ele-cell + .ele-cell {
  margin-top: 16px;
}

.user-info-list + .ant-divider {
  margin-bottom: 16px;
}

/* 用户标签 */
.user-info-tags {
  margin: 16px 0 4px 0;
}

.user-info-tags .ant-tag {
  margin: 0 12px 8px 0;
}

/* 右侧卡片 */
.user-info-tabs :deep(.ant-card-body) {
  padding: 0;
}

.user-info-tabs :deep(.ant-tabs-tab) {
  padding-left: 4px;
  padding-right: 4px;
  margin: 0 12px 0 28px !important;
}

.user-info-tabs .ant-form {
  max-width: 580px;
  margin-top: 20px;
  padding: 0 24px;
}

/* 用户账号绑定列表 */
.user-account-list {
  margin-bottom: 27px;
}

.user-account-list > .ele-cell {
  padding: 18px 34px;
}

.user-account-list .user-account-icon {
  color: #fff;
  padding: 8px;
  font-size: 26px;
  border-radius: 50%;
}

.user-account-list .user-account-icon.anticon-qq {
  background: #3492ED;
}

.user-account-list .user-account-icon.anticon-wechat {
  background: #4DAF29;
}

.user-account-list .user-account-icon.anticon-alipay {
  background: #1476FE;
}
</style>
