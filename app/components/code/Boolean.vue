<template>
  <CodeToken token="code-boolean" :tag="tag">
    <slot />
  </CodeToken>
</template>

<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
