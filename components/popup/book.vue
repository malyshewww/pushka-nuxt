<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-book popup-tpl" :is-open="isOpen" @close-popup="closePopup")
			PopupTpl(:popup-data="popupData")
</template>

<script setup>
import { usePopupBookStore } from "~/stores/popup/book";

const store = usePopupBookStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
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
.popup-book {
  & .popup {
    &__content {
      padding: 0;
      max-width: 600px;
      @media screen and (max-width: $xl) {
        max-width: 100%;
      }
    }
    &__body {
      display: block;
      @media screen and (max-width: $xl) {
        display: flex;
        height: 100%;
      }
    }
    &__image {
      display: none;
    }
    &__close {
      @media (any-hover: hover) {
        &:hover {
          &::before {
            background-color: currentColor;
          }
        }
      }
    }
  }
}
</style>
