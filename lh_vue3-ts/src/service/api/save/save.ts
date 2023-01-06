import http from '@/service/index';
import * as T from './types';

const saveApi: T.ISaveApi = {
  save(params) {
    return http.post('/document/add', params);
  }
};
export default saveApi;
