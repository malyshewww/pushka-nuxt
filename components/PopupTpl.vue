<template lang="pug">
	.popup__body
		.popup__image.ibg(v-if="popupData.isImage")
			NuxtPicture(:src="`/images/popup/popup-img.jpg`" alt="изображение")
		.popup__image.ibg(v-if="popupData.isImageProject")
			NuxtPicture(:src="`/images/popup/popup-img-project.jpg`" alt="изображение")
		form(ref="formRef" @submit.prevent="formSend").popup__form.form-popup
			.form-popup__title(v-if="popupData.title") {{popupData.title}}
			.form-popup__sub-title(v-if="popupData.subTitle" v-html="popupData.subTitle")
			.form-popup__items
				FormField(type="text" placeholder="Имя" name="name" :modelValue="data.name" @update:modelValue="$event => (data.name = $event)" :is-valid="status.name.isValid" :error-message="status.name.message" @remove-error="removeError")
				FormField(type="tel" placeholder="Телефон" name="phone" :modelValue="data.phone" @update:modelValue="$event => (data.phone = $event)" :is-valid="status.phone.isValid" :error-message="status.phone.message" @remove-error="removeError")
			.form-popup__text Отправляя заявку, вы подтверждаете, что ознакомлены и согласны с условиями #[nuxt-link(to="/page/politic").form-popup__link политики обработки персональных данных]
			UiButton(text="отправить" class-names="btn-green" type="submit")
</template>

<script setup>
import { useFormValidate } from "~/composables/form/useFormValidate";
import { useRemoveError } from "~/composables/form/useRemoveError";
import { useInitialFormStatus } from "~/composables/form/useInitialFormStatus";
import { useResetValues } from "~/composables/form/useResetValues";
import { usePopupNoticeStore } from "~/stores/popup/notice";

const popupNoticeStore = usePopupNoticeStore();

const emit = defineEmits(["closePopup"]);

const props = defineProps({
  popupData: {
    type: Object,
    required: false,
    default: () => {},
  },
  store: {
    type: Object,
    required: false,
    default: {},
  },
  popupKey: {
    type: String,
    required: false,
    default: () => "",
  },
});

const store = ref(props.store);

const { data, status } = store.value.form;

const { errors } = store.value;

const timer = ref("");

// eslint-disable-next-line
const removeError = (key) => {
  useRemoveError(key, data, status);
};

const succesPopupKey = (key) => {
  switch (key) {
    case "book":
      popupNoticeStore.successText =
        "Оставьте заявку, наш менеджер перезвонит вам и поможет забронировать квартиру";
      break;
    case "consultation":
      popupNoticeStore.successText =
        "Оставьте заявку, наш менеджер перезвонит и&nbsp;проконсультирует вас по всем вопросам";
      break;
    case "call":
      popupNoticeStore.successText =
        "В ближайшее время с вами свяжется менеджер для консультации";
      break;
    default:
      popupNoticeStore.successText =
        "Спасибо! Мы свяжемся с вами в ближайшее время";
      break;
  }
};

const formSuccess = () => {
  useInitialFormStatus(status);
  useResetValues(data);
  popupNoticeStore.isValid = true;
  if (props.popupKey == "project") {
    popupNoticeStore.successText =
      "Спасибо! Мы свяжемся с вами в ближайшее время";
    popupNoticeStore.openPopupProject();
    setTimeout(() => {
      popupNoticeStore.closePopupProject();
      popupNoticeStore.successText = "";
    }, 3000);
  } else {
    succesPopupKey(props.popupKey);
    popupNoticeStore.openPopup();
    setTimeout(() => {
      popupNoticeStore.closePopup();
      popupNoticeStore.successText = "";
    }, 3000);
  }
  emit("closePopup");
};

const formError = () => {
  popupNoticeStore.isValid = false;
  if (props.popupKey == "project") {
    popupNoticeStore.openPopupProject();
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      popupNoticeStore.closePopupProject();
    }, 3000);
  } else {
    popupNoticeStore.openPopup();
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      popupNoticeStore.closePopup();
    }, 3000);
  }
};

const formSend = async () => {
  const { error } = useFormValidate(errors, data, status);
  console.log("send", data);
  console.log("key", props.popupKey);
  if (error === 0) {
    const tokenResponse = await fetch(
      `${useRuntimeConfig().public.apiBase}/session/token`,
      {
        method: "POST",
      }
    );
    if (!tokenResponse.ok) {
      throw new Error("Ошибка при получении токена");
    }
    const token = await tokenResponse.text();
    const formResponse = await fetch(
      `${useRuntimeConfig().public.apiBase}/webform_rest/submit?_format_json`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify(data),
      }
    );
    if (formResponse.ok) {
      formSuccess();
    } else {
      formError();
    }
  } else {
    return;
  }
};
</script>
<style lang="scss" scoped>
.form-popup {
  padding: 52px 60px 60px;
  display: grid;
  gap: 28px;
  justify-items: start;
  box-shadow: 0 10px 40px 0 rgba(29, 29, 27, 0.1);
  background: var(--text-midnight-100);
  color: var(--text-white);
  font-family: var(--font-family);
  flex: 1 1 auto;
  @media screen and (max-width: $xl) {
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 48px;
  }
  @media screen and (max-width: $md) {
    padding: 20px;
    padding-top: 40px;
    gap: 20px;
  }
  &__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    text-transform: uppercase;
    font-family: var(--second-family);
    @media screen and (max-width: $xl) {
      font-size: 22px;
      line-height: 26px;
      margin-bottom: 16px;
      width: 100%;
    }
    @media screen and (max-width: $md) {
      margin-bottom: 8px;
    }
  }
  &__sub-title {
    font-size: 16px;
    line-height: 19px;
  }
  &__items {
    display: grid;
    grid-template-columns: 100%;
    gap: 20px;
    width: 100%;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: var(--text-gray);
    @media screen and (max-width: $xl) {
      order: 1;
      margin-top: 12px;
    }
  }
  &__link {
    color: currentColor;
    border-bottom: 1px solid var(--border-white);
    font-size: inherit;
    line-height: inherit;
  }
  & .btn {
    width: auto;
    @media screen and (max-width: $xl) {
      margin-top: 12px;
      width: 100%;
    }
  }
}
</style>
