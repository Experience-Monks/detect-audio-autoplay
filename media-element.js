var getSrc = require('./lib/get-src')
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
    audio = new window.Audio()

    var src = getSrc(audio)
    if (!src) { // can't autoplay any format
      return process.nextTick(function () {
        cb(false)
      })
    }

    timeout = setTimeout(function () {
      cb(false)
      cb = noop
    }, timeoutDelay)

    audio.autoplay = true
    audio.volume = 0
    audio.addEventListener('play', done, false)
    audio.src = src
    audio.load()
    var promise = audio.play()

    // latest browsers are returning a promise for play()
    if (promise && typeof promise.then === 'function') {
      audio.removeEventListener('play', done, false)
      promise.then(function () {
        done() // play was successful
      }, function (err) {
        cb(false)
        cb = noop
      })
    }
  } catch (e) {
    process.nextTick(function () {
      cb(false)
      cb = noop
    })
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
