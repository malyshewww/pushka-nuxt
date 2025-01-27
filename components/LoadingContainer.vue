<template lang="pug">
	div(v-if="status === 'pending' || status === 'fetching'")
		.loader-container
			.loader
	div(v-else-if="status === 'success'")
		slot
	div(v-else)
		div error.cause.message
</template>

<script setup>
defineProps(["status", "error"]);
</script>

<style lang="scss" scoped>
.loader-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#fcfbf7, 0.5);
  z-index: 99;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid var(--bg-avocado);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
