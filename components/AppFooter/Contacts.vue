<template lang="pug">
	.main-footer__contacts.contacts-footer
		.contacts-footer__items
			.contacts-footer__item
				address.contacts-footer__address(v-if="info.address") {{info.address}}
				AppFooterSchedule
			.contacts-footer__item
				AppFooterContactLinks
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;
</script>

<style lang="scss" scoped>
.contacts-footer {
   display: grid;
   gap: 36px;
   @media screen and (max-width: $xl) {
      grid-column: 1 / 2;
   }
   &__items {
      display: grid;
      gap: 41px;
      @media screen and (max-width: $xxxl) {
         gap: 37px;
      }
   }
   &__item {
      display: grid;
      gap: 24px;
      @media screen and (max-width: $xl) {
         &:nth-child(2) {
            display: none;
         }
      }
      @media screen and (max-width: $md) {
         gap: 16px;
      }
   }
   &__address {
      line-height: 19px;
      @media screen and (max-width: $xl) {
         font-size: 14px;
         line-height: 20px;
      }
   }
}
</style>
