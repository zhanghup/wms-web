import axios from 'axios'

import {
  Message
} from 'element-ui'

const BaseUrl = process.env.BASE_URL
const urls = {
  'login': '/login',
  'userGet': '/user/get',
  'dictList': '/dict/list',
  'dictItems': '/dictitem/list',

  ...CUD('user', '/user'),
  ...CUD('dict', '/dict'),
  ...CUD('dictitem', '/dictitem')
}

let https = {}

function CUD (name, prefix) {
  let obj = {}
  obj[name + 'Create'] = `${prefix}/create`
  obj[name + 'Update'] = `${prefix}/update`
  obj[name + 'Delete'] = `${prefix}/delete`
  return obj
};

(function () {
  axios.defaults.timeout = 5000
  axios.defaults.baseURL = BaseUrl

  // http request 拦截器
  axios.interceptors.request.use(
    config => {
      // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
      config.data = JSON.stringify(config.data)
      config.headers = {
        'Content-Type': 'application/json'
      }
      return config
    }
  )

  axios.interceptors.response.use(
    response => {
      if (response.status === 200) {

      }
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  const exclude = ['/login.html']

  function post (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          if (response.data.code === 0) {
            resolve(response.data.data)
          } else {
            Message.error(response.data.message)
            reject(response.data)
          }
        }, err => {
          if (err.response.status === 401) {
            if (!exclude.includes(location.pathname)) {
              location.href = '/login.html?redirect=' + encodeURIComponent(location.href)
              return
            }
          }
          reject(err)
        })
    })
  }

  function action (url) {
    return function (param) {
      return post(url, param)
    }
  }

  for (let k in urls) {
    https[k] = action(urls[k])
  }
})()

export default https
