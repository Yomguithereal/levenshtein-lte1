/**
 * levenshtein-lte1 Unit Tests
 * ============================
 */
var assert = require('assert');
var levenshteinLte1 = require('./index.js');

var BASIC_TESTS = [
  [['b', 'o', 'o', 'k'], ['b', 'a', 'c', 'k'], 2],
  [['the', 'cat', 'eats', 'mouse'], ['the', 'mouse', 'likes', 'mouse'], 2],
  ['book', 'back', 2],
  ['bbbbookkkk', 'bbbbackkkk', 2],
  ['hello', 'helo', 1],
  ['good sir', 'baal', 8],
  ['say', 'shiver', 5],
  ['feature', 'get-project-features', 13],
  ['example', 'samples', 3],
  ['sturgeon', 'urgently', 6],
  ['levenshtein', 'frankenstein', 6],
  ['distance', 'difference', 5],
  ['a', 'b', 1],
  ['ab', 'ac', 1],
  ['ac', 'bc', 1],
  ['abc', 'axc', 1],
  ['xabxcdxxefxgx', '1ab2cd34ef5g6', 6],
  ['a', '', 1],
  ['ab', 'a', 1],
  ['ab', 'b', 1],
  ['abc', 'ac', 1],
  ['xabxcdxxefxgx', 'abcdefg', 6],
  ['', 'a', 1],
  ['a', 'ab', 1],
  ['b', 'ab', 1],
  ['ac', 'abc', 1],
  ['abcdefg', 'xabxcdxxefxgx', 6],
  ['', '', 0],
  ['a', 'a', 0],
  ['abc', 'abc', 0],
  ['', '', 0],
  ['a', '', 1],
  ['', 'a', 1],
  ['abc', '', 3],
  ['', 'abc', 3],
  ['因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文', 2]
];

var HELLO_WORDS = [
  'BONJOUR',
  'BINJOUR',
  'BONTOUR',
  'NONJOUR',
  'ONJOUR',
  'BONJOU',
  'BONJOURE',
  'BONTJOUR',
  'TBONJOUR'
];

var HELLO_WORDS_TRANSPOSITIONS = [
  'OBNJOUR',
  'BNOJOUR',
  'BOJNOUR',
  'BONOJUR',
  'BONJORU'
];

var LEVENSHTEIN_LTE1_TESTS = [
  ['BONJOUR', 'BONJOURE', true],
  ['TBONJOUR', 'BONJOUR', true],
  ['BONTOUR', 'BONJOUR', true],
  ['BONJOUR', 'MONJOUR', true],
  ['BONJOUR', 'BONJOUT', true],
  ['BMNJOURE', 'BONJOUR', false],
  ['MONJOURE', 'BONJOUR', false],
  ['BTONJOUR', 'BONJOUR', true],
  ['BONJOUR', 'F', false],
  ['BONJOUR', 'BNOJOURE', false],
  ['BONJOUR', 'BONJOURES', false],
  ['Faylan', 'Fayray', false],
  ['Loane', 'Loona', false],
  ['David Byrne', 'David Byron', false],
  ['Willie Nix', 'Willie Nile', false],
  ['DJ Spinna', 'DJ Spinbad', false],
  ['Lian Ross', 'Diana Ross', false],
  ['Diana', 'Lian', false]
];

describe('levenshtein-lte1', function() {
  it('should work for trivial cases.', function() {
    assert.strictEqual(levenshteinLte1('BONJOUR', 'BONJOUR'), 0);
    assert.strictEqual(levenshteinLte1('HELLO', 'THISISVERYLONG'), Infinity);
  });

  it('should work with any kind of operations.', function() {
    HELLO_WORDS.forEach(function(word) {
      assert.strictEqual(levenshteinLte1(word, 'BONJOUR') <= 1, true, word);
    });
  });

  it('should handle generic cases.', function() {
    BASIC_TESTS.forEach(function(test) {
      assert.strictEqual(
        levenshteinLte1(test[0], test[1]),
        test[2] <= 1 ? test[2] : Infinity,
        test
      );
    });
  });

  it('should handle typical cases.', function() {
    LEVENSHTEIN_LTE1_TESTS.forEach(function(test) {
      assert.strictEqual(
        levenshteinLte1(test[0], test[1]) <= 1,
        test[2]
      );
    });
  });
});
