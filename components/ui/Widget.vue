<template lang="pug">
	nuxt-link(to="/flats-list").widget-circle.lock-padding
		.widget-circle__image
			//- NuxtImg(:src="`/images/main-hero/circle-img.png`" format="avif" alt="изображение жк")
			picture
				source(type="image/webp" :srcset="`/images/main-hero/circle-img.webp`" )
				source(:srcset="`/images/main-hero/circle-img.png`" )
				img(:src="`/images/main-hero/circle-img.png`" alt="изображение жк")
</template>

<style lang="scss" scoped>
.widget-circle {
   display: grid;
   place-items: center;
   width: 170px;
   height: 170px;
   position: fixed;
   z-index: 30;
   bottom: 24px;
   right: 20px;
   overflow: hidden;
   &__image {
      width: 105px;
      height: 105px;
      border-radius: 50%;
      overflow: hidden;
      @media screen and (max-width: $xxxl) {
         width: 95px;
         height: 95px;
      }
   }
   &::before {
      content: "";
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-image: url("/images/main-hero/circle-text.svg");
      background-repeat: no-repeat;
      background-position: center;
      animation: spin 15s linear infinite;
      @media screen and (max-width: $xxxl) {
         background-size: 154px 154px;
      }
   }
   @media (any-hover: hover) {
      &:hover {
         &::before {
            animation-play-state: paused;
         }
      }
   }
   @media screen and (max-width: $xxxl) {
      width: 154px;
      height: 154px;
   }
   @media screen and (max-width: $xl) {
      display: none;
   }
}
@keyframes spin {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(-1turn);
   }
}
</style>
