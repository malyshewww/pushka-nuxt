<template lang="pug">
	.text-page
		BreadCrumbs(:list="pageText.breadcrumb")
		.container
			.main__heading.heading-main
				h1.heading-main__title {{pageText.main.title}}
			.content(v-html="pageText.main.content")
			.galleries(v-if="pageText.main.gallery")
				//- SliderGallery(:slider="slider" slider-caption="Варианты дизайнерской отделки" :isDescr="true")
				StaticGallery(:gallery="pageText.main.gallery")
</template>

<script setup>
const { text } = useRoute().params;

const runtimeConfig = useRuntimeConfig();
const {
  data: pageText,
  status,
  error,
} = await useAsyncData(
  "pageText",
  () => $fetch(`${runtimeConfig.public.apiBase}/page/${text}?_format=json`, {}),
  {
    transform: (res) => {
      const { breadcrumb, data, links, metatag } = res;
      const metadata = useMetatags(metatag.html_head);
      return {
        breadcrumb,
        main: {
          title: data.title,
          content: data.body[0],
          gallery: data.field_images,
        },
        metadata,
      };
    },
  }
);

useHead({
  ...pageText.value.metadata,
});
</script>

<style lang="scss" scoped>
.galleries {
  display: grid;
  grid-template-columns: 100%;
  gap: 156px;
  padding-top: 110px;
  @media screen and (max-width: $xxxl) {
    padding-top: 100px;
  }
  @media screen and (max-width: $xl) {
    padding-top: 60px;
  }
  @media screen and (max-width: $md) {
    padding-top: 40px;
  }
}
</style>
