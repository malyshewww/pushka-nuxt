<template lang="pug">
	.trailer(ref="trailer" :class="{active: isActive}" @click="action")
		.marquee
			.marquee-content(:data-content="text ? text : 'смотреть'")
				| {{ text ? text : 'смотреть' }}
			.marquee-content(:data-content="text ? text : 'смотреть'")
				| {{ text ? text : 'смотреть' }}
</template>

<script setup>
const trailer = ref("");

defineProps({
  text: {
    type: String,
    required: false,
    default: () => "",
  },
  isActive: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const emit = defineEmits(["action"]);

const action = () => {
  emit("action");
};

onMounted(() => {
  const trailer = document.querySelector(".trailer");
  function animateTrailer(e, interacting) {
    const x = e.clientX - trailer.offsetWidth / 2,
      y = e.clientY - trailer.offsetHeight / 2;
    // const keyframes = {
    //    transform: `translate(${x}px, ${y}px) scale(${interacting ? 1 : 0})`,
    // };
    const keyframes = {
      transform: `translate(${x}px, ${y}px)`,
    };
    interacting
      ? trailer.classList.add("active")
      : trailer.classList.remove("active");
    trailer.animate(keyframes, {
      duration: 1000,
      fill: "forwards",
    });
  }
  if (trailer) {
    window.addEventListener("mousemove", (e) => {
      const interactable = e.target.closest(".item-dynamic"),
        interacting = interactable !== null;
      animateTrailer(e, interacting);
      //  trailer.value.dataset.type = interacting
      //     ? interactable.dataset.type
      //     : "";
    });
  }
});
</script>

<style lang="scss">
:root {
  --marquee-width: 36vw;
  --marquee-height: 48px;
  /* --marquee-elements: 12; */ /* defined with JavaScript */
  --marquee-elements-displayed: 3;
  --marquee-element-width: calc(
    var(--marquee-width) / var(--marquee-elements-displayed)
  );
  --marquee-animation-duration: calc(var(--marquee-elements) * 3s);
}

.trailer {
  border-radius: 100px;
  width: 120px;
  height: 120px;
  //    background: var(--text-avocado);
  display: grid;
  place-items: center;
  font-weight: 500;
  font-size: 48px;
  line-height: 120%;
  color: var(--text-white);
  font-family: var(--font-family);
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  transition: opacity $time, transform $time, height $time;
  transform: scale(0);
  @media screen and (max-width: $xxxl) {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: $xl) {
    display: none;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    width: 0%;
    height: 0%;
    opacity: 0.35;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    background-color: var(--text-avocado);
    transition: width 0.5s, height 0.5s, opacity $time, background-color $time;
    z-index: -1;
    pointer-events: none;
  }
  &.active {
    opacity: 1;
    transform: scale(1);
    height: 160px;
    @media screen and (max-width: $xxxl) {
      height: 130px;
    }
    &::before {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      transition: width 0.5s ease 0.1s, height 0.5s ease 0.1s, opacity $time,
        background-color $time;
    }
    &::after {
      width: 100%;
      height: 100%;
      opacity: 1;
      transition: width 0.5s ease 0.3s, height 0.5s ease 0.3s, opacity $time,
        background-color $time;
    }
    & .marquee {
      animation-delay: 0.5s;
      animation-play-state: running;
    }
  }
}

.marquee {
  color: #eee;
  position: relative;
  display: flex;
  gap: 10px;
  animation: scroll 8s infinite linear;
  animation-play-state: paused;
}
.slider-format {
  & .marquee {
    animation: scroll 16s infinite linear;
  }
}
.marquee-content {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  width: 100%;
  white-space: nowrap;
  font-weight: 500;
  // font-size: 48px;
  font-size: 32px;
  color: var(--text-white);
  &::before,
  &::after {
    content: attr(data-content);
    display: block;
    white-space: nowrap;
  }
  @media screen and (max-width: $xxxl) {
    font-size: 36px;
  }
}
</style>
