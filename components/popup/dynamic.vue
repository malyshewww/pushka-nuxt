<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-dynamic" :is-open="isOpen" @close-popup="closePopup")
			PopupDynamicTpl(:popup-data="popupData")
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  popupData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
  // destroyDynamicSlider();
};
</script>

<style lang="scss">
.popup-dynamic {
  & .popup {
    &__wrapper {
      @media screen and (max-width: $md) {
        padding-left: 0;
        padding-right: 0;
      }
    }
    &__content {
      width: 100%;
      max-width: 1238px;
      min-height: auto;
      border-radius: 0;
      padding: 64px;
      background: var(--text-white);
      @media screen and (max-width: $md) {
        padding: 15px;
        background-color: var(--bg-white-dirt);
        // background: transparent;
      }
    }
    &__close {
      top: 20px;
      right: 20px;
      @media screen and (max-width: $md) {
        height: 33px;
        top: 15px;
        right: 8px;
        &::before {
          background-color: var(--text-gray);
        }
      }
    }
  }
}
</style>
