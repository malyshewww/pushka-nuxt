<template lang="pug">
	.breadcrumbs 
		.container
			nav.breadcrumbs__body
				nuxt-link(to="/" @click.prevent="goBack").breadcrumbs__back
				ul.breadcrumbs__list
					li.breadcrumbs__item(v-for="(item, index) in list" :key="index")
						nuxt-link(:to="item.url" :class="{ disabled: index === list.length - 1 }").breadcrumbs__link {{item.text}}
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 36px;
  @media screen and (max-width: $xl) {
    margin-bottom: 20px;
  }
  & nav {
    @media screen and (max-width: $xl) {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
  &__back {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid var(--bg-gray);
    display: none;
    place-items: center;
    @media screen and (max-width: $xl) {
      display: grid;
    }
    &::before {
      content: "";
      display: block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: var(--bg-gray);
      box-shadow: 4.75px 0px 0px var(--bg-gray), -4.75px 0px 0px var(--bg-gray);
    }
  }
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  &__item {
    @media screen and (max-width: $xl) {
      &:not(:last-child) {
        display: none;
      }
    }
  }
  &__link {
    display: grid;
    place-items: center;
    text-align: center;
    gap: 12px;
    padding: 3px 15px;
    min-height: 27px;
    border: 1px solid var(--bg-gray);
    border-radius: 100px;
    font-size: 14px;
    line-height: 130%;
    color: var(--text-gray);
    transition: border-color var(--time) ease 0s, color var(--time) ease 0s;
    &.disabled {
      background-color: var(--bg-white-dirt);
      color: var(--text-midnight-100);
      border-color: transparent;
      pointer-events: none;
    }
    @media (any-hover: hover) {
      &:hover {
        border-color: var(--text-gray);
        color: var(--text-midnight-100);
      }
    }
  }
}
</style>
