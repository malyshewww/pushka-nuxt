<template lang="pug">
	.popup__body
		.popup__image.ibg(v-if="popupData.isImage")
			//- NuxtImg(:src="`/images/popup/popup-img.jpg`" format="avif" alt="изображение")
			img(:src="`/images/popup/popup-img.jpg`")
		.popup__image.ibg(v-if="popupData.isImageProject")
			//- NuxtImg(:src="`/images/popup/popup-img-project.jpg`" format="avif" alt="изображение")
			img(:src="`/images/popup/popup-img-project.jpg`")
		form(ref="formRef" @submit.prevent="formSend").popup__form.form-popup
			.form-popup__title(v-if="popupData.title") {{popupData.title}}
			.form-popup__sub-title(v-if="popupData.subTitle" v-html="popupData.subTitle")
			.form-popup__items
				FormField(type="text" placeholder="Имя" name="name" :modelValue="data.name"  @update:modelValue="$event => (data.name = $event)" :is-valid="status.name.isValid" :error-message="status.name.message" @remove-error="removeError")
				FormField(type="tel" placeholder="Телефон" name="phone" :modelValue="data.phone" @update:modelValue="$event => (data.phone = $event)" :is-valid="status.phone.isValid" :error-message="status.phone.message" @remove-error="removeError")
			.form-popup__text Отправляя заявку, вы подтверждаете, что ознакомлены и согласны с условиями #[nuxt-link(to="/page/politic").form-popup__link политики обработки персональных данных]
			UiButton(text="отправить" class-names="btn-green" type="submit")
</template>

<script setup>
import { useFormValidate } from "~/composables/form/useFormValidate";
import { useRemoveError } from "~/composables/form/useRemoveError";
// import { useInitialFormStatus } from "~/composables/form/useInitialFormStatus";
// import { useResetValues } from "~/composables/form/useResetValues";
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
    required: true,
    default: () => {},
  },
});

const store = ref(props.store);

const { data, status } = store.value.form;

// const model = store.value.model;

const { errors } = store.value;

const timer = ref("");

const removeError = (key) => {
  useRemoveError(key, data, status);
};

const useInitialFormStatus = () => {
  status.name.isValid = true;
  status.name.message = "";
  status.phone.isValid = true;
  status.phone.message = "";
};

const useResetValues = () => {
  data.name = "";
  data.phone = "";
};

// watch(
//   () => status,
//   (val) => {
//     useInitialFormStatus(val);
//     console.log("change status");
//   },
//   {
//     deep: true,
//   }
// );

// watch(
//   () => data,
//   (val) => {
//     useResetValues(val);
//   },
//   {
//     deep: true,
//   }
// );

const formSuccess = () => {
  useInitialFormStatus();
  useResetValues();
  // popupNoticeStore.isValid = true;
  // popupNoticeStore.openPopup();
  // setTimeout(() => {
  //   popupNoticeStore.closePopup();
  // }, 3000);
  // emit("closePopup");
};

const formError = () => {
  popupNoticeStore.openPopup();
  popupNoticeStore.isValid = false;
  // clearTimeout(timer.value);
  // timer.value = setTimeout(() => {
  //   popupNoticeStore.closePopup();
  // }, 3000);
};

const formSend = async () => {
  const { error } = useFormValidate(errors, data, status);
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
      console.log("data", data);
    } else {
      formError();
    }
  } else {
    return;
  }
  console.log("data", data);
  console.log("errors", error);
  // console.log("response", response);
};
</script>
<style lang="scss" scoped>
.popup {
  &__image {
    padding-bottom: math.div(500, 300) * 100%;
    flex: 0 0 300px;
    @media screen and (max-width: $md) {
      display: none;
    }
  }
  &__body {
    display: grid;
    grid-template-columns: 300px 1fr;
    @media screen and (max-width: $md) {
      display: flex;
    }
  }
}
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
