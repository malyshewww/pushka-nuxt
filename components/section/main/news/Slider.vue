<template lang="pug">
	.main-news__slider.news-slider
		.news-slider__body(ref="sliderNews")
			.news-slider__wrapper.swiper-wrapper
				SectionMainNewsItem(v-for="(item, index) in newsList" :key="index" :item="item" @openPopupNews="openPopupNews(item)")
		.slider-controls
			button(ref="buttonPrev" type="button").slider-button.slider-button-prev
			button(ref="buttonNext" type="button").slider-button.slider-button-next
		PopupNews(:is-open="storePopupNews.isOpenPopupNews" @close-popup="closePopupNews" @buttonClick="closePopupNews" :popup-data="popupNewsData")
</template>

<script setup>
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { usePopupNewsStore } from "~/stores/popup/news";

defineProps({
   newsList: {
      type: Array,
      required: true,
   },
});

const storePopupNews = usePopupNewsStore();

const popupNewsData = reactive({
   title: "",
   date: "",
   text: "",
});

const closePopupNews = () => {
   storePopupNews.closePopupNews();
};

const openPopupNews = (item) => {
   storePopupNews.openPopupNews();
   popupNewsData.title = item.title;
   popupNewsData.date = item.field_date;
   popupNewsData.text = item.body;
};

const sliderNews = ref("");
const swiperNews = ref(null);
const buttonPrev = ref("");
const buttonNext = ref("");

const initSlider = () => {
   if (sliderNews.value) {
      swiperNews.value = new Swiper(sliderNews.value, {
         modules: [Navigation],
         observer: true,
         observeParents: true,
         slideClass: "news-item",
         slidesPerView: 3,
         speed: 800,
         loop: false,
         watchOverflow: true,
         navigation: {
            nextEl: buttonNext.value,
            prevEl: buttonPrev.value,
         },
         breakpoints: {
            300: {
               slidesPerView: 1,
               spaceBetween: 15,
            },
            767.98: {
               slidesPerView: "auto",
               spaceBetween: 20,
            },
            1400: {
               slidesPerView: 3,
               spaceBetween: 40,
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
.news-slider {
   display: grid;
   grid-template-columns: 100%;
   gap: 50px;
   @media screen and (max-width: $xxxl) {
      gap: 40px;
   }
   @media screen and (max-width: $xl) {
      gap: 17px;
   }
   @media screen and (max-width: $md) {
      gap: 20px;
   }
   & .slider-button {
      width: 80px;
      height: 80px;
      @media screen and (max-width: $xxxl) {
         width: 64px;
         height: 64px;
      }
      @media screen and (max-width: $xl) {
         width: 48px;
         height: 48px;
      }
   }
   & .slider-controls {
      @media screen and (max-width: $xl) {
         justify-content: flex-end;
      }
   }
}
</style>
