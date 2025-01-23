<template lang="pug">
		.app-loader-container
			.app-loader
</template>

<style lang="scss" scoped>
.app-loader-container {
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

.app-loader {
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
