---
title: Usage
description: 'How to use the wizard'
position: 4
category: wizard
version: 1
---

An example of how to define and use the component as shown below:

```vue
<script setup>
import VrWizard from '@vurian/wizard';
import ReviewCart from './components/Steps/ReviewCart.vue';
import Payment from './components/Steps/Payment.vue';
import Confirmation from './components/Steps/Confirmation.vue';
import Shipping from './components/Steps/Shipping.vue';
import Billing from './components/Steps/Billing.vue';
import { assign } from "xstate";

const config = {
  id: "checkout",
  initial: "review",
  context: {
    completedSteps: [],
    cart: [],
    shipping: {
      address: '',
      phone: '',
      email: '',
      id: ''
    },
    shippingMethod: '',
    billing: {
      address: '',
    },
    agreeToTerms: false,
    paymentMethod: ''
  },
  states: {
    review: {
      title: 'Review',
      id: 'review',
      meta: {
        description: 'Review your cart',
      },
      stepView: ReviewCart,
      order: 0,
    },
    shipping: {
      title: 'Shipping',
      id: 'shipping',
      meta: {
        description: 'Shipping address',
      },
      stepView: Shipping,
      order: 1,
      on: {
        UPDATE_ADDRESS: {
          actions: assign({
            shipping: (_, event) =>  event.address
          }),
          meta: {
            description: 'Provide shipping address'
          }
        },
        SELECT_METHOD: {
          actions: assign({
            shippingMethod: (_, event) => event.method 
          }),
          meta: {
            description: 'Select shipping method'
          }
        },
      },
    },
    billing: {
      title: 'Billing',
      id: 'billing',
      meta: {
        description: 'Billing address',
      },
      stepView: Billing,
      order: 2,
      on: {
        ADD_BILLING_ADDRESS: {
          meta: {
            description: 'Enter billing address'
          },
          actions: assign({
            billing: (context, event) =>  ({
              ...context.billing,
              address: event.address
            })
          }),
        },
      }
    },
    payment: {
      title: 'Payment',
      id: 'payment',
      meta: {
        description: 'Payment',
      },
      stepView: Payment,
      order: 3,
      on: {
        SELECT_METHOD: {
          meta: {
            description: 'Select a payment method'
          },
          actions: assign({
            paymentMethod: (_, event) => event.paymentMethod
          })
        },
        AGREE_TO_TERM: {
          meta: {
            description: 'Confirm agree to terms & conditions'
          },
          actions: assign({
            agreeToTerms: (_, event) => event.agreeToTerms
          })
        },
        NEXT: {
          cond: 'isAgreeToTerm'
        }
      }
    },
    success: {
      title: 'Confirmation',
      id: 'success',
      meta: {
        description: 'Order confirmed',
      },
      stepView: Confirmation,
      order: 4,
    },
  },
} 

const options = {
  guards: {
    isAgreeToTerm: (ctx) => ctx.agreeToTerms && !!ctx.paymentMethod,
  }
}

const onComplete = () => {
    /* do something */
}
</script>
<template>
  <VrWizard 
    :options="options" 
    :id="config.id" 
    :context="config.context" 
    :states="config.states" 
    :initial="config.initial"
    :onComplete="onComplete"
  />
</template>
```