let delay = 500;
let unlock = true;
export function body_lock(delay = 500) {
  let body = document.querySelector("body");
  if (body.classList.contains("lock")) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
export function body_lock_remove(delay = 500) {
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.marginRight = "0px";
      }
    }
    body.style.marginRight = "0px";
    body.classList.remove("lock");
  }, delay);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, delay);
}
export function body_lock_add(delay = 500) {
  const body = document.querySelector("body");
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  const lockPadding = document.querySelectorAll(".lock-padding");
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.marginRight = lockPaddingValue;
    }
  }
  body.style.marginRight = lockPaddingValue;
  body.classList.add("lock");
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, delay);
}
