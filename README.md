# RRNL-sentry-middleware

A middleware of React Relay Network Layer, which adds graphQL request info to sentry breadcrumb.

## Usage

**Install**

```
npm i rrnl-sentry-middleware -S
npm i react-relay-network-morden -S
// in browser
npm i @sentry/browser -S
// or in node
// npm i @sentry/node -S

// or use yarn
// yarn add rrnl-sentry-middleware -S
// yarn add react-relay-network-morden -S
// in browser
// yarn add @sentry/browser -S
// or in node
// yarn add @sentry/node -S
```

**Basic Usage**

```js
import sentryMiddleware from 'rrnl-sentry-middleware';
import { getCurrentHub } from '@sentry/core';

const network = new RelayNetworkLayer([
  // ... your RelayNetworkLayer middleware
  sentryMiddleware({
    hub: getCurrentHub(),
  }),
]);
```

## Contribution

DefinitelyTyped only works because of contributions by users like you!

### Git Message

[Follow the Angular git commit message specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

But, you can ignore the scope
