<template lang="pug">
	.contacts__info.info-contacts
		.info-contacts__header
			h3.info-contacts__title Офис продаж
			a(v-if="info.phone" :href="`tel:${formatPhone(info.phone)}`").info-contacts__phone {{ info.phone }}
			.info-contacts__place(v-if="info.address || info.email")
				address.info-contacts__address(v-if="info.address") {{ info.address }}
				UiEmailLink(v-if="info.email" :email="info.email")
			.info-contacts__social
				UiSocial(color="gray")
		.info-contacts__schedule.schedule-contacts
			h5.schedule-contacts__title Время работы
			ul.schedule-contacts__list
				li.schedule-contacts__item(v-for="item, index in workHours" :key="index")
					.schedule-contacts__label 
						span {{ item[0] }}
					.schedule-contacts__value {{ item[1] }}
		SectionContactsActions
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;

const workHours = info.workHours.map((item) => {
  return item.split(": ");
});

defineProps({
  schedule: {
    type: Array,
    required: false,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.info-contacts {
  background-color: var(--bg-white);
  border-radius: 10px;
  padding: 40px;
  padding-bottom: 46px;
  display: grid;
  gap: 54px;
  // margin-top: 6px;
  // min-height: 678px;
  @media screen and (max-width: $xl) {
    margin-top: 0;
    padding: 20px;
    gap: 46px;
  }
  &__header {
    display: grid;
    justify-items: start;
    gap: 24px;
  }
  &__title {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    text-transform: uppercase;
    margin: 0;
    @media screen and (max-width: $md) {
      font-size: 18px;
      line-height: 120%;
    }
  }
  &__phone {
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    font-family: var(--second-family);
    text-transform: uppercase;
    transition: color var(--time) ease 0s;
    @media (any-hover: hover) {
      &:hover {
        color: var(--text-avocado);
      }
    }
    @media screen and (max-width: $md) {
      font-size: 18px;
      line-height: 120%;
    }
  }
  &__place {
    display: grid;
    gap: 18px;
    font-size: 16px;
    line-height: 19px;
  }
  &__address {
  }
  &__email {
  }
  & .email-link {
    justify-self: start;
  }
  // &__social {
  //    & .social {
  //       &__link {
  //          width: 48px;
  //          height: 48px;
  //       }
  //    }
  // }
}
.schedule-contacts {
  display: grid;
  gap: 24px;
  max-width: 350px;
  @media screen and (max-width: $xl) {
    max-width: 100%;
  }
  &__title {
    margin: 0;
    @media screen and (max-width: $xl) {
      font-size: 18px;
      line-height: 120%;
    }
  }
  &__list {
    display: grid;
    gap: 14px;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__label {
    font-weight: 600;
    position: relative;
    z-index: 2;
    flex: 1 1 auto;
    line-height: 22px;
    & span {
      padding-right: 14px;
      background-color: var(--bg-white);
    }
    &::before {
      content: "";
      display: block;
      left: 0;
      bottom: 2px;
      position: absolute;
      width: 100%;
      border-bottom: 1px dashed var(--bg-gray);
      z-index: -1;
    }
  }
  &__value {
    line-height: 22px;
    padding-left: 14px;
  }
}
.social {
  &__list {
    @include reset-list;
    display: flex;
    align-items: center;
    gap: 32px;
  }
  &__link {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    border-radius: 50%;
    border: 1px solid var(--bg-gray);
    display: grid;
    place-items: center;
    transition: border-color var(--time) ease 0s;
    @media (any-hover: hover) {
      &:hover {
        border-color: var(--text-gray);
      }
    }
  }
}
</style>
