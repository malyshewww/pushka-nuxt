<template lang="pug">
	.contacts-footer__links(v-if="info.phone || info.email")
		a(v-if="info.phone" :href="`tel:${formatPhone(info.phone)}`").footer__phone {{ info.phone }}
		UiEmailLink(v-if="info.email" :email="info.email")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;
</script>

<style lang="scss" scoped>
.footer {
  &__phone {
    font-family: var(--second-family);
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    transition: color var(--time) ease 0s;
    @media (any-hover: hover) {
      &:hover {
        color: var(--text-avocado);
      }
    }
    @media screen and (max-width: $xl) {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
.contacts-footer {
  &__links {
    display: grid;
    gap: 12px;
    justify-items: start;
    @media screen and (max-width: $xl) {
      gap: 14px;
      & .email-link {
        font-size: 14px;
        line-height: 18px;
      }
    }
    @media screen and (max-width: $md) {
      & .email-link {
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
}
</style>
