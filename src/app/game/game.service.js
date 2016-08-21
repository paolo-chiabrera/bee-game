import _ from 'lodash';
import {QueenBee, WorkerBee, DroneBee} from '../bees/bees';

export default class GameService {
  /** @ngInject */
  constructor(numQueens = 1, numWorkers = 5, numDrones = 8) {
    this.numQueens = numQueens;
    this.numWorkers = numWorkers;
    this.numDrones = numDrones;

    this.bees = [];
    this.alive = [];
  }

  // getters

  getBees() {
    return this.bees;
  }

  getRandomBee() {
    const index = _.random(this.alive.length - 1);
    return _.find(this.bees, {id: this.alive[index].id});
  }

  // methods

  isGameOver() {
    return this.alive.length === 0;
  }

  killAll() {
    this.alive = [];
    _.each(this.bees, bee => bee.kill());
    return this.bees;
  }

  updateAliveBees() {
    this.alive = _.filter(this.bees, bee => bee.isAlive());
    return this.alive;
  }

  hitRandomBee() {
    if (this.alive.length === 0) { // gameover
      return false;
    }

    const bee = this.getRandomBee();
    const remainingLife = bee.hit();

    if (bee.type === 'queen' && remainingLife <= 0) { // the queen is dead
      this.killAll();
      return false;
    }

    this.updateAliveBees();

    return bee;
  }

  // init

  init() {
    this.bees = [];
    this.bees = this.bees.concat(_.times(this.numQueens, index => new QueenBee(index)));
    this.bees = this.bees.concat(_.times(this.numWorkers, index => new WorkerBee(index)));
    this.bees = this.bees.concat(_.times(this.numDrones, index => new DroneBee(index)));
    this.alive = _.clone(this.bees);
  }
}
