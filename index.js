'use strict';

var diff = require('fast-diff');

module.exports = function (original, revision) {
  var result = diff(original, revision);
  // According to latest jsperf tests, there's no need to cache array length
  for (var i = 0; i < result.length; i++) {
    var item = result[i];
    // If operation is DELETE or EQUAL, replace the actual text by its length
    if (item[0] < 1) {
      item[1] = item[1].length;
    }
  }
  return result;
};
