<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-project popup-tpl" :is-open="isOpen" @close-popup="closePopup")
			PopupTpl(:popup-data="popupData" :store="popupStore" popup-key="project" @close-popup="closePopup")
</template>

<script setup>
import { usePopupProjectStore } from "~/stores/popup/project";

const popupStore = usePopupProjectStore();

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
.popup-project {
  @media screen and (max-width: $xl) {
    transition: opacity 0.3s ease 0.2s, visibility 0.5s ease-out 0s;
  }
  & .form-popup {
    padding: 52px 48px;
    @media screen and (max-width: $md) {
      padding: 20px;
      padding-top: 40px;
    }
  }
  & .popup {
  }
  & .form-popup {
    gap: 20px;
    &__title {
      margin-bottom: 16px;
      @media screen and (max-width: $md) {
        margin: 0;
      }
    }
    &__items {
      margin-bottom: 12px;
      @media screen and (max-width: $md) {
        margin: 0;
      }
    }
    &__text {
      order: 1;
      margin-top: 12px;
      @media screen and (max-width: $md) {
        margin: 0;
      }
    }
    & .btn {
      width: 100%;
    }
  }
}
</style>
