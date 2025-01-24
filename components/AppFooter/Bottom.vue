<template lang="pug">
	.footer__bottom
		.footer__text © {{getFullYear}}. Застройщик: ООО «Каскад Инвест специализированный застройщик», проектная декларация и иная документация, предусмотренная законодательством РФ, размещена на сайте ЕИСЖС: наш.дом.рф. Информация размещённая на сайте носит исключительно информационный характер и не является публичной офертой. Привлечение денежных средств осуществляется на основании договоров об участии в долевом строительстве с размещением денежных средств на счетах эскроу.
		UiLinkGray(is-scope="inner" text="Политика обработки персональных данных" :path="additional_links[0].url.href")
		//- nuxt-link(to="/page/politic").footer__link #[span Политика обработки персональных данных]
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo.js";

const mainInfoStore = useMainInfoStore();

const { additional_links } = mainInfoStore;

const getFullYear = computed(() => {
  return new Date().getFullYear();
});
</script>

<style lang="scss" scoped>
.footer {
  &__bottom {
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: var(--text-gray);
    display: grid;
    justify-items: center;
    gap: 11px;
    @media screen and (max-width: $xl) {
      font-size: 13px;
      line-height: 18px;
    }
    @media screen and (max-width: $md) {
      gap: 14px;
    }
  }
  &__link span {
    border-bottom: 1px solid currentColor;
  }
}
</style>
