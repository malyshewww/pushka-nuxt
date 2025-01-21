<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-call popup-tpl" :is-open="isOpen" @close-popup="closePopup")
			PopupTpl(:popup-data="popupData" :store="popupStore" @close-popup="closePopup")
</template>

<script setup>
import { usePopupCallStore } from "~/stores/popup/call";

// eslint-disable-next-line
const popupStore = usePopupCallStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  popupData: {
    type: Object,
    required: false,
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
.popup-call {
  & .popup {
    &__content {
      padding: 0;
      max-width: 910px;
      @media screen and (max-width: $xl) {
        max-width: 100%;
      }
    }
  }
}
</style>
