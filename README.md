# cache-per-frame

[![Build Status](http://img.shields.io/travis/jsantell/cache-per-frame.svg?style=flat-square)](https://travis-ci.org/jsantell/cache-per-frame)
[![Build Status](http://img.shields.io/npm/v/cache-per-frame.svg?style=flat-square)](https://www.npmjs.org/package/cache-per-frame)
[![Build Status](http://img.shields.io/npm/dt/cache-per-frame.svg?style=flat-square)](https://www.npmjs.org/package/cache-per-frame)
[![Build Status](http://img.shields.io/npm/l/cache-per-frame.svg?style=flat-square)](https://www.npmjs.org/package/cache-per-frame)

Cache the result of a function once per frame. Built for `VRDisplay.getFrameData(frameData)`
when working with several third party modules that call this once per frame. Does **not**
memoize via arguments, but only uses the arguments from the first call to the wrapped
function per frame.

## Install & Usage

Use the browser-ready bundle at [dist/cache-per-frame.js]:

```html
<script src='cache-per-frame.js'></script>
<script>
var nativeGetFrameData = VRDisplay.prototype.getFrameData;
VRDisplay.prototype.getFrameData = cachePerFrame(function (fd) {
  return nativeGetFrameData.call(this, fd);
});
</script>
```

Or install via npm/yarn:

`$ npm install cache-per-frame --save`

```js
const cachePerFrame = require('cache-per-frame');

var nativeGetFrameData = VRDisplay.prototype.getFrameData;
VRDisplay.prototype.getFrameData = cachePerFrame(function (fd) {
  return nativeGetFrameData.call(this, fd);
});
```

## API

The root module is a function `cachePerFrame(fn)` that takes a function `fn` and returns
a new wrapped form of that function that is throttled per frame. This wrapped function
also has two additional methods for stopping and starting the throttling. By default,
the wrapped function is already started.

### wrappedFn.stop()

Stop throttling the function calls once per frame.

### wrappedFn.start()

Start throttling the function calls once per frame.

## License

Apache License Version 2.0 (see [LICENSE])
