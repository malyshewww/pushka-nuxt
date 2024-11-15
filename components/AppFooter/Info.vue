<template lang="pug">
	.main-footer__info.info-footer
		UiLinkGray(v-if="info.projectDocs" is-scope="outer" text="Информация о проекте и проектная документация" :path="info.projectDocs")
		//- nuxt-link(to="/").info-footer__link #[span Информация о проекте и проектная документация]
		.info-footer__company.company-footer
			.company-footer__label Создание сайта
			a(href="https://webshop.ru/" target="_blank").company-footer__logo
				img(:src="`/images/company-logo.svg`" alt="логотип компании")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;
</script>

<style lang="scss" scoped>
.info-footer {
   margin-top: 30px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-wrap: wrap;
   gap: 24px 10px;
   padding: 18px 0;
   font-size: 14px;
   line-height: 18px;
   min-height: 60px;
   color: var(--text-gray);
   &__link span {
      border-bottom: 1px solid currentColor;
   }
   @media screen and (max-width: $xxxl) {
      margin-top: 20px;
   }
   @media screen and (max-width: $xl) {
      min-height: auto;
      padding: 0;
      margin: 0;
      font-size: 13px;
      line-height: 18px;
   }
}
.company-footer {
   display: flex;
   align-items: center;
   gap: 8px;
   &__logo {
      flex-shrink: 0;
      width: 76px;
      display: flex;
      align-items: center;
   }
}
</style>
