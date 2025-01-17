// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import autoprefixer from "autoprefixer";
import postCssSortMediaQueries from "postcss-sort-media-queries";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/device", "@nuxt/image"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL,
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        {
          rel: "preload",
          href: "/fonts/Manrope-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
      meta: [
        { charset: "utf-8" },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no",
        },
        {
          hid: "apple-mobile-web-app-title",
          name: "apple-mobile-web-app-title",
          content: "Название",
        },
        {
          hid: "mobile-web-app-capable",
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "telephone=no",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "address=no",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "email=no",
        },
        {
          hid: "format-detection",
          name: "format-detection",
          content: "date=no",
        },
        {
          name: "robots",
          content: "noindex,follow",
        },
      ],
    },
  },
  // site: { url: "http://localhost:3000" },
  ssr: true,
  vite: {
    server: {
      port: 3001,
      host: "0.0.0.0",
      strictPort: true,
      hmr: {
        port: 3001,
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    css: {
      postcss: {
        plugins: [
          postCssSortMediaQueries({ sort: "desktop-first" }),
          autoprefixer({
            overrideBrowserslist: ["last 3 versions", "ie >= 10"],
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "sass:math"; @use "~/assets/scss/mixins.scss" as *; @import "~/assets/scss/variables.scss";',
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
});
