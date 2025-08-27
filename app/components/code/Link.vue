<template>
  <CodeToken token="code-url" class="hover:underline cursor-pointer">
    <NuxtLink :to="url" target="_blank">
      <slot>{{ url }}</slot>
    </NuxtLink>
  </CodeToken>
</template>

<script setup lang="ts">
defineProps<{ url: string }>()
</script>
