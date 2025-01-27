<template lang="pug">
	.main-location__slider.slider-location(ref="mainLocation")
		.slider-location__box
			.slider-location__images
				.slider-location__image(v-for="(item, index) in slides" :key="index" :class="{active: index === currentSlideIndex}")
					NuxtPicture(:src="`/images/main-location/slide-${index+1}.jpg`" :alt="item.caption")
			.slider-location__outer
				.slider-location__body.swiper(ref="locationSlider")
					.slider-location__wrapper.swiper-wrapper
						.slider-location__item.swiper-slide(v-for="(item, index) in slides" :key="index")
							.slider-location__content
								.slider-location__caption {{ item.caption }}
								.slider-location__description(v-if="item.description") {{ item.description }}
								.slider-location__distance {{ item.distance }}
				.slider-controls
					button(ref="buttonPrev" type="button").slider-button.slider-button-prev
					button(ref="buttonNext" type="button").slider-button.slider-button-next
</template>

<script setup>
import Swiper from "swiper";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { useDynamicAdapt } from "#imports";

const props = defineProps({
  placeId: {
    type: Number,
    required: false,
    default: () => 0,
  },
});

const locationId = ref(props.placeId);

const slides = [
  {
    caption: "парк пушкина",
    description:
      "В обновленном парке: детский городок, специальная зона для выгула и дрессировки собак, просторная скейт-площадка",
    distance: "5 мин пешком",
  },
  {
    caption: "площадь Горького",
    description: "Одна из центральных площадей города",
    distance: "5 мин пешком",
  },
  {
    caption: "Средной рынок",
    description:
      "Комфортные и современные торговые ряды с фермерскими продуктами",
    distance: "5 мин пешком",
  },
  {
    caption: "Улица Белинского",
    description:
      "Многочисленные скверы и исторические уголки Нижнего Новгорода",
    distance: "5 мин пешком",
  },
];

const currentSlideIndex = ref(0);

const locationSlider = ref("");
const locationSwiper = ref(null);
const buttonPrev = ref("");
const buttonNext = ref("");

const emit = defineEmits(["updateLocationId"]);

const updateLocationId = (id) => {
  emit("updateLocationId", id);
};

const mainLocation = ref("");

const initSlider = () => {
  if (locationSlider.value) {
    locationSwiper.value = new Swiper(locationSlider.value, {
      modules: [Navigation, EffectFade, Autoplay],
      slidesPerView: 1,
      spaceBetween: 20,
      effect: "fade", // apply fade effect
      fadeEffect: {
        crossFade: true, // resolve the overlapping of the slides
      },
      navigation: {
        prevEl: buttonPrev.value,
        nextEl: buttonNext.value,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
      autoplay: false,
      breakpoints: {
        300: {
          speed: 0,
        },
        1024: {
          speed: 1000,
        },
      },
      on: {
        slideChange: function (swiper) {
          if (window.innerWidth > 1024) {
            const activeIndex = swiper.activeIndex;
            currentSlideIndex.value = activeIndex;
            updateLocationId(currentSlideIndex.value);
            const mapMarkers = document.querySelectorAll(".map-marker");
            mapMarkers.forEach((marker) => {
              if (currentSlideIndex.value + 1 == marker.dataset.markerId) {
                marker.classList.add("active");
              } else {
                marker.classList.remove("active");
              }
            });
          }
        },
      },
    });
  }
  const toggleAutoplay = (isVisible, swiper) => {
    if (isVisible) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      toggleAutoplay(entry.isIntersecting, locationSwiper.value); // Включаем/выключаем autoplay в зависимости от видимости
    });
  });
  observer.observe(mainLocation.value);
  if (window.innerWidth < 1024 && locationSwiper.value) {
    setTimeout(() => {
      currentSlideIndex.value = locationId.value - 1;
      locationSwiper.value.slideTo(locationId.value - 1);
    }, 178);
  }
};

// watchEffect(props.placeId, () => {
//    console.log(props.placeId);
//    locationSwiper.value.slideTo(locationId.value);
// });

onMounted(() => {
  initSlider();
  useDynamicAdapt();
});
</script>

<style lang="scss">
.slider-location {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 820px;
  height: 320px;
  overflow: hidden;
  background: var(--text-midnight-70);
  @media screen and (max-width: $xxxl) {
    width: 689px;
    height: 268px;
  }
  @media screen and (max-width: $xl) {
    display: none;
  }
  &__box {
    display: flex;
    height: 100%;
  }
  &__images {
    position: relative;
    flex: 0 0 320px;
    height: 100%;
    @media screen and (max-width: $xxxl) {
      flex: 0 0 269px;
    }
  }
  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    @media screen and (max-width: $xl) {
      transition: opacity 0s;
    }
    & picture {
      height: 100%;
    }
    &.active {
      opacity: 1;
    }
    & img {
      @extend .slider-location__images;
    }
    // @media screen and (max-width: $xl) {
    //    transition: none;
    // }
  }
  &__outer {
    flex: 1 1 auto;
    padding: 40px 60px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 20px;
    @media screen and (max-width: $xxxl) {
      padding: 33px 50px;
      gap: 17px;
    }
  }
  &__body {
    max-width: 380px;
    width: 100%;
  }
  &__wrapper {
    @media screen and (max-width: $xl) {
      // transition: none !important;
    }
  }
  &__item {
    &:nth-child(2) {
      & .slider-location {
        &__caption {
          max-width: 200px;
          @media screen and (max-width: $xl) {
            max-width: 100%;
          }
        }
      }
    }
    &:nth-child(3) {
      & .slider-location {
        &__description {
          max-width: 360px;
          @media screen and (max-width: $xl) {
            max-width: 100%;
          }
        }
      }
    }
  }
  &__content {
    display: grid;
    justify-items: end;
    gap: 12px;
    text-align: right;
    color: var(--text-white);
    @media screen and (max-width: $xxxl) {
      gap: 10px;
    }
    @media screen and (max-width: $md) {
      justify-items: start;
      text-align: left;
    }
  }
  &__caption {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    @media screen and (max-width: $xxxl) {
      font-size: 24px;
      line-height: 34px;
    }
  }
  &__description {
    line-height: 19px;
    font-family: var(--font-family);
  }
  &__distance {
    font-weight: 600;
    line-height: 22px;
    text-align: center;
    display: grid;
    place-items: center;
    margin-top: 8px;
    border-radius: 100px;
    padding: 5px 15px;
    background: var(--bg-midnight-50);
    font-family: var(--font-family);
    @media screen and (max-width: $xxxl) {
      margin-top: 6px;
      padding: 4px 13px;
      font-size: 13px;
      line-height: 18px;
    }
  }
  .slider-controls {
    gap: 28px;
    display: inline-flex;
    @media screen and (max-width: $xxxl) {
      gap: 24px;
    }
  }
  .slider-button {
    width: 24px;
    height: 24px;
    border-radius: 0;
    border: 0;
    &::before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--bg-white);
      @media screen and (max-width: $xxxl) {
        width: 20px;
        height: 20px;
        mask-size: 20px 20px;
      }
    }
    &.swiper-button-disabled {
      &::before {
        background-color: var(--text-gray);
      }
    }
    @media screen and (max-width: $xxxl) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
