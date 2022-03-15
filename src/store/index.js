/**
 * vuex状态管理
 */
import {createStore} from 'vuex';
import getters from './getters';
import theme from './modules/theme';
import user from './modules/user';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    theme,
    user
  },
  getters
});
