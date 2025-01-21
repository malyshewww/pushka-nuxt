<template lang="pug">
	.main-footer__form
		form(ref="form" @submit.prevent="formSend($event)").subscribe-form
				.subscribe-form__body
					.subscribe-form__title Оставьте свои контактные данные — и наш менеджер свяжется с вами
					.subscribe-form__items 
							FormField(type="text" name="name" placeholder="Имя" :modelValue="model.name.val" @update:modelValue="$event => (formData.name = $event)" :is-valid="formStatus.name.isValid" :error-message="formStatus.name.message" @remove-error="removeError")
							FormField(type="tel" name="phone" placeholder="Телефон" :modelValue="model.phone.val" @update:modelValue="$event => (formData.phone = $event)" :is-valid="formStatus.phone.isValid" :error-message="formStatus.phone.message" @remove-error="removeError")
					.subscribe-form__bottom
							UiButton(text="отправить" type="submit" class-names="btn-green")
							.subscribe-form__text Отправляя заявку, вы подтверждаете, что ознакомлены и согласны с условиями политики обработки персональных данных
</template>

<script setup>
import { usePopupNoticeStore } from "~/stores/popup/notice";

const poupupNoticeStore = usePopupNoticeStore();

const model = reactive({
  name: {
    val: "",
  },
  phone: {
    val: "",
  },
});

const formData = reactive({
  name: model.name.val,
  phone: model.phone.val,
  webform_id: "more_about",
});

const formStatus = reactive({
  name: {
    isValid: true,
    message: "",
  },
  phone: {
    isValid: true,
    message: "",
  },
});

const form = ref("");

const errors = ref(0);

const timer = ref("");

const initialFormStatus = () => {
  formStatus.name.isValid = true;
  formStatus.name.message = "";
  formStatus.phone.isValid = true;
  formStatus.phone.message = "";
};

const resetValues = () => {
  formData.name = "";
  formData.phone = "";
};

// eslint-disable-next-line
const removeError = (key) => {
  if (key == "name") {
    formStatus.name.isValid = true;
    formStatus.name.message = "";
    formData.name = "";
  }
  if (key == "phone") {
    formStatus.phone.isValid = true;
    formStatus.phone.message = "";
    formData.phone = "";
  }
};

/* eslint-disable no-useless-escape */
const formValidate = () => {
  errors.value = 0;
  initialFormStatus();
  if (formData.name.length === 0) {
    formStatus.name.isValid = false;
    formStatus.name.message = `Поле Имя обязательно для заполнения`;
    errors.value++;
  }
  if (formData.phone.length === 0 || formData.phone.length < 18) {
    formStatus.phone.isValid = false;
    formStatus.phone.message = "неверно введен телефон";
    errors.value++;
  }
  return {
    error: errors.value,
  };
};

const formSuccess = () => {
  initialFormStatus();
  resetValues();
  form.value.reset();
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

const runtimeConfig = useRuntimeConfig();

// eslint-disable-next-line
const formSend = async () => {
  const { error } = formValidate();

  if (error === 0) {
    const tokenResponse = await fetch(
      `${runtimeConfig.public.apiBase}/session/token`,
      {
        method: "POST",
      }
    );
    if (!tokenResponse.ok) {
      throw new Error("Ошибка при получении токена");
    }
    const token = await tokenResponse.text();
    const formResponse = await fetch(
      `${runtimeConfig.public.apiBase}/webform_rest/submit?_format_json`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify(formData),
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
