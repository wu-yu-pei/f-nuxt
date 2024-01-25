// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { port: 8080 },
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@unlazy/nuxt'],
});
