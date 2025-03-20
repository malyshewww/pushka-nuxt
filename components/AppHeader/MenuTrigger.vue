<template lang="pug">
	.menu-trigger(:class="{active: menuStore.isOpenMenu}")
		button(type="button" @click="openFilter").menu-trigger__filter
		a(v-if="info.phone" :href="`tel:${formatPhone(info.phone)}`").menu-trigger__phone
			span.menu-trigger__phone-text {{ info.phone }}
			span.menu-trigger__phone-icon 
		.menu-trigger__burger.burger(@click="openMenu")
			.burger__close
				svg(width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg")
					path(fill-rule="evenodd" clip-rule="evenodd" d="M9.03044 2.03044L9.56077 1.50011L8.50011 0.439453L7.96978 0.969783L5.00011 3.93945L2.03044 0.969783L1.50011 0.439453L0.439453 1.50011L0.969783 2.03044L3.93945 5.00011L0.969783 7.96978L0.439453 8.50011L1.50011 9.56077L2.03044 9.03044L5.00011 6.06077L7.96978 9.03044L8.50011 9.56077L9.56077 8.50011L9.03044 7.96978L6.06077 5.00011L9.03044 2.03044Z" fill="#2B2F3B")
			.burger__inner
				span.burger__icon-wrap
					span.burger__icon
					//- svg(width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg")
					//- 	path(d="M4 3.5H12" stroke="#FCFBF7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round")
					//- 	path(d="M4 7H12" stroke="#FCFBF7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round")
					//- 	path(d="M4 10.5H12" stroke="#FCFBF7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round")
				span.burger__text Меню
</template>

<script setup>
import { useFilterStore } from "~/stores/filter-actions";
import { useMainInfoStore } from "~/stores/maininfo";
import { useMenuStore } from "~/stores/menu";

const menuStore = useMenuStore();

const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;

const storeFilter = useFilterStore();

const openMenu = () => {
  menuStore.toggleMenu();
};

const openFilter = () => {
  storeFilter.openFilter();
};
</script>

<style lang="scss">
.menu-trigger {
  display: none;
  @media screen and (max-width: $xl) {
    position: fixed;
    z-index: 40;
    right: 10px;
    bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    border-radius: 40px;
    padding: 6px;
    height: 56px;
    backdrop-filter: blur(4px);
    background: var(--border-white);
  }
  @media screen and (max-width: $md) {
    right: 15px;
    bottom: 12px;
  }
  &.active {
    & .menu-trigger__phone {
      width: 171px;
      &-text {
        opacity: 1;
      }
    }
    & .burger {
      width: 44px;
      border-radius: 50%;
      &__inner {
        transform: scale(0);
        opacity: 0;
      }
      &__close {
        transform: scale(1);
        opacity: 1;
        transition: transform var(--time) ease-out 0.2s, opacity var(--time) ease-out 0.2s;
      }
    }
  }
  &__filter {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    background: var(--bg-white);
    place-items: center;
    flex-shrink: 0;
    display: none;
    @media screen and (max-width: $md) {
      .page--flats-list &,
      .page--flats-scheme & {
        display: grid;
      }
    }
    &::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      mask-image: url("/images/icons/filter.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: 20px 20px;
      background-color: var(--main-color);
    }
  }
  &__phone {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    transition: max-width var(--time), width var(--time);
    position: relative;
    padding: 4px 16px;
    flex-shrink: 0;
    background: var(--bg-white);
    border-radius: 40px;
  }
  &__phone-icon {
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    background: var(--bg-white);
    margin-left: auto;
    &::before {
      content: "";
      display: block;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      mask-image: url("/images/icons/phone.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: 16px 16px;
      background: var(--main-color);
    }
  }
  &__phone-text {
    position: absolute;
    white-space: nowrap;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    font-family: var(--font-family);
    opacity: 0;
    transition: opacity var(--time);
  }
}
.burger {
  border-radius: 40px;
  padding: 4px;
  width: 108px;
  height: 44px;
  flex-shrink: 0;
  background: var(--text-avocado);
  transition: width var(--time), border-radius var(--time);
  position: relative;
  &__close {
    width: 44px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: grid;
    place-items: center;
    transform: scale(0.4);
    opacity: 0;
    transition: transform 0s ease 0s, opacity 0s ease 0s;
    & svg {
      width: 14px;
      height: 14px;
      & path {
        fill: var(--bg-white);
      }
    }
  }
  &__inner {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
    transform-origin: center center;
    transition: transform var(--time), opacity var(--time);
  }
  &__icon-wrap {
    width: 20px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__icon {
    width: 8px;
    height: 2px;
    display: block;
    position: relative;
    color: var(--text-white);
    background: currentColor;
    animation: animBurger 0.3s 0.3s linear infinite alternate;
    &::after,
    &::before {
      content: "";
      box-sizing: border-box;
      width: 8px;
      height: 2px;
      border-radius: 4px;
      background: currentColor;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 5px;
      animation: animBurger 0.3s 0.45s linear infinite alternate;
    }
    &::after {
      top: -5px;
      animation-delay: 0s;
    }
  }
  &__text {
    font-family: var(--second-family);
    font-weight: 700;
    color: var(--text-white);
    font-size: 14px;
    line-height: 17px;
    text-transform: lowercase;
  }
}
@keyframes animBurger {
  0% {
    width: 3px;
  }
  100% {
    width: 12px;
  }
}
</style>
