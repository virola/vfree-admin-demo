<!-- 顶栏右侧区域按钮 -->
<template>
  <div class="ele-admin-header-tool">
    <div class="ele-admin-header-tool-item" @click="toggleFullscreen">
      <fullscreen-exit-outlined v-if="isFullscreen"/>
      <fullscreen-outlined v-else/>
    </div>
    <!-- 消息通知 -->
    <div class="ele-admin-header-tool-item">
      <ele-notice/>
    </div>
    <!-- 用户信息 -->
    <div class="ele-admin-header-tool-item">
      <a-dropdown :overlay-style="{minWidth: '110px'}">
        <div class="ele-admin-header-avatar">
          <a-avatar :src="loginUser.avatar"/>
          <span>{{ loginUser.realname }}&nbsp;</span>
          <down-outlined/>
        </div>
        <template #overlay>
          <a-menu @click="onUserDropClick">
            <a-menu-item key="user">
              <span><user-outlined/>个人中心</span>
            </a-menu-item>
            <a-menu-item key="password">
              <span><key-outlined/>修改密码</span>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="logout">
              <span><logout-outlined/>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!-- 主题设置 -->
    <div
      class="ele-admin-header-tool-item"
      v-if="showSetting"
      @click="openSetting">
      <MoreOutlined/>
    </div>
  </div>
</template>

<script>
import {createVNode} from 'vue';
import {
  DownOutlined,
  MoreOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';
import EleNotice from './notice';

export default {
  name: 'EleHeaderRight',
  components: {
    DownOutlined,
    MoreOutlined,
    UserOutlined,
    KeyOutlined,
    LogoutOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    EleNotice
  },
  emits: ['item-click'],
  props: {
    // 是否显示打开设置抽屉按钮
    showSetting: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 当前登录用户信息
    loginUser() {
      return this.$store.state.user.user;
    }
  },
  data() {
    return {
      // 是否全屏状态
      isFullscreen: false
    };
  },
  methods: {
    /* 个人信息下拉菜单点击 */
    onUserDropClick({key}) {
      if (key === 'user') {
        this.$router.push('/user/info');
      } else if (key === 'password') {
        this.$emit('item-click', 'password');
      } else if (key === 'logout') {
        // 退出登录
        this.$confirm({
          title: '提示',
          content: '确定要退出登录吗?',
          icon: createVNode(ExclamationCircleOutlined),
          maskClosable: true,
          onOk: () => {
            // 清除缓存的token
            this.$store.dispatch('user/setToken').then(() => {
              this.$router.push('/login');
            });
          }
        });
      }
    },
    /* 打开设置抽屉 */
    openSetting() {
      this.$emit('item-click', 'setting');
    },
    /* 全屏切换 */
    toggleFullscreen() {
      try {
        this.isFullscreen = this.$util.toggleFullscreen();
      } catch (e) {
        this.$message.error('您的浏览器不支持全屏模式');
      }
    }
  }
}
</script>
