<template lang="pug">
	.error-message {{message}}
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.error-message {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: var(--system-alert);
}
</style>
