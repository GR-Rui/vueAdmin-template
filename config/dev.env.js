'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BANMA_API: '"http://test.api.snsports.cn"',
  QINIU_CDN: '"http://images.snsports.cn"'
})
