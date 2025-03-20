<template lang="pug">
	a(v-if="isScope === 'outer'" :href="path" target="_blank").link-gray #[span {{text}}]
	nuxt-link(v-if="isScope === 'inner'" :to="path" target="_blank").link-gray #[span {{text}}]
</template>

<script setup>
defineProps({
  isScope: {
    type: String,
    required: true,
    default: () => "",
  },
  path: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.link-gray {
  color: var(--text-gray);
  transition: color var(--time);
  @media (any-hover: hover) {
    &:hover {
      color: var(--text-white);
    }
  }
  & span {
    color: currentColor;
    border-bottom: 1px solid currentColor;
  }
}
</style>
