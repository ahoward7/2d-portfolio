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
        <div v-for="(entry, index) in history" :key="index">
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
            v-model="userInput"
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
          @click="onConfirm(true)"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userInput = ref('')
const history = ref<HistoryEntry[]>([])
const inputEl = ref<HTMLTextAreaElement | null>(null)
const confirming = ref(false)
const confirmInput = ref('')
const confirmEl = ref<HTMLInputElement | null>(null)
// Mail composable provided by nuxt-mail
const mail = useMail()

// Utilities
function focusRef<T extends HTMLElement>(el: Ref<T | null>) {
  nextTick(() => el.value?.focus())
}

function focusInput() {
  focusRef(inputEl)
}

function append(userMessage: string, systemResponse: string, confirmValue?: string) {
  history.value.push({ message: userMessage, response: systemResponse, confirm: confirmValue })
}

function resetConfirm() {
  confirming.value = false
  confirmInput.value = ''
}

function resetMessageAndFocus() {
  resetConfirm()
  userInput.value = ''
  focusRef(inputEl)
}

function autoGrow(e: Event) {
  const el = (e.target as HTMLTextAreaElement)
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

function scrollBottom() {
  nextTick(() => window.scrollTo({ top: document.body.scrollHeight }))
}

watch(() => history.value.length, async () => {
  await nextTick()
  scrollBottom()
})

function resolveCommand(raw: string): boolean {
  const cmd = raw.trim()
  switch (cmd.toLowerCase()) {
    case 'clear':
      clearConsole()
      return true
    default:
      return false
  }
}

// Interaction functions
function onEnter() {
  const text = userInput.value.trim()
  if (!confirming.value) {
    if (!text) {
      append('', 'Error: Message cannot be empty.')
      focusRef(inputEl)
      return
    }
    if (resolveCommand(text)) {
      return
    }
    confirming.value = true
    focusRef(confirmEl)
    return
  }
  onConfirm()
}

function onConfirm(override: boolean = false) {
  const val = confirmInput.value.trim().toLowerCase()
  const decision = override ? 'y' : val
  if (decision === 'y') {
    handleSubmit(decision)
    resetConfirm()
    focusRef(inputEl)
    return
  }
  if (decision === 'n') {
    resetConfirm()
    focusRef(inputEl)
  }
}

function handleSubmit(confirmValue?: string) {
  append(userInput.value, 'Sending…', confirmValue)
  const idx = history.value.length - 1
  if (idx < 0) {
    resetMessageAndFocus()
    return
  }
  const entry = history.value[idx]!

  const subject = 'Portfolio Contact'
  const text = userInput.value

  if (!mail || typeof (mail as any).send !== 'function') {
    entry.response = 'Error: Mail module unavailable.'
    resetMessageAndFocus()
    return
  }

  Promise.resolve(mail.send({ subject, text }))
    .then(() => {
      entry.response = 'Message sent successfully.'
    })
    .catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      entry.response = `Failed to send message: ${msg}`
    })
    .finally(() => {
      resetMessageAndFocus()
    })
}

function onCtrlC() {
  append(userInput.value, 'Aborted', confirmInput.value || undefined)
  resetMessageAndFocus()
}

function clearConsole() {
  history.value = []
  resetMessageAndFocus()
}

function onConfirmInput() {
  if (confirmInput.value.length === 1) {
    onConfirm()
  }
}
</script>
