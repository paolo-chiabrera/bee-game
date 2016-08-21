import {expect} from 'chai';
import sinon from 'sinon';

import GameService from './game.service';

import GameController from './game.controller';

describe('GameController', () => {
  let gameController;
  let gameService;

  beforeEach(() => {
    gameService = new GameService();
    gameController = new GameController(gameService);
  });

  it('should be defined', () => {
    expect(gameController).to.be.an('object');
  });

  it('should have all the properties set', () => {
    expect(gameController.GameService).to.be.a('object');
    expect(gameController.GameService).to.eql(gameService);
    expect(gameController.bees).to.be.an('object');
    expect(gameController.bees).to.eql({});
    expect(gameController.gameOver).to.be.a('boolean');
    expect(gameController.gameOver).to.eql(false);
  });

  describe('updateBees', () => {
    it('should be defined', () => {
      expect(gameController.updateBees).to.be.a('function');
    });

    it('should call GameService.getBees()', () => {
      const getBees = sinon.spy(gameService, 'getBees');
      const isGameOver = sinon.spy(gameService, 'isGameOver');

      gameController.updateBees();

      sinon.assert.calledOnce(getBees);
      sinon.assert.calledOnce(isGameOver);

      getBees.restore();
      isGameOver.restore();
    });
  });

  describe('hitRandomBee', () => {
    it('should be defined', () => {
      expect(gameController.hitRandomBee).to.be.a('function');
    });

    it('should call GameService.hitRandomBee() and updateBees()', () => {
      const hitRandomBee = sinon.spy(gameService, 'hitRandomBee');
      const updateBees = sinon.spy(gameController, 'updateBees');

      gameController.hitRandomBee();

      sinon.assert.calledOnce(hitRandomBee);
      sinon.assert.calledOnce(updateBees);

      hitRandomBee.restore();
      updateBees.restore();
    });
  });

  describe('reset', () => {
    it('should be defined', () => {
      expect(gameController.reset).to.be.a('function');
    });

    it('should call GameService.init() and updateBees()', () => {
      const init = sinon.spy(gameService, 'init');
      const updateBees = sinon.spy(gameController, 'updateBees');

      gameController.reset();

      sinon.assert.calledOnce(init);
      sinon.assert.calledOnce(updateBees);

      init.restore();
      updateBees.restore();
    });
  });

  describe('$onInit', () => {
    it('should be defined', () => {
      expect(gameController.$onInit).to.be.a('function');
    });

    it('should call reset()', () => {
      const reset = sinon.spy(gameController, 'reset');

      gameController.$onInit();

      sinon.assert.calledOnce(reset);

      reset.restore();
    });
  });
});
