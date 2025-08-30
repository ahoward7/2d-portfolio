import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    'nuxt-mail'
  ],
  mail: {
    message: {
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM ?? process.env.GMAIL_USER
    },
    smtp: {
      host: process.env.GMAIL_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.GMAIL_PORT ?? 465),
      secure: (process.env.GMAIL_SECURE ?? 'true') === 'true',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    }
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  eslint: {
    config: {
      standalone: false
    }
  }
})