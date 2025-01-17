<template lang="pug">
	.form-item(:class="{error: !isValid}")
		.form-item__field(:class="[{focus: isFocusField}, {disabled: isDisabledField}]")
			input(v-if="name === 'phone'" :type="type" :name="name" v-maska="'+7 (###) ### ## ##'" v-model="selectedValue" :placeholder="placeholder" @input="emit('update:modelValue', $event.target.value)" @focus="onFocusField" @blur="onBlurField")
			input(v-else :type="type" :name="name" :placeholder="placeholder" v-model="selectedValue" @input="emit('update:modelValue', $event.target.value)" @focus="onFocusField" @blur="onBlurField")
			button(v-if="!isValid" type="button" @click="removeError").form-item__close
		FormErrorMessage(v-if="!isValid" :message="errorMessage")
</template>

<script setup>
// eslint-disable-next-line
import { vMaska } from "maska/vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  isError: {
    type: Boolean,
    required: false,
    default: false,
  },
  isValid: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  errorMessage: {
    type: String,
    required: false,
    default: "поле обязательно для заполнения",
  },
  modelValue: {
    type: String,
    required: false,
    default: () => "",
  },
});

const isFocusField = ref(false);

const isDisabledField = ref(false);

const onFocusField = () => {
  isFocusField.value = true;
};
const onBlurField = () => {
  isFocusField.value = false;
};

const emit = defineEmits(["removeError", "update:modelValue"]);

// // eslint-disable-next-line
const removeError = () => {
  emit("removeError", props.name);
};

const selectedValue = ref(props.modelValue);

// Можно использотвать watch либо событие @input в теге для слежки за изменениями
// watch(
//   () => props.modelValue,
//   (newValue) => {
//     selectedValue.value = newValue;
//   }
// );
// watch(selectedValue, (newValue) => {
//   emit("update:modelValue", newValue);
// });
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  &__field {
    position: relative;
    &::before {
      content: "";
      border-bottom: 1px solid var(--border-white);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transition: border-color $time;
    }
    &.focus::before {
      border-color: var(--text-white);
    }
    &.disabled {
      pointer-events: none;
      &::before {
        border-color: var(--border-white);
      }
      & input {
        color: #8d8d8d;
      }
    }
  }
  &.error {
    & .form-item__field {
      &::before {
        border-color: var(--system-alert);
      }
    }
  }
  & input {
    width: 100%;
    background-color: transparent;
    font-size: 16px;
    line-height: 19px;
    font-family: var(--font-family);
    color: var(--text-white);
    padding: 13px 4px;
    padding-right: 24px;
    min-height: 48px;
    &::placeholder {
      font-size: 16px;
      line-height: 19px;
      color: var(--text-white);
    }
  }
  &__close {
    position: absolute;
    top: 0;
    right: 0px;
    height: 100%;
    width: 24px;
    display: grid;
    place-items: center;
    &::before {
      content: "";
      mask-image: url("/images/icons/close-red.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: var(--system-alert);
      width: 16px;
      height: 16px;
    }
  }
}
</style>
