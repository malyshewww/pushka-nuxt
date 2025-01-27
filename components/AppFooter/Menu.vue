<template lang="pug">
	.footer__menu.menu-footer
		nav.menu-footer__body
			ul.menu-footer__list
				li(v-for="(item, index) in newMenu" :key="index").menu-footer__item
					nuxt-link(:to="{ path: item.url.href, hash: `${item.hash ? item.hash : ''}`}").menu-footer__link {{ item.title }}
</template>

<script setup>
import { useMainInfoStore } from "@/stores/maininfo";

const mainInfoStore = useMainInfoStore();

const { menu } = mainInfoStore;

const newMenu = computed(() => {
  return menu.map((item) => {
    return {
      ...item,
      hash: item.url.href === "/#news" ? "#news" : false,
    };
  });
});
</script>

<style lang="scss" scoped>
.menu-footer {
  padding: 32px 0;
  border-top: 1px solid var(--border-white);
  border-bottom: 1px solid var(--border-white);
  @media screen and (max-width: $md) {
    padding: 20px 0;
  }
  &__body {
  }
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 28px;
    @media screen and (max-width: $xl) {
      display: block;
      column-count: 2;
      column-gap: 93px;
      max-width: 445px;
    }
    @media screen and (max-width: $md) {
      flex-direction: column;
      display: flex;
      gap: 20px;
      max-width: 100%;
    }
  }
  &__item {
    @media screen and (max-width: $xl) {
      margin-bottom: 20px;
    }
    @media screen and (max-width: $md) {
      margin-bottom: 0;
    }
  }
  &__link {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    transition: color $time ease 0s;
    @media (any-hover: hover) {
      &:hover {
        color: var(--text-avocado);
      }
    }
    @media screen and (max-width: $xl) {
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
