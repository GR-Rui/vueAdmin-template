import request from '@/utils/request'
import { apiPath } from '@/utils'

export function getMatchList(params) {
  return request({
    url: apiPath().api + '/GetMyManageBMMatchList.json',
    method: 'get',
    params
  })
}