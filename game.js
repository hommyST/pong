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

let lPaddle = new Paddle(field, 10, HEIGHT / 2 - 25, 10, 70)
let rPaddle = new Paddle(field, WIDTH - 20, HEIGHT / 2 - 25, 10, 70)
let ball = new Ball(field, WIDTH / 2, HEIGHT / 2, 6)

const controls = {
  lpaddle: {up: 0, down: 0},
  rpaddle: {up: 0, down: 0}
}
init()
draw()
domControls()

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  
  renderScore()
  ctx.strokeStyle = '#fafafa1f'
  ctx.beginPath()
  ctx.moveTo(WIDTH / 2, 0)
  ctx.lineTo(WIDTH / 2, HEIGHT)
  ctx.stroke()

  ctx.fillStyle = '#000'

  handleControl()

  ball.update()
  ball.show()
  lPaddle.show()
  rPaddle.show()

  if (rPaddle.isHit(ball) || lPaddle.isHit(ball)) {
    ball.reverseX()
    ball.reverseY()
  }

  let score = ball.out()
  if (score) {
    ball.reset()
    if (score === 'r') rPaddle.addScore()
    else if (score === 'l') {
      lPaddle.addScore()
      ball.reverseX()
    }
  }


  requestAnimationFrame(draw)
}

function renderScore() {
  ctx.textAlign = 'center'
  ctx.font = '2rem sans-serif'
  ctx.fillStyle = '#fafafa'
  ctx.fillText(lPaddle.score, WIDTH / 2 - 50, 50)
  ctx.fillText(rPaddle.score, WIDTH / 2 + 50, 50)
}

function handleControl() {
  let factor = 10
  if (controls.lpaddle.up) {
    if (lPaddle.paddle.y <= 0) lPaddle.paddle.y = 0
    else lPaddle.paddle.y -= controls.lpaddle.up * factor
  } else if (controls.lpaddle.down) {
    if (lPaddle.paddle.y >= HEIGHT - lPaddle.h) lPaddle.paddle.y = HEIGHT - lPaddle.h
    else lPaddle.paddle.y += controls.lpaddle.down * factor
  }

  if (controls.rpaddle.up) {
    if (rPaddle.paddle.y <= 0) rPaddle.paddle.y = 0
    else rPaddle.paddle.y -= controls.rpaddle.up * factor
  } else if (controls.rpaddle.down) {
    if (rPaddle.paddle.y >= HEIGHT - rPaddle.h) rPaddle.paddle.y = HEIGHT - rPaddle.h
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
      let dz = 0.3
      
      if (ev.index === 1) {
        if (ev.value >= -dz && ev.value <= dz) {
          controls.lpaddle.down = 0
          controls.lpaddle.up = 0
        } else if (ev.value > dz) controls.lpaddle.down = Math.abs(ev.value)
        else if (ev.value < -dz) controls.lpaddle.up = Math.abs(ev.value)
        
      } else if (ev.index === 3) {
        if (ev.value >= -dz && ev.value <= dz) {
          controls.rpaddle.down = 0
          controls.rpaddle.up = 0
        } else if (ev.value > dz) controls.rpaddle.down = Math.abs(ev.value)
        else if (ev.value < -dz) controls.rpaddle.up = Math.abs(ev.value)
      }
    })
  })
}


function domControls() {
  const cp = document.querySelector('.control-panel')
  const cpCloseBtn = document.querySelector('.control-panel .open-close')

  const lpaddle_size = document.querySelector('#lpaddle_size')
  const rpaddle_size = document.querySelector('#rpaddle_size')

  cpCloseBtn.addEventListener('click', () => {
    cp.classList.toggle('open')
  })

  lpaddle_size.addEventListener('input', ev => {
    lPaddle.h = Number(ev.target.value)
  })
  rpaddle_size.addEventListener('input', ev => {
    rPaddle.h = Number(ev.target.value)
  })
}
