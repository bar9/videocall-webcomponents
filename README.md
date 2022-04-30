# Web components | videocall playground

currently a videocall-like webcam multiplexer.

## how to run
download/clone and serve via https (e.g. with `./serve.sh` in case you have http-server installed an have followed https://web.dev/how-to-use-local-https/)

## controls
use developer console to manipulate app state

`AppState.addParticipant( { name: 'John Doe' })`

`AppState.startVideo()`

`AppState.stopVideo()`

## next steps
- [ ] style video boxes
- [ ] add buttons for starting and stopping video
- [ ] better state handling for video stream