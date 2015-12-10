var getSrc = require('./lib/get-src')
var xhr = require('xhr')

module.exports = isBufferAutoplaySupported
function isBufferAutoplaySupported (cb, audioContext) {
  if (typeof cb !== 'function') {
    throw new TypeError('must specify a cb function')
  }

  var src = getSrc()
  var AudioCtor = window.AudioContext || window.webkitAudioContext
  if (!src || !AudioCtor) { // no WebAudio support
    return process.nextTick(function () {
      cb(false)
    })
  }

  var isTempContext = false
  if (!audioContext) {
    isTempContext = true
    audioContext = new AudioCtor()
  }

  xhr({
    // iOS 0.2 Safari doesn't support XHR + DataURI
    // but that's OK since it also dosen't support autoplay.
    uri: src,
    responseType: 'arraybuffer'
  }, function (err, resp, arrayBuf) {
    if (err || !/^2/.test(resp.statusCode)) {
      return finish(false)
    }
    audioContext.decodeAudioData(arrayBuf, function (buffer) {
      finish(typeof buffer.duration === 'number' && buffer.duration > 0)
    }, function () {
      finish(false)
    })
  })

  function finish (result) {
    if (isTempContext && typeof audioContext.close === 'function') {
      audioContext.close()
    }
    cb(result)
  }
}
