<template>
  <div class="mt-4 grow bg-zinc-900 rounded-lg shadow-lg text-zinc-200 border border-zinc-800" @click="focusInput">
    <div class="flex items-center px-4 py-2 bg-zinc-800 rounded-t-lg border-b border-zinc-800">
      <span class="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5 inline-block" />
      <span class="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-1.5 inline-block" />
      <span class="w-2.5 h-2.5 rounded-full bg-green-500 mr-4 inline-block" />
      <span class="ml-4 text-sm text-zinc-400 tracking-wider">Contact Me</span>
    </div>
    <div class="text-sm lg:text-base">
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
          <div class="h-5 indent-[19px] mt-2" :class="responseClass(entry.response)">
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

function responseClass(msg: string): string {
  const t = msg.toLowerCase()
  if (t.startsWith('error') || t.includes('failed')) return 'text-red-400'
  if (t.includes('success')) return 'text-green-400'
  return 'text-yellow-400'
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
    const message = userInput.value.trim()
    if (!message) {
      append('', 'Error: Message cannot be empty.')
      resetConfirm()
      focusRef(inputEl)
      return
    }
    handleSubmit(message, decision)
    resetConfirm()
    focusRef(inputEl)
    return
  }
  if (decision === 'n') {
    resetConfirm()
    focusRef(inputEl)
  }
}

function handleSubmit(message: string, confirmValue?: string) {
  userInput.value = ''

  append(message, 'Sending…', confirmValue)
  const idx = history.value.length - 1
  if (idx < 0) {
    resetMessageAndFocus()
    return
  }
  const entry = history.value[idx]!

  const subject = 'Portfolio Contact'
  const text = message

  if (!mail || typeof (mail as any).send !== 'function') {
    entry.response = 'Error: Mail module unavailable.'
    resetMessageAndFocus()
    return
  }

  Promise.resolve(mail.send({ subject, text }))
    .then(() => {
      entry.response = 'Message sent successfully.'
    })
    .catch((_err: unknown) => {
      entry.response = 'Failed to send message.'
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
