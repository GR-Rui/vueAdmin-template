import request from '@/utils/request'
import { apiPath } from '@/utils'

export function login(username, password) {
  const params = {
    username: username,
    password: password
  }
  return request({
    url: apiPath().auth + '/login.do',
    method: 'post',
    {params:111}
  })
}

export function getInfo(token) {
  var params = {
    passport: token
  }
  return request({
    url: apiPath().api + '/GetUserInfo.do',
    method: 'get',
    params
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
