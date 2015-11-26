var canAutoplay = require('./media-element')
var canAutoplayBuffer = require('./buffer')

var tap = document.createElement('div')
tap.innerText = 'TAP TO PLAY'
document.body.appendChild(tap)

window.addEventListener('touchend', function () {
  canAutoplay(function (media) {
    canAutoplayBuffer(function (buffer) {
      alert('Media: ' + media + '\nBuffer: ' + buffer)
    })
  })

})
  