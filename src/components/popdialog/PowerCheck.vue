<template>
  <div class="check-box text-center">
    <h2>权限审核</h2>
    <p class="minisize-p">被授权的用户可以管理公告、风采、相册以及班级成员</p>
    <div class="check-info">
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
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="user_num"
        label="学号"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            v-if="scope.row.power==2"
            @click="removePower(scope.$index, scope.row)"
          >取消授权</el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            v-else
            @click="handlePower(scope.$index, scope.row)"
          >确认授权</el-button>

        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import { getApplyList, handlePower, removePower } from '@/api/organize.js'
export default {
  name: 'PowerCheck',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getApplyList()
  },
  methods: {
    getApplyList () {
      getApplyList({ class_id: this.class_id }).then(result => {
        if (result.status === 0) {
          this.tableData = result.data
        } else {
          this.$message('网络请求错误')
        }
      })
    },
    handlePower (index, row) {
      // 确认授权
      handlePower({ class_id: this.class_id, user_id: row.user_id }).then(result => {
        if (result.status === 0) {
          this.tableData[index].power = 2
          console.log(result)
        } else {
          this.$message('网络请求错误')
        }
      })
    },
    removePower (index, row) {
      // 取消授权
      removePower({ class_id: this.class_id, user_id: row.user_id }).then(result => {
        if (result.status === 0) {
          this.tableData.splice(index, 1)
          console.log(result)
        } else {
          this.$message('网络请求错误')
        }
      })
    }
  },
  components: {},
  props: ['class_id', 'class_name']
}
</script>

<style lang="scss" scoped>
.check-box{
  h2{
    margin-top:0
  }
}
</style>
