<template lang="pug">
	.header__menu.menu(:class="{active: isOpenMenu}" @click="closeMenu")
		.menu__top
			nuxt-link(to="/").logo-mobile
				picture
					source(:srcset="`/images/logo-black.svg`" media="(min-width: 1024px)")
					source(:srcset="`/images/logo-black-mobile.svg`" media="(min-width: 300px)")
					img(src="/images/logo-black.svg")
			AppHeaderActions
		nav.menu__body
			ul.menu__list 
				li.menu__item(v-for="(item, index) in newMenu" :key="index")
					nuxt-link(:to="{ path: item.url.href, hash: `${item.hash ? item.hash : ''}`}").menu__link {{item.title}}
		nav.menu__dropdown.dropdown-menu(:class="{active: isDropdownMenuActive}")
			.dropdown-menu__button(@click="openDropdownMenu")
			.dropdown-menu__list-wrap
				ul.dropdown-menu__list
					li.menu__item(v-for="(item, index) in newMenu" :key="index")
						nuxt-link(:to="{ path: item.url.href, hash: `${item.hash ? item.hash : ''}`}").menu__link {{item.title}}
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

const props = defineProps({
  isOpenMenu: {
    type: Boolean,
    required: true,
  },
});

const isDropdownMenuActive = ref(false);

const openDropdownMenu = () => {
  isDropdownMenuActive.value = !isDropdownMenuActive.value;
};

const emit = defineEmits(["closeMenu"]);

const closeMenu = (e) => {
  emit("closeMenu", e);
};

// const anchor = (e) => {
//    const target = e.target;
//    if (target.closest(".menu__link")) {
//       const { href } = target;
//       if (href.includes("#news")) {
//          router({ path: "/", hash: false });
//       }
//    }
// };

onMounted(() => {
  const menu = document.querySelector(".menu"),
    menuVisible = document.querySelector(".menu__body .menu__list"),
    menuHidden = document.querySelector(".menu__dropdown .dropdown-menu__list"),
    dropdownMenu = document.querySelector(".dropdown-menu"),
    breaks = [];
  const updateNav = () => {
    const navWidth = dropdownMenu.classList.contains("hidden")
      ? menu.offsetWidth
      : menu.offsetWidth - dropdownMenu.offsetWidth - 48;
    const menuVisibleWidth = menuVisible.offsetWidth;
    if (menuVisibleWidth > navWidth) {
      breaks.push(menuVisibleWidth);
      menuHidden.prepend(menuVisible.lastElementChild);
      dropdownMenu.classList.remove("hidden");
      updateNav();
    } else {
      if (navWidth < breaks[breaks.length - 1]) {
        breaks.pop();
        menuVisible.append(menuHidden.firstElementChild);
      }
      if (breaks.length < 1) {
        dropdownMenu.classList.add("hidden");
      }
    }
  };
  // updateNav();
  // window.addEventListener("resize", updateNav);
  // window.addEventListener("DOMContentLoaded", updateNav);

  // const updateLinks = () => {
  //    const menuItems = [...menuVisible.querySelectorAll(".menu__item")];
  //    const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);
  //    const lastFourElements = takeRight(menuItems, 4);
  //    if (window.innerWidth <= 1400 && window.innerWidth > 1024) {
  //       lastFourElements.forEach((item) => {
  //          menuHidden.append(item);
  //       });
  //    }
  // };
  // updateLinks();
});
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 930px;
  width: 100%;
  position: relative;
  z-index: 21;
  &__top {
    display: none;
    @media screen and (max-width: $xl) {
      position: absolute;
      top: 0;
      left: 0;
      padding: 15px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    @media screen and (max-width: $md) {
      display: none;
    }
  }
  @media screen and (max-width: $xxxl) {
    max-width: 100%;
    flex-grow: 1;
    justify-content: center;
  }
  @media screen and (max-width: $xl) {
    position: fixed;
    z-index: 31;
    top: 0;
    right: 0;
    width: 384px;
    height: 100dvh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 103px 32px 60px;
    background-color: var(--text-white);
    align-items: flex-start;
    justify-content: flex-start;
    transform: translateX(110%);
    transition: transform 0.6s;
    &.active {
      transform: translateX(0);
    }
  }
  @media screen and (max-width: $md) {
    width: 100%;
    justify-content: flex-start;
    padding: 90px 15px 60px;
    z-index: 30;
  }
  &__body {
    flex-shrink: 0;
    @media screen and (max-width: $xxxl) {
      & .menu__item:nth-child(n + 4) {
        display: none;
      }
    }
    @media screen and (max-width: $xl) {
      flex-shrink: 1;
      & .menu__item:nth-child(n + 4) {
        display: block;
      }
    }
  }
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: $xl) {
      flex-direction: column;
      align-items: flex-start;
    }
    @media screen and (max-width: $md) {
      align-items: flex-start;
    }
  }
  &__item {
  }
  &__link {
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    transition: color $time ease 0s;
    @media (any-hover: hover) {
      &:hover {
        color: var(--text-avocado);
      }
    }
  }
}
.dropdown-menu {
  position: relative;
  flex-shrink: 0;
  display: none;
  @media screen and (max-width: $xxxl) {
    display: block;
    & .menu__item:nth-child(-n + 3) {
      display: none;
    }
  }
  @media screen and (max-width: $xl) {
    display: none;
  }
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
      & .dropdown-menu__list-wrap {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: translate3d(0, 0, 0);
      }
    }
  }
  &.active {
    & .dropdown-menu__list-wrap {
      &__list {
        opacity: 1;
        pointer-events: all;
        visibility: visible;
        transform: translate3d(0, 0, 0);
      }
    }
  }
  &__button {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    &::before {
      content: "";
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: currentColor;
      box-shadow: 7px 0px 0px currentColor, -7px 0px 0px currentColor;
      transition: background-color $time, box-shadow $time;
    }
  }
  &__list-wrap {
    position: absolute;
    top: 100%;
    width: 186px;
    border-radius: 8px;
    padding-top: 16px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate3d(0, 20px, 0);
    transition: opacity $time, visibility $time, transform $time;
  }
  &__list {
    @include reset-list;
    background: var(--text-white);
    padding: 24px 28px;
    display: grid;
    grid-template-columns: 100%;
    justify-items: center;
    gap: 20px;
    box-shadow: 0 0 50px 0 rgba(43, 47, 59, 0.2);
  }
}
</style>
