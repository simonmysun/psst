# psst

> wat?

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Usage Description

```
[
  name: string,
  initTime: date = new Date(), 
  periods: array [
    ...,
    period: number
  ],
  proportion: number = 1,
  count: number = 1,
]
```

(name, initTime, periods, proportion, count) => (count >= 0 ? [name, initTime + periods.pop(), periods, proportion, count - 1] : null)