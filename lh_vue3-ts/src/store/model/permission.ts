import { defineStore } from 'pinia';
import { routes } from '@/router/routes';

export const usePermissionStore = defineStore({
  id: 'permission',
  state() {
    return {
      accessRoutes: []
    };
  },
  getters: {
    routesHandle(state): any {
      return routes.concat(state.accessRoutes);
    },
    menus(): [] {
      return this.routesHandle.filter((route: any) => route.name);
    }
  }
});
