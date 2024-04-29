import Vector from './Vector.js'

export default class Paddle {
  constructor(canvas, x = 0, y = 0, w = 10, h = 30) {
    this.canv = canvas
    this.paddle = new Vector(x, y)
    this.w = w
    this.h = h
    this._score = 0
  }

  get score() {
    return this._score
  }

  addScore() {
    this._score++
  }

  show() {
    let ctx = this.canv.getContext('2d')

    ctx.beginPath()
    ctx.rect(this.paddle.x, this.paddle.y, this.w, this.h)
    ctx.fill()
  }

  isHit(ball) {
    let x = this.paddle.x
    let y = this.paddle.y
    let bx = ball.ball.x
    let by = ball.ball.y

    if (bx >= x && by >= y && bx <= x + this.w && by <= y + this.h) {
      return true
    }

    return false
  }
}