<template>
  <div class="wrapper">
    <ol class="w-stepper">
      <li 
        class="w-stepper__item" 
        v-for="(state, key) in states" :key="key"
        :class="{
          'active': currState.matches(key), 
          'completed': currState.context?.completedSteps.includes(key)
        }"
      >
        <div class="w_stepper__item_content">
          <span class="w_stepper__title">{{state.title}}</span>
        </div>
      </li>      
    </ol>
  </div>
</template>
<script lang="ts" setup>
import { WizardStepsConfig } from '../types/WizardStepsConfig';
import { defineProps, PropType } from 'vue';

const props = defineProps({
  states: {
    type: Object as PropType<WizardStepsConfig>,
    required: true,
  },
  currState: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.w-stepper {
  display: flex;
  --circle-size: clamp(1rem, 2vw, 2rem);
  --spacing: clamp(0.25rem, 2vw, 0.5rem);
  padding: 0;
  margin: 1rem;
}

.w-stepper__item {
  display: flex;
  gap: var(--spacing);
  align-items: center;  
}

.w_stepper__item_content {
  display: flex;
  gap: var(--spacing);
  align-items: center;
}

.w-stepper__item:not(:first-child) {
  flex: 1;
  margin-inline-start: 0.5rem;
}

.w_stepper__item_content::before {
  --size: 3rem;
  content: "";
  display: block;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  background-color: var(--wizard-circle-color);
}

.w-stepper__item_content:not(:first-child) {
  flex: 1;
}

.w-stepper__item:not(:first-child)::before {
  content: "";
  position: relative;
  z-index: -1;
  height: 2px;
  background-color: var(--wizard-line-color);
  flex: 1;
  margin-right: 0.5rem;
}

.w-stepper__title {
  font-size: clamp(1rem, 4vw, 1.25rem);
}

.w-stepper__item.active, .w-stepper__item.completed {
  color: var(--wizard-stepper--active);
}

.w-stepper__item.active:not(:first-child)::before, .w-stepper__item.completed:not(:first-child)::before {
  background-color: var(--wizard-stepper--active);
}

.w-stepper__item.active .w_stepper__item_content::before, .w-stepper__item.completed .w_stepper__item_content::before {
  background-color: var(--wizard-stepper--active);
}
</style>