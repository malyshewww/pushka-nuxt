<template lang="pug">
	.flats-scheme__floors
		.flats-scheme__floor(v-for="(item, index) in corpus" :key="index")
			.flats-scheme__number {{index+1}}
			.flats-scheme__inner
				nuxt-link.flats-scheme__room(
					:to="room.url"
					v-for="(room, idx) in item.apartments"
					:key="idx" :data-status="room.field_status"
					:data-price="room.field_price"
					:data-area="room.field_space"
					:data-number="room.field_number"
					:data-image="item.floor_image[0].raw"
					:class="[`${room.isActive || !isFilterChanged ? 'active' : 'disabled'}`, room.field_status]"
					:data-options="`${room.options}`"
					@mouseenter="showDetailRoom($event, room, item)"
					@mouseleave="hideDetailRoom") {{room.field_number}}
			a(:href="item.floor_image[0].markup" :data-fancybox="`plan-${index}`").flats-scheme__link План этажа
	.flats-scheme__bottom
		.flats-scheme__bottom-top
			.flats-scheme__caption Нежилые помещения
		.flats-scheme__floor.empty
			.flats-scheme__number 1-5
			ul.flats-scheme__inner
				li.flats-scheme__room(v-for="(item, index) in 31")
</template>

<script setup>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const props = defineProps({
  corpus: {
    type: Object,
    required: true,
  },
  isFilterChanged: {
    required: true,
    type: Boolean,
  },
});

const floors = [
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
];

const emit = defineEmits(["openTooltip", "closeTooltip"]);

const showDetailRoom = (event, currentRoom) => {
  // console.log(currentRoom);
  if (window.innerWidth >= 1024) {
    emit("openTooltip", event, currentRoom);
  }
};

const hideDetailRoom = () => {
  if (window.innerWidth >= 1024) {
    emit("closeTooltip");
  }
};

onMounted(() => {
  Fancybox.bind(`[data-fancybox]`, { Hash: false });
  // const cursor = document.getElementById("cursor");
  // let isMovingRight = true;
  // function animateCursor() {
  //    if (isMovingRight) {
  //       cursor.style.transform = "translateX(20px)";
  //    } else {
  //       cursor.style.transform = "translateX(0px)";
  //    }
  //    isMovingRight = !isMovingRight;
  // }
  // setInterval(animateCursor, 500);
});
</script>

<style lang="scss" scoped>
.flats-scheme {
  &__caption {
    font-weight: 600;
    line-height: 22px;
    color: var(--text-gray);
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    margin-top: 41px;
    & .flats-scheme__inner {
      flex-grow: 0;
      overflow: hidden;
    }
    @media screen and (max-width: $md) {
      margin-top: 24px;
    }
  }
  &__bottom-top {
    width: 220px;
    position: sticky;
    top: 0;
    left: 35px;
    margin-left: 35px;
    .simplebar-scrollable-x & {
      margin-left: 47px;
    }
    @media screen and (max-width: $xxl) {
      margin-left: 45px;
    }
    @media screen and (max-width: $md) {
      margin-left: 0;
      left: 40px;
    }
  }
  &__floors {
    display: flex;
    flex-direction: column-reverse;
  }
  &__floor {
    display: flex;
    align-items: center;
    @media (any-hover: hover) {
      &:hover {
        & .flats-scheme__link,
        & .flats-scheme__inner::after {
          opacity: 1;
          pointer-events: all;
        }
        & .flats-scheme__inner::before {
          opacity: 0;
        }
      }
    }
    &.empty {
      pointer-events: none;
      user-select: none;
      & .flats-scheme__room {
        border: 1px solid var(--text-gray);
        background-color: transparent;
        pointer-events: none;
      }
    }
    &:not(:last-child) {
      & .flats-scheme__inner {
        &::before {
          content: "";
        }
      }
    }
  }
  &__number {
    width: 23px;
    flex-shrink: 0;
    font-weight: 600;
    line-height: 22px;
    white-space: nowrap;
    margin-right: 12px;
    padding-right: 12px;
    align-self: stretch;
    align-items: center;
    display: flex;
    background-color: var(--bg-white);
    @media screen and (max-width: $md) {
      margin-right: 0;
    }
  }
  &__link {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: var(--text-gray);
    white-space: nowrap;
    padding: 0 38px 0 38px;
    opacity: 0;
    transition: opacity $time;
    position: relative;
    z-index: 2;
    pointer-events: none;
    @media screen and (max-width: $md) {
      padding: 0 0 0 16px;
    }
  }
  &__inner {
    @include reset-list;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 14px 0;
    position: relative;
    isolation: isolate;
    // flex-grow: 1;
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
      }
    }
    &::before {
      content: none;
      position: absolute;
      bottom: -1px;
      left: 0;
      background-color: var(--bg-gray);
      display: block;
      height: 1px;
      width: 100%;
      transition: opacity $time;
      @media screen and (max-width: $md) {
        width: calc(100% + 106px);
      }
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: -10px;
      background-color: #eaeaea;
      border-radius: 5px;
      background: var(--bg-white-dirt);
      z-index: -1;
      transition: opacity $time;
      opacity: 0;
      width: calc(100% + 177px);
      pointer-events: none;
      @media screen and (max-width: $md) {
        width: calc(100% + 106px);
      }
    }
    @media screen and (max-width: $md) {
      padding: 8px 0;
      padding-left: 5px;
    }
  }
  &__room {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 5px;
    padding: 4px;
    display: grid;
    place-items: center;
    font-size: 14px;
    line-height: 18px;
    transition: background-color $time, color $time;
    color: var(--text-white);
    background-color: var(--text-avocado);
    &.broned {
      pointer-events: none;
      user-select: none;
      background-color: var(--bg-gray);
      color: var(--text-gray);
    }
    &.available {
      color: var(--text-white);
      background-color: var(--text-avocado);
    }
    &.saled {
      background-color: transparent;
      pointer-events: none;
      user-select: none;
    }
    &.disabled {
      background-color: #d3dfb7;
      pointer-events: none;
    }
    &.active {
      color: var(--text-white);
      background-color: var(--text-avocado);
    }
    @media (any-hover: hover) {
      &:hover {
        cursor: pointer;
        background-color: var(--bg-midnight-30);
      }
      &.booked:hover {
        color: var(--text-white);
      }
    }
    @media screen and (max-width: $md) {
      width: 30px;
      height: 30px;
      font-size: 12px;
      line-height: 17px;
    }
  }
}
.flats-scheme {
  &__places {
    &.simplebar-scrollable-x {
      & .flats-scheme__number {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
        width: 35px;
      }
      & .flats-scheme__link {
        opacity: 1;
        pointer-events: all;
      }
      & .simplebar-track {
        position: sticky;
      }
    }
  }
}
</style>
