<template>
  <CodeToken token="code-function" :tag="tag">
    <slot />
  </CodeToken>
</template>

<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
