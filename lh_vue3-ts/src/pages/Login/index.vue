<template>
  <n-space vertical size="large">
    <n-layout>
      <n-spin :show="show">
        <n-layout-header>后台管理系统</n-layout-header>
        <n-layout-content>
          <n-form ref="formRef" :model="from" :rules="rules">
            <n-form-item path="username" label="账号">
              <n-input v-model:value="from.username" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="password" label="密码">
              <n-input
                v-model:value="from.password"
                type="password"
                @keydown.enter.prevent
              />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="handleLoginClick">
                登录
              </n-button>
            </div>
          </n-form>
        </n-layout-content>
        <template #description> 登录中。。。 </template>
      </n-spin>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { FormInst, FormRules, useMessage } from 'naive-ui';
import { useTokenStore } from '@/store/model/token';
import { useRouter } from 'vue-router';
interface ModelType {
  password: string | null;
  username: string | null;
}

export default {
  name: 'Login',
  setup() {
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const show = ref(false);
    const tokenStore = useTokenStore();
    const router = useRouter();
    const from = reactive<ModelType>({
      username: '',
      password: ''
    });

    const rules: FormRules = {
      username: [
        {
          required: true,
          message: '请输入账号'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ]
    };
    // 点击登录
    const handleLoginClick = () => {
      show.value = true;
      formRef.value?.validate(async (valid) => {
        if (!valid) {
          await tokenStore.login(from).then((res) => {
            if (res) {
              message.success('登陆成功');
              router.push({
                path: '/'
              });
            } else {
              message.error('登录失败');
            }
          });
          show.value = false;
        } else {
          show.value = false;
          const msg = valid[0][0].message;
          message.error(`${msg}`);
        }
      });
    };
    return {
      formRef,
      from,
      rules,
      show,
      handleLoginClick
    };
  }
};
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.4);
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
}
.n-layout-footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.n-layout-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 150px;
}
</style>
