import { defineStore } from 'pinia';
import loginApi from '@/service/api/login/login';
export const useTokenStore = defineStore({
  id: 'token', // id必填，且需要唯一
  state: () => ({
    token: sessionStorage.getItem('token') || ''
  }),
  getters: {
    token: (state) => state.token
  },
  actions: {
    async login(params: any) {
      const { token } = await loginApi.login(params);
      if (token) {
        sessionStorage.setItem('token', token);
      }
      return token;
    }
  }
});
