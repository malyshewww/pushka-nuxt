<template lang="pug">
	.main-location__map.map
		.map#mapElem(ref="mapElem")
</template>

<script setup>
import json from "~/static/map-theme.json";

const coords = [44.011457, 56.323333];

const props = defineProps({
  locationId: {
    type: Number,
    required: true,
  },
});

const mapElem = ref("");

const map = ref(null);

const newVal = ref(props.locationId);

const placemarks = [
  // парк пушкина
  {
    id: 1,
    coords: [43.997183, 56.308685],
    transform: "translate(-50%, -50%)",
    isActive: true,
    caption: "парк пушкина",
    description:
      "В обновлённом парке: детский городок, специальная зона для выгула и дрессировки собак, просторная скейт-площадка",
    distance: "5 мин пешком",
  },
  // площадь Горького
  {
    coords: [43.991497, 56.314137],
    transform: "translate(-50%, -50%)",
    id: 2,
    isActive: false,
    caption: "площадь Горького",
    description: "Одна из центральных площадей города",
    distance: "5 мин пешком",
  },
  // Средной рынок
  {
    coords: [43.988802, 56.308765],
    transform: "translate(-50%, -50%)",
    id: 3,
    isActive: false,
    caption: "Средной рынок",
    description:
      "Комфортные и современные торговые ряды с фермерскими продуктами",
    distance: "5 мин пешком",
  },
  // Улица Белинского
  {
    coords: [44.008259, 56.313523],
    transform: "translate(-50%, -50%)",
    id: 4,
    isActive: false,
    caption: "Улица Белинского",
    description:
      "Многочисленные скверы и исторические уголки Нижнего Новгорода",
    distance: "5 мин пешком",
  },
];

// Обновление маркеров
const updateMarkers = () => {
  placemarks.map((marker) => {
    if (props.locationId === marker.id) {
      marker.isActive = true;
      // console.log("active");
    } else {
      marker.isActive = false;
      // console.log("not active");
    }
  });
  return {
    pm: placemarks,
  };
};

watch(
  () => props.locationId,
  () => {
    // console.log("update");
    updateMarkers();
  }
);

const { pm } = updateMarkers();

onMounted(() => {
  let isLoaded = false;
  function loadMap() {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=557cbb59-9789-4d04-8c1b-761ddcf44fc6&lang=ru_RU`;
    document.body.appendChild(script);
    isLoaded = true;
    script.onload = function () {
      initMap();
    };
  }
  async function initMap() {
    await ymaps3.ready;
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
    } = ymaps3;
    map.value = new YMap(mapElem.value, {
      location: {
        center: coords,
        zoom: window.innerWidth > 1024 ? 14 : 13,
      },
      behaviors: [
        "drag",
        "multiTouch",
        "dblClickZoom",
        "rightMouseButtonMagnifier",
        "pinchZoom",
        "dblClick",
        "magnifier",
      ],
    });
    // Добавьте слой с дорогами и зданиями
    map.value.addChild(
      new YMapDefaultSchemeLayer({
        theme: "monochrome",
        customization: json,
      })
    );
    // Добавьте слой для маркеров
    const defaultFeaturesLayer = new YMapDefaultFeaturesLayer();
    map.value.addChild(defaultFeaturesLayer);
    pm.forEach((placemark) => {
      const markerElement = document.createElement("div");
      markerElement.className = "map-marker";
      markerElement.setAttribute("data-marker-id", placemark.id);
      markerElement.setAttribute("data-caption", placemark.caption);
      markerElement.setAttribute("data-description", placemark.description);
      markerElement.setAttribute("data-distance", placemark.distance);
      if (placemark.id == newVal.value) {
        markerElement.classList.add("active");
      } else {
        markerElement.classList.remove("active");
      }
      const markerElementImg = document.createElement("div");
      markerElementImg.className = "map-marker__image";
      markerElementImg.innerHTML = `
				<svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5.7085 30.4791L18 45.7134L30.2915 30.4786C30.3193 30.4443 30.3489 30.4113 30.3801 30.3801C37.2066 23.5537 37.2066 12.4462 30.3801 5.61969C27.0941 2.3412 22.6418 0.5 18 0.5C13.3582 0.5 8.9059 2.3412 5.61987 5.61969C-1.20662 12.4462 -1.20662 23.5537 5.61987 30.3801C5.65112 30.4115 5.68071 30.4445 5.7085 30.4791Z" fill="#FCFBF7"/>
					<path d="M18.1235 27.1719C23.3154 27.1719 27.5242 22.9631 27.5242 17.7712C27.5242 12.5794 23.3154 8.37061 18.1235 8.37061C12.9317 8.37061 8.7229 12.5794 8.7229 17.7712C8.7229 22.9631 12.9317 27.1719 18.1235 27.1719Z" fill="#878C9A"/>
					<path d="M5.7085 30.4791L18 45.7134L30.2915 30.4786C30.3193 30.4443 30.3489 30.4113 30.3801 30.3801C37.2066 23.5537 37.2066 12.4462 30.3801 5.61969C27.0941 2.3412 22.6418 0.5 18 0.5C13.3582 0.5 8.9059 2.3412 5.61987 5.61969C-1.20662 12.4462 -1.20662 23.5537 5.61987 30.3801C5.65112 30.4115 5.68071 30.4445 5.7085 30.4791ZM18 5.87955C20.3519 5.87955 22.6509 6.57696 24.6064 7.88358C26.562 9.1902 28.0861 11.0474 28.9861 13.2202C29.8862 15.393 30.1217 17.784 29.6629 20.0907C29.2041 22.3973 28.0716 24.5162 26.4086 26.1792C24.7455 27.8423 22.6267 28.9748 20.3201 29.4337C18.0134 29.8926 15.6225 29.6571 13.4496 28.7571C11.2767 27.8572 9.41954 26.3331 8.11287 24.3776C6.8062 22.4221 6.10873 20.1231 6.10867 17.7712C6.11216 14.6185 7.3661 11.5958 9.59539 9.36649C11.8247 7.13714 14.8473 5.88312 18 5.87955Z" fill="#878C9A"/>
				</svg>
			 `;
      markerElement.appendChild(markerElementImg);
      markerElementImg.src = placemark.image;
      const marks = new YMapMarker(
        {
          coordinates: placemark.coords,
          mapFollowsOnDrag: true,
          // properties: { hint: placemark.hint, offset: [-1000, -1000] },
        },
        markerElement
      );
      map.value.addChild(marks);
    });
    const content = document.createElement("div");
    content.className = "map-pin";
    const img = document.createElement("img");
    content.appendChild(img);
    img.src = "/images/icons/jk-pin.png";
    // Инициализируйте маркер
    const marker = new YMapMarker(
      {
        coordinates: coords,
        draggable: false,
      },
      content
    );
    map.value.addChild(marker);

    //  map.value.addChild(
    //    new YMapControls({ position: "right" }).addChild(new YMapZoomControl({}))
    //  );
    //  if (window.innerWidth < 1024) {
    //    map.setBehaviors([
    //      "multiTouch",
    //      "dblClickZoom",
    //      "rightMouseButtonMagnifier",
    //      "pinchZoom",
    //      "dblClick",
    //      "magnifier",
    //    ]);
    //    const mapLayout = document.getElementById("mapElem");
    //    if (mapLayout) {
    //      const pane = document.createElement("div");
    //      pane.innerHTML =
    //        "Чтобы переместить карту проведите по ней двумя пальцами";
    //      pane.style.cssText =
    //        "height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; z-index: 4; color: #fff; font-size: 22px; font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; text-align: center; background-color: rgba(0,0,0,0.45); opacity: 0; transition: opacity 0.45s; padding: 25px; box-sizing: border-box;";
    //      mapLayout.append(pane);
    //      mapLayout.addEventListener("touchmove", function (e) {
    //        const touches = e.touches.length;
    //        if (touches > 1) {
    //          // Если точек касания больше одной
    //          pane.style.opacity = "0";
    //          pane.style.pointerEvents = "none";
    //          mapLayout
    //            .querySelector(".ymaps3x0--map")
    //            .classList.remove("not-touch");
    //          map.setBehaviors([
    //            "drag",
    //            "multiTouch",
    //            "dblClickZoom",
    //            "rightMouseButtonMagnifier",
    //            "pinchZoom",
    //            "dblClick",
    //            "magnifier",
    //          ]);
    //        } else {
    //          pane.style.opacity = "1";
    //          pane.style.pointerEvents = "";
    //          mapLayout
    //            .querySelector(".ymaps3x0--map")
    //            .classList.add("not-touch");
    //          map.setBehaviors([
    //            "multiTouch",
    //            "dblClickZoom",
    //            "rightMouseButtonMagnifier",
    //            "pinchZoom",
    //            "dblClick",
    //            "magnifier",
    //          ]);
    //        }
    //      });
    //      mapLayout.addEventListener("touchend", () => {
    //        pane.style.opacity = "0";
    //      });
    //    }
    //  }
  }
  const observer = new IntersectionObserver(([entry]) => {
    const targetInfo = entry.boundingClientRect;
    const rootBoundsInfo = entry.rootBounds;
    if (
      (!isLoaded && targetInfo.top < rootBoundsInfo.bottom) ||
      targetInfo.isIntersecting
    ) {
      loadMap();
      observer.unobserve(entry.target);
    }
  }, {});
  observer.observe(mapElem.value);
});
</script>

<style lang="scss">
.main-location {
  &__map {
    padding-bottom: math.div(760, 1680) * 100%;
    position: relative;
    min-height: 365px;
    @media screen and (max-width: $md) {
      min-height: 444px;
    }
    & .map {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    & .map-pin {
      width: 100px;
      height: 100px;
      display: block;
      visibility: visible;
      //  transform: translate(-50%, -100%);
      @media screen and (max-width: $xl) {
        width: 80px;
        height: 80px;
      }
    }
    //   [class*="--marker"] {
    //      width: 100px;
    //      height: 100px;
    //   }
    [class*="--map-copyrights"] {
      display: none;
    }
    [class*="--marker"] {
      visibility: hidden;
    }
    & .my-hint {
      transform: translate(5px, 15px);
      padding: 4px;
      background-color: var(--bg-primary);
      border: 1px solid var(--bg-substrate);
      color: var(--text-secondary);
      font-size: 12px;
      border-radius: 8px;
    }

    & .map-marker {
      width: 60px;
      height: 60px;
      display: grid;
      place-items: center;
      transform: translate(-50%, -50%);
      visibility: visible;
      &__image {
        pointer-events: none;
        transform: scale(0.71);
        transition: transform $time * 2;
        & svg {
          width: 100%;
          height: 100%;
        }
        & svg path {
          transition: fill $time * 2;
        }
        @media screen and (max-width: $xl) {
          width: 28px;
          height: 36px;
          transform: scale(0.75);
        }
      }
      &.active {
        & .map-marker__image {
          transform: scale(1);
          & svg path:nth-child(2),
          & svg path:nth-child(3) {
            fill: var(--main-color);
          }
        }
      }
      @media screen and (max-width: $xl) {
        width: 48px;
        height: 48px;
        &[data-marker-id="1"] {
          animation-delay: 0.4s;
          animation: smoothbounce 1.2s infinite alternate;
        }
        &[data-marker-id="2"] {
          animation-delay: -0.6s;
          animation: smoothbounce 1.4s infinite alternate;
        }
        &[data-marker-id="3"] {
          animation-delay: -0.8s;
          animation: smoothbounce 1.8s infinite alternate;
        }
        &[data-marker-id="4"] {
          animation-delay: -1s;
          animation: smoothbounce 2s infinite alternate;
        }
      }
    }
    & .ymaps3x0--marker {
      &:hover {
        z-index: 1 !important;
      }
    }
  }
}

@keyframes smoothbounce {
  from {
    transform: translate3d(-50%, calc(-50% - 5px), 0);
  }
  to {
    transform: translate3d(-50%, calc(-50% + 5px), 0);
  }
}
</style>
