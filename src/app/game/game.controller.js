import _ from 'lodash';

export default class GameController {
  /** @ngInject */
  constructor(GameService) {
    this.GameService = GameService;

    this.bees = {};
    this.gameOver = false;
  }

  updateBees() {
    this.bees = _.groupBy(this.GameService.getBees(), bee => bee.getType());
    this.gameOver = this.GameService.isGameOver();
  }

  hitRandomBee() {
    this.GameService.hitRandomBee();
    this.updateBees();
  }

  reset() {
    this.GameService.init();
    this.updateBees();
  }

  $onInit() {
    this.reset();
  }
}
