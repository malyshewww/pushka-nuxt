<template lang="pug">
	.heading-main__buttons
		nuxt-link(to="/flats-list").btn-choice.btn-choice--list Списком
		nuxt-link(to="/flats-scheme").btn-choice.btn-choice--scheme На схеме
</template>

<style lang="scss" scoped>
.heading-main__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  @media screen and (max-width: $md) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
  }
}
.btn-choice {
  border-radius: 5px;
  padding: 15px 32px;
  min-height: 51px;
  font-size: 16px;
  line-height: 19px;
  color: var(--text-midnight-100);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: border-color calc(var(--time) * 1.5) cubic-bezier(0.25, 0.74, 0.22, 0.99);
  border: 1px solid transparent;
  &.active,
  &.router-link-exact-active {
    background: var(--main-color);
    color: var(--text-white);
    @media screen and (max-width: $md) {
      border-color: transparent;
    }
  }
  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 12px 12px;
    background-color: currentColor;
  }
  &--list {
    &::before {
      mask-image: url("/images/icons/list-icon.svg");
    }
  }
  &--scheme {
    &::before {
      mask-image: url("/images/icons/scheme-icon.svg");
    }
  }
  @media (any-hover: hover) {
    &:hover {
      border-color: var(--main-color);
    }
  }
  @media screen and (max-width: $md) {
    min-height: 43px;
    padding: 10px 10px;
    border: 1px solid var(--text-midnight-100);
  }
}
</style>
