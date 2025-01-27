<template lang="pug">
	section.main-progress
		.container
			.main-progress__wrapper
				.section-top
					.section-top__content
						h2.section-top__title.custom-title
							| Динамика 
							span.text-transparent-current
								| строительства
								nuxt-link(to="dynamic").section-top__link
				SectionMainProgressSlider(:dynamic-list="dynamicList")
</template>

<script setup>
defineProps({
  dynamicList: {
    type: Object,
    required: false,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.main-progress {
  padding: 100px 0 0;
  overflow: hidden;
  &__wrapper {
    display: grid;
    grid-template-columns: 100%;
    gap: 80px 0;
    @media screen and (max-width: $xxxl) {
      gap: 64px 0;
    }
    @media screen and (max-width: $md) {
      gap: 42px 0;
    }
  }
}
.section-top .text-transparent-current {
  display: inline-flex;
  gap: 6px 30px;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: $xl) {
    gap: 6px 16px;
  }
  @media screen and (max-width: $md) {
    align-items: flex-start;
  }
}
.section-top {
  &__title {
    @media screen and (max-width: $md) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
.section-top {
  margin-left: 214px;
  max-width: 1036px;
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
