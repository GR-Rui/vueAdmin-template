<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6" v-for="(o, index) in list" :key="o.id" :offset="index > 0 ? 0 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img v-if="o.icon" v-bind:src="imgFormat(o.icon)" class="image">
          <!-- 默认赛事图标 -->
          <img v-else v-bind:src="imgFormat('FpQYAkEL3KEM4DvunzsprUAhnU8p')" class="image">
          <div style="padding: 14px;">
            <span>{{matchStatusFormat(o.state, o.status)}}</span>
            <div class="bottom clearfix">
              <time class="time">xxxxx</time>
              <el-button type="text" class="button" @click="goDetails(o.id)">操作按钮</el-button>
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
import { imageView, matchStatusMap } from '@/utils'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  computed:{
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
    },
    imgFormat(hash) {
      return imageView(hash, 100, 100, 1)
    },
    matchStatusFormat(state, status) {
      return matchStatusMap(state, status)
    }
  }
}
</script>
