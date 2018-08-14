import request from '@/utils/request'
import { apiPath } from '@/utils'

export function getMatchList(params) {
  return request({
    url: apiPath().api + '/GetMyManageBMMatchList.json',
    method: 'get',
    params
  })
}

export function getQiniuToken(params) {
  return request({
    url: apiPath().api + '/GetQiniuUploadToken.json',
    method: 'get',
    params
  })
}