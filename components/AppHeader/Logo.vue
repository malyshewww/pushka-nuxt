<template lang="pug">
	div.header__logo-container(v-if="router.name === 'index'")
		nuxt-link(to="/").header__logo.logo-black
			picture
				source(:srcset="`/images/logo-black.svg`" media="(min-width: 1024px)")
				source(:srcset="`/images/logo-black-mobile.svg`" media="(min-width: 300px)")
				img(src="/images/logo-black.svg")
		nuxt-link(to="/").header__logo.logo-white
			picture
				source(:srcset="`/images/logo-white.svg`" media="(min-width: 1024px)")
				source(:srcset="`/images/logo-white-mobile.svg`" media="(min-width: 300px)")
				img(src="/images/logo-white.svg")
	.header__logo-wrap(v-else)
		nuxt-link(to="/").header__logo
			picture
				source(:srcset="`/images/logo-black.svg`" media="(min-width: 1024px)")
				source(:srcset="`/images/logo-black-mobile.svg`" media="(min-width: 300px)")
				img(src="/images/logo-black.svg")
</template>

<script setup>
const router = useRoute();
</script>

<style lang="scss" scoped>
.header__logo {
  display: block;
  &-wrap,
  &-container {
    width: 182px;
    height: 36px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    position: relative;
    z-index: 21;
    @media screen and (max-width: $xl) {
      width: 102px;
      height: 21px;
    }
  }
}
.logo-black,
.logo-white {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity var(--time);
}
.logo-black {
  opacity: 0;
}
.header-black {
  & .logo-black {
    opacity: 1;
  }
  & .logo-white {
    opacity: 0;
  }
}
.header-white {
  & .logo-black {
    opacity: 0;
  }
  & .logo-white {
    opacity: 1;
  }
}
</style>
