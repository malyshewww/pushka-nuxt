<template lang="pug">
	.news-item(@click="openPopupNews(item)")
		.news-item__body
			.news-item__title {{ item.title }}
			.news-item__content
				.news-item__text(v-html="item.body")
					//- p {{item.text}}
			.news-item__bottom
				.news-item__date {{ item.field_date }}
				button(type="button").news-item__read-more читать
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["openPopupNews"]);

const openPopupNews = () => {
  emit("openPopupNews");
};
</script>

<style lang="scss" scoped>
.news-item {
  min-height: 322px;
  border: 1px solid var(--bg-gray);
  padding: 32px 35px 29px;
  transition: border-color $time;
  flex-shrink: 0;
  max-width: 530px;
  position: relative;
  @media (any-hover: hover) {
    &:hover {
      border-color: var(--text-avocado);
      cursor: pointer;
      & .news-item__read-more {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
  @media screen and (max-width: $xxxl) {
    max-width: 485px;
    min-height: 288px;
  }
  @media screen and (max-width: $xl) {
    min-height: 246px;
    padding: 20px 34px;
    font-size: 14px;
    line-height: 20px;
  }
  @media screen and (max-width: $md) {
    max-width: 100%;
    min-height: 229px;
    font-size: 13px;
    line-height: 18px;
    padding: 16px;
    padding-bottom: 12px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    gap: 26px;
    height: 100%;
    @media screen and (max-width: $xxxl) {
      gap: 24px;
    }
    @media screen and (max-width: $md) {
      gap: 14px;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    text-transform: uppercase;
    @media screen and (max-width: $xl) {
      font-size: 18px;
      line-height: 20px;
    }
    @media screen and (max-width: $md) {
      font-size: 16px;
      line-height: 21px;
    }
  }
  &__text {
    line-height: 19px;
    font-family: var(--font-family);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    & p {
      display: inline;
    }
    @media screen and (max-width: $xl) {
      line-height: 20px;
    }
    @media screen and (max-width: $md) {
      line-height: 18px;
    }
  }
  &__date {
    line-height: 22px;
    font-family: var(--font-family);
    @media screen and (max-width: $xl) {
      line-height: 20px;
    }
    @media screen and (max-width: $md) {
      line-height: 18px;
    }
  }
  &__read-more {
    font-weight: 700;
    line-height: 20px;
    color: var(--text-avocado);
    opacity: 0;
    transform: translate3d(10px, 0, 0);
    transition: opacity $time, transform $time;
    @media screen and (max-width: $xl) {
      opacity: 1;
      transform: none;
    }
  }
  &__bottom {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
