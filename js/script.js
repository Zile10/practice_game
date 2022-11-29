const gameCanvas = document.querySelector('#game-canvas')
const ctx = gameCanvas.getContext('2d')

function resizeCanvas() {
  gameCanvas.width = innerWidth
  gameCanvas.height = innerHeight
}
resizeCanvas()
addEventListener('resize',() => resizeCanvas())

class Person {
  constructor(config) {
    this.position = config.position;
    this.height = 100;
    this.width = 50;
    this.velocity = config.velocity;
    this.shadowSizer = 1
    this.isAttacking = false;
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.ellipse(
      this.position.x + this.width/2,
      this.position.z + this.height,
      35 * this.shadowSizer,
      15 * this.shadowSizer,
      0,
      2*Math.PI,
      false
      )
    ctx.fill()

    if (this.isAttacking) {
      ctx.beginPath()
      ctx.rect(this.position.x, this.position.z - this.position.y + 5, 100, 30)
      ctx.fillStyle = 'blue'
      ctx.fill()
      setTimeout(()=> this.isAttacking = false, 100)
    }

    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.rect(this.position.x, this.position.z - this.position.y, this.width, this.height)
    ctx.fill()
  }
  attack() {
    this.isAttacking = true
  }

  update() {
    this.position.x += this.velocity.x
    this.position.z += this.velocity.z
    this.position.y += this.velocity.y
    if (this.position.y + this.velocity.y > 0) {
      this.velocity.y -= 1
    } else {
      this.velocity.y = 0
    }

    let shadow = (1000 - 3*this.position.y)/1000
    if (shadow >= 0.1) {
      this.shadowSizer = shadow 
    }
    this.draw()
  }
}

const person = new Person({
  position: {
    x: 300,
    y: 0,
    z: 200
  },
  velocity: {
    x: 0,
    y: 0,
    z: 0
  }
});

let heldKeys = []

addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      heldKeys.includes('w') ? heldKeys : heldKeys.push('w')
      break;
    case 's':
      heldKeys.includes('s') ? heldKeys : heldKeys.push('s')
      break;
    case 'a':
      heldKeys.includes('a') ? heldKeys : heldKeys.push('a')
      break;
    case 'd':
      heldKeys.includes('d') ? heldKeys : heldKeys.push('d')
      break;
    case ' ':
      heldKeys.includes(' ') ? heldKeys : heldKeys.push(' ')
      break;
    case 'Enter':
      person.attack()
      break;
    default:
      break;
  }
})

addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      heldKeys.includes('w') ? heldKeys.splice(heldKeys.indexOf('w'), 1) : heldKeys
      break;
    case 's':
      heldKeys.includes('s') ? heldKeys.splice(heldKeys.indexOf('s'), 1) : heldKeys
      break;
    case 'a':
      heldKeys.includes('a') ? heldKeys.splice(heldKeys.indexOf('a'), 1) : heldKeys
      break;
    case 'd':
      heldKeys.includes('d') ? heldKeys.splice(heldKeys.indexOf('d'), 1) : heldKeys
      break;
    case ' ':
      heldKeys.includes(' ') ? heldKeys.splice(heldKeys.indexOf(' '), 1) : heldKeys
      break;
    default:
      break;
  }
})

addEventListener('click', () => {
  person.attack()
})


function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)

  switch (heldKeys[heldKeys.length-1]) {
    case 'w':
      person.velocity.z = -5
      person.velocity.x = 0
      break;
    case 's':
      person.velocity.z = 5
      person.velocity.x = 0
      break;
    case 'a':
      person.velocity.x = -5
      person.velocity.z = 0
      break;
    case 'd':
      person.velocity.x = 5
      person.velocity.z = 0
      break;
    case ' ':
      person.velocity.x = 0
      person.velocity.z = 0
      person.velocity.y = 10
      // person.jump()
      break;
    default:
      person.velocity.z = 0
      person.velocity.x = 0
      break;
  }
  // console.log(person.position.y);
  // console.log(heldKeys);
  person.update()
}
animate()