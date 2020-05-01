<template>
  <div class="content-box">
    <header class="class-info">
      <h1>信管1162班-通讯录</h1>

      <el-button
        size="mini"
        type="primary"
        class="btn-margin upload-btn"
        @click="getMemberExcel"
      >导出表格</el-button>

    </header>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      class="member-table"
    >
      <el-table-column
        label="序号"
        type="index"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="user_num"
        label="学号"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="user_phone"
        label="手机号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="canRemove"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          >移出班级</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMember, delMember, getMemberExcel } from '@/api/organize.js'
export default {
  data () {
    return {
      canRemove: false, // 默认普通用户不能将用户移出班级
      className: '',
      tableData: []
    }
  },
  created () {
    if (this.class_id) {
      this.getMember()
    } else {
      this.$message('没有绑定班级，请从应用首页进入或班级主页查看')
      this.$router.replace('/index')
    }
  },
  methods: {
    getMember () {
      getMember({
        class_id: this.class_id,
        user_id: this.$store.state.user.userId
      })
        .then(result => {
          console.log(result)
          if (result.status === 0) {
            this.className = result.class_name
            this.canRemove = result.power > 2
            this.tableData = result.data
          } else {
            this.$message('网络请求出错')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDelete (index, row) {
      delMember({ class_id: this.class_id, user_id: row.id })
        .then(result => {
          if (result.status === 0) {
            this.tableData.splice(index, 1)
            this.$message('已将成员' + row.user_name + '移出班级')
          } else {
            this.$message('操作失败')
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log('操作失败!')
        })
    },
    getMemberExcel () {
      getMemberExcel({
        class_id: this.class_id,
        user_id: this.$store.state.user.userId
      })
        .then(result => {
          console.log(result)
          if (result.status === 0) {
            window.open(result.file_url, '_blank')
          } else {
            this.$message('网络请求出错')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  props: ['class_id']
}
</script>

<style lang="scss" scoped>
.content-box {
  border: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 10px;
  min-height: 500px;
  .class-info {
    position: relative;
    padding: 0 8px;
    height: 50px;
    border-bottom: 1px solid #ccc;
    h1 {
      text-align: center;
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 50px;
    }
  }
  .member-table {
    text-align: center;
  }
}
</style>

<style lang="scss">
.upload-btn {
  position: absolute;
  right: 10px;
  top: 12px;
}
</style>
