/**
 * Function returning Damerau-Levenshtein distance between two strings if it is
 * less than or equal to 1, else returning Infinity.
 *
 * @param {string|Array} A - First sequence.
 * @param {string|Array} B - Second sequence.
 * @param {number}         - Damerau-Levenshtein distance if <= 1 else Infinity.
 */
function damerauLevenshteinLte1(A, B) {

  // Are both strings the same?
  if (A === B)
    return 0;

  var tmp;

  // A should be the shortest string
  if (A.length > B.length) {
    tmp = A;
    A = B;
    B = tmp;
  }

  var la = A.length,
      lb = B.length;

  // Early termination
  var delta = lb - la;

  if (delta > 1)
    return Infinity;

  var cost = 0,
      i = 0,
      j = 0,
      t,
      a,
      b;

  // Addition
  if (delta === 1) {
    while (i < la) {
      if (A[i] === B[j]) {
        j++;
        i++;
        continue;
      }

      if (cost === 1)
        return Infinity;

      cost = 1;
      j++;
    }

    return 1;
  }

  // Substitution or transposition
  while (i < la) {
    a = A[i];
    b = B[i];

    if (a !== b) {
      if (cost === 1)
        return Infinity;

      cost = 1;

      // Transposition
      t = i + 1;

      if (t < la && A[t] === b && B[t] === a) {
        i += 2;
        j += 2;
        continue;
      }
    }

    i++;
  }

  return cost;
}

module.exports = damerauLevenshteinLte1;
