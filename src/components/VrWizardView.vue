<template>
  <section class="step-view">
    <component :is="service.state.context?.currentView" :service="service" v-if="service.state.context?.currentView" />
    <div v-else>You need to define your own view for this step</div>
  </section>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
});
</script>
<style scoped>
.step-view {
  margin-block: 2rem;
  background: #f5f7f8;
  padding: 1rem;
}
</style>