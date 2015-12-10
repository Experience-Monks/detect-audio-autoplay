var canAutoplay = require('./media-element')
var canAutoplayBuffer = require('./buffer')

canAutoplay(function (autoplay) {
  console.log('Autoplay Media:', autoplay)
})

canAutoplayBuffer(function (autoplay) {
  console.log('Autoplay Buffer:', autoplay)
})
