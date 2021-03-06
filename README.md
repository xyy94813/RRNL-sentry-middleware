# RRNL-sentry-middleware

[![Node CI](https://github.com/xyy94813/RRNL-sentry-middleware/actions/workflows/nodejs.yml/badge.svg)](https://github.com/xyy94813/RRNL-sentry-middleware/actions/workflows/nodejs.yml)
[![Codecov](https://img.shields.io/codecov/c/github/xyy94813/RRNL-sentry-middleware/master.svg?style=flat-square)](https://codecov.io/gh/xyy94813/RRNL-sentry-middleware/branch/master)
[![npm package](https://img.shields.io/npm/v/rrnl-sentry-middleware.svg?style=flat-square)](https://www.npmjs.org/package/rrnl-sentry-middleware)
[![npm downloads](https://img.shields.io/npm/dm/rrnl-sentry-middleware.svg?style=flat-square)](http://npmjs.com/rrnl-sentry-middleware)

A middleware of React Relay Network Layer, which adds graphQL request info to sentry breadcrumb.

> Note: not support batch request now.

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
    hub: getCurrentHub,
  }),
]);
```

## Contribution

DefinitelyTyped only works because of contributions by users like you!

### Git Message

[Follow the Angular git commit message specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

But, you can ignore the scope
