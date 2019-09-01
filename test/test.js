import chai from "chai"
var initialState = require('../src/client/reducers/index').initialState;
var reducer = require('../src/client/reducers/index').reducer;
var assert = chai.assert;

describe('main', function() {
  describe('reducer', function() {
    it('initial state', () => {
      assert.deepEqual(reducer(undefined, {}).toJS(), {...initialState})
    })
  });
});
