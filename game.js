import Ball from './js/Ball.js'
import Gamepad from './js/Gamepad.js'
import Paddle from './js/Paddle.js'
// import Vector from './js/Vector.js'

const field = document.querySelector('#field')
const ctx = field.getContext('2d')

const WIDTH = field.getBoundingClientRect().width
const HEIGHT = field.getBoundingClientRect().height

field.width = WIDTH
field.height = HEIGHT

let lPaddle = new Paddle(field, 10, 10, 10, 50)
let rPaddle = new Paddle(field, WIDTH - 20, 10, 10, 50)
let ball = new Ball(field, WIDTH / 2, HEIGHT / 2, 12)

const controls = {
  lpaddle: {up: 0, down: 0},
  rpaddle: {up: 0, down: 0}
}
init()
draw()

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  handleControl()

  ball.show()
  lPaddle.show()
  rPaddle.show()

  requestAnimationFrame(draw)
}

function handleControl() {
  let factor = 10
  if (controls.lpaddle.up) {
    if (lPaddle.paddle.y <= 10) lPaddle.paddle.y = 10
    else lPaddle.paddle.y -= controls.lpaddle.up * factor
  } else if (controls.lpaddle.down) {
    if (lPaddle.paddle.y >= HEIGHT - lPaddle.h - 10) lPaddle.paddle.y = HEIGHT - lPaddle.h - 10
    else lPaddle.paddle.y += controls.lpaddle.down * factor
  }

  if (controls.rpaddle.up) {
    if (rPaddle.paddle.y <= 10) rPaddle.paddle.y = 10
    else rPaddle.paddle.y -= controls.rpaddle.up * factor
  } else if (controls.rpaddle.down) {
    if (rPaddle.paddle.y >= HEIGHT - rPaddle.h - 10) rPaddle.paddle.y = HEIGHT - rPaddle.h - 10
    else rPaddle.paddle.y += controls.rpaddle.down * factor
  }
}

function init() {
  window.addEventListener('keydown', ({key}) => {
    if (key === 'ArrowUp') controls.rpaddle.up = 1
    else if (key === 'ArrowDown') controls.rpaddle.down = 1
    else if (key === 'w') controls.lpaddle.up = 1
    else if (key === 's') controls.lpaddle.down = 1
  })
  
  window.addEventListener('keyup', ({key}) => {
    if (key === 'ArrowUp') controls.rpaddle.up = 0
    else if (key === 'ArrowDown') controls.rpaddle.down = 0
    else if (key === 'w') controls.lpaddle.up = 0
    else if (key === 's') controls.lpaddle.down = 0
  })

  window.addEventListener('gamepadconnected', ({gamepad}) => {
    let gp = new Gamepad(gamepad)

    gp.on('axischanged', (ev) => {
      // console.log('axischanged', ev);
      if (ev.index === 1) {
        if (ev.value >= -0.2 && ev.value <= 0.2) {
          controls.lpaddle.down = 0
          controls.lpaddle.up = 0
        } else if (ev.value > 0.2) controls.lpaddle.down = Math.abs(ev.value)
        else if (ev.value < -0.2) controls.lpaddle.up = Math.abs(ev.value)
        
      } else if (ev.index === 3) {
        if (ev.value >= -0.2 && ev.value <= 0.2) {
          controls.rpaddle.down = 0
          controls.rpaddle.up = 0
        } else if (ev.value > 0.2) controls.rpaddle.down = Math.abs(ev.value)
        else if (ev.value < -0.2) controls.rpaddle.up = Math.abs(ev.value)
      }
    })
  })
}
