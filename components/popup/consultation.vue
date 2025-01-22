<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-consultation popup-tpl" :is-open="isOpen" @close-popup="closePopup")
			PopupTpl(:popup-data="popupData" :store="popupStore" popup-key="consultation" @close-popup="closePopup")
</template>

<script setup>
import { usePopupConsultationStore } from "~/stores/popup/consultation";

// eslint-disable-next-line
const popupStore = usePopupConsultationStore();

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
.popup-consultation {
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
