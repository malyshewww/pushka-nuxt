<template lang="pug">
	li.advantages-card(:class="{active: activeIndex == idx}" @click="showInfo(idx)")
		.advantages-card__button
			span.advantages-card__button-icon
		.advantages-card__image.ibg
			NuxtPicture(:src="`/images/main-advantages/card-${idx+1}.jpg`" :alt="card.title")
		.advantages-card__content
			.advantages-card__description 
				p(v-for="(p, index) in card.text" :key="index") {{ p }}
		.advantages-card__title(v-html="card.title")

</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
  idx: {
    type: Number,
    required: true,
  },
  activeIndex: {
    required: true,
    type: null,
    default: () => null,
  },
});

const emit = defineEmits(["showInfo"]);

const showInfo = (idx) => {
  emit("showInfo", idx);
};
</script>

<style lang="scss" scoped>
.advantages-card {
  position: relative;
  flex-shrink: 0;
  flex-grow: 1;
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
      & .advantages-card__content {
        clip-path: circle(70.71068% at 50% 50%);
      }
      & .advantages-card__description {
        transition-duration: 0.8s;
        transition-delay: 0.1s;
        transform: translateY(0);
        opacity: 1;
      }
      & .advantages-card__button {
        opacity: 0;
      }
    }
  }
  @media (max-width: $xl) and (min-width: $md) {
    &.active {
      & .advantages-card__content {
        clip-path: circle(70.71068% at 50% 50%);
      }
      & .advantages-card__description {
        transition-duration: 0.8s;
        transition-delay: 0.1s;
        transform: translateY(0);
        opacity: 1;
      }
      & .advantages-card__button {
        opacity: 0;
      }
    }
  }
  &:nth-child(2) {
    margin-top: 80px;
    @media screen and (max-width: $xxxl) {
      margin-top: 64px;
    }
    @media screen and (max-width: $xl) {
      margin-top: 0;
    }
  }
  &:nth-child(2n + 3) {
    margin-top: -80px;
    @media screen and (max-width: $xxxl) {
      margin-top: -64px;
    }
    @media screen and (max-width: $xl) {
      margin-top: 0;
    }
  }
  &__sizer {
    //   padding-top: 100%;
  }
  &__title {
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    text-transform: uppercase;
    color: var(--text-white);
    padding: 32px;
    @media screen and (max-width: $xl) {
      font-size: 18px;
      line-height: 20px;
    }
    @media screen and (max-width: $md) {
      padding: 20px;
      font-size: 16px;
      line-height: 21px;
    }
  }
  &__button {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    cursor: default;
    pointer-events: none;
    transition: opacity $time * 2;
  }
  &__button-icon {
    border-radius: 50%;
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    background: var(--text-avocado);
    position: relative;
    z-index: 5;
    &::before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      mask-image: url("/images/icons/plus.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-white);
    }
    @media screen and (max-width: $md) {
      display: none;
    }
  }
  &__image {
    padding-bottom: math.div(480, 390) * 100%;
    @media screen and (max-width: $xl) {
      padding-bottom: math.div(404, 342) * 100%;
    }
    @media screen and (max-width: $md) {
      padding-bottom: math.div(290, 290) * 100%;
    }
  }
  &__content {
    position: absolute;
    overflow: hidden;
    pointer-events: none;
    left: -1px;
    top: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    padding: 32px;
    background: rgba(43, 47, 59, 0.5);
    transition-timing-function: cubic-bezier(0.25, 0.74, 0.22, 0.99);
    transition-property: clip-path;
    clip-path: circle(0 at 50% 50%);
    transition-duration: 0.8s;
    z-index: 1;
    @media screen and (max-width: $md) {
      clip-path: circle(70.71068% at 50% 50%);
      padding: 20px;
    }
  }
  &__description {
    font-weight: 600;
    line-height: 22px;
    color: var(--text-white);
    font-family: var(--font-family);
    transition-property: opacity, transform;
    will-change: transform, opacity;
    transform: translateY(40px);
    opacity: 0;
    transition-duration: 0.8s;
    transition-delay: 0.1s;
    transition-timing-function: cubic-bezier(0.25, 0.74, 0.22, 0.99);
    & p {
      &:not(:last-child) {
        margin-bottom: 16px;
        @media screen and (max-width: $md) {
          margin-bottom: 8px;
        }
      }
    }
    @media screen and (max-width: $md) {
      opacity: 1;
      transform: none;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
