/**
 * Function returning Levenshtein distance between two strings if it is less
 * than or equal to 1, else returning Infinity.
 *
 * @param {string|Array} A - First sequence.
 * @param {string|Array} B - Second sequence.
 * @param {number}         - Levenshtein distance if <= 1 else Infinity.
 */
function levenshteinLte1(A, B) {

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
      j = 0;

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

  // Substitution
  while (i < la) {
    if (A[i] !== B[i]) {
      if (cost === 1)
        return Infinity;

      cost = 1;
    }

    i++;
  }

  return cost;
}

module.exports = levenshteinLte1;
