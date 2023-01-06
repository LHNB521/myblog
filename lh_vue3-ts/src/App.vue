<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">
import {
  NMessageProvider,
  NConfigProvider,
  GlobalThemeOverrides
} from 'naive-ui';
const themeOverrides: GlobalThemeOverrides = {
  // common: {
  //   primaryColor: '#FF0000'
  // },
  Menu: {
    itemTextColorHover: '#FF0088',
    itemTextColorActive: '#FF0088',
    itemTextColorActiveHover: '#FF0088'
  }
};
export default {
  name: 'App',
  components: { NMessageProvider, NConfigProvider },
  setup() {
    return {
      themeOverrides
    };
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
