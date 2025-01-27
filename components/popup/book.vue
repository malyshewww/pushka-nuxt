<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-book popup-tpl" :is-open="isOpen" @close-popup="closePopup")
			PopupTpl(:popup-data="popupData" :store="popupStore" popup-key="book" @close-popup="closePopup")
</template>

<script setup>
import { usePopupBookStore } from "~/stores/popup/book";

const popupStore = usePopupBookStore();

defineProps({
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
