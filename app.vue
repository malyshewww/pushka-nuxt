<template lang="pug">
	NuxtLayout
		NuxtPage
	AppPopups
</template>

<script setup>
import { useMainInfoStore } from "@/stores/maininfo";

const runtimeConfig = useRuntimeConfig();

const mainInfoStore = useMainInfoStore();

const { data: mainInfoData } = await useFetch("/wsapi/packs/site_info", {
  baseURL: `${runtimeConfig.public.apiBase}`,
});

mainInfoStore.setData(mainInfoData.value);

// const menu = [
//   {
//     title: "О проекте",
//     path: "/",
//     // hash: "#about",
//   },
//   {
//     title: "Апартаменты в продаже",
//     path: "/flats-list",
//   },
//   {
//     title: "Динамика строительства",
//     path: "/dynamic",
//   },
//   {
//     title: "Новости и акции",
//     path: "/",
//     hash: "#news",
//   },
//   {
//     title: "Паркинг",
//     path: "/parking",
//   },
//   {
//     title: "Ипотека",
//     path: "/page/text",
//   },
//   {
//     title: "Контакты",
//     path: "/contacts",
//   },
// ];

// provide("menu", menu);

onMounted(() => {
  // console.log(window.navigator.languages);
  // if (window.navigator.geolocation) {
  //    window.navigator.geolocation.getCurrentPosition(function (position) {
  //       console.log(position.coords.latitude, position.coords.longitude);
  //    });
  // } else {
  //    console.log("Geolocation is not supported by this browser.");
  // }
});
</script>

<style lang="scss">
@import "~/assets/scss/nullstyle.scss";
@import "~/assets/scss/mixins.scss";
@import "~/assets/scss/keyframes.scss";
@import "~/assets/scss/fonts.scss";
@import "~/assets/scss/common.scss";

body.page--home {
  font-family: var(--second-family);
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.3s ease;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }
</style>
