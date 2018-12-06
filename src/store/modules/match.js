// import { login, logout, getInfo } from '@/api/login'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { getMatchList } from '@/api/match'

const match = {
  state: {
    token: 'uwm02paoxzbgtgxen6wwzvqjvilxnuab',
    list: []
  },

  mutations: {
    SET_LIST: (state, list) => {
      state.list = list
    }
  },

  actions: {

    // 获取我的赛事列表
    GetMatchList({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMatchList().then(response => {
          // const data = response.data
          commit('SET_LIST', [{ id: 33 }])
          //   if (data.roles && data.roles.length > 0) {
          //     commit('SET_ROLES', data.roles)
          //   } else {
          //     reject('getMatchList: must be a non-null array !')
          //   }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default match
