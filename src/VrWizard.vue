<template>
  <div class="vr-wizard--title-info" v-if="title || description">
    <h2 v-if="title" class="vr-wizard--title">{{title}}</h2>
    <p v-if="description">{{description}}</p>
  </div>
  <VrWizardHeaderVue :states="states || {}" :currState="state" v-if="showStepsProgress" />
  <VrWizardView :service="{ state, send }" />
  <div class="vr-wizard--footer">
    <div class="vr-wizard--footer-left">
      <button
        class="vr-wizard--prev-btn vr-wizard--btn" 
        @click="send('PREV')" 
        v-if="state.context.completedSteps.length && !state.done"
      >{{prevText}}</button>
    </div>
    <div class="vr-wizard--footer-right">
      <button 
        class="vr-wizard--next-btn vr-wizard--btn" 
        @click="send('NEXT')" 
        v-if="state.context.completedSteps.length < numberOfSteps - 1" 
        :disabled="!state.machine?.transition(state, 'NEXT').changed"
      >{{nextText}}</button>
      <button 
        class="vr-wizard--done-btn vr-wizard--btn" 
        @click="onComplete()" 
        v-if="state.context.completedSteps.length === numberOfSteps - 1" 
      >{{doneText}}</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import VrWizardHeaderVue from './components/VrWizardHeader.vue';
import VrWizardView from './components/VrWizardView.vue';
import { interpret, MachineOptions, StatesConfig, createMachine } from 'xstate'
import { useActor } from '@xstate/vue';
import { PropType, defineProps } from 'vue';
import { WizardContext, WizardEvent } from './types/WizardStepConfig';
import { WizardStepsConfig } from './types/WizardStepsConfig';
import { computeStep } from './configs/machineConfig';

const props = defineProps({
  initial: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  states: {
    type: Object as PropType<WizardStepsConfig>,
    required: true,
  },
  context: {
    type: Object as PropType<WizardContext>,
    default: () => ({
      completedSteps: [],
    }),
  },
  options: {
    type: Object as PropType<MachineOptions<WizardContext, WizardEvent>>
  },
  vertical: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  nextText: {
    type: String,
    default: 'Next'
  },
  prevText: {
    type: String,
    default: 'Prev'
  },
  doneText: {
    type: String,
    default: 'Done'
  },
  showStepsProgress: {
    type: Boolean,
    default: true
  },
  onComplete: {
    type: Function,
    default: () => {},
  },
});

const statesKeys = Object.keys(props.states).sort((a, b) => props.states[a].order - props.states[b].order);

const machineService = interpret(createMachine({
  initial: props.initial,
  id: props.id,
  context: {
    currentView: props.context.currentView || props.states[props.initial].stepView,
    ...props.context
  },
  states: statesKeys.reduce((result: WizardStepsConfig, key: string, currIndex: number, arr: string[]):WizardStepsConfig => {
    const prevState = currIndex - 1 >= 0 ? { id: arr[currIndex - 1], ...props.states[arr[currIndex - 1]] } : undefined;
    const nextState = currIndex + 1 <= arr.length ? { id: arr[currIndex + 1], ...props.states[arr[currIndex + 1]] } : undefined;

    result[key] = computeStep({ state: props.states[key], stateId: key, nextState, prevState});
    props.states[key].id = key;

    return result;
  }, {}),
}, props.options || {})).start().onTransition(newState => { console.log(newState); });

const { state, send } = useActor(machineService);

const numberOfSteps = Object.keys(props.states).length;

</script>
<style scoped>
.vr-wizard--btn{
  background: var(--wizard-stepper--active);
  color: var(--wizard-stepper--active-font);
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
}

.vr-wizard--btn:disabled{
  background: var(--wizard-stepper--disabled);
  color: var(--wizard-stepper--disabled-font);
}

.vr-wizard--footer {
  display: grid;
  grid-template-columns: repeat(2, auto);
}

.vr-wizard--footer-left {
  text-align: start;
}

.vr-wizard--footer-right {
  text-align: end;
}
</style>