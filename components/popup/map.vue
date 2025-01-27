<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-map" :is-open="isOpen" @close-popup="closePopup")
			SectionMainLocationMap(:location-id="locationId")
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  locationId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
};
</script>

<style lang="scss">
.popup-map {
  & .popup {
    &__wrapper {
      padding: 0;
    }
    &__content {
      height: 100dvh;
      border-radius: 0;
      min-height: 100%;
      max-width: 100%;
      padding: 0;
    }
    &__close {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      right: 30px;
      top: 30px;
      background-color: var(--text-midnight-100);
      &::before {
        width: 36px;
        height: 36px;
        mask-size: 30px 30px;
      }
      @media (any-hover: hover) {
        &:hover {
          &::before {
            background-color: var(--text-white);
          }
        }
      }
    }
  }
  & .main-location__map {
    padding: 0;
    height: 100%;
  }
}
</style>
