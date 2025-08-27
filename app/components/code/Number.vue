<template>
  <CodeToken token="code-number" :tag="tag">
    <slot />
  </CodeToken>
</template>

<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
