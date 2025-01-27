<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-request" :is-open="isOpen" @close-popup="closePopup")
			PopupTpl(:popup-data="popupData")
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
    default: () => {},
  },
});

const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
};
</script>

<style lang="scss">
.popup-request {
  & .popup {
    &__content {
      padding: 0;
      max-width: 910px;
    }
  }
}
</style>
