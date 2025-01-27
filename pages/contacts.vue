<template lang="pug">
	div
		BreadCrumbs(:list="contacts.breadcrumb")
		main.main.contacts
			.container 
				.main__heading.heading-main
					h1.heading-main__title {{ contacts.main.title }}
				.contacts__body
					SectionContactsMap
					SectionContactsInfo
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const { data: contacts } = await useAsyncData(
  "contacts",
  () => $fetch(`${runtimeConfig.public.apiBase}/contacts?_format=json`, {}),
  {
    transform: (res) => {
      const { breadcrumb, data, metatag } = res;
      const metadata = useMetatags(metatag.html_head);
      return {
        breadcrumb,
        main: {
          title: data.title,
        },
        metadata,
      };
    },
  }
);

useHead({
  ...contacts.value.metadata,
});
</script>

<style lang="scss" scoped>
.contacts {
  &__body {
    display: grid;
    grid-template-columns: 1fr 496px;
    gap: 40px;
    align-items: end;
    @media screen and (max-width: $xl) {
      grid-template-columns: 100%;
      gap: 20px;
    }
  }
}
</style>
