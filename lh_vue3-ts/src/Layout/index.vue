<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider bordered="true">
        <Left />
      </n-layout-sider>

      <n-layout>
        <n-layout-header>
          <Header />
        </n-layout-header>

        <n-layout-content content-style="padding: 24px;">
          <Main />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Main from './Main.vue';
import Footer from './Footer.vue';
import Left from './Left.vue';
</script>

<style scoped lang="scss">
.n-layout-header {
  padding: 20px;
  height: $header-hight;
}
</style>
