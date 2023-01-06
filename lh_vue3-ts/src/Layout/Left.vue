<template>
  <div class="left">
    <div class="logo">logo</div>
    <div class="nav">
      <div class="nav_title">菜单</div>
      <div>
        <n-menu :options="menu" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import {
  LaptopOutline as WorkIcon,
  HomeOutline as HomeIcon
} from '@vicons/ionicons5';
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
import { h, Component, computed } from 'vue';
import { usePermissionStore } from '@/store/model/permission';
// import { isExternal } from '@/utils';
const permissionStore = usePermissionStore();
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menu = computed((): any => {
  return permissionStore.menus.map((item: any) => getMenuItem(item));
});
function isExternal(path: any) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
const resolvePath = (basePath: any, path: any) => {
  if (isExternal(path)) {
    return path;
  }
  return (
    '/' +
    [basePath, path]
      .filter((path) => !!path && path !== '/')
      .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
      .join('/')
  );
};
const getMenuItem = (route: any, basePath = '') => {
  const menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    // icon: getIcon(route.meta),
    order: route.meta?.order || 0
  };
  return menuItem;
};
// const menu: MenuOption[] = [
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             path: '/'
//           }
//         },
//         { default: () => '主页' }
//       ),
//     key: 'home',
//     icon: renderIcon(HomeIcon)
//   },
//   {
//     label: () =>
//       h(
//         RouterLink,
//         {
//           to: {
//             path: '/write'
//           }
//         },
//         { default: () => '撰写' }
//       ),
//     key: 'write',
//     icon: renderIcon(WorkIcon)
//   }
// ];
</script>
<style scoped lang="scss">
.left {
  position: fixed;
  min-width: 272px;
}
.logo {
  font-size: 20px;
  text-align: center;
  font-weight: $text-weight;
  height: $header-hight;
  line-height: $header-hight;
  padding: 0px 20px;
}
.nav {
  padding: 0px 20px;
  .nav_title {
    font-size: 16px;
    font-weight: $text-weight;
  }
}
</style>
