import qs from 'qs';
import storage from 'store';
import * as API from '@/api';
import router from '@/router';

const USER_TOKEN = 'USER_TOKEN';

const state = {
  token: storage.get(USER_TOKEN),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
    storage.set(USER_TOKEN, token);
  },
};

const actions = {
  login({ commit }, data) {
    console.log(data);
    commit('SET_TOKEN', '');
    sessionStorage.removeItem('UserData');
    return new Promise((resolve, reject) => {
      // const { username, password, imageCode } = data;
      API.postUserApi('auth/form', qs.stringify(data))
        .then(async (res) => {
          // access_token: 'mXSEER45HVf-BT3tbySye1xN8EY';
          // expires_in: 2590263;
          // refresh_token: '3ZbQD5SLU__lXF0FkqSq6NowXus';
          // scope: 'all';
          // token_type: 'bearer';
          if (res.code === 200) {
            const { access_token } = res.result;
            commit('SET_TOKEN', access_token);

            API.postUserApi('user/getUserInfo')
              .then((resData) => {
                if (resData.code === 200) {
                  sessionStorage.setItem('UserData', JSON.stringify(resData.result)); // 存储用户信息
                }
              })
              .catch(() => {});
            resolve();
          } else {
            reject(res.message);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  userLogout({ commit }) {
    return new Promise((resolve) => {
      API.postUserApi('auth/logout')
        .then(() => {
          // resolve();
        })
        .finally(() => {
          // 清空用户状态

          commit('SET_TOKEN', '');
          sessionStorage.removeItem('UserData'); // 存储用户信息

          router.replace('/login');

          resolve();
        });
    });
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');

      router.replace('/login');

      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
