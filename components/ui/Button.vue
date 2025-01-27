<template lang="pug">
	button(:type="type" :class="[classNames]" @click="buttonClick").btn {{ text }}
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  classNames: {
    type: String,
    required: false,
    default: () => "",
  },
  type: {
    type: String,
    required: false,
    default: "button",
  },
});

const emit = defineEmits(["buttonClick"]);

const buttonClick = () => {
  emit("buttonClick");
};
</script>

<style lang="scss">
.btn {
  display: grid;
  place-items: center;
  border-radius: 100px;
  padding: 11px 32px;
  min-height: 52px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  font-family: var(--second-family);
  width: 100%;
  background-color: var(--text-avocado);
  color: var(--text-white);
  transition: color $time ease 0s, background-color $time ease 0s,
    border-color $time ease 0s;
  &.disabled,
  &:disabled {
    pointer-events: none;
  }
  @media screen and (max-width: $xl) {
    min-height: 46px;
    font-size: 14px;
    line-height: 17px;
  }
}
.btn-green {
  background-color: var(--text-avocado);
  color: var(--text-white);
  @media (any-hover: hover) {
    &:hover {
      background-color: #88a645;
    }
    &:active {
      background-color: #66783d;
    }
  }
  &:active {
    background-color: #66783d;
  }
}
.btn-white {
  background-color: var(--bg-white-dirt);
  color: var(--text-gray);
  @media (any-hover: hover) {
    &:hover {
      background-color: #deddd9;
    }
    &:active {
      background-color: #cac9c5;
    }
  }
  &:active {
    background-color: #cac9c5;
  }
}
.btn-green,
.btn-white {
  &.disabled,
  &:disabled {
    background-color: #d4d5db;
    color: #a8adbb;
  }
}
.btn-transparent {
  background-color: transparent;
  border: 1px solid var(--text-gray);
  color: var(--text-midnight-100);
  @media (any-hover: hover) {
    &:hover {
      border-color: var(--bg-gray);
    }
    &:active {
      border-color: var(--bg-gray);
    }
  }
  &:active {
    border-color: var(--bg-gray);
  }
  &.diabled {
    border-color: #d4d5db;
    color: #a8adbb;
  }
}
</style>
