<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索表单 -->
      <a-form
        :model="where"
        :label-col="{md: {span: 6}, sm: {span: 24}}"
        :wrapper-col="{md: {span: 18}, sm: {span: 24}}">
        <a-row>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="用户账号:">
              <a-input
                v-model:value.trim="where.username"
                placeholder="请输入用户账号"
                allow-clear/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item label="操作模块:">
              <a-input
                v-model:value.trim="where.title"
                placeholder="请输入操作模块"
                allow-clear/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24" :xs="24">
            <a-form-item style="padding-left:10px;" :wrapper-col="{span: 24}">
              <a-space>
                <a-button type="primary" @click="reload">查询</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 表格 -->
      <ele-pro-table
        ref="table"
        row-key="id"
        :datasource="url"
        :columns="columns"
        :where="where"
        :scroll="{x: 'max-content'}">
        <template #toolbar>
          <a-space>
            <a-button type="primary" @click="exportData">
              <template #icon>
                <download-outlined/>
              </template>
              <span>导出</span>
            </a-button>
          </a-space>
        </template>
        <template #status="{ record }">
          <a-tag :color="['green', 'red'][record.status]">
            {{ ['正常', '异常'][record.status] }}
          </a-tag>
        </template>
        <template #logType="{ record }">
          <a-tag :color="['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green','red'][record.logType-1]">
            {{ ['其他', '新增', '修改', '删除', '导出数据', '导入模板', '强退', '生成代码', '清空数据', '设置状态'][record.logType-1] }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a @click="openDetail(record)">详情</a>
        </template>
      </ele-pro-table>
    </a-card>
  </div>
  <!-- 详情弹窗 -->
  <operlog-detail
    v-model:visible="showInfo"
    :data="current||{}"/>
</template>

<script>
import XLSX from 'xlsx';
import {
  DownloadOutlined,
} from '@ant-design/icons-vue';
import OperlogDetail from './operlog-detail';

export default {
  name: 'SystemOperLog',
  components: {
    DownloadOutlined,
    OperlogDetail
  },
  data() {
    return {
      // 表格数据接口
      url: '/system/operlog/index',
      // 表格列配置
      columns: [
        {
          key: 'index',
          title: '编号',
          width: 48,
          fixed: 'left',
          align: 'center',
          customRender: ({index}) => this.$refs.table.tableIndex + index
        },
        {
          title: '操作模块',
          dataIndex: 'title',
          align: 'center'
        },
        {
          title: '操作类型',
          dataIndex: 'logType',
          width: 120,
          align: 'center',
          slots: {customRender: 'logType'}
        },
        {
          title: '操作人',
          dataIndex: 'operName',
          align: 'center'
        },
        {
          title: '请求地址',
          dataIndex: 'operUrl',
          align: 'center'
        },
        {
          title: '请求IP',
          dataIndex: 'operIp',
          align: 'center'
        },
        {
          title: '请求地址',
          dataIndex: 'operLocation',
          align: 'center'
        },
        {
          title: '请求方式',
          dataIndex: 'requestMethod',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: 90,
          align: 'center',
          slots: {customRender: 'status'}
        },
        {
          title: '耗时',
          dataIndex: 'spendTime',
          align: 'center',
          customRender: ({text}) => text / 1000 + 's'
        },
        {
          title: '操作时间',
          dataIndex: 'createTime',
          sorter: true,
          width: 150,
          align: 'center',
          customRender: ({text}) => this.$util.toDateString(text)
        },
        {
          title: '操作',
          key: 'action',
          width: 90,
          align: 'center',
          fixed: 'right',
          slots: {customRender: 'action'}
        }
      ],
      // 表格搜索条件
      where: {},
      // 当前选中数据
      current: null,
      // 是否显示查看弹窗
      showInfo: false,
      // 日期范围选择
      daterange: []
    };
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.$refs.table.reload({page: 1});
    },
    /*  重置搜索 */
    reset() {
      this.where = {};
      this.daterange = [];
      this.$nextTick(() => {
        this.reload();
      });
    },
    /* 详情 */
    openDetail(row) {
      this.current = row;
      this.showInfo = true;
    },
    /* 导出数据 */
    exportData() {
      let array = [['操作模块', '操作类型', '操作人', '请求地址', '请求IP', '请求地址', '请求方式','状态', '耗时', '操作时间']];
      // 请求查询全部(不分页)的接口
      const hide = this.$message.loading('请求中..', 0);
      this.$http.get('/system/operlog/index?page=1&limit=2000').then(res => {
        hide();
        if (res.data.code === 0) {
          res.data.data.records.forEach(d => {
            array.push([
              d.title,
              d.logType,
              d.operName,
              d.operUrl,
              d.operIp,
              d.operLocation,
              d.requestMethod,
              ['正常', '异常'][d.status],
              d.spendTime,
              this.$util.toDateString(d.createTime)
            ]);
          });
          this.$util.exportSheet(XLSX, array, '操作日志');
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        hide();
        this.$message.error(e.message);
      });
    }
  },
  watch: {
    daterange() {
      if (this.daterange && this.daterange.length === 2) {
        this.where.createTimeStart = this.daterange[0];
        this.where.createTimeEnd = this.daterange[1];
      } else {
        this.where.createTimeStart = null;
        this.where.createTimeEnd = null;
      }
    }
  }
}
</script>

<style scoped>
</style>
