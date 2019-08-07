# koa-joi-rest ![build](https://api.travis-ci.org/michael34435/koa-joi-rest.svg?branch=master)

`koa-joi-rest` is a super simple tool to build `Koa.js` controller like `Laravel` controller, use `koa-joi-router`

## Requirement

* node.js >= 8

## Install

```bash
npm install --save koa-joi-rest
```

## Usage

Basically, you can assign an object to get koa-router routes

```js
const rest = require('koa-joi-rest')

const handlers = {
  index (ctx) {

  },
  store (ctx) {

  },
  // ...
}

rest(
  {
    resource: 'foo',
    handlers
  }
)
```

Or, you can assign nested resource like this

```js
rest(
  {
    resource: ['foo', 'bar'],
    handlers
  }
)
```

The path looks like this `/foo/:fooId/bar/:id`

|key|description|type|
|---|---|---|
|resource|Route resources, it should be an array or a string.|string or array |
|handlers|An object to define CRUD like Laravel project.|object|
|middlewares|An object to define CRUD middleware like Laravel project.|object|
|validates|validation object provided by joi-router.|object|
|prefix|Add prefix to all routes|string|
|middleware|Add koa middleware to all routes|function||
