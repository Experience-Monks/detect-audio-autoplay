# detect-audio-autoplay

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Detects whether the browser can auto-play audio. This tries to load a dummy silent MP3 or OGG datauri as an `<audio>` source, and waits for a `'play'` event.

For accurate results, you should call this early in your program, before any user gestures.

This module also contains a different mechanism for detecting Buffer source autoplay, [see below](#buffered-autoplay)

## Install

```sh
npm install detect-audio-autoplay --save
```

## Example

```js
var autoplay = require('detect-audio-autoplay')

autoplay(function (supported) {
  if (supported) {
    console.log("We can autoplay!")
  } else {
    console.log("Nope, can't autoplay.")
  }
})
```

## Usage

[![NPM](https://nodei.co/npm/detect-audio-autoplay.png)](https://www.npmjs.com/package/detect-audio-autoplay)

#### `detect(cb, [defaultTimeout])`

Detects whether an `<audio>` element can autoplay in the current browser. The callback is called with a boolean, `true` if supported, `false` otherwise.

If the dummy MP3 or OGG does not play after `defaultTimeout` (default 300ms), we assume the device cannot autoplay it.

## Buffered Autoplay

When using audio through WebAudio on mobile devices, you may need to use a Buffer instead of a MediaElement source. For these devices, we should be using a different detection mechanism.

For example, Android Chrome v48 (tested on Samsung Galaxy S6) does not autoplay `<audio>` elements, but it *does* autoplay Buffer sources. This is useful in situations such as WebVR + GearVR demos.

Use the following entry point:

```js
var detectBuffer = require('detect-audio-autoplay/buffer')
```

Usage:

##### `detectBuffer(cb, [audioContext])`

Detects whether a dummy MP3 or OGG can be loaded and decoded using the `audioContext` (defaults to a new audio context which will get cleaned up).

## License

MIT, see [LICENSE.md](http://github.com/Jam3/detect-audio-autoplay/blob/master/LICENSE.md) for details.
