import Vector from "./Vector.js"

export default class Paddle {
  constructor(canvas, x = 0, y = 0, w = 10, h = 30) {
    this.canv = canvas
    this.paddle = new Vector(x, y)
    this.w = w
    this.h = h
  }

  show() {
    let ctx = this.canv.getContext('2d')

    ctx.beginPath()
    ctx.rect(this.paddle.x, this.paddle.y, this.w, this.h)
    ctx.fill()
  }
}