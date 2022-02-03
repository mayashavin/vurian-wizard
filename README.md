<h1 align="center">@vurian/wizard - A wizard machine component for Vue 3</h1>

<!-- badge -->
[![Netlify Status](https://api.netlify.com/api/v1/badges/86174d7f-1c39-41e4-879a-8c28809b854d/deploy-status)](https://app.netlify.com/sites/vurianjs/deploys)
[![npm version](https://img.shields.io/npm/v/@vurian/wizard.svg)](https://www.npmjs.com/package/@vurian/wizard)
[![npm download](https://img.shields.io/npm/dt/@vurian/wizard.svg)](https://www.npmjs.com/package/@vurian/wizard)
<!-- endbadge -->

The more organized and out-of-the-box for Wizard Component from the Vurian project, written in TypeScript and using [XState](https://xstate.js.org).

📚 Documentation: [https://vurianjs.netlify.app]

🎮 Playground: TBD

💻 Demo: TBD

## Example

```html
<template>
    <VrWizard 
        title="My Vurian Wizard"
        description="A wizard built with state machine"
        :options="options" 
        :id="id" 
        :context="context" 
        :states="states" 
        :initial="initial"
        nextText="Forward"
        prevText="Back"
        :showStepsProgress="false"
        :onComplete="onComplete"
        />
</template>
<script setup>
import VrWizard from '@vurian/wizard'
import ReviewCart from './components/Steps/ReviewCart.vue';
import Payment from './components/Steps/Payment.vue';
import Confirmation from './components/Steps/Confirmation.vue';
import Shipping from './components/Steps/Shipping.vue';
import Billing from './components/Steps/Billing.vue';

const id = 'vurian-wizard-checkout'

const context = {
    completedSteps: [],
    currentView: ReviewCart,
    shippingId: '',
    billing: {
        phone: '',
        address: '',
        email: ''
    },
    shippingMethod: ''
    agreeToTerms: false,
    paymentMethod: ''
}

const states = {
    review: {
        order: 0,
        title: 'Review your cart',
        stepView: ReviewCart,
        id: 'review'
    },
    shipping: {
        order: 1,
        title: 'Shipping information',
        stepView: Shipping,
        id: 'shipping'
    },
    billing: {
        order: 2,
        title: 'Billing information',
        stepView: Billing,
        id: 'billing'
    },
    payment: {
        order: 3,
        title: 'Make a payment',
        stepView: Payment,
        id: 'payment',
        on: {
            NEXT: {
                cond: 'isAgreeToTerm' //lock the step until it fulfills condition
            }
        }
    },
    confirmation: {
        order: 4,
        title: 'Confirm your order',
        stepView: Confirmation,
        id: 'confirmation',
        type: 'final'
    }
}

const initial = 'review'

const onComplete = () => {
    //do something
}

const options = {
    isAgreeToTerm: (ctx) => ctx.agreeToTerms && !!ctx.paymentMethod,
}
</script>
```