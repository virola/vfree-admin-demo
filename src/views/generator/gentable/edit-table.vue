<!-- 广告编辑弹窗 -->
<template>
  <a-card :bordered="false" class="user-info-tabs">
    <a-tabs v-model:active-key="active" size="large">
      <a-tab-pane tab="基本信息" key="basicInfo">
        <basic-info ref="basicInfo" :info="info" />
      </a-tab-pane>
      <a-tab-pane tab="字段信息" key="cloumInfo">
        <!-- 表格 -->
        <a-table
          ref="table"
          row-key="id"
          :dataSource="dataSource" 
          :columns="columns">
          <!-- 字段描述 -->
          <template #columnComment="{ record }">
            <a-input v-model:value="record.columnComment"/>
          </template>
          <!-- 字段类型 -->
          <template #javaType="{ record }">
            <a-select v-model:value="record.javaType">
              <a-select-option value="Long">Long</a-select-option>
              <a-select-option value="String">String</a-select-option>
              <a-select-option value="Integer">Integer</a-select-option>
              <a-select-option value="Double">Double</a-select-option>
              <a-select-option value="BigDecimal">BigDecimal</a-select-option>
              <a-select-option value="Date">Date</a-select-option>
            </a-select>
          </template>
          <!-- 字段属性 -->
          <template #javaField="{ record }">
            <a-input v-model:value="record.javaField"/>
          </template>
          <!-- 插入 -->
          <template #isInsert="{ record }">
            <a-checkbox v-model:checked="record.isInsert"></a-checkbox>
          </template>
          <!-- 编辑 -->
          <template #isEdit="{ record }">
            <a-checkbox v-model:checked="record.isEdit"></a-checkbox>
          </template>
          <!-- 列表 -->
          <template #isList="{ record }">
            <a-checkbox v-model:checked="record.isList"></a-checkbox>
          </template>
          <!-- 查询 -->
          <template #isQuery="{ record }">
            <a-checkbox v-model:checked="record.isQuery"></a-checkbox>
          </template>
          <!-- 查询方式 -->
          <template #queryType="{ record }">
            <a-select v-model:value="record.queryType">
              <a-select-option value="EQ">=</a-select-option>
              <a-select-option value="NE">!=</a-select-option>
              <a-select-option value="GT">></a-select-option>
              <a-select-option value="GTE">>=</a-select-option>
              <!-- <a-select-option value="LT"><</a-select-option> -->
              <!-- <a-select-option value="LTE"><=</a-select-option> -->
              <a-select-option value="LIKE">LIKE</a-select-option>
              <a-select-option value="BETWEEN">BETWEEN</a-select-option>
            </a-select>
          </template>
          <!-- 必填 -->
          <template #isRequired="{ record }">
            <a-checkbox v-model:checked="record.isRequired"></a-checkbox>
          </template>
          <!-- 显示类型 -->
          <template #htmlType="{ record }">
            <a-select v-model:value="record.htmlType">
              <a-select-option value="input">文本框</a-select-option>
              <a-select-option value="textarea">文本域</a-select-option>
              <a-select-option value="select">下拉框</a-select-option>
              <a-select-option value="radio">单选框</a-select-option>
              <a-select-option value="checkbox">复选框</a-select-option>
              <a-select-option value="datetime">日期控件</a-select-option>
            </a-select>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="生成信息" key="genInfo">
        <gen-info ref="genInfo" :info="info" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
  <div
    :style="{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTop: '1px solid #e8e8e8',
      padding: '10px 16px',
      textAlign: 'center',
      left: 0,
      background: '#fff',
      borderRadius: '0 0 4px 4px',
    }"
  >
    <a-button style="margin-right: 8px" @click="$emit('returnBack')">返回</a-button>
    <a-button type="primary" @click="submitForm()">保存信息</a-button>
  </div>
</template>

<script>
import BasicInfo from './basic-info';
import GenInfo from './gen-info';

export default {
  name: 'EditTable',
  emits: [
    'done',
    'update:visible'
  ],
  props: {
    // 数据表ID
    tableId: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  components: {
    BasicInfo,
    GenInfo
  },
  data() {
    return {
      // tab页选中
      active: 'basicInfo',
      // 表列信息
      dataSource: [],
      // 字典信息
      dictOptions: [],
      // 表详细信息
      info: {},
      submitLoading: false,
      // 表格列配置
      columns: [
        {
          key: 'index',
          title: '编号',
          width: 60,
          align: 'center',
          customRender: ({index}) => 1 + index
        },
        {
          title: '字段名称',
          dataIndex: 'columnName',
          align: 'center'
        },
        {
          title: '字段描述',
          dataIndex: 'columnComment',
          align: 'center',
          slots: {customRender: 'columnComment'}
        },
        {
          title: '数据类型',
          dataIndex: 'columnType',
          align: 'center'
        },
        {
          title: '字段类型',
          dataIndex: 'javaType',
          align: 'center',
          slots: {customRender: 'javaType'}
        },
        {
          title: '字段属性',
          dataIndex: 'javaField',
          align: 'center',
          slots: {customRender: 'javaField'}
        },
        {
          title: '插入',
          dataIndex: 'isInsert',
          align: 'center',
          slots: {customRender: 'isInsert'}
        },
        {
          title: '编辑',
          dataIndex: 'isEdit',
          align: 'center',
          slots: {customRender: 'isEdit'}
        },
        {
          title: '列表',
          dataIndex: 'isList',
          align: 'center',
          slots: {customRender: 'isList'}
        },
        {
          title: '查询',
          dataIndex: 'isQuery',
          align: 'center',
          slots: {customRender: 'isQuery'}
        },
        {
          title: '查询方式',
          dataIndex: 'queryType',
          align: 'center',
          width:120,
          slots: {customRender: 'queryType'}
        },
        {
          title: '必填',
          dataIndex: 'isRequired',
          align: 'center',
          slots: {customRender: 'isRequired'}
        },
        {
          title: '显示类型',
          dataIndex: 'htmlType',
          align: 'center',
          width:120,
          slots: {customRender: 'htmlType'}
        },
      ],
      // 表格搜索条件
      where: {},
      // 表格选中数据
      selection: [],
      // 当前编辑数据
      current: null,
      // 提交状态
      loading: false
    };
  },
  mounted() {
    // 获取表详情信息
    this.getTableInfo();
  },
  methods: {
    /**
     * 保存信息
     */
    submitForm() {
      console.log(11)
      this.submitLoading = true;
      const basicInfo = this.$refs.basicInfo.$refs.basicInfo;
      const genInfo = this.$refs.genInfo.$refs.genInfo;
      Promise.all([basicInfo, genInfo].map(this.getFormPromise)).then(res => {
        console.log(22)
        const validateResult = res.every(item => !!item);
        if (validateResult) {
          const genTable = Object.assign({}, basicInfo.model, basicInfo.model);
          genTable.columns = this.cloumns;
          genTable.params = {
            treeCode: genTable.treeCode,
            treeName: genTable.treeName,
            treeParentCode: genTable.treeParentCode
          };
          // 更新业务表
          this.$http.put('/generator/gentable/updateGenTable',genTable).then(res => {
            this.$message.success(res.data.msg);
            this.submitLoading = false;
            this.$emit("returnBack");
          })
          .catch(e => {
            this.submitLoading = false;
            this.$message.error(e.message);
          })
        } else {
          this.submitLoading = false;
          this.$message.error("业务表更新失败");
        }
      });
    },
    getFormPromise(form) {
      return new Promise(resolve => {
        form.validate(res => {
          resolve(res);
        });
      });
    },
    /**
     * 获取表信息
     */
    getTableInfo() {
      this.$http.get('/generator/gentable/getTableInfo/' + this.tableId).then(res => {
        if (res.data.code === 0) {
          this.dataSource = res.data.data.records;
          this.info = res.data.data.info;
        } else {
          this.dataSource = [];
          this.info = {};
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.dataSource = [];
        this.info = {};
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
</style>
