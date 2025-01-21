<template lang="pug">
	section.main-location
		.container
			.main-location__wrapper
				SectionMainLocationHeader
				.main-location__body
					SectionMainLocationMap(:location-id="locationId")
					button(type="button" @click="openPopupMap").main-location__button развернуть карту
					SectionMainLocationSlider(v-if="device.isDesktop" @updateLocationId="updateLocationId")
					.main-location__mask.mask-location(:class="{hidden: isHiddenMask}")
						.mask-location__content
							.mask-location__icon
								span.mask-location__lines
									span
							.mask-location__text Нажимайте на отметки на карте, чтобы узнать подробности
							UiButton(text="начать" class-names="btn-green" @button-click="hideMaskLocation")
		PopupMap(:is-open="store.isOpenPopup" @close-popup="closePopupMap" :location-id="locationId")
		PopupMapPlace(:is-open="isOpenPopup" @close-popup="closePopupMapPlace" :place-id.sync="placeId" :popup-data="popupMapPlaceData")
</template>

<script setup>
import { usePopupMapStore } from "~/stores/popup/map";

const device = useDevice();

const store = usePopupMapStore();

const closePopupMap = () => {
  store.closePopup();
};
const openPopupMap = () => {
  store.openPopup();
};

const isOpenPopup = ref(false);
const placeId = ref(1);
const openPopupMapPlace = () => {
  isOpenPopup.value = !isOpenPopup.value;
  body_lock_add();
};
const closePopupMapPlace = () => {
  popupMapPlaceData.caption = "";
  popupMapPlaceData.description = "";
  popupMapPlaceData.distance = "";
  popupMapPlaceData.id = 1;
  isOpenPopup.value = !isOpenPopup.value;
  document.body.classList.contains("lock") && body_lock_remove();
};

const locationId = ref(1);
const updateLocationId = (id) => {
  locationId.value = id;
};

const isHiddenMask = ref(false);
const hideMaskLocation = () => {
  isHiddenMask.value = !isHiddenMask.value;
};

watch(
  () => locationId.value,
  (val) => {
    console.log(locationId.value);
    locationId.value = val;
  },
  { deep: true }
);

const popupMapPlaceData = reactive({
  id: "",
  caption: "",
  description: "",
  distance: "",
});

onMounted(() => {
  if (window.innerWidth < 1024) {
    function documentActions(e) {
      const target = e.target;
      if (target.closest(".map-marker")) {
        const id = Number(target.dataset.markerId);
        const caption = target.dataset.caption;
        const description = target.dataset.description;
        const distance = target.dataset.distance;
        placeId.value = Number(id);
        popupMapPlaceData.caption = caption;
        popupMapPlaceData.description = description;
        popupMapPlaceData.distance = distance;
        popupMapPlaceData.id = id;
        openPopupMapPlace();
        const markers = document.querySelectorAll(".map-marker");
        markers.forEach((marker) => marker.classList.remove("active"));
        target.classList.add("active");
      }
    }
    document.addEventListener("click", documentActions);
  }
});
</script>

<style lang="scss">
.main-location {
  padding: 110px 0;
  &__wrapper {
    display: grid;
    grid-template-columns: 100%;
    gap: 80px 0;
    @media screen and (max-width: $xl) {
      gap: 53px 0;
    }
  }
  &__body {
    position: relative;
    padding: 0 0 60px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 70.36%;
      height: 61px;
      z-index: 2;
      background-color: var(--text-white);
      pointer-events: none;
      @media screen and (max-width: $xxxl) {
        width: 62.85%;
      }
      @media screen and (max-width: $xl) {
        content: none;
      }
    }
    @media screen and (max-width: $xxxl) {
      padding: 0 0 134px;
    }
    @media screen and (max-width: $xl) {
      padding: 0;
    }
    @media screen and (max-width: $md) {
      margin: 0 -15px;
    }
  }
  &__button {
    position: absolute;
    z-index: 5;
    padding: 28px;
    width: 216px;
    height: 220px;
    background-color: var(--text-avocado);
    left: 40px;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    text-transform: uppercase;
    color: var(--bg-white);
    transition: background-color $time;
    &::after {
      content: "";
      display: block;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      mask-image: url("/images/icons/arrow-rotate.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: 40px 40px;
      background-color: currentColor;
      align-self: flex-end;
    }
    @media (any-hover: hover) {
      &:hover {
        background-color: #88a645;
      }
      &:active {
        background-color: #66783d;
      }
    }
    &:active {
      background-color: #66783d;
    }
    @media screen and (max-width: $xxxl) {
      left: 32px;
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
    }
    @media screen and (max-width: $xl) {
      display: none;
    }
  }
}
.btn-toggle {
  position: relative;
  z-index: 20;
}

.mask-location {
  display: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.8);
  place-items: center;
  transition: opacity $time;
  padding: 15px;
  &.hidden {
    opacity: 0;
    pointer-events: none;
    & .mask-location__icon::before,
    & .mask-location__lines {
      animation-play-state: paused;
    }
  }
  @media screen and (max-width: $xl) {
    display: grid;
  }
  &__content {
    max-width: 310px;
    display: grid;
    grid-template-columns: 100%;
    justify-items: center;
    gap: 10px;
    text-align: center;
  }
  &__icon {
    width: 38px;
    height: 58px;
    position: relative;
    display: flex;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 10px;
      width: 38px;
      height: 42px;
      background-image: url("/images/icons/handle.svg");
      background-repeat: no-repeat;
      background-position: center;
      animation: animHandleUp 1.5s ease-out infinite 0s;
    }
  }
  &__lines {
    width: 23px;
    height: 11px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 0 5px;
    animation: animLines 1.5s ease-out infinite 0s;
    & span,
    &::before,
    &::after {
      position: absolute;
      width: 3px;
      height: 8px;
      background-color: var(--main-color);
      top: 0;
      transition: opacity $time;
    }
    &::before,
    &::after {
      display: block;
      content: "";
      top: 5px;
    }
    &::before {
      left: 0;
      transform: rotate(-40deg);
    }
    &::after {
      right: 0;
      transform: rotate(40deg);
    }
    & span {
      left: calc(50% - 1.5px);
    }
  }
  &__text {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-family: var(--font-family);
  }
  & .btn {
    width: auto;
  }
}

@keyframes animHandleUp {
  0% {
    transform: translate3d(0, 5px, 0);
  }
  50% {
    transform: translate3d(0, 0px, 0);
  }
  100% {
    transform: translate3d(0, 5px, 0);
  }
}
@keyframes animLines {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
