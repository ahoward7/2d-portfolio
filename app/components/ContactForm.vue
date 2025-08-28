<template>
  <div class="mt-4 grow bg-zinc-900 rounded-lg shadow-lg text-zinc-200 border border-zinc-800" @click="focusInput">
    <div class="flex items-center px-4 py-2 bg-zinc-800 rounded-t-lg border-b border-zinc-800">
      <span class="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5 inline-block" />
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-1.5 inline-block" />
      <span class="w-2.5 h-2.5 rounded-full bg-green-500 mr-4 inline-block" />
      <span class="ml-4 text-sm text-zinc-400 tracking-wider">Contact Terminal</span>
    </div>
    <div>
      <div class="p-4 flex flex-col gap-2">
        <div v-for="entry, index in history" :key="index">
          <div class="h-5 text-sky-300">
            $ Type a message:
          </div>
          <div class="h-5 indent-[19px] mt-2">
            {{ entry.message }}
          </div>
          <div v-if="entry.confirm" class="h-5 indent-[19px] mt-2 text-zinc-400">
            Confirm: {{ entry.confirm }}
          </div>
          <div class="h-5 indent-[19px] mt-2 text-yellow-400">
            {{ entry.response }}
          </div>
        </div>
        <div class="flex flex-col gap-1 min-h-40">
          <label class="text-sky-300">$ Type a message:</label>
          <textarea
            ref="inputEl"
            v-model="message"
            class="h-fit pl-[19px] text-zinc-200 border-none rounded outline-none"
            required
            rows="1"
            @input="autoGrow"
            @keydown.enter.exact.prevent="onEnter"
            @keydown.ctrl.c.prevent="onCtrlC"
          />
          <div v-if="confirming" class="text-zinc-200 pl-[19px]">
            Confirm send? (y/n):
            <input
              ref="confirmEl"
              v-model="confirmInput"
              class="border-none rounded py-1 text-zinc-200 outline-none w-12"
              maxlength="1"
              autofocus
              @keydown.enter.prevent="onConfirm"
              @keydown.ctrl.c.prevent="onCtrlC"
              @input="onConfirmInput"
            >
          </div>
        </div>
        <button
          class="w-fit bg-sky-300 text-zinc-900 rounded px-4 py-2 cursor-pointer transition-colors hover:bg-sky-400"
          type="button"
          @click="onSendClick"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const message = ref('')
const history = ref<{ message: string; response: string; confirm?: string }[]>([])
const inputEl = ref<HTMLTextAreaElement | null>(null)
const historyEl = ref<HTMLElement | null>(null)
const confirming = ref(false)
const confirmInput = ref('')
const confirmEl = ref<HTMLInputElement | null>(null)

function append(userMessage: string, systemResponse: string, confirmValue?: string) {
  history.value.push({ message: userMessage, response: systemResponse, confirm: confirmValue })
  nextTick(() => {
    if (historyEl.value) {
      historyEl.value.scrollTo({ top: historyEl.value.scrollHeight, behavior: 'smooth' })
    }
  })
}

function resetConfirm() {
  confirming.value = false
  confirmInput.value = ''
}

function clearConsole() {
  history.value = []
  message.value = ''
  resetConfirm()
  nextTick(() => inputEl.value?.focus())
}

function onCtrlC() {
  append(message.value, 'Aborted', confirmInput.value || undefined)
  message.value = ''
  resetConfirm()
  nextTick(() => inputEl.value?.focus())
}

function onEnter() {
  if (message.value.trim().toLowerCase() === 'clear' && !confirming.value) {
    clearConsole()
    return
  }
  if (!confirming.value) {
    if (!message.value.trim()) {
      append('', 'Error: Message cannot be empty.')
      nextTick(() => inputEl.value?.focus())
      return
    }
    confirming.value = true
    nextTick(() => confirmEl.value?.focus())
  }
  else {
    onConfirm()
  }
}

function onSendClick() {
  if (!confirming.value) {
    if (!message.value.trim()) {
      append('', 'Error: Message cannot be empty.')
      nextTick(() => inputEl.value?.focus())
      return
    }
    confirming.value = true
    nextTick(() => confirmEl.value?.focus())
  }
}

function onConfirmInput() {
  if (confirmInput.value.length === 1) {
    onConfirm()
  }
}

function onConfirm() {
  const val = confirmInput.value.trim().toLowerCase()
  if (val === 'y') {
    handleSubmit(val)
    resetConfirm()
  }
  else if (val === 'n') {
    resetConfirm()
    nextTick(() => inputEl.value?.focus())
  }
}

function handleSubmit(confirmValue?: string) {
  append(message.value, 'Message not sent: Feature is still in development', confirmValue)
  message.value = ''
  nextTick(() => inputEl.value?.focus())

  nextTick(() => window.scrollTo({
    top: document.body.scrollHeight
  }))
}

function focusInput() {
  nextTick(() => inputEl.value?.focus())
}

function autoGrow(e: Event) {
  const el = (e.target as HTMLTextAreaElement)
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight  }px`
}
</script>
