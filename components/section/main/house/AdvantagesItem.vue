<template lang="pug">
	.house-advantage
		.house-advantage__icon
		.house-advantage__title {{ item.title }}
		.house-advantage__text(v-html="item.text")
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.house-advantage {
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: start;
  justify-items: start;
  gap: 9px 24px;
  @media screen and (max-width: $xl) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  &__icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    grid-row: span 2;
    &::before {
      content: "";
      display: block;
      width: 48px;
      height: 48px;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: 40px 40px;
      background-color: var(--main-color);
      @media screen and (max-width: $xl) {
        mask-size: 24px 24px;
        width: 32px;
        height: 32px;
      }
    }
    @media screen and (max-width: $xl) {
      margin-bottom: 16px;
      width: 32px;
      height: 32px;
      grid-row: initial;
    }
    @media screen and (max-width: $md) {
      margin: 0;
    }
  }
  &__title {
    grid-column: 2 / -1;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    text-transform: uppercase;
    color: var(--text-midnight-100);
    @media screen and (max-width: $xl) {
      grid-column: 1 / -1;
      font-size: 14px;
      line-height: 18px;
      max-width: 200px;
    }
  }
  &__text {
    grid-column: 2 / -1;
    font-weight: 600;
    line-height: 22px;
    color: var(--text-gray);
    font-family: var(--font-family);
    @media screen and (max-width: $xl) {
      grid-column: 1 / -1;
      font-size: 14px;
      line-height: 20px;
    }
  }
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) .house-advantage__icon {
      &::before {
        mask-image: url("/images/icons/house-advantage-#{$i}.svg");
      }
    }
  }
}
</style>
