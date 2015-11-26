var mp3 = require('silent-mp3-datauri')
var xhr = require('xhr')

module.exports = isBufferAutoplaySupported
function isBufferAutoplaySupported (cb, audioContext) {
  if (typeof cb !== 'function') {
    throw new TypeError('must specify a cb function')
  }

  var AudioCtor = window.AudioContext || window.webkitAudioContext
  var isTempContext = false
  if (!audioContext) {
    isTempContext = true
    audioContext = new AudioCtor()
  }

  xhr({
    // iOS 0.2 Safari doesn't support XHR + DataURI
    // but that's OK since it also dosen't support autoplay.
    uri: mp3,
    responseType: 'arraybuffer'
  }, function (err, resp, arrayBuf) {
    if (err || !/^2/.test(resp.statusCode)) {
      return finish(err.message)
    }
    audioContext.decodeAudioData(arrayBuf, function (buffer) {
      finish(typeof buffer.duration === 'number' && buffer.duration > 0)
    }, function () {
      finish(false)
    })
  })

  function finish (result) {
    if (isTempContext) audioContext.close()
    cb(result)
  }
}