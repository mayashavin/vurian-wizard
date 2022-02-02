---
title: Step View
description: 'How to set up view per step'
position: 5
category: Wizard
version: 1
---

View component per step is rendered automatically upon the state changes. Each component will receive an instance of the created wizard machine - `service`, so you can add additional actions or events. Also, you can use `service.send` to trigger internal custom events defined in the wizard config, or `service.state` to retrieve context data or other information about the current state.

An example of Payment state view, based on [the configuration example](/wizard/usage) can be found below:

```vue
<template>
  <h2>Payment</h2>
  <section>
    <ul>
      <li :key="method.id" v-for="method in paymentMethods">
          <label
            className="field -radio"
            :data-checked="isSelected(method.id)"
          >
          <div>{{method.description}}</div>
          <input
              type="radio"
              :checked="isSelected(method.id)"
              @change="(e) => selectPaymentMethod(e, method.id)"
          />
          </label>
      </li>
    </ul>
    <div>
      <label className="simple-field">
        <input
          type="checkbox"
          :checked="service.state.context.agreeToTerms"
          @change="agreeToTerm"
        />
        <span>I agree to the terms and conditions</span>
      </label>
    </div>
  </section>
</template>
<script setup>
import { defineProps } from 'vue';
import { paymentMethods } from "../../assets/shippingData";
const props = defineProps({
    service: {
        type: Object,
        required: true,
    },
});

const agreeToTerm = (e) => {
  props.service.send({ type: "AGREE_TO_TERM", agreeToTerms: e.target.checked });
};

const selectPaymentMethod = (e, id) => {  
  e.target.checked && props.service.send({ type: "SELECT_METHOD", paymentMethod: id });
};

const isSelected = (id) => {
  return props.service.state.context.paymentMethod === id;
};
</script>
```

And upon using the wizard, simply attach the component to the right state.

```js
const states = {
  payment: {
    title: 'Payment',
    id: 'payment',
    meta: {
      description: 'Confirm payment',
    },
    stepView: ReviewCart,
    order: 4,
  },
  /* ... */
}
```