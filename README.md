chain-pwm
=========
[![Build Status](https://travis-ci.org/eiriksm/chain-pwm.svg?branch=master)](https://travis-ci.org/eiriksm/chain-pwm)
[![Coverage Status](http://img.shields.io/coveralls/eiriksm/chain-pwm.svg)](https://coveralls.io/r/eiriksm/chain-pwm?branch=master)
[![Code Climate](http://img.shields.io/codeclimate/github/eiriksm/chain-pwm.svg)](https://codeclimate.com/github/eiriksm/chain-pwm)
[![Dependency Status](https://david-dm.org/eiriksm/chain-pwm.svg?theme=shields.io)](https://david-dm.org/eiriksm/chain-pwm)

## About
Makes PWM calls chainable. That is, usage of the PWM pins on for example an arduino, used from johnny-five.

## Installation
`npm install --save chain-pwm`

## Usage
Add 3 steps to a PWM output. One for 255 (max), one for 100 and one for 50.:

```js
var five = require('johnny-five');
var board = new five.Board();
var Pc = require('chain-pwm');

board.on('ready', function() {
  this.pinMode(6, five.Pin.PWM);
  // Constructs a new PWM chainer with pin 6 and the board.
  var p = new Pc(6, board);
  // Begin the output at 255
  p.begin(255)
  // Then write 100, and keep that level for 500ms
  .then(100, 500)
  // Then write 50 and keep that level for 1s
  .then(50, 1000)
  // Actually it is kept indefinitely, since we have no next step.
  // Call start to start the chain.
  .start();
});
```

## API
@todo. But look up there ^^ and see the tests.
