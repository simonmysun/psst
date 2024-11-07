# psst

> wat?

Renamed from DoIt because of too many duplicated names.

**This project is deprecated.**

This is an application which can provide 'unintelligent' notifications.

## Example usage

To generate a 'psst' notification, input string must be an array like this: 

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
The last two parameters can be leave blank and default values will set. The second value can be -1 then the time of now will be set.

Every time a 'psst' is finished, a new 'psst' may be generated:

```
[name, initTime, periods, proportion, count] => (count >= 0 ?
[name, initTime + periods.pop(), periods, proportion, count - 1] :
null)
```

Therefore, for example, when I want to cook chicken wings, I just set `["Chicken wings", -1, [30, 5, 5]]`, and there will be three notifications in 30 minutes, 35 minutes and 40 minutes seperately, indicating the time to flip the chicken wings, put seasoning and take it out of the oven.

Or, when I want to remember something, I set a psst of `["Things to remember", -1, [5, 2 * 60, 1 * 60 * 24], 2, 10]`. Then it will remind me after 5 minutes, one hour, one day, and then 2 days, 4 days, 8 days, 16 days, 32 days, 64 days, 128 days of intervals. It's like an application of Hermann Ebbinghaus' forgetting curve.

Or, a good wake-up alarm in my opinion, is like `["Wake up", -1, [7 * 60, 30], 0.5, 10]`. It is set when one sleeps. and 7 hour later the first alarm comes, then if not canceled, the second alarm comes in 30 minutes, then in 15 minues, then 7.5 minutes and so on. 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## License
MIT