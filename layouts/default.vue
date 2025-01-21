<template lang="pug">
	.wrapper
		UiTrailer
		AppHeader(:is-white="false" :is-visible="isHeaderVisible")
		.page
			slot
			ButtonUp
		AppFooter
</template>

<script setup>
const isHeaderVisible = ref(true);

onMounted(() => {
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  function getBrowserName() {
    var name = "Unknown";
    if (navigator.userAgent.indexOf("MSIE") != -1) {
      name = "MSIE";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      name = "Firefox";
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
      name = "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      name = "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      name = "Safari";
    }
    return name;
  }
  let scrollPosition = window.scrollY;
  window.addEventListener("scroll", () => {
    if (!isMobile.any()) {
      let currentScrollPosition = window.scrollY;
      if (scrollPosition <= currentScrollPosition) {
        isHeaderVisible.value = false;
      } else {
        isHeaderVisible.value = true;
      }
      scrollPosition = currentScrollPosition;
    }
    if (isMobile.any() || (isMobile.any() && getBrowserName() == "Safari")) {
      let currentScrollPosition = window.scrollY;
      if (scrollPosition <= currentScrollPosition) {
        isHeaderVisible.value = false;
      } else {
        isHeaderVisible.value = true;
      }
      scrollPosition = currentScrollPosition;
    }
  });

  const footer = document.querySelector(".footer");
  const header = document.querySelector(".header");
  const buttonUp = document.querySelector(".button-up");
  window.addEventListener("scroll", (e) => {
    const scrollY = window.scrollY;
    const headerHeight = header.getBoundingClientRect().height;
    scrollY > headerHeight
      ? buttonUp.classList.add("active")
      : buttonUp.classList.remove("active");
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (footerRect.top <= windowHeight) {
      buttonUp.style.position = "absolute";
      // buttonUp.style.bottom = windowHeight - footerRect.top + "px";
      buttonUp.style.bottom = `${window.innerWidth > 767.98 ? 80 : 50}px`;
    } else {
      buttonUp.style.position = "fixed";
      buttonUp.style.bottom = `${window.innerWidth > 767.98 ? 80 : 60}px`;
      // buttonUp.style.bottom = `80px`;
    }
  });
});
</script>

<style lang="scss">
.page {
  padding: 84px 0 280px;
  position: relative;
  @media screen and (max-width: $xl) {
    padding: 64px 0 160px;
  }
  @media screen and (max-width: $md) {
    padding: 32px 0 100px;
  }
}
// .page--flats-list .page {
//    padding-bottom: 281px;
// }
// .page--flats-scheme .page {
//    padding-bottom: 270px;
// }
// .page--apartment .page {
//    padding-bottom: 290px;
//    @media screen and (max-width: $xl) {
//       padding-bottom: 160px;
//    }
//    @media screen and (max-width: $md) {
//       padding-bottom: 100px;
//    }
// }
</style>
