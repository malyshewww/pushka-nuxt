<template lang="pug">
	.text-page
		BreadCrumbs(:list="pageText.breadcrumb")
		.container
			.main__heading.heading-main
				h1.heading-main__title {{ pageText.main.title }}
			//- eslint-disable vue/no-v-html
			.content(v-html="pageText.main.content")
			.galleries(v-if="pageText.main.gallery.length > 0")
				//- SliderGallery(:slider="slider" slider-caption="Варианты дизайнерской отделки" :isDescr="true")
				StaticGallery(:gallery="pageText.main.gallery")
</template>

<script setup>
const { text } = useRoute().params;

const runtimeConfig = useRuntimeConfig();
const { data: pageText } = await useAsyncData(
  "pageText",
  () => $fetch(`${runtimeConfig.public.apiBase}/page/${text}?_format=json`, {}),
  {
    transform: (res) => {
      console.log(res);
      const { breadcrumb, data, metatag } = res;
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

const device = useDevice();

onMounted(() => {
  if (device.isMobileOrTablet) {
    const tables = document.querySelectorAll(".content table");
    if (tables.length > 0) {
      for (const table of tables) {
        const tableWrap = document.createElement("div");
        tableWrap.classList.add("table-wrap");
        table.parentNode.insertBefore(tableWrap, table);
        tableWrap.appendChild(table);
      }
    }
  }
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
