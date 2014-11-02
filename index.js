module.exports = PwmChainer;
var util = require('util');
var events = require('events');


function PwmChainer(pin, board) {
  this.pin = pin;
  this.board = board;
  this.steps = [];
  events.EventEmitter.call(this);
  return this;
}

util.inherits(PwmChainer, events.EventEmitter);

PwmChainer.prototype.begin = function(value) {
  this.steps.push({value: value, ms: 0});
  return this;
};

PwmChainer.prototype.then = function(value, ms) {
  this.steps.push({value: value, ms: ms});
  return this;
};

PwmChainer.prototype.start = function() {
  var p = this;
  var recurse = function(steps) {
    if (steps.length === 0) {
      p.emit('done');
      return;
    }
    p.board.analogWrite(p.pin, steps[0].value);
    setTimeout(function() {
      steps.splice(0, 1);
      recurse(steps);
    }, steps[0].ms);
  };
  recurse(this.steps);
  return this;
};
