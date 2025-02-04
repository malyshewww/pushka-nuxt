<template lang="pug">
	.popup-slider
		.popup-slider__date {{ popupData.caption }}
		.popup-slider__body.swiper(ref="dynamicSlider")
			.popup-slider__wrapper.swiper-wrapper
				.popup-slider__item.swiper-slide(v-for="image, index in popupData.images" :key="index")
					.popup-slider__image.ibg(v-html="image.markup")
						//- NuxtImg(:src="`/images/dynamic/dynamic-${image}@2x.jpg`" format="avif" :alt="`Динамика строительства ${popupData.caption}`")
						//- picture
						//- 	source(type="image/webp" :srcset="`/images/dynamic/dynamic-${image}@2x.webp`")
						//- 	source(:srcset="`/images/dynamic/dynamic-${image}@2x.jpg`")
						//- 	img(:src="`/images/dynamic/dynamic-${image}@2x.jpg`" :alt="`Динамика строительства ${popupData.caption}`")
		.slider-controls
			.slider-pagination(ref="sliderPagination")
			.slider-buttons
				button(ref="buttonPrev" class="slider-button slider-button-prev" type="button")
				button(ref="buttonNext" class="slider-button slider-button-next" type="button" )
</template>

<script setup>
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { usePopupDynamicStore } from "~/stores/popup/dynamic";

const popupDynamicStore = usePopupDynamicStore();

defineProps({
  popupData: {
    type: Object,
    required: true,
  },
});

const dynamicSlider = ref("");
const dynamicSwiper = ref(null);
const buttonPrev = ref("");
const buttonNext = ref("");
const sliderPagination = ref("");

const addZero = (num) => {
  return num > 9 ? num : "0" + num;
};

function destroyDynamicSlider() {
  if (dynamicSwiper.value != null) {
    dynamicSwiper.value.destroy();
  }
}

const initDynamicSlider = () => {
  if (dynamicSlider.value) {
    dynamicSwiper.value = new Swiper(dynamicSlider.value, {
      modules: [Navigation, Pagination],
      speed: 1000,
      spaceBetween: 10,
      slidesPerView: 1,
      observer: true,
      observeSlideChildren: true,
      observeParents: true,
      navigation: {
        nextEl: buttonNext.value,
        prevEl: buttonPrev.value,
      },
      pagination: {
        el: sliderPagination.value,
        type: "custom",
        renderCustom: function (swiper, current, total) {
          return `
						<span class="slider-pagiantion-current">${addZero(current)}</span> 
						<span>/</span>
						<span class="slider-pagiantion-total">${addZero(total)}</span>`;
        },
      },
    });
  }
};

/* 
  Наблюдение за состоянием открытого/закрытого попапа с изображениями для блока "Ход строительства"
  Если true - инициализируем слайдер, если false - уничтожаем экземпляр слайдера через небольшую задержку
*/
watch(
  () => popupDynamicStore.isOpenPopupDynamic,
  (val) => {
    if (val) {
      initDynamicSlider();
    } else {
      setTimeout(() => {
        destroyDynamicSlider();
      }, 500);
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.popup-slider {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: var(--font-family);
  @media screen and (max-width: $md) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  &__body {
    border-radius: 10px;
    @media screen and (max-width: $md) {
      border-radius: 0;
      width: 100%;
    }
  }
  &__image {
    padding-bottom: math.div(740, 1110) * 100%;
  }
  &__date {
    position: absolute;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    z-index: 2;
    top: 24px;
    left: 24px;
    border-radius: 100px;
    padding: 4px 20px 4px 20px;
    min-height: 33px;
    background: var(--bg-white);
    text-transform: lowercase;
    line-height: 19px;
    pointer-events: none;
    @media screen and (max-width: $md) {
      left: 20px;
      position: static;
    }
  }
  & .slider-controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 24px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: $md) {
      padding: 20px;
      position: static;
      padding: 0;
    }
  }
  & .slider-buttons {
    display: flex;
    align-items: center;
    gap: 14px;
    @media screen and (max-width: $md) {
      gap: 8px;
    }
  }
  & .slider-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 5px;
    padding: 4px 5px;
    height: 34px;
    background: var(--bg-white);
    font-size: 14px;
    line-height: 18px;
    width: 82px;
  }
  & .slider-button {
    width: 54px;
    height: 54px;
    background: var(--bg-white);
    border-color: transparent;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      mask-size: 20px 20px;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--main-color);
    }
    &-prev {
      &::before {
        mask-image: url("/images/icons/arrow-prev.svg");
      }
    }
    &-next {
      &::before {
        mask-image: url("/images/icons/arrow-next.svg");
      }
    }
    &.swiper-button-disabled {
      opacity: 0.5;
      background: var(--text-white);
    }
    @media (any-hover: hover) {
      &:hover {
        background-color: #e8e7e3;
      }
    }
    @media screen and (max-width: $xl) {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
