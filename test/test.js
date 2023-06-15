require('should');

const fs = require('fs'),
  createDelta = require('../');

const v1 = fs.readFileSync(__dirname + '/v1.txt', 'utf8').slice(0, -2),
  v2 = fs.readFileSync(__dirname + '/v2.txt', 'utf8').slice(0, -2),
  deltas = {
    v1_to_v2: require('./delta-v1-to-v2.json'),
    v2_to_v1: require('./delta-v2-to-v1.json'),
    v1_to_v1: [[0, v1.length]],
    v1_to_empty: [[-1, v1.length]],
    empty_to_v1: [[1, v1]],
    empty_to_empty: [],
  };

describe('Should create correct deltas for:', function () {
  it('v1 -> v2', function () {
    createDelta(v1, v2).should.deepEqual(deltas.v1_to_v2);
  });
  it('v2 -> v1', function () {
    createDelta(v2, v1).should.deepEqual(deltas.v2_to_v1);
  });
  it('v1 -> v1', function () {
    createDelta(v1, v1).should.deepEqual(deltas.v1_to_v1);
  });
  it('v1 -> empty', function () {
    createDelta(v1, '').should.deepEqual(deltas.v1_to_empty);
  });
  it('empty -> v1', function () {
    createDelta('', v1).should.deepEqual(deltas.empty_to_v1);
  });
  it('empty -> empty', function () {
    createDelta('', '').should.deepEqual(deltas.empty_to_empty);
  });
});
