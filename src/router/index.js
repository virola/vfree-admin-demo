/**
 * 路由配置
 */
import {createRouter, createWebHistory} from 'vue-router';
import store from '../store';
import setting from '../config/setting';
import EleLayout from '../layout';
import {EleEmptyLayout, EleIframeLayout} from 'ele-admin-pro';
import NProgress from 'nprogress';

// 静态路由
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: {title: '登录'}
  },
  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    meta: {title: '忘记密码'}
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/exception/404'),
    meta: {title: '404'}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  updateTitle(to);
  // 判断是否登录
  if (setting.takeToken()) {
    // 判断是否已经注册动态路由
    if (!store.state.user.menus) {
      // 获取动态路由
      store.dispatch('user/getMenus').then(({menus, home}) => {
        if (menus) {
          router.addRoute({
            name: '/',
            path: '/',
            component: EleLayout,
            redirect: setting.homePath || home,
            children: menuToRoutes(menus)
          });
        }
        next({...to, replace: true});
      }).catch(() => {
        next();
      });
    } else {
      next();
    }
  } else if (setting.whiteList.indexOf(to.path) !== -1) {
    next();  // 在无需登录的白名单内
  } else {
    // 未登录跳转登录页面
    next({path: '/login', query: to.path === '/' ? {} : {from: to.path}});
  }
});

router.afterEach(() => {
  setTimeout(() => {
    NProgress.done(true);
  }, 300);
});

export default router;

/**
 * 菜单生成路由
 * @param menus
 * @returns {[]}
 */
function menuToRoutes(menus) {
  if (!menus) {
    return null;
  }
  let routes = [];
  menus.forEach(item => {
    const path = item.path;
    if (path && !isUrl(path)) {
      let meta = Object.assign({}, item.meta);
      let component;
      if (item.component) {
        if (isUrl(item.component)) {
          component = EleIframeLayout;
          meta.iframe = item.component;
        } else {
          component = () => import('@/views' + item.component);
        }
      } else {
        component = EleEmptyLayout;
      }
      routes.push({
        meta: meta,
        name: item.path,
        path: item.path,
        component: component,
        redirect: item.redirect,
        children: menuToRoutes(item.children)
      });
    }
  });
  return routes;
}

/**
 * 判断是否是网址
 * @param url
 */
function isUrl(url) {
  return url && (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//')
  );
}

/**
 * 更新浏览器标题
 * @param route
 */
function updateTitle(route) {
  let names = [];
  if (route && route.meta && route.meta.title) {
    names.push(route.meta.title);
  }
  const appName = process.env.VUE_APP_NAME;
  if (appName) {
    names.push(appName);
  }
  document.title = names.join(' - ');
}
