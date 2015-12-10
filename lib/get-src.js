var mp3 = require('silent-mp3-datauri')
var ogg = require('./silent-ogg-datauri')

module.exports = getSrc
function getSrc (audio) {
  if (!audio) audio = new window.Audio()
  if (canPlay(audio, 'audio/mpeg')) return mp3
  else if (canPlay(audio, 'audio/ogg')) return ogg
  return null
}

function canPlay (audio, type) {
  return audio.canPlayType(type).replace(/no/, '')
}
