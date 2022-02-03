---
title: Props
description: 'Acceptable props for Wizard'
position: 3
category: wizard
version: 1
---

```html
<VrWizard 
  title="My Vurian Wizard"
  description="A wizard built with state machine"
  :options="options" 
  :id="config.id" 
  :context="context" 
  :states="states" 
  :initial="initial"
  nextText="Forward"
  prevText="Back"
  :showStepsProgress="false"
  :onComplete="onComplete"
/>
```

Below are the available props for `VrWizard` component

## `initial`

* Type: `String`
* **Required**

The initial step for the wizard. It is either the key of the state defined in `states`, or that `state.id`.

```html
<VrWizard 
    :states="{ step1: { /* state settings */} }" 
    initial="step1"
/>
```

## `id`

* Type: `String`
* **Required**

Id for the wizard machine. This is important to have the wizard internal machine up and running.

## `states`

* Type: `WizardStepsConfig`
* **Required**

Object of states' definition. By default it is not necessary to define next and prev event listeners. The wizard will take care of it automatically. However, there are **required** fields to define inside each state, as shown below:

1. `stepView` which accept a Vue Component. This is the explicit view to render for that state/step.
2. `title` - title of the state/step to display in the progress header.
3. `order` - defines the order of appearance in the states/steps flow of the wizard, accept `number`.

```js
import ReviewCart from '@/components/ReviewCart'

const states = {
  review: {
    title: 'Review',
    id: 'review',
    meta: {
      description: 'Review your cart',
    },
    stepView: ReviewCart,
    order: 0,
  },
  /* ... */
}
```

## `context`

* Type: `WizardContext`
* Default value: `{ completedSteps: [] }`

The context data of the wizard. You can extend the context to include any data you wish to have, but there is an essential field to notice:

1. `completedSteps` - array of keys representing the states/steps that were completed. By default it's empty.

```js

const wizardContext = {
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
    phone: '',
    email: ''
  },
  agreeToTerms: false,
  paymentMethod: ''
}

```

## `title`

* Type: `String`
* _Optional_

Wizard's title to display.

## `description`

* Type: `String`
* _Optional_

Additional description for the Wizard.

## `options`

* Type: `MachineOptions<WizardContext, WizardEvent>`
* _Optional_

Addition options for the wizard machine, such as guards for conditional control the step status, actions, etc.

```js
const options = {
  guards: {
    isAgreeToTerm: (ctx) => ctx.agreeToTerms && !!ctx.paymentMethod,
  }
}
```

## `nextText`

* Type: `String`
* Default value: `Next`

Label for Next button.

## `prevText`

* Type: `String`
* Default value: `Prev`
  
Label for Prev button.

## `doneText`

* Type: `String`
* Default value: `Done`

Label for Done button.

## `showStepsProgress`

* Type: `Boolean`
* Default value: `true`

Hide/show the steps flow on the header.

## `onComplete`

* Type: `Function`

Event to trigger once the last step completes.
