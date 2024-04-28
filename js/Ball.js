import Vector from './Vector.js'

export default class Ball {
  constructor(canvas, x, y, r = 8) {
    this.canv = canvas
    this.ball = new Vector(x, y)
    this.r = r
  }

  show() {
    let ctx = this.canv.getContext("2d");

    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}