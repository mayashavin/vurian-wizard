<script lang="ts">
import { defineComponent } from 'vue';
import VrWizard from '@/vr-wizard.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VrWizard
  }
});
</script>

<template>
  <div id="app">
    <vr-wizard />
  </div>
</template>
