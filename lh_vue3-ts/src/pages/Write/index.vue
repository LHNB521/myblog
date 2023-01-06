<template>
  <v-md-editor
    v-model="text"
    class="v-md-editor"
    left-toolbar="undo redo | image save"
    right-toolbar="preview  fullscreen"
    @save="saveHandle"
  />
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    size="huge"
    :style="bodyStyle"
    :segmented="segmented"
    title="分类"
  >
    <span>选择或输入添加分类：</span>
    <n-select v-model:value="selectValue" filterable tag :options="options" />
    <template #footer>
      <n-button type="primary" @click="onPositiveClick"> 确认 </n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCategoryStore } from '@/store/model/category';
import { useMessage } from 'naive-ui';
import saveApi from '@/service/api/save/save';
const message = useMessage();
const categoryStore = useCategoryStore();
const text = ref<string>('');
const toolbar = ref<string>('');
const showModal = ref<boolean>(false);
const bodyStyle = ref<object>({
  width: '600px'
});
const segmented = ref<object>({
  content: 'soft',
  footer: 'soft'
});
const selectValue = ref<string>('');
const options = ref<any>([]);
// 点击保存
const saveHandle = async (md: string, html: string) => {
  showModal.value = true;
  const req = {
    article_title: '标题',
    article_content: md
  };
  const res = await saveApi.save(req);
  if (res?.status) {
    message.success('已保存');
  } else {
    message.error('保存失败');
  }
  options.value.length ? '' : getCategory();
};
// 获取分类列表
const getCategory = async () => {
  const res = categoryStore.categoryList.length
    ? categoryStore.categoryList
    : await categoryStore.getCategory();
  res.forEach((item: any) => {
    const { category_name } = item;
    const option = {
      label: category_name,
      value: category_name
    };
    options.value.push(option);
  });
};
// 点击确认
const onPositiveClick = () => {
  showModal.value = false;
  const result = options.value.some((item: any) => {
    if (item.value === selectValue.value) {
      return true;
    }
  });
  result ? '' : addCategory();
};
// 添加分类
const addCategory = async () => {
  const req = {
    category_name: selectValue.value,
    category_description: `这是${selectValue.value}`
  };
  const res = await categoryStore.addCategory(req);
  message.info(res);
  showModal.value = false;
  options.value = [];
  selectValue.value = '';
};
</script>

<style scoped lang="scss">
.v-md-editor {
  min-height: 70vh;
}
</style>
