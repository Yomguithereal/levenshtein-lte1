[![Build Status](https://travis-ci.org/Yomguithereal/levenshtein-lte1.svg)](https://travis-ci.org/Yomguithereal/levenshtein-lte1)

# levenshtein-lte1

The [Levensthein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) is infamoulsy known to run in `O(n * m)` time, `n` & `m` being the respective lengths of the considered strings.

But, most of the time, people just want to know whether the Levenshtein distance between two strings is below a given threshold. What's more, especially when targeting the English language, this threshold is often 1 or 2 (1 usually for the very similar [Damerau-Levenshtein distance](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance), for the reason explained in [this](https://dl.acm.org/citation.cfm?doid=363958.363994) seminal paper).

But people often miss that you can develop a custom implementation of the Levenshtein & Damerau-Levensthein distance that won't go over 1 that can be way more performant.

This library exposes such an implementation for the JavaScript language. It runs in `O(m)` time, `m` being the length of the shortest string. It also does not need to rely on auxiliary memory.

## Installation

Note that the library comes with its TypeScript definitions.

```
npm install levenshtein-lte1
```

## Usage

Note that if the distance between strings exceeds `1`, the functions will return `Infinity` (typical implementation rather return `-1` but `Infinity` is kinda useful with threshold conditions).

*Levenshtein distance*

```js
var levenshteinLte1 = require('levenshtein-lte1');

levenshteinLte1('book', 'book');
>>> 0

levenshteinLte1('book', 'booc');
>>> 1

levenshteinLte1('abc', 'def');
>>> Infinity
```

*Damerau-Levenshtein*

```js
var damerauLevenshteinLte1 = require('levenshtein-lte1/damerau');

damerauLevenshteinLte1('book', 'book');
>>> 0

damerauLevenshteinLte1('book', 'booc');
>>> 1

damerauLevenshteinLte1('abc', 'def');
>>> Infinity

damerauLevenshteinLte1('BONJOUR', 'BNOJOUR');
>>> 1
```

Both functions also accepts arrays instead of strings if you need to apply them to arbitrary sequences.

```js
levenshteinLte1(
  ['the', 'mouse', 'eats'],
  ['a', 'mouse', 'eats']
);
>>> 1
```

## Benchmark

Benchmark methodology adapted from [js-levenshtein](https://github.com/gustf/js-levenshtein) by [gustf](https://github.com/gustf).

I only benchmarked words because it usually does not make sense to test large strings with a threshold of `1`.

**Disclaimer**: this benchmark is deliberately unfair. It only means to demonstrate that this lib is a valid choice ONLY if your use case is to test whether strings have a Levenshtein distance less than or equal to 1.

```
2000 words, length max=20 min=3 avr=9.5

  145,110 op/s » levenshtein-lte1
  19,183 op/s » talisman-limited
    3,126 op/s » node-levenshtein
    2,557 op/s » js-levenshtein
    2,115 op/s » talisman
    1,801 op/s » levenshtein-edit-distance
    1,840 op/s » leven
    1,619 op/s » fast-levenshtein
```
