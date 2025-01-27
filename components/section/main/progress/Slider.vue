<template lang="pug">
	.main-progress__cards
		.swiper(ref="dynamicSlider")
			.swiper-wrapper
				ProgressCard(v-for="(item, index) in dynamicList" :key="index" :card="item" @open-popup-dynamic="openPopupDynamic($event, item)")
		.slider-controls(ref="sliderControls")
			button(ref="buttonPrev" type="button").slider-button.slider-button-prev
			button(ref="buttonNext" type="button").slider-button.slider-button-next
		PopupDynamic(:is-open="storePopupDynamic.isOpenPopupDynamic" :popup-data="initialState" @close-popup="closePopupDynamic")
</template>

<script setup>
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { usePopupDynamicStore } from "~/stores/popup/dynamic";

defineProps({
  dynamicList: {
    type: Object,
    required: true,
  },
});

const storePopupDynamic = usePopupDynamicStore();

const initialState = reactive({
  caption: "",
  images: [],
});

const openPopupDynamic = (event, item) => {
  initialState.caption = item.date_text;
  initialState.images = item.field_images;
  storePopupDynamic.openPopupDynamic();
};
const closePopupDynamic = () => {
  storePopupDynamic.closePopupDynamic();
  setTimeout(() => {
    initialState.caption = null;
    initialState.images = null;
  }, 100);
};

const dynamicSlider = ref("");
const dynamicSwiper = ref("");
const buttonPrev = ref("");
const buttonNext = ref("");
const sliderControls = ref("");

const initSlider = () => {
  if (dynamicSlider.value) {
    dynamicSwiper.value = new Swiper(dynamicSlider.value, {
      modules: [Navigation],
      slideClass: "item-dynamic",
      speed: 1000,
      slidesPerView: 4,
      navigation: {
        nextEl: buttonNext.value,
        prevEl: buttonPrev.value,
      },
      breakpoints: {
        300: {
          slidesPerView: "auto",
          spaceBetween: 14,
        },
        767.98: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      on: {
        init: function (swiper) {
          const slides = swiper.slides;
          const sliderControls =
            swiper.navigation.prevEl.parentNode ||
            swiper.navigation.nextEl.parentNode;
          if (slides.length <= swiper.passedParams.slidesPerView) {
            swiper.navigation.destroy();
            sliderControls.remove();
          }
        },
      },
    });
  }
};
onMounted(() => {
  initSlider();
});
</script>

<style lang="scss" scoped>
.main-progress {
  &__cards {
    display: grid;
    grid-template-columns: 100%;
    gap: 50px 0;
    @media screen and (max-width: $xxxl) {
      gap: 40px 0;
    }
    @media screen and (max-width: $xl) {
      gap: 32px 0;
    }
    @media screen and (max-width: $md) {
      gap: 20px 0;
    }
  }
  & .swiper {
    align-self: stretch;
    width: 100%;
    @media screen and (max-width: $xxxl) {
      overflow: visible;
    }
  }
  & .item-dynamic {
    @media screen and (max-width: $xxxl) {
      max-width: 348px;
      flex-shrink: 0;
      width: 100%;
    }
    @media screen and (max-width: $xl) {
      max-width: 256px;
    }
  }
}
.slider-controls {
  @media screen and (max-width: $xl) {
    justify-content: flex-end;
  }
}
</style>
