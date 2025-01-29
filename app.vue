<template lang="pug">
	NuxtLayout
		NuxtPage
	AppPopups
	AppLoader(v-if="appStore.isLoading")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
import { useAppStore } from "~/stores/app";

const runtimeConfig = useRuntimeConfig();

const mainInfoStore = useMainInfoStore();

const appStore = useAppStore();

const { data: mainInfoData } = await useFetch("/wsapi/packs/site_info", {
  baseURL: `${runtimeConfig.public.apiBase}`,
});

mainInfoStore.setData(mainInfoData.value);

// const nuxtApp = useNuxtApp();

onNuxtReady(() => {
  appStore.isLoading = false;
});

onMounted(() => {
  // console.log(window.navigator.languages);
  // if (window.navigator.geolocation) {
  //    window.navigator.geolocation.getCurrentPosition(function (position) {
  //       console.log(position.coords.latitude, position.coords.longitude);
  //    });
  // } else {
  //    console.log("Geolocation is not supported by this browser.");
  // }

  // Компенсация ширины полосы прокрути при открытии модального окна fancybox
  const wrapper = document.querySelector(".wrapper");
  if (wrapper) {
    const scrollWidth =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    document.documentElement.style.setProperty(
      "--scroll-width",
      `${scrollWidth}`
    );
  }
});
</script>

<style lang="scss">
@import "assets/scss/mixins";
@import "assets/scss/fonts";
@import "assets/scss/nullstyle";
@import "assets/scss/keyframes";
@import "assets/scss/common";

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
