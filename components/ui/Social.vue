<template lang="pug">
	.social(:class="color")
		ul.social__list
			li.social__item(v-if="info.vk")
				a(:href="info.vk" target="_blank").social__link
					svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
						path(d="M12.7663 17C7.24904 17 4.12261 13.2805 4 7H6.75862C6.81992 11.5732 8.90421 13.5244 10.4981 13.8902V7H13.0728V10.9634C14.6667 10.7805 16.3218 9.01219 16.8736 7H19.4483C19.0192 9.43902 17.1801 11.2683 15.8927 12C17.1801 12.6098 19.2644 14.1951 20 17H17.1188C16.5057 15.1098 14.9732 13.6463 12.9502 13.4024V17H12.7663Z" fill="#2B2F3B")
			//- li.social__item
			//- 	a(href="https://web.telegram.org/k/" target="_blank").social__link
			//- 		svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
			//- 			path(d="M17.9422 5.1135L3.60403 10.7367C2.8187 10.9704 2.8425 11.7702 3.42554 11.9671L7.01902 13.1237L8.39929 17.4795C8.56587 17.9594 8.70866 18.1317 8.99423 18.144C9.29171 18.144 9.4107 18.0332 9.72007 17.7502C10.0889 17.3934 10.6363 16.8397 11.5168 15.9538L15.2531 18.8084C15.9432 19.2022 16.443 18.993 16.6095 18.144L18.9417 6.15938C19.1916 5.1135 18.5967 4.80589 17.9422 5.1135ZM7.57826 12.853L15.7409 7.54979C16.1455 7.26679 16.2645 7.58671 16.086 7.79588L9.31551 14.1081L8.97044 17.258L7.57826 12.853Z" fill="#2B2F3B")
			//- li.social__item
			//- 	a(href="https://www.youtube.com/" target="_blank").social__link
			//- 		svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
			//- 			path(d="M19.7219 7.7731C19.5274 6.93737 18.8294 6.31622 17.9941 6.22587C16.0145 6 14.0007 6 11.9983 6C9.99583 6 7.9934 6 6.00242 6.21458C5.17857 6.31622 4.48058 6.92608 4.28606 7.7731C4 8.97023 4 10.269 4 11.5C4 12.731 4 14.0411 4.27462 15.2382C4.46914 16.0739 5.16713 16.6951 6.00242 16.7854C7.98196 17 9.99583 17 11.9983 17C14.0007 17 16.0031 17 17.9941 16.7854C18.8294 16.6951 19.5274 16.0739 19.7219 15.2382C19.9965 14.0411 19.9965 12.731 19.9965 11.5C20.0079 10.269 20.0079 8.97023 19.7219 7.7731ZM10.3277 13.6571V9.27515L14.5614 11.4661L10.3277 13.6571Z" fill="#2B2F3B")
			//- li.social__item
			//- 	a(href="https://ok.ru/" target="_blank").social__link
			//- 		svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
			//- 			path(fill-rule="evenodd" clip-rule="evenodd" d="M16.4487 8.11865C16.4487 10.3978 14.4514 12.2489 11.9921 12.2489C9.54534 12.2489 7.54797 10.3978 7.54797 8.13022C7.54797 5.85108 9.54534 4 11.9921 4C14.4514 4 16.4487 5.85108 16.4487 8.11865ZM13.8397 8.13022C13.8397 7.18155 13.0033 6.41797 11.9921 6.41797C10.9809 6.41797 10.157 7.18155 10.1446 8.13022C10.1446 9.0789 10.9809 9.84247 11.9921 9.84247C13.0158 9.84247 13.8397 9.06733 13.8397 8.13022ZM16.3863 14.62C15.5874 15.0943 14.7135 15.4183 13.8022 15.6149L16.2864 17.9288C16.7983 18.4031 16.7983 19.1667 16.2864 19.641C15.7746 20.1154 14.9507 20.1154 14.4389 19.641L11.9921 17.3735L9.5578 19.641C9.30813 19.884 8.97107 19.9997 8.63401 19.9997C8.29696 19.9997 7.9599 19.8724 7.71023 19.641C7.19841 19.1667 7.19841 18.4031 7.71023 17.9288L10.1945 15.6265C9.29564 15.4298 8.40931 15.0943 7.61036 14.6315C6.99867 14.2729 6.81142 13.5209 7.21089 12.954C7.59788 12.3871 8.39683 12.2136 9.00852 12.5722C10.8311 13.6366 13.178 13.6366 15.0006 12.5722C15.6123 12.2136 16.4113 12.3871 16.7983 12.954C17.1852 13.5209 16.998 14.2613 16.3863 14.62Z" fill="#2B2F3B")
</template>

<script setup>
import { useMainInfoStore } from "~/stores/maininfo";
const mainInfoStore = useMainInfoStore();
const { info } = mainInfoStore;

defineProps({
  color: {
    type: String,
    required: true,
    default: () => "",
  },
});
</script>

<style lang="scss" scoped>
.social {
  &.gray {
    & .social__link {
      width: 48px;
      height: 48px;
      & svg path {
        fill: var(--text-gray);
      }
      border: 1px solid var(--bg-gray);
      @media (any-hover: hover) {
        &:hover {
          border-color: var(--text-gray);
        }
      }
    }
  }
  &.white {
    & .social__link {
      border: 1px solid var(--border-white);
      & svg path {
        fill: var(--text-white);
      }
      @media (any-hover: hover) {
        &:hover {
          border-color: var(--text-white);
        }
      }
    }
  }
  &__list {
    @include reset-list;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 20px;
    @media screen and (max-width: $md) {
      gap: 10px;
    }
  }
  &__item {
    flex-shrink: 0;
  }
  &__link {
    border: 1px solid transparent;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    transition: border-color var(--time);
    display: grid;
    place-items: center;
    & svg {
      width: 24px;
      height: 24px;
    }
    @media screen and (max-width: $xl) {
      width: 50px;
      height: 50px;
    }
    //   @media (any-hover: hover) {
    //      &:hover {
    //         border-color: var(--text-gray);
    //      }
    //   }
  }
}
</style>
