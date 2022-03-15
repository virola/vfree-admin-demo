/**
 * axios配置
 */
import axios from 'axios';
import store from '../store';
import router from '../router';
import setting from './setting';
import {Modal} from 'ant-design-vue';

// 设置统一的url
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

/* 请求拦截器 */
axios.interceptors.request.use((config) => {
  // 添加token到header
  let token = setting.takeToken();
  if (token) {
    config.headers[setting.tokenHeaderName] = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

/* 响应拦截器 */
axios.interceptors.response.use(res => {
  // 登录过期处理
  if (res.data.code === 401) {
    if (res.config.url === setting.menuUrl) {
      goLogin();
    } else {
      Modal.destroyAll();
      Modal.info({
        title: '系统提示',
        content: '登录状态已过期, 请退出重新登录!',
        okText: '重新登录',
        onOk: () => {
          goLogin();
        }
      });
    }
    return Promise.reject(new Error(res.data.msg));
  } else if (res.data.code === 402) {
    Modal.destroyAll();
      Modal.info({
        title: '系统提示',
        content: res.data.msg,
        okText: '重新登录',
        onOk: () => {
          goLogin();
        }
      });
  }
  // token自动续期
  let access_token = res.headers[setting.tokenHeaderName];
  if (access_token) {
    setting.cacheToken(access_token);
  }
  return res;
}, error => {
  return Promise.reject(error);
});

/**
 * 跳转到登录页面
 */
function goLogin() {
  store.dispatch('user/removeToken').then(() => {
    const current = router.currentRoute;
    if (current && current.path && current.path !== '/') {
      router.push({
        path: '/login',
        query: {
          form: current.path
        }
      }).then(() => {
      });
    } else {
      router.push('/login').then(() => {
      });
    }
  });
}
