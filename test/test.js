var should = require('should');
var Pc = require('..');
var util = require('util');
var log = [];
var board = {
  analogWrite: function(p, v) {
    log.push(util.format('board wrote %d to pin %d', v, p));
  }
}

describe('Module functionality', function() {
  it('Should export a function', function() {
    Pc.should.be.instanceOf(Function);
  });
  it('Should do the expected', function(done) {
    var p = new Pc(6, board)
    .begin(200)
    .then(1, 200)
    .then(100, 300)
    .start();
    p.on('done', function() {
      log[0].should.equal('board wrote 200 to pin 6');
      log[1].should.equal('board wrote 1 to pin 6');
      log[2].should.equal('board wrote 100 to pin 6');
      done();
    });
  });
});
