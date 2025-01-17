<template lang="pug">
	.popup__body
		.popup__image.ibg(v-if="popupData.isImage")
			//- NuxtImg(:src="`/images/popup/popup-img.jpg`" format="avif" alt="изображение")
			img(:src="`/images/popup/popup-img.jpg`")
		.popup__image.ibg(v-if="popupData.isImageProject")
			//- NuxtImg(:src="`/images/popup/popup-img-project.jpg`" format="avif" alt="изображение")
			img(:src="`/images/popup/popup-img-project.jpg`")
		form.popup__form.form-popup
			.form-popup__title {{popupData.title}}
			.form-popup__sub-title(v-html="popupData.subTitle")
			.form-popup__items
				FormField(type="text" placeholder="Имя" name="name")
				FormField(type="tel" placeholder="Телефон" name="phone")
			.form-popup__text Отправляя заявку, вы подтверждаете, что ознакомлены и согласны с условиями #[nuxt-link(to="/page/politic").form-popup__link политики обработки персональных данных]
			UiButton(text="отправить" class-names="btn-green" type="submit")
</template>

<script setup>
const props = defineProps({
  popupData: {
    type: Object,
    required: true,
    default: () => {},
  },
  formErrors: {
    required: false,
    default: () => false,
  },
});

const emit = defineEmits(["removeErrorName", "removeErrorPhone"]);

const removeErrorName = () => {
  emit("removeErrorName");
};
const removeErrorPhone = () => {
  emit("removeErrorPhone");
};

onMounted(() => {
  // maskPhone();
});
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
