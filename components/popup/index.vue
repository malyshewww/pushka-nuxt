<template lang="pug">
	.popup(:class="{ 'open-popup': isOpen }" @click="closePopup")
		.popup__wrapper 
			.popup__content(@click.stop)
				button(type="button" @click="closePopup").popup__close
				slot
</template>
<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  backdrop-filter: blur(4px);
  background: rgba(43, 47, 59, 0.3);
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s ease 0s;
  z-index: 50;
  pointer-events: none;
  &::-webkit-scrollbar {
    background: none;
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    background: none;
    width: 0;
    height: 0;
  }
  &.open-popup {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    & .popup__content {
      opacity: 1;
      transform: perspective(600px) translate(0px, 0%) rotateX(0deg);
    }
  }
  &__wrapper {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 16px;
    transition: all 0.5s ease 0s;
  }
  &__content {
    border-radius: 0px;
    max-width: 460px;
    min-height: 174px;
    background-color: var(--bg-white);
    width: 100%;
    padding: 40px;
    position: relative;
    border-radius: 14px;
    opacity: 0;
    //   transform: perspective(600px) translate(0px, -100%) rotateX(45deg);
    transition: all 0.5s ease 0s;
    .popup-politic & {
      max-width: 800px;
    }
    @media screen and (max-width: $md) {
      padding: 30px 15px;
      border-radius: 16px;
    }
  }
  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background-color: transparent;
    z-index: 2;
    &::before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      mask-image: url("/images/icons/close.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: #7f8284;
      transition: background-color 0.25s ease 0s;
    }
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        &::before {
          background-color: var(--main-color);
        }
      }
    }
    @media screen and (max-width: $xl) {
      top: 8px;
      right: 8px;
    }
  }
  &__form {
    display: grid;
    grid-template-columns: 100%;
    gap: 36px;
  }
  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }
  &__sub-title {
    font-size: 20px;
    line-height: 28px;
  }
  &__image {
    padding-bottom: math.div(500, 300) * 100%;
    flex: 0 0 300px;
    @media screen and (max-width: $md) {
      display: none;
    }
  }
  &__body {
    display: grid;
    grid-template-columns: 300px 1fr;
    @media screen and (max-width: $md) {
      display: flex;
    }
  }
}
.popup-tpl {
  color: var(--text-white);
  @media screen and (max-width: $xl) {
    transition: opacity 0.3s ease 0s, visibility 0.3s ease-out 0s;
  }
  & .open-popup {
    & .popup {
      &__content {
        @media screen and (max-width: $xl) {
          transform: translate(0%, 0%);
          transition: transform 0.5s ease 0s;
          opacity: 1;
        }
      }
    }
  }
  & .popup {
    &__wrapper {
      @media screen and (max-width: $xl) {
        align-items: stretch;
        padding: 0;
      }
    }
    &__content {
      padding: 0;
      @media screen and (max-width: $xl) {
        background-color: var(--main-color);
        max-width: 100%;
        display: flex;
        border-radius: 0;
        opacity: 1;
        transform: translate(100%, 0%);
        transition: transform 0.5s ease 0s;
      }
      @media screen and (max-width: $md) {
        align-items: center;
      }
    }
    &__close {
      @media (any-hover: hover) {
        &:hover {
          &::before {
            background-color: currentColor;
          }
        }
      }
      @media screen and (max-width: $md) {
        &::before {
          background-color: var(--bg-white);
        }
      }
    }
  }
}
</style>
