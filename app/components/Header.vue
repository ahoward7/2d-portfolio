<template>
  <div class="flex flex-col gap-2">
    <div>{{ `<div class="text-9xl p-4">` }}</div>
    <div class="text-9xl pb-4 px-4 -mt-1 flex">
      <CodeString>
        "<ClientOnly>
          <span class="relative">
            <span>{{ displayed }}</span>
            <span
              v-if="!showSemicolon"
              aria-hidden="true"
              class="pointer-events-none absolute left-full top-4 w-2 h-32 bg-[currentColor]"
            />
          </span>
          <template #fallback>
            {{ '{ user.name }' }}
          </template>
        </ClientOnly>"
      </CodeString>
      <CodePunctuation v-show="showSemicolon">
        ;
      </CodePunctuation>
    </div>
    <div>{{ `</div>` }}</div>
  </div>
</template>

<script setup lang="ts">
const fullText = 'avery howard'
const displayed = ref('')
const showSemicolon = ref(false)
const speed = 80
let timer: number | undefined
let reduceMotion = false

onMounted(() => {
  try {
    reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }
  catch {
    reduceMotion = false
  }

  if (reduceMotion) {
    displayed.value = fullText
    showSemicolon.value = true
    return
  }

  let i = 0
  timer = window.setInterval(() => {
    if (i < fullText.length) {
      displayed.value += fullText[i]
      i++
    }
    else {
      if (timer) {
        clearInterval(timer)
        timer = undefined
      }
      setTimeout(() => {
        showSemicolon.value = true
      }, 250)
    }
  }, speed)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
