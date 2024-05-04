import { random } from './Math.js'
import Vector from './Vector.js'

export default class Ball {
  constructor(canvas, x, y, r = 8) {
    this.canv = canvas
    this.ball = new Vector(x, y)
    this.r = r
    
    this.speed = 5

    this.vel = Vector.random2D()
    this.vel.setMag(this.speed)

    this.reset()
  }

  reset() {
    this.ball.set(this.canv.width / 2, this.canv.height / 2)
    let startAngle = random(Math.PI / 4 * -1, Math.PI / 4)
    this.vel.setHeading(startAngle)
  }

  show() {
    let ctx = this.canv.getContext("2d");

    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.r * 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    this.ball.add(this.vel)
    this.flipVertical()
  }

  out() {
    let offset = this.r * 15
    if (this.ball.x + offset < 0) return 'r'
    else if  (this.ball.x - offset > this.canv.width) return 'l'
    return false
  }

  flipVertical() {
    let flip = false

    if (this.ball.y <= 0) flip = true
    else if (this.ball.y >= this.canv.height) flip = true

    if (flip === false) return
    this.reverseY()
  }
  
  reverseY() {
    let h = this.vel.heading()
    this.vel.setHeading(h * -1)
  }
  
  reverseX() {
    let h = this.vel.heading()
    this.vel.setHeading(h + Math.PI)
  }
}