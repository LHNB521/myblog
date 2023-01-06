import http from '@/service/index';
import * as T from './types';

const categoryApi: T.IcategoryApi = {
  all() {
    return http.get('/category/all');
  },
  add(params) {
    return http.post('/category/add', params);
  }
};
export default categoryApi;
