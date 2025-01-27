<template lang="pug">
	Teleport(to="body")
		Popup(class="popup-notice popup-notice-project" :is-open="isOpen" @close-popup="closePopup")
			.popup__body
				.popup__image.ibg
					NuxtPicture(:src="`/images/popup/popup-img-project.jpg`" alt="изображение")
				.popup-notice__body
					div(v-if="!popupNotice.isValid")
						.popup-notice__title Форма Не может быть отправлена
						.popup-notice__sub-title Пожалуйста, проверьте корректность введенных данных и отправьте форму еще раз
					div(v-else)
						.popup-notice__title Форма отправлена
						.popup-notice__sub-title(v-if="popupNotice.successText" v-html="popupNotice.successText")
</template>

<script setup>
import { usePopupNoticeStore } from "~/stores/popup/notice";

const popupNotice = usePopupNoticeStore();

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
};
</script>

<style lang="scss">
.popup-notice-project {
  & .popup {
    &__wrapper {
      padding: 0;
      height: 100%;
    }
    &__body {
      display: flex;
      width: 100%;
    }
    &__content {
      padding: 0;
      max-width: 100%;
    }
    &-notice__body {
      padding: 52px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 36px;
      flex: 1 1 auto;
      background: var(--text-midnight-100);
      color: var(--text-white);
      font-family: var(--font-family);
    }
    &-notice__sub-title {
      font-size: 14px;
      line-height: 20px;
    }
  }
}
.popup-notice {
  color: var(--text-white);
  //   pointer-events: none;
  //   & .open-popup {
  //     pointer-events: all;
  //   }
  // & .popup {
  //   &__wrapper {
  //     @media screen and (max-width: $xl) {
  //       align-items: stretch;
  //       padding: 0;
  //     }
  //   }
  //   &__content {
  //     max-width: 590px;
  //     padding: 52px 60px 60px;
  //     box-shadow: 0 10px 40px 0 rgba(29, 29, 27, 0.1);
  //     background: var(--text-midnight-100);
  //     border-radius: 0;
  //     @media screen and (max-width: $xl) {
  //       padding: 40px 20px;
  //       max-width: 100%;
  //       // display: flex;
  //       // flex-direction: column;
  //       // align-items: center;
  //       // justify-content: center;
  //     }
  //   }
  //   &__close {
  //     @media (any-hover: hover) {
  //       &:hover {
  //         &::before {
  //           background-color: currentColor;
  //         }
  //       }
  //     }
  //     @media screen and (max-width: $md) {
  //       &::before {
  //         background-color: var(--bg-white);
  //       }
  //     }
  //   }
  // }
  // &__body,
  // &__body div {
  //   display: grid;
  //   justify-items: start;
  //   gap: 28px;
  //   @media screen and (max-width: $xl) {
  //     gap: 20px;
  //   }
  // }
  // &__title {
  //   font-weight: 700;
  //   font-size: 28px;
  //   line-height: 34px;
  //   text-transform: uppercase;
  //   font-family: var(--second-family);
  //   @media screen and (max-width: $xl) {
  //     font-size: 22px;
  //     line-height: 120%;
  //   }
  // }
  // &__sub-title {
  //   font-weight: 600;
  //   line-height: 22px;
  // }
  // & .btn {
  //   width: auto;
  // }
}
</style>
