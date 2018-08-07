import request from '@/utils/request1'

export function getMatchList(params) {
  return request({
    url: '/GetMyManageBMMatchList.json',
    method: 'get',
    params
  })
}