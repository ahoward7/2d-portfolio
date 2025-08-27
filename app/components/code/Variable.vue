<template>
  <CodeToken token="code-variable" :tag="tag">
    <slot />
  </CodeToken>
</template>

<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
