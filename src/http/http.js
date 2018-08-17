import axios from 'axios';
import config from './config';
import qs from 'qs';

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options,Vue) {
  return new Promise((resolve, reject) => {
    let router = Vue.$router;
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function (data) {
      }]
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        config.data = qs.stringify(config.data)
        return config
      },
      error => {
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        return data;
      },
      err => {
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res);
      return false
    }).catch( error => {
       reject(error)
    })
  })
}
