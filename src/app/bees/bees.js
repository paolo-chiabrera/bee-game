export class Bee {
  constructor(type = 'basic', life = 10, hitPoints = 2, index = 0) {
    this.id = type + '_' + index;
    this.type = type;
    this.life = life;
    this.lifeMax = life;
    this.hitPoints = hitPoints;
  }

  // getters

  getLife() {
    return this.life;
  }

  getType() {
    return this.type;
  }

  getLifePercentage() {
    return Math.floor(this.life / this.lifeMax * 100);
  }

  // methods

  kill() {
    this.life = 0;
    return this.life;
  }

  isAlive() {
    return this.life > 0;
  }

  hit() {
    if (this.life === 0) {
      return this.life;
    }

    if (this.life < this.hitPoints) {
      this.life = 0;
    } else {
      this.life -= this.hitPoints;
    }

    return this.life;
  }
}

export class QueenBee extends Bee {
  constructor(index) {
    super('queen', 100, 8, index);
  }
}

export class WorkerBee extends Bee {
  constructor(index) {
    super('worker', 75, 10, index);
  }
}

export class DroneBee extends Bee {
  constructor(index) {
    super('drone', 50, 12, index);
  }
}
