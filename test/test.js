const tick = () => new Promise(resolve => {
  requestAnimationFrame(resolve);
});

describe('cachePerFrame', () => {
  it('should exist as a global via cachePerFrame', () => {
    assert.ok(window.cachePerFrame);
  });

  it('should cache values called multiple times per frame', async function () {
    let i = 0;
    let called = 0;
    let fn = cachePerFrame(function () {
      called++;
      return i;
    });

    let values = [fn(), fn(), fn()];
    assert.ok(values.every(v => v === 0));
    assert.equal(called, 1);
    i++;
    await tick();

    values = [fn(), fn(), fn()];
    assert.ok(values.every(v => v === 1));
    assert.equal(called, 2);
    i++;
    await tick();

    values = [fn(), fn(), fn()];
    assert.ok(values.every(v => v === 2));
    assert.equal(called, 3);
    i++;
    await tick();
  });

  it('should call underlying function always when paused', async function () {
    let i = 0;
    let called = 0;
    let fn = cachePerFrame(function () {
      called++;
      return i;
    });

    let values = [fn(), fn(), fn()];
    assert.ok(values.every(v => v === 0));
    assert.equal(called, 1);
    i++;

    fn.stop();

    assert.equal(fn(), 1);
    assert.equal(called, 2);
    assert.equal(fn(), 1);
    assert.equal(called, 3);

    await tick();

    assert.equal(fn(), 1);
    assert.equal(called, 4);
    assert.equal(fn(), 1);
    assert.equal(called, 5);

    fn.start();
    i++;
    values = [fn(), fn(), fn()];
    assert.ok(values.every(v => v === 2));
    assert.equal(called, 6);
  });

  it('should use the arguments passed in on first receiving per frame', async function () {
    let i = 0;
    let called = 0;
    let fn = cachePerFrame(function (x) {
      called++;
      return i + x;
    });

    let values = [fn(10), fn(20), fn(30)];
    assert.ok(values.every(v => v === 10));
    assert.equal(called, 1);
    i++;

    await tick();

    values = [fn(100), fn(200), fn(300)];
    assert.ok(values.every(v => v === 101));
    assert.equal(called, 2);

  });
});
