<template lang="pug">
	button(type="button" :class="{active: isActiveButtonUp}" @click="scrollTop").button-up.lock-padding
</template>

<script setup>
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const isActiveButtonUp = ref(false);

// const instanceObserver = () => {
//   const mainHero = document.querySelector(".main-hero");

//   if (mainHero) {
//     const options = {
//       rootMargin: "0px 0px 0px 0px",
//       threshold: 0,
//     };
//     const observer = new IntersectionObserver(([entry]) => {
//       const targetInfo = entry.boundingClientRect;
//       const rootBoundsInfo = entry.rootBounds;
//       if (targetInfo?.top >= rootBoundsInfo?.top) {
//         isActiveButtonUp.value = !isActiveButtonUp.value;
//       } else {
//         isActiveButtonUp.value = !isActiveButtonUp.value;
//       }
//     }, options);
//     observer.observe(mainHero);
//   }
// };
onMounted(() => {
  // instanceObserver();
});
</script>

<style lang="scss" scoped>
.button-up {
  position: fixed;
  z-index: 20;
  right: 36px;
  bottom: 80px;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 2px solid var(--bg-gray);
  border-radius: 50%;
  visibility: visible;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity calc(var(--time) * 2), transform calc(var(--time) * 2);
  pointer-events: none;
  .page--home & {
    left: 36px;
    right: auto;
  }
  @media screen and (max-width: $xl) {
    display: none;
  }
  &.active {
    opacity: 1;
    transform: translateY(0px);
    pointer-events: all;
  }
  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    mask-image: url("/images/icons/arrow-prev.svg");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 20px 20px;
    background-color: var(--text-gray);
    transform: rotate(90deg);
    animation: action 1s infinite alternate;
  }
  @media (any-hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
  @media screen and (max-width: $xl) {
    right: 32px;
  }
  @media screen and (max-width: $md) {
    right: 15px;
    bottom: 39px;
  }
}
@keyframes action {
  0% {
    transform: translateY(3px) rotate(90deg);
  }
  100% {
    transform: translateY(-3px) rotate(90deg);
  }
}
</style>
