<template>
  <v-md-editor :model-value="text" mode="preview" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      text: '# 主页'
    };
  }
});
</script>

<style lang="scss" scoped></style>
