import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';
import { routes } from './routes';
const isHash = import.meta.env.VITE_USE_HASH === 'true';
export default createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
