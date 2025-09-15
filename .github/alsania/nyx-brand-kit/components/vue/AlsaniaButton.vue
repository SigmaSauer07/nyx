<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span
      v-if="icon && iconPosition === 'left' && !loading"
      class="Nyx-btn__icon Nyx-btn__icon--left"
    >
      <slot name="icon">{{ icon }}</slot>
    </span>
    
    <span class="Nyx-btn__content">
      <slot>{{ label }}</slot>
    </span>
    
    <span
      v-if="icon && iconPosition === 'right' && !loading"
      class="Nyx-btn__icon Nyx-btn__icon--right"
    >
      <slot name="icon">{{ icon }}</slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  name: 'AlsaniaButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value)
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button',
      validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const buttonClasses = computed(() => {
      const classes = [
        'Nyx-btn',
        `Nyx-btn--${props.variant}`,
        `Nyx-btn--${props.size}`
      ];
      
      if (props.fullWidth) {
        classes.push('Nyx-btn--full-width');
      }
      
      if (props.loading) {
        classes.push('Nyx-btn--loading');
      }
      
      return classes.join(' ');
    });

    const handleClick = (event: Event) => {
      if (!props.disabled && !props.loading) {
        emit('click', event);
      }
    };

    return {
      buttonClasses,
      handleClick
    };
  }
};
</script>

<style scoped>
/* Component styles are imported from the global CSS */
</style> 