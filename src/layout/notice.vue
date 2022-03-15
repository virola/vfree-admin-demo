<!-- 顶栏消息通知图标 -->
<template>
  <a-dropdown
    v-model:visible="visible"
    :trigger="['click']">
    <a-badge
      :count="allNum"
      style="padding: 6px;">
      <bell-outlined/>
    </a-badge>
    <template #overlay>
      <div class="ant-dropdown-menu ele-notice-pop">
        <div @click.stop="">
          <a-tabs v-model:active-key="active">
            <a-tab-pane
              key="notice"
              :tab="noticeTitle"
              force-render>
              <a-list
                item-layout="horizontal"
                :data-source="notice">
                <template #renderItem="{item}">
                  <a-list-item>
                    <a-list-item-meta
                      :title="item.title"
                      :description="item.time">
                      <template #avatar>
                        <a-avatar :style="{background: item.color}">
                          <template #icon>
                            <component :is="item.icon"/>
                          </template>
                        </a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div
                v-if="notice.length"
                class="ele-cell ele-notice-actions">
                <div
                  @click="clear(1)"
                  class="ele-cell-content">清空通知
                </div>
                <a-divider type="vertical"/>
                <div
                  @click="more(1)"
                  class="ele-cell-content">查看更多
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="message"
              :tab="messageTitle"
              force-render>
              <a-list
                item-layout="horizontal"
                :data-source="message">
                <template #renderItem="{item}">
                  <a-list-item>
                    <a-list-item-meta :title="item.title">
                      <template #avatar>
                        <a-avatar :src="item.avatar"/>
                      </template>
                      <template #description>
                        <div>{{ item.content }}</div>
                        <div>{{ item.time }}</div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div
                v-if="message.length"
                class="ele-cell ele-notice-actions">
                <div
                  @click="clear(2)"
                  class="ele-cell-content">清空私信
                </div>
                <a-divider type="vertical"/>
                <div
                  @click="more(2)"
                  class="ele-cell-content">查看更多
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="todo"
              :tab="todoTitle"
              force-render>
              <a-list
                item-layout="horizontal"
                :data-source="todo">
                <template #renderItem="{item}">
                  <a-list-item>
                    <a-list-item-meta :description="item.desc">
                      <template #title>
                        <div class="ele-cell">
                          <div class="ele-cell-content">{{ item.title }}</div>
                          <a-tag :color="['','red','blue'][item.state]">
                            {{ ['未开始', '即将到期', '进行中'][item.state] }}
                          </a-tag>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div
                v-if="todo.length"
                class="ele-cell ele-notice-actions">
                <div
                  @click="clear(3)"
                  class="ele-cell-content">清空待办
                </div>
                <a-divider type="vertical"/>
                <div
                  @click="more(3)"
                  class="ele-cell-content">查看更多
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script>
import {
  BellOutlined,
  NotificationFilled,
  PushpinFilled,
  VideoCameraFilled,
  CarryOutFilled,
  BellFilled
} from '@ant-design/icons-vue';

export default {
  name: 'EleNotice',
  components: {
    BellOutlined,
    NotificationFilled,
    PushpinFilled,
    VideoCameraFilled,
    CarryOutFilled,
    BellFilled
  },
  data() {
    return {
      visible: false,
      active: 'notice',
      notice: [
        {
          color: '#60B2FC',
          icon: 'NotificationFilled',
          title: '你收到了一封14份新周报',
          time: '2020-07-27 18:30:18'
        },
        {
          color: '#F5686F',
          icon: 'PushpinFilled',
          title: '许经理同意了你的请假申请',
          time: '2020-07-27 09:08:36'
        },
        {
          color: '#7CD734',
          icon: 'VideoCameraFilled',
          title: '陈总邀请你参加视频会议',
          time: '2020-07-26 18:30:01'
        },
        {
          color: '#FAAD14',
          icon: 'CarryOutFilled',
          title: '你推荐的刘诗雨已通过第三轮面试',
          time: '2020-07-25 16:38:46'
        },
        {
          color: '#2BCACD',
          icon: 'BellFilled',
          title: '你的6月加班奖金已发放',
          time: '2020-07-25 11:03:31'
        }
      ],
      message: [
        {
          avatar: require('@/assets/logo.png'),
          title: '古吉拉特 评论了你的日志',
          content: '写的不错, 以后多多向你学习~',
          time: '2020-07-27 18:30:18'
        },
        {
          avatar: require('@/assets/logo.png'),
          title: '刘诗雨 点赞了你的日志',
          content: '写的不错, 以后多多向你学习~',
          time: '2020-07-27 09:08:36'
        },
        {
          avatar: require('@/assets/logo.png'),
          title: '酷酷的大叔 评论了你的周报',
          content: '写的不错, 以后多多向你学习~',
          time: '2020-07-26 18:30:01'
        },
        {
          avatar: require('@/assets/logo.png'),
          title: '古吉拉特 点赞了你的周报',
          content: '写的不错, 以后多多向你学习~',
          time: '2020-07-25 11:03:31'
        }
      ],
      todo: [
        {
          state: 0,
          title: '刘诗雨的请假审批',
          desc: '刘诗雨在 07-27 18:30 提交的请假申请'
        },
        {
          state: 1,
          title: '第三方代码紧急变更',
          desc: '需要在 2020-07-27 之前完成'
        },
        {
          state: 2,
          title: '信息安全考试',
          desc: '需要在 2020-07-26 18:30 前完成'
        },
        {
          state: 2,
          title: 'JavaWeb前后端分离发布新版本',
          desc: '需要在 2021-04-30 11:03 前完成'
        }
      ]
    };
  },
  computed: {
    /* 通知标题 */
    noticeTitle() {
      if (this.notice.length) {
        return `通知(${this.notice.length})`;
      }
      return '通知';
    },
    /* 私信标题 */
    messageTitle() {
      if (this.message.length) {
        return `私信(${this.message.length})`;
      }
      return '私信';
    },
    /* 待办标题 */
    todoTitle() {
      if (this.todo.length) {
        return `待办(${this.todo.length})`;
      }
      return '待办';
    },
    /* 所有消息数量 */
    allNum() {
      return this.notice.length + this.message.length + this.todo.length;
    }
  },
  methods: {
    /* 清空消息 */
    clear(type) {
      if (type === 1) {
        this.notice = [];
      } else if (type === 2) {
        this.message = [];
      } else if (type === 3) {
        this.todo = [];
      }
    },
    /* 查看更多 */
    more(type) {
      console.log(type);
      this.$router.push('/user/message');
      this.visible = false;
    }
  }
}
</script>

<style scoped>
.ele-notice-pop {
  padding: 0;
  width: 336px;
  max-width: 100%;
}

/* 内容 */
.ele-notice-pop :deep(.ant-tabs-nav-wrap) {
  text-align: center;
}

.ele-notice-pop .ant-list-item {
  padding-left: 24px;
  padding-right: 24px;
  transition: background-color .3s;
  cursor: pointer;
}

.ele-notice-pop .ant-list-item:hover {
  background: hsla(0, 0%, 60%, .05);
}

.ele-notice-pop .ant-tag {
  margin: 0;
}

/* 操作按钮 */
.ele-notice-pop .ele-notice-actions {
  border-top: 1px solid hsla(0, 0%, 60%, .15);
}

.ele-notice-pop .ele-notice-actions > .ele-cell-content {
  line-height: 42px;
  text-align: center;
  transition: background-color .3s;
  cursor: pointer;
}

.ele-notice-pop .ele-notice-actions > .ele-cell-content:hover {
  background: hsla(0, 0%, 60%, .05);
}
</style>
