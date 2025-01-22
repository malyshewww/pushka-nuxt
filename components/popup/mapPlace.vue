<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-map-place" :is-open="isOpen" @close-popup="closePopup")
			.slider-location
				.slider-location__box
					.slider-location__images
						.slider-location__image(v-if="isOpen")
							NuxtPicture(:src="`/images/main-location/slide-${popupData.id}.jpg`" :alt="popupData.caption")
					.slider-location__outer
						.slider-location__content
							.slider-location__caption {{popupData.caption}}
							.slider-location__description {{popupData.description}}
							.slider-location__distance {{popupData.distance}}
</template>

<script setup>
const device = useDevice();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  placeId: {
    type: Number,
    required: false,
  },
  popupData: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const emit = defineEmits(["closePopup"]);
// eslint-disable-next-line
const closePopup = () => {
  emit("closePopup");
};
</script>

<style lang="scss">
.popup-map-place {
  & .slider-location {
    display: block;
    position: static;
    width: 100%;
    height: 384px;
    @media screen and (max-width: $md) {
      height: 280px;
    }
    &__box {
      // display: flex;
      // align-items: center;
      // height: 100%;
    }
    &__images {
      flex: 0 0 287px;
      height: 100%;
      position: relative;
      @media screen and (max-width: $md) {
        display: none;
      }
    }
    &__image {
      opacity: 1;
    }
    &__outer {
      align-items: center;
      justify-content: center;
      padding: 32px;
      @media screen and (max-width: $md) {
        padding: 16px;
        padding-top: 40px;
      }
    }
    &__body {
      max-width: 100%;
    }
    &__content {
      gap: 12px;
      width: 100%;
    }
    &__caption {
      font-size: 18px;
      line-height: 20px;
    }
    &__description {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
    &__distance {
      min-height: 27px;
      margin: 0;
    }
  }
  & .slider-controls {
    display: none;
  }
  & .popup {
    &__wrapper {
      padding: 0;
      align-items: flex-end;
    }
    &__content {
      padding: 0;
      max-width: 100%;
      border-radius: 0;
    }
    &__close {
      right: 32px;
      top: 32px;
      @media screen and (max-width: $md) {
        right: 16px;
        top: 16px;
      }
    }
  }
}
</style>
