<template lang="pug">
	SectionMainHero
	.main-content
		//- AppHeader(:is-white="false")
		SectionMainAbout
		SectionMainLocation
		SectionMainAdvantages
		SectionMainHouse
		SectionMainScenariors
		SectionMainNews(:news-list="front.main.news")
		SectionMainProgress(:dynamic-list="front.main.dynamicList")
</template>

<script setup>
definePageMeta({
  layout: "main",
});
useHead({
  bodyAttrs: {
    class: "page--home",
  },
});

const runtimeConfig = useRuntimeConfig();
const {
  data: front,
  status,
  error,
} = await useAsyncData(
  "front",
  () =>
    $fetch(
      `${runtimeConfig.public.apiBase}/wsapi/packs/front?_format=json`,
      {}
    ),
  {
    transform: ({ data, links, meta, metatag }) => {
      const metadata = useMetatags(metatag.html_head);
      return {
        main: {
          dynamicList: data.dynamic_front,
          news: data.news_front,
        },
        metadata,
      };
    },
  }
);

useHead({
  ...front.value.metadata,
});
</script>

<style lang="scss" scoped>
.main-content {
  margin-top: 200vh;
  position: relative;
  z-index: 10;
  background-color: var(--text-white);
  overflow: clip;
  @media screen and (max-width: $xl) {
    margin-top: 0;
  }
  & section {
    padding: 110px 0;
    @media screen and (max-width: $xxxl) {
      padding: 100px 0;
    }
    @media screen and (max-width: $xl) {
      padding: 60px 0;
    }
    @media screen and (max-width: $md) {
      padding: 40px 0;
    }
    &.main-about {
      // padding-top: 200px;
      padding-top: 120px;
      @media screen and (max-width: $xxxl) {
        padding-top: 100px;
        // padding-top: 180px;
      }
      @media screen and (max-width: $xl) {
        padding-top: 80px;
        // padding-top: calc(80px + 61px);
      }
      @media screen and (max-width: $md) {
        // padding-top: calc(64px + 48px);
        padding-top: 64px;
      }
    }
    &.main-progress {
      padding-top: 100px;
      padding-bottom: 0;
      @media screen and (max-width: $xl) {
        padding-top: 60px;
        padding-bottom: 0;
      }
      @media screen and (max-width: $md) {
        padding-top: 40px;
      }
    }
    &.house-format {
      @media screen and (max-width: $xl) {
        padding-top: 67px;
      }
      @media screen and (max-width: $md) {
        padding-top: 40px;
      }
    }
  }
}
</style>
