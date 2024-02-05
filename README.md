# payment test

## cards considerations

you can use any card but the system detects when is a masterdcard or visa, for error transaction please be sure that the card number ends with "1"

## test on proyect

```
npm run test:unit

> test@0.1.0 test:unit
> vue-cli-service test:unit

 PASS  tests/unit/components/shared/ProductList.spec.ts (12.016 s)
 PASS  tests/unit/layout/main-layout.spec.ts (12.131 s)
 PASS  tests/unit/layout/main-footer.spec.ts
 PASS  tests/unit/layout/main-header.spec.ts (13.027 s)
 PASS  tests/unit/components/shared/ProductCard.spec.ts (13.032 s)
 PASS  tests/unit/views/HomeView.spec.ts (13.131 s)
 PASS  tests/unit/views/BuyCartView.spec.ts (13.693 s)
 PASS  tests/unit/example.spec.ts (14.849 s)
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.

Test Suites: 8 passed, 8 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        16.507 s
Ran all test suites.
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
