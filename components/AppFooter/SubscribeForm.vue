<template lang="pug">
	.main-footer__form
		form(ref="formRef" @submit.prevent="formSend").subscribe-form
				.subscribe-form__body
					.subscribe-form__title Оставьте свои контактные данные — и наш менеджер свяжется с вами
					.subscribe-form__items 
							FormField(type="text" name="name" placeholder="Имя" :modelValue="data.name" @update:modelValue="$event => (data.name = $event)" :is-valid="status.name.isValid" :error-message="status.name.message" @remove-error="removeError")
							FormField(type="tel" name="phone" placeholder="Телефон" :modelValue="data.phone" @update:modelValue="$event => (data.phone = $event)" :is-valid="status.phone.isValid" :error-message="status.phone.message" @remove-error="removeError")
					.subscribe-form__bottom
							UiButton(text="отправить" type="submit" class-names="btn-green")
							.subscribe-form__text Отправляя заявку, вы подтверждаете, что ознакомлены и согласны с условиями политики обработки персональных данных
</template>

<script setup>
import { usePopupNoticeStore } from "~/stores/popup/notice";
import { usePopupProjectStore } from "~/stores/popup/project";

import { useFormValidate } from "~/composables/form/useFormValidate";
import { useRemoveError } from "~/composables/form/useRemoveError";
import { useInitialFormStatus } from "~/composables/form/useInitialFormStatus";
import { useResetValues } from "~/composables/form/useResetValues";

const poupupNoticeStore = usePopupNoticeStore();

const popupProjectSore = usePopupProjectStore();

const { form, errors } = popupProjectSore;

const { data, status } = form;

const formRef = ref(null);

const timer = ref("");

// eslint-disable-next-line
const removeError = (key) => {
  useRemoveError(key, data, status);
};

const formSuccess = () => {
  useInitialFormStatus(status);
  useResetValues(data);
  formRef.value.reset();
  poupupNoticeStore.successText =
    "Спасибо! Мы свяжемся с вами в ближайшее время";
  poupupNoticeStore.isValid = true;
  poupupNoticeStore.openPopup();
  setTimeout(() => {
    poupupNoticeStore.closePopup();
  }, 3000);
};

const formError = () => {
  poupupNoticeStore.openPopup();
  poupupNoticeStore.isValid = false;
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    poupupNoticeStore.closePopup();
  }, 3000);
};

// eslint-disable-next-line
const formSend = async () => {
  const { error } = useFormValidate(errors, data, status);
  console.log("data", data);
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
    formError();
  }
};
</script>

<style lang="scss" scoped>
.main-footer__form {
  @media screen and (max-width: $xxxl) {
    max-width: 835px;
  }
  @media screen and (max-width: $xl) {
    display: none;
  }
}
.subscribe-form {
  &__body {
    display: grid;
    gap: 24px;
  }
  &__title {
    line-height: 19px;
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  &__bottom {
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 40px;
    & .btn {
      width: auto;
    }
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: var(--text-gray);
  }
}
</style>
