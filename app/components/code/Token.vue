<template>
  <component :is="tag" class="font-ibmmon" :class="tokenClass" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
type Token =
  | 'code-string'
  | 'code-number'
  | 'code-boolean'
  | 'code-null'
  | 'code-keyword'
  | 'code-function'
  | 'code-variable'
  | 'code-property'
  | 'code-operator'
  | 'code-punctuation'
  | 'code-comment'

const { token, tag = 'code' } = defineProps<{
  token: Token
  tag?: string
}>()

const TOKEN_CLASSES: Record<Token, string> = {
  'code-string': 'text-code-string',
  'code-number': 'text-code-number',
  'code-boolean': 'text-code-boolean',
  'code-null': 'text-code-null',
  'code-keyword': 'text-code-keyword',
  'code-function': 'text-code-function',
  'code-variable': 'text-code-variable',
  'code-property': 'text-code-property',
  'code-operator': 'text-code-operator',
  'code-punctuation': 'text-code-punctuation',
  'code-comment': 'text-code-comment'
}

const tokenClass = computed(() => TOKEN_CLASSES[token])
</script>
