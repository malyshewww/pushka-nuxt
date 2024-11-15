<template lang="pug">
	section.gallery
		.heading
			h2.heading__title Фотогалерея
		.gallery__body
			.gallery-item(v-for="item in gallery")
				span.mask
					span.mask__icon
				a(:href="item.raw" data-fancybox="gallery-static").gallery-item__image.ibg(v-html="item.markup")
					//- NuxtImg(:src="`/images/text-page/gallery-${item}.jpg`" format="avif" alt="изображение")
					//- img(:src="item.raw")
</template>

<script setup>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
const fancyboxOptions = {
   Hash: false,
};
Fancybox.bind(`[data-fancybox="gallery-static"]`, fancyboxOptions);

defineProps({
   gallery: {
      type: Array,
      required: true,
      default: () => [],
   },
});
</script>

<style lang="scss" scoped>
.gallery {
   &__body {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: start;
      gap: 40px;
      @media screen and (max-width: $xl) {
         grid-template-columns: repeat(2, 1fr);
         gap: 20px;
      }
      @media screen and (max-width: $md) {
         grid-template-columns: 100%;
         gap: 15px;
      }
   }
}
.gallery-item {
   position: relative;
   &__image {
      display: block;
      padding-bottom: math.div(398, 594) * 100%;
   }
   @media (any-hover: hover) {
      &:hover {
         & .mask {
            opacity: 1;
            &__icon {
               opacity: 1;
            }
         }
      }
   }
}
</style>
