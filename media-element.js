var mp3 = require('silent-mp3-datauri')
var DEFAULT_TIMEOUT = 300
var noop = function () {}

module.exports = isAutoplaySupported
function isAutoplaySupported (cb, timeoutDelay) {
  if (typeof cb !== 'function') {
    throw new TypeError('must specify a cb function')
  }
  timeoutDelay = typeof timeoutDelay === 'number' ? timeoutDelay : DEFAULT_TIMEOUT

  var audio, timeout
  try {
    timeout = setTimeout(function () {
      cb(false)
      cb = noop
    }, timeoutDelay)
    audio = new window.Audio()
    audio.autoplay = true
    audio.volume = 0
    audio.crossOrigin = 'Anonymous'
    audio.addEventListener('play', done, false)
    audio.src = mp3
    audio.load()
    audio.play()
  } catch (e) {
    cb(false)
    cb = noop
  }

  function done () {
    if (timeout) clearTimeout(timeout)
    if (audio) {
      audio.pause()
      audio.removeEventListener('play', done, false)
    }
    cb(true)
    cb = noop
  }
}
