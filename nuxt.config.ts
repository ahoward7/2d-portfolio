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
  runtimeConfig: {
    mail: {
      message: {
        to: process.env.MAIL_TO
      },
      smtp: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.MAIL_PORT || 465),
        secure: (process.env.MAIL_SECURE ?? 'true') === 'true',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      }
    },
    public: {}
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