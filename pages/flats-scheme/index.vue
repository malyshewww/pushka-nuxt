<template lang="pug">
	div
		div.loading(v-if="isLoading") loading...
		BreadCrumbs(:list="flatsScheme.breadcrumb")
		main.main.flats.flats-scheme
			.container
				FlatHeading
				FlatFilter(:params.sync="flatsScheme.params" @newSliderValues="newSliderValues" @load-data="loadData" @reset-filter="resetFilter")
				.flats-scheme__wrapper
					FlatSchemeLegend(:is-scroll-scheme="isScrollScheme")
					.flats-scheme__places-wrap
						.flats-scheme__places(ref="scheme" :class="{active: isScrollScheme}")
							.flats-scheme__body
								FlatScheme(:corpus="flatsScheme.newList" @openTooltip="openTooltip" @closeTooltip="closeTooltip" :is-filter-changed="isFilterChanged")
						.flats-scheme__tooltip.tooltip-scheme(ref="tooltip" :class="{active: data.tooltip.isActive}")
							.tooltip-scheme__body
								.tooltip-scheme__image
									img(:src="data.tooltip.img" alt="изображение")
								.tooltip-scheme__content
									ul.tooltip-scheme__parameters
										li.tooltip-scheme__parameter #[span Апартаменты {{data.tooltip.square}}]
										li.tooltip-scheme__parameter {{data.tooltip.number}}
									.tooltip-scheme__price {{data.tooltip.price}}
									.tooltip-scheme__status {{data.tooltip.status}}
						.flats-scheme__mask.scheme-mask(@touchstart="moveScheme" @touchend="moveScheme" :class="{hidden: !showMaskScheme}")
							.scheme-mask__content
								.scheme-mask__icon
									span.scheme-mask__handle
								.scheme-mask__text Тяните
</template>
<script setup>
import json from "~/static/data.json";
import SimpleBar from "simplebar";
// You will need a ResizeObserver polyfill for browsers that don't support it! (iOS Safari, Edge, ...)
import ResizeObserver from "resize-observer-polyfill";

useHead({
   bodyAttrs: {
      class: "page--flats-scheme",
   },
});

const route = useRoute();
const router = useRouter();

const priceMin = ref(0);
const priceMax = ref(0);

const areaMin = ref(0);
const areaMax = ref(0);

const floorMin = ref(0);
const floorMax = ref(0);

const filteredData = ref([]);

const newListRoom = ref([]);

const isFilterChanged = ref(false);

const runtimeConfig = useRuntimeConfig();
const {
   data: flatsScheme,
   status,
   error,
} = await useAsyncData(
   "flatsScheme",
   () =>
      $fetch(`${runtimeConfig.public.apiBase}/flats-scheme?_format=json`, {
         query: {},
      }),
   {
      transform: (res) => {
         console.log(res);
         const { breadcrumb, data, filter } = res;
         newListRoom.value = generateNewData(data);
         return {
            breadcrumb,
            corpus: data,
            newList: newListRoom.value,
            params: {
               floor: filter.slider.floor,
               price: filter.slider.price,
               space: filter.slider.space,
               options: filter.options,
            },
         };
      },
      // watch: [priceMin, priceMax],
   }
);

const isLoading = ref(false);

function generateNewData(data) {
   const arr = [];
   for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
         const element = data[key];
         arr.push(element);
      }
   }
   return arr;
}

const scrollToScheme = () => {
   scheme.value.scrollIntoView({ block: "start", behavior: "smooth" });
};

const resetFilter = () => {
   console.log("reset");
   isLoading.value = !isLoading.value;
   flatsScheme.value.newList.map((floor) => {
      floor.apartments.map((room, i) => {
         room.isActive = true;
      });
   });
   setTimeout(() => {
      isLoading.value = !isLoading.value;
   }, 2000);
};

// loadData = update function newSliderValues
const loadData = (
   minPrice,
   maxPrice,
   minFloor,
   maxFloor,
   minArea,
   maxArea,
   options
) => {
   // isFilterChanged - Фильтр активен
   isFilterChanged.value = true;
   isLoading.value = !isLoading.value;
   const checkOptions = (optionOne, optionTwo, optionThree) => {
      if (options.length === 0) return;
      if (
         (options.length > 0 && options.includes(optionOne)) ||
         (options.length > 0 && options.includes(optionTwo)) ||
         (options.length > 0 && options.includes(optionThree))
      ) {
         return true;
      }
   };
   flatsScheme.value.newList.map((floor) => {
      floor.apartments.map((room, i) => {
         const isHasOptions = checkOptions(
            room.options[0],
            room.options[1],
            room.options[2]
         );
         if (room.field_status == "available") {
            // Если есть дополнительные опции
            if (options.length) {
               if (
                  parseInt(room.field_price) >= minPrice &&
                  parseInt(room.field_price) <= maxPrice &&
                  parseInt(room.field_space) >= minArea &&
                  parseInt(room.field_space) <= maxArea &&
                  parseInt(room.field_floor[0]) >= minFloor &&
                  parseInt(room.field_floor[0]) <= maxFloor &&
                  isHasOptions
               ) {
                  room.isActive = true;
               } else {
                  room.isActive = false;
               }
               // Если ни одна дополнительная опция не выбрана, то исключаем isHasOptions из условия
            } else {
               if (
                  parseInt(room.field_price) >= minPrice &&
                  parseInt(room.field_price) <= maxPrice &&
                  parseInt(room.field_space) >= minArea &&
                  parseInt(room.field_space) <= maxArea &&
                  parseInt(room.field_floor[0]) >= minFloor &&
                  parseInt(room.field_floor[0]) <= maxFloor
               ) {
                  room.isActive = true;
               } else {
                  room.isActive = false;
               }
            }
         }
      });
   });
   setTimeout(() => {
      isLoading.value = !isLoading.value;
   }, 2000);
   scrollToScheme();
};

function routerReplace() {
   router.replace({
      query: {
         "price[min]": priceMin.value,
         "price[max]": priceMax.value,
      },
   });
}

const data = reactive({
   tooltip: {
      isActive: false,
      img: "",
      price: "",
      number: "",
      square: "",
      status: "",
   },
});

const tooltip = ref("");
const scheme = ref("");

const isScrollScheme = ref(false);

const showMaskScheme = ref(true);

const openTooltip = (event, room, item) => {
   const target = event.target;
   data.tooltip.number = `${target.dataset.number}`;
   data.tooltip.img = `${target.dataset.image}`;
   data.tooltip.square = `${target.dataset.area} м²`;
   data.tooltip.number = `№ ${target.dataset.number}`;
   data.tooltip.price = `${formatNumber(target.dataset.price)}`;
   data.tooltip.status =
      target.dataset.status === "available" ? "в продаже" : "забронирована";
   if (window.innerWidth > 1024) {
      tooltip.value.style.left = `${
         event.target.getBoundingClientRect().left -
         scheme.value.getBoundingClientRect().left +
         15
      }px`;
      tooltip.value.style.top = `${
         event.target.getBoundingClientRect().top -
         scheme.value.getBoundingClientRect().top
      }px`;
   }
   data.tooltip.isActive = !data.tooltip.isActive;
};
const closeTooltip = () => {
   data.tooltip.isActive = !data.tooltip.isActive;
};

const moveScheme = () => {
   showMaskScheme.value = false;
};

onMounted(() => {
   const simpleBar = new SimpleBar(scheme.value, { autoHide: false });
   window.ResizeObserver = ResizeObserver;
   const checkScrollingScheme = () => {
      if (scheme.value.classList.contains("simplebar-scrollable-x")) {
         isScrollScheme.value = true;
      } else {
         isScrollScheme.value = false;
      }
   };
});
</script>

<style lang="scss">
@import "simplebar/dist/simplebar.css";
.flats {
   overflow: clip;
}
.flats-scheme .heading-main {
   @media screen and (max-width: $md) {
      gap: 48px 20px;
   }
}
.flats-scheme {
   &__places {
      @media screen and (max-width: $xl) {
         // pointer-events: none;
         // &.active {
         //    pointer-events: all;
         // }
      }
   }
   &__places-wrap {
      position: relative;
   }
   &__wrapper {
      margin-top: 40px;
      border-radius: 10px;
      padding: 36px;
      padding-right: 8px;
      padding-bottom: 22px;
      background: var(--bg-white);
      display: grid;
      gap: 38px;
      @media screen and (max-width: $xxl) {
         padding: 20px 15px;
      }
      @media screen and (max-width: $xl) {
         margin: 0 -15px;
      }
      @media screen and (max-width: $md) {
         gap: 28px;
      }
   }
   &__body {
      display: grid;
      gap: 14px;
      position: relative;
   }
}
.tooltip-scheme {
   position: absolute;
   top: 0;
   left: 100px;
   min-width: 300px;
   max-width: 310px;
   //   width: fit-content;
   transition: all $time;
   opacity: 0;
   z-index: 5;
   transform: translate(-50%, calc(-100% - 10px));
   pointer-events: none;
   @media (max-width: $xl) {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      // width: 100%;
      // height: 100%;
      // background-color: rgba(0, 0, 0, 0.2);
      // transform: initial;
      // pointer-events: none;
      // visibility: hidden;
      // &.active {
      //    pointer-events: initial;
      //    visibility: visible;
      // }
      display: none;
   }
   &.active {
      opacity: 1;
   }
   &__body {
      padding: 14px 20px;
      display: grid;
      grid-template-columns: 60px 1fr;
      gap: 14px;
      align-items: center;
      border-radius: 2px;
      padding: 14px 20px;
      min-height: 98px;
      box-shadow: 0 0 5px 0 rgba(43, 47, 59, 0.1);
      background: var(--bg-white);
      position: relative;
      &::before {
         content: "";
         position: absolute;
         width: 0;
         height: 0;
         top: calc(100% + 2px);
         left: 50%;
         // transform: translateX(-50%);
         box-sizing: border-box;
         border: 5px solid black;
         border-color: transparent transparent #fff #fff;
         transform-origin: 0 0;
         transform: rotate(-45deg);
         box-shadow: -5px 5px 5px 0 rgba(43, 47, 59, 0.1);
      }
   }
   &__content {
      display: grid;
      gap: 4px;
   }
   &__parameters {
      display: flex;
      align-items: center;
      gap: 6px;
   }
   &__price {
      font-family: var(--second-family);
      font-weight: 700;
      font-size: 20px;
      line-height: 26px;
      text-transform: uppercase;
   }
   &__status {
      font-size: 14px;
      line-height: 18px;
      color: var(--text-gray);
   }
   &__parameters {
      @include reset-list;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
   }
   &__parameter {
      font-size: 14px;
      line-height: 18px;
      display: flex;
      align-items: center;
      gap: 6px;
      &:not(:last-child) {
         &::after {
            content: "";
            display: block;
            font-size: 14px;
            line-height: 18px;
            width: 1px;
            height: 10px;
            background-color: var(--text-gray);
            transform: skewX(-20deg);
            color: var(--text-gray);
         }
      }
   }
}
.flats-scheme__places.simplebar-scrollable-x {
   & .simplebar-content-wrapper,
   & .simplebar-mask,
   & .simplebar-wrapper {
      overflow: hidden !important;
   }
   & .simplebar-content-wrapper {
      overflow: scroll hidden !important;
   }
   & .simplebar-track.simplebar-horizontal {
      position: sticky;
   }
}
.simplebar-placeholder {
   width: auto !important;
}

.simplebar-track.simplebar-horizontal {
   @media screen and (max-width: $xl) {
      display: none;
   }
}
.flats-scheme__places {
   & .simplebar-content-wrapper,
   & .simplebar-mask,
   & .simplebar-wrapper {
      overflow: visible !important;
   }
}

.scheme-mask {
   position: absolute;
   top: 0;
   height: 100%;
   z-index: 20;
   backdrop-filter: blur(10px);
   background: rgba(255, 255, 255, 0.8);
   left: 35px;
   width: 100%;
   font-size: 20px;
   line-height: 32px;
   padding-bottom: calc(50% - 42px);
   padding-top: 54px;
   transition: opacity $time, visibility $time;
   display: none;
   @media screen and (max-width: $xl) {
      display: block;
   }
   @media screen and (max-width: $md) {
      padding-bottom: 298px;
   }
   &.hidden {
      display: none;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
   }
   &__content {
      position: sticky;
      top: calc(50% - 42px);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
   }
   &__icon {
      width: 54px;
      height: 42px;
      position: relative;
      &::before,
      &::after {
         content: "";
         display: block;
         position: absolute;
         top: 2px;
         width: 8px;
         height: 8px;
         background-repeat: no-repeat;
         background-position: center;
      }
      &::before {
         background-image: url("/images/icons/mask-scheme-arrow-left.svg");
         left: 7px;
         transform: translateX(-50%);
      }
      &::after {
         background-image: url("/images/icons/mask-scheme-arrow-right.svg");
         right: 12px;
         transform: translateX(50%);
      }
   }
   &__handle {
      position: absolute;
      top: 0;
      left: 0;
      height: 42px;
      width: 38px;
      background-image: url("/images/icons/handle.svg");
      background-repeat: no-repeat;
      background-position: center;
      animation: moveHand 2s infinite ease-out 0s;
   }
}
@keyframes moveHand {
   0% {
      transform: translateX(15px);
   }
   50% {
      transform: translateX(0px);
   }
   100% {
      transform: translateX(15px);
   }
}
</style>
