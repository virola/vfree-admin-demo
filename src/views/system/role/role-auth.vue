<!-- 角色权限分配弹窗 -->
<template>
  <a-modal
    :width="460"
    title="分配权限"
    :visible="visible"
    :confirm-loading="loading"
    @update:visible="updateVisible"
    @ok="save">
    <a-spin :spinning="authLoading">
      <div style="height: 60vh;" class="ele-scrollbar-hover">
        <a-tree
          checkable
          :tree-data="authData"
          v-model:expandedKeys="expandKeys"
          v-model:checkedKeys="checkedKeys"/>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'RoleAuth',
  emits: ['update:visible'],
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 当前角色数据
    data: Object
  },
  data() {
    return {
      // 权限数据
      authData: [],
      // 权限数据请求状态
      authLoading: false,
      // 提交状态
      loading: false,
      // 角色权限展开的keys
      expandKeys: [],
      // 角色权限选中的keys
      checkedKeys: [],
    };
  },
  watch: {
    visible() {
      if (this.visible) {
        this.query();
      }
    }
  },
  methods: {
    /* 查询权限数据 */
    query() {
      this.authData = [];
      this.expandKeys = [];
      this.checkedKeys = [];
      if (!this.data) {
        return;
      }
      this.authLoading = true;
      this.$http.get('/system/role/getMenuList/' + this.data.id).then(res => {
        this.authLoading = false;
        if (res.data.code === 0) {
          let eks = [], cks = [];
          res.data.data.forEach(d => {
            d.key = d.id;
            eks.push(d.key);
          });
          this.authData = this.$util.toTreeData(res.data.data, 'id', 'pid');
          this.$util.eachTreeData(this.authData, (d) => {
            if (d.checked && (!d.children || !d.children.length)) {
              cks.push(d.key);
            }
          });
          this.expandKeys = eks;
          this.checkedKeys = cks;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.authLoading = false;
        this.$message.error(e.message);
      });
    },
    /* 保存权限分配 */
    save() {
      this.loading = true;
      let ids = [];
      this.$util.eachTreeData(this.authData, (d) => {
        if (this.checkedKeys.some(c => c === d.key)) {
          ids.push(d.key);
          if (d.pid && !ids.some(t => t === d.pid)) {
            ids.push(d.pid);
          }
        }
      });
      this.$http.put('/system/role/savePermission/' + this.data.id, ids).then(res => {
        this.loading = false;
        if (res.data.code === 0) {
          this.$message.success(res.data.msg);
          this.updateVisible(false);
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.loading = false;
        this.$message.error(e.message);
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
