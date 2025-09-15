<template>
  <div
    :class="cardClasses"
    @click="handleClick"
  >
    <div
      v-if="image"
      class="Nyx-card__image"
    >
      <img :src="image" :alt="imageAlt || title" />
    </div>
    
    <div
      v-if="title || subtitle"
      class="Nyx-card__header"
    >
      <h3
        v-if="title"
        class="Nyx-card__title"
      >
        {{ title }}
      </h3>
      <p
        v-if="subtitle"
        class="Nyx-card__subtitle"
      >
        {{ subtitle }}
      </p>
    </div>
    
    <div class="Nyx-card__body">
      <slot />
    </div>
    
    <div
      v-if="$slots.footer"
      class="Nyx-card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

export default {
  name: 'AlsaniaCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    },
    hover: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const cardClasses = computed(() => {
      const classes = ['Nyx-card'];
      
      if (props.hover) {
        classes.push('Nyx-card--hover');
      }
      
      if (props.clickable) {
        classes.push('Nyx-card--clickable');
      }
      
      return classes.join(' ');
    });

    const handleClick = (event: Event) => {
      if (props.clickable) {
        emit('click', event);
      }
    };

    return {
      cardClasses,
      handleClick
    };
  }
};
</script>

<style scoped>
/* Component styles are imported from the global CSS */
</style>
