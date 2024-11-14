<template lang="pug">
	section.main-news#news
		.container
			.main-news__wrapper
				.section-top
					.section-top__content
						h2.section-top__title.custom-title
							| Новости #[span.text-transparent-current и&nbsp;акции]
				SectionMainNewsSlider(:news-list="newsList")
</template>

<script setup>
defineProps({
   newsList: {
      type: Array,
      required: true,
   },
});
</script>

<style lang="scss" scoped>
.main-news {
   padding: 110px 0px;
   overflow: hidden;
   &__wrapper {
      display: grid;
      grid-template-columns: 100%;
      gap: 90px 0;
      @media screen and (max-width: $xxxl) {
         gap: 64px 0;
      }
      @media screen and (max-width: $md) {
         gap: 42px 0;
      }
   }
}
.section-top {
   margin-left: 214px;
   max-width: 687px;
   &__content {
      width: 100%;
   }
   &__title {
      & span {
         margin-left: auto;
         @media screen and (max-width: $xxxl) {
            margin-left: 0;
         }
      }
      @media screen and (max-width: $xl) {
         gap: 0 8px;
      }
   }
   @media screen and (max-width: $xxxl) {
      max-width: 100%;
      margin-left: 0;
   }
}
</style>
