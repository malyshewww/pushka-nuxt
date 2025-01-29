<template lang="pug">
	header.header(ref="header" :class="[{'header-white': isWhite}, {'header-black': !isWhite}, {'menu-open': isOpenMenu}, {'hidden': !isVisible && !isOpenMenu}]").lock-padding
		.header__body(@click="closeMenu($event)")
			AppHeaderLogo
			AppHeaderMenu(:is-open-menu="isOpenMenu" data-da=".wrapper, 1024, 1" @close-menu="closeMenu")
			AppHeaderActions
			AppHeaderMenuTrigger(data-da=".wrapper, 1024, 1" :is-open-menu="isOpenMenu" @open-menu="openMenu")
	.menu-overlay(:class="{active: isOpenMenu}" @click="hideOverlay")
</template>

<script setup>
import { useDynamicAdapt } from "~/utils/dynamic-adapt";

import { useMenuStore } from "~/stores/menu";

const storeMenu = useMenuStore();

defineProps({
  isWhite: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  isVisible: {
    type: Boolean,
    required: false,
    default: () => true,
  },
});

// watch(
//    () => props.isWhite,
//    (state, prevState) => {
//       console.log("с опцией deep ");
//    },
//    { deep: true }
// );

const header = ref("");

const isOpenMenu = ref(false);

const openMenu = () => {
  if (window.innerWidth < 1024) {
    isOpenMenu.value = !isOpenMenu.value;
    storeMenu.toggleMenu();
  }
};

const closeMenu = (e) => {
  const target = e.target;
  if (window.innerWidth < 1024) {
    if (
      target.closest(".menu__link") ||
      target.closest(".logo-mobile img") ||
      target.closest(".actions-header__btn") ||
      target.closest(".header__logo")
    ) {
      isOpenMenu.value = false;
    }
    storeMenu.closeMenu();
  }
};

const hideOverlay = () => {
  isOpenMenu.value = false;
  storeMenu.toggleMenu();
};

const route = useRoute();

watch(
  () => route.path,
  () => {
    body_lock_remove();
  }
);

onMounted(() => {
  useDynamicAdapt();
});
</script>

<style lang="scss">
.header {
  min-height: var(--header-height);
  background-color: transparent;
  padding: 21px 56px;
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 30;
  transition: transform $time, box-shadow $time, background-color $time;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: var(--text-white);
    z-index: 21;
    opacity: 0;
    pointer-events: none;
    transition: opacity $time;
  }
  &.hidden {
    transform: translateY(-100%);
    pointer-events: none;
  }
  @media screen and (max-width: $xxxl) {
    padding: 21px 40px;
  }
  @media screen and (max-width: $xl) {
    padding: 15px 32px;
    // min-height: 61px;
    &.menu-open {
      box-shadow: 0 0 0 0 transparent;
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 0;
      }
    }
  }
  @media screen and (max-width: $md) {
    &.menu-open {
      &::before {
        opacity: 1;
      }
    }
  }
  @media screen and (max-width: $md) {
    padding: 10.5px 15px;
    // min-height: 48px;
  }
  .page--home & {
    position: fixed;
  }
  &:not(.header-white) {
    background-color: var(--text-white);
  }
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  &.header-white {
    isolation: isolate;
    color: var(--text-white);
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% + 20px);
      background: linear-gradient(180deg, #2b2f3b 0%, rgba(43, 47, 59, 0) 100%);
      opacity: 0.5;
      z-index: -1;
    }
    @media screen and (max-width: $md) {
      color: var(--main-color);
      &.menu-open {
        & .logo-black {
          opacity: 1;
        }
        & .logo-white {
          opacity: 0;
        }
      }
    }
  }
  &.header-black {
    color: var(--main-color);
    background-color: var(--text-white);
    box-shadow: 0 0 10px 0 rgba(43, 47, 59, 0.05);
    &::before {
      opacity: 1;
    }
  }
}
.menu-overlay {
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(43, 47, 59, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;
  &.active {
    opacity: 1;
    pointer-events: all;
  }
  @media screen and (max-width: $md) {
    display: none;
  }
}
</style>
