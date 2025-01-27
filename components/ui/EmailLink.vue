<template lang="pug">
	a(:href="`mailto:${email}`").email-link {{ email }}
</template>

<script setup>
defineProps({
  email: {
    type: String,
    required: true,
  },
});
</script>
<style lang="scss">
.email-link {
  font-weight: 400;
  font-size: 16px;
  font-family: "Manrope", sans-serif;
  line-height: 19px;
  border-bottom: 1px solid currentColor;
  transition: color $time, border-color $time;
  @media (any-hover: hover) {
    &:hover {
      border-color: var(--text-avocado);
    }
  }
  &:active {
    color: var(--text-avocado);
  }
}
</style>
