# StoreTest

## About the project

StoreTest is a project that implements a catalogue of goods with the ability to add goods to cart, as well as with the ability to filter and sorting.

## Get Started

1. Clone the repo

```sh
   git clone https://github.com/KARLDFILD/StoreTest.git
```

2. Install NPM packages
   ```sh
   npm install
   ```
3. Run project

```sh
   npm run dev
```

4. Test cases

```sh
   npm test
```

## Additional message

FakeStoreAPI allows you to limit the number of products returned using the limit parameter (e.g. /products?limit=9 returns the first 9 products). However, the API does not support an offset parameter or similar, which would allow you to specify which product to start sampling from. Without offset it is impossible to request, for example, products 10 to 18, which makes server-side pagination impossible.
