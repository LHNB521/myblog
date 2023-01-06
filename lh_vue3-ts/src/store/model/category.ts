import { defineStore } from 'pinia';
import categoryApi from '@/service/api/category/category';
export const useCategoryStore = defineStore({
  id: 'categoryList',
  state: () => {
    return {
      categoryList: []
    };
  },
  getters: {
    getCategoryList: (state) => state.categoryList
  },
  actions: {
    async getCategory() {
      const List: never[] = await categoryApi.all();
      this.categoryList = List;
      return List;
    },
    async addCategory(req: any) {
      const res = await categoryApi.add(req);
      if (res.status) {
        this.getCategory();
      }
      return res.msg;
    }
  }
});
