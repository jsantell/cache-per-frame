module.exports = function (fn) {
  var lastRequestId;
  var cache = {
    value: null,
    isCached: false,
    paused: false,
  };

  cachePerFrame.start = function () {
    cache.paused = false;
    clearCache();
  };

  cachePerFrame.stop = function () {
    cache.paused = true;
    cancelAnimationFrame(lastRequestId);
  };

  cachePerFrame.start();

  function clearCache () {
    cache.isCached = false;
    lastRequestId = requestAnimationFrame(clearCache);
  }

  function cachePerFrame () {
    let value;
    if (cache.isCached === false || cache.paused === true) {
      cache.value = fn.apply(this, arguments);
      if (cache.paused === false) {
        cache.isCached = true;
      }
    }
    return cache.value;
  }

  return cachePerFrame;
}
