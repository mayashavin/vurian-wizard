---
title: Setup
description: 'How to set up the wizard'
position: 2
category: Guide
version: 1
---

## Installation

Add `@vurian/wizard` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @vurian/wizard
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @vurian/wizard
  ```

  </code-block>
</code-group>

## Vue 2 support

This component library is written in Vue 3, hence currently we don't have any plan to backward compatibility support yet.

## Using with XState

If you want to extend the wizard to support addition event actions, you should install [XState](https://xstate.js.org). 

<alert type="info">

In the upcoming release we will have this support enabled automatically.

</alert>

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add xstate
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install xstate
  ```

  </code-block>
</code-group>

Once installed, you can pass your own event actions by using `assign()` in the [wizard config Object](/wizard/props).

## TypeScript Support

`@vurian/wizard` supports TypeScript by default.

And that's it 🎉! See [Wizard](/wizard/props) section for how to use the component.
