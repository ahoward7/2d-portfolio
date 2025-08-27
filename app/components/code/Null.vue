<template>
  <CodeToken token="code-null" :tag="tag">
    <slot />
  </CodeToken>
</template>

<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
