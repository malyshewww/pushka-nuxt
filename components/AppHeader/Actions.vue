<template lang="pug">
	.header__actions.actions-header
		nuxt-link(to="/flats-list").actions-header__btn апартаменты
		a(v-if="info.phone" :href="`tel:${formatPhone(info.phone)}`").header__phone {{info.phone}}
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;
</script>

<style lang="scss">
.actions-header {
   width: 182px;
   display: flex;
   justify-content: flex-end;
   flex-shrink: 0;
   align-self: center;
   position: relative;
   z-index: 21;
   @media screen and (max-width: $xl) {
      width: auto;
      display: block;
   }
   &__btn {
      font-weight: 700;
      font-size: 12px;
      font-family: var(--second-family);
      line-height: 15px;
      color: var(--text-white);
      border-radius: 100px;
      padding: 5px 20px;
      min-height: 31px;
      background: var(--text-avocado);
      display: none;
      place-items: center;
      @media screen and (max-width: $xl) {
         display: grid;
      }
      @media screen and (max-width: $md) {
         min-height: 27px;
         padding: 5px 16px;
      }
   }
}
.header {
   &__phone {
      font-weight: 600;
      line-height: 22px;
      transition: color $time ease 0s;
      font-weight: 600;
      font-size: 16px;
      font-family: var(--font-family);
      @media (any-hover: hover) {
         &:hover {
            color: var(--text-avocado);
         }
      }
      @media screen and (max-width: $xl) {
         display: none;
      }
   }
}
</style>
