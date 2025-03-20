<template lang="pug">
	section.gallery-slider
		.heading
			.heading__content
				h2.heading__title {{ sliderCaption }}
				p.heading__description(v-if="isDescr") Дизайнеры ЖК «Пушка» продумали все для вашего комфорта — современная и эстетичная отделка «под ключ» позволит значительно сэкономить на ремонте
			.slider-controls(data-da=".gallery-slider, 767.98, 2")
				button(ref="buttonPrev" type="button").slider-button.slider-button-prev
				button(ref="buttonNext" type="button").slider-button.slider-button-next
		.gallery-slider__body.swiper(ref="sliderGallery")
			.gallery-slider__wrapper.swiper-wrapper 
				.gallery-item.swiper-slide(v-for="slide, index in slider" :key="index")
					span.mask
						span.mask__icon
					a(:href="`/images/text-page/${slide.img}@2x.jpg`" data-fancybox="gallery").gallery-item__image.ibg
						//- NuxtImg(:src="`/images/text-page/${slide.img}@2x.jpg`" format="avif" alt="слайд")
						img(:src="`/images/text-page/${slide.img}@2x.jpg`", alt="")
</template>

<script setup>
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";

import { useDynamicAdapt } from "~/utils/dynamic-adapt";

defineProps({
  isDescr: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  sliderCaption: {
    type: String,
    required: false,
    default: () => "",
  },
  slider: {
    type: Object,
    required: false,
    default: () => null,
  },
});

const sliderGallery = ref("");
const swiperGallery = ref(null);
const buttonPrev = ref("");
const buttonNext = ref("");

const initSlider = () => {
  if (sliderGallery.value) {
    swiperGallery.value = new Swiper(sliderGallery.value, {
      modules: [Navigation],
      speed: 1000,
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
          slidesPerView: 2,
          spaceBetween: 14,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      init: function (swiper) {
        const slides = swiper.slides;
        const sliderControls = swiper.navigation.prevEl.parentNode || swiper.navigation.nextEl.parentNode;
        if (slides.length <= swiper.passedParams.slidesPerView) {
          swiper.navigation.destroy();
          sliderControls.remove();
        }
      },
    });
  }
};

const fancyboxOptions = {
  Hash: false,
};

onMounted(() => {
  Fancybox.bind(`[data-fancybox="gallery"]`, fancyboxOptions);
  initSlider();
  useDynamicAdapt();
});
</script>

<style lang="scss" scoped>
.icon {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  transition: fill var(--time);
}

.gallery-slider {
  &__body {
    overflow: visible;
  }
}

.gallery-item {
  position: relative;
  overflow: hidden;
  &__image {
    display: block;
    padding-bottom: math.div(521, 390) * 100%;
  }
  @media (any-hover: hover) {
    &:hover {
      & .mask {
        opacity: 1;
        &__icon {
          opacity: 1;
        }
      }
    }
  }
  @media screen and (max-width: $md) {
    width: 256px;
  }
}

.slider-controls {
  margin-top: 20px;
  justify-content: flex-end;
}
.apartment-card .slider-controls {
  margin: 0;
  @media screen and (max-width: $md) {
    margin-top: 20px;
  }
}
</style>
