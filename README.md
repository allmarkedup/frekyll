# Frekyll

Experimental adapter to help Fractal :heart: Jekyll.

## Installation and Usage

```js
// package.json
"dependencies": {
  "@allmarkedup/frekyll": "allmarkedup/frekyll#master"
}
```

And then `require` and configure it as follows:

```js
const frekyll = require('@allmarkedup/frekyll')({
    /* configuration properties here */
});

fractal.components.engine(frekyll);
```
