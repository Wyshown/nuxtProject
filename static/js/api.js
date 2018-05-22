import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;sessionid=hanwuqia'
const rootUrl= 'http://localhost:3000/api/'

axios.defaults.timeout = 5000
axios.defaults.baseUrl = rootUrl
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/**
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 // 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */
function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  // let token = ''

  // 增加请求的token
  // if ( process.browser ) { 
  //   token = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')).token : ''
  // }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: rootUrl,
    withCredentials: false
    // headers: { 'token': token }
  })
    .then( function ( res ) {
      if (res.status === 200) {
        if (success) {
          success(res.data)
        }
      } else if (res.status === 404) {
        this.$router.push({path: '/showError'})
      } else {
        if (failure) {
          failure(res.data)
        } else {
          window.alert('error: ' + JSON.stringify(res.data))
        }
      }
    })
    .catch(function (err) {
      let res = err.response

      if (err && failure) {
        failure(res) //
        window.alert('api error, HTTP CODE: ' + res.status)
        // vue.$message.error('请求错误，错误码：' + res.status);
      }
    })
}

// 返回在vue模板中的调用接口
let apiAjax = {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}

export {apiAjax, rootUrl}