<template lang="pug">
	.scheme-apartment__switch.switch-scheme
		.switch-scheme__buttons(ref="switchParent" @click="switchButtons($event)")
			button(type="button" data-id="1").switch-scheme__button.active Планировка
			button(type="button" data-id="2").switch-scheme__button План этажа
			.switch-scheme__bg#pill(ref="pill")
</template>

<script setup>
const emit = defineEmits(["switchButtons"]);

const switchButtons = (e) => {
  emit("switchButtons", e);
};
</script>

<style lang="scss" scoped>
.switch-scheme {
  border-radius: 40px;
  padding: 6px;
  height: 46px;
  background: var(--bg-white-dirt);
  &__buttons {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 6px;
  }
  &__button {
    border-radius: 40px;
    padding: 8px 16px;
    height: 34px;
    font-size: 14px;
    line-height: 18px;
    color: var(--text-midnight-100);
    position: relative;
    z-index: 2;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    box-shadow: 0 0 5px 0 rgba(43, 47, 59, 0.1);
    background: var(--bg-white);
    border-radius: 40px;
    transition: left calc(var(--time) * 1.5) ease-in-out 0s, width calc(var(--time) * 1.5) ease-in-out 0s,
      height calc(var(--time) * 1.5) ease-in-out 0s;
  }
}
</style>
