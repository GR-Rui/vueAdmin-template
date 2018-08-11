<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6" v-for="(o, index) in list" :key="o.id" :offset="index > 0 ? 0 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://7xkufz.com2.z0.glb.qiniucdn.com/Fq3fB5B1tF8F1KugEe9EfWYhQ0pa?imageView2/0/w/256" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">xxxxx</time>
              <el-button type="text" class="button" @click.native="goDetails(o.id)">操作按钮</el-button>
              <router-link :to="{name: 'dashboard-index', params: {id: o.id}}">dddddddddd</router-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMatchList } from '@/api/match'
import router from '@/router'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMatchList().then(
        response => {
          const data = response.data
          this.list = data.matches
          this.listLoading = false
        }
      )
    },
    goDetails(id) {
      router.push({ name: 'dashboard-index', params: { id: id }})
    }
  }
}
</script>
