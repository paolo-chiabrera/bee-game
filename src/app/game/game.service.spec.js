import {expect} from 'chai';
import sinon from 'sinon';

import {Bee, QueenBee} from '../bees/bees';

import GameService from './game.service';

describe('GameService', () => {
  let gameService;

  beforeEach(() => {
    gameService = new GameService();
  });

  it('should be defined', () => {
    expect(gameService).to.be.an('object');
  });

  it('should have all the properties set', () => {
    expect(gameService.numQueens).to.be.a('number');
    expect(gameService.numQueens).to.equal(1);

    expect(gameService.numWorkers).to.be.a('number');
    expect(gameService.numWorkers).to.equal(5);

    expect(gameService.numDrones).to.be.a('number');
    expect(gameService.numDrones).to.equal(8);

    expect(gameService.bees).to.be.an('array');
    expect(gameService.bees).to.eql([]);

    expect(gameService.alive).to.be.a('array');
    expect(gameService.alive).to.eql([]);
  });

  describe('getBees', () => {
    it('should be defined', () => {
      expect(gameService.getBees).to.be.a('function');
    });

    it('should return the bees', () => {
      expect(gameService.getBees()).to.eql([]);
    });
  });

  describe('getRandomBee', () => {
    it('should be defined', () => {
      expect(gameService.getRandomBee).to.be.a('function');
    });

    it('should return a random bee', () => {
      const bee = new Bee();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;
      expect(gameService.getRandomBee()).to.eql(bee);
    });
  });

  describe('isGameOver', () => {
    it('should be defined', () => {
      expect(gameService.isGameOver).to.be.a('function');
    });

    it('should return false', () => {
      const bee = new Bee();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;
      expect(gameService.isGameOver()).to.eql(false);
    });

    it('should return true', () => {
      gameService.alive = [];
      expect(gameService.isGameOver()).to.eql(true);
    });
  });

  describe('killAll', () => {
    it('should be defined', () => {
      expect(gameService.killAll).to.be.a('function');
    });

    it('should kill all the bees', () => {
      const bee = new Bee();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;
      expect(gameService.killAll().length).to.equal(gameService.bees.length);
      expect(gameService.alive.length).to.equal(0);
      expect(gameService.getBees()[0].isAlive()).to.equal(false);
    });
  });

  describe('updateAliveBees', () => {
    it('should be defined', () => {
      expect(gameService.updateAliveBees).to.be.a('function');
    });

    it('should return all the alive bees', () => {
      const bee = new Bee();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;
      expect(gameService.updateAliveBees().length).to.equal(1);
    });

    it('should return no alive bees', () => {
      const bee = new Bee();
      bee.kill();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;
      expect(gameService.updateAliveBees().length).to.equal(0);
      expect(gameService.alive.length).to.equal(0);
    });
  });

  describe('hitRandomBee', () => {
    it('should be defined', () => {
      expect(gameService.hitRandomBee).to.be.a('function');
    });

    it('should return false when all the bees are dead', () => {
      const bee = new Bee();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;
      gameService.killAll();
      expect(gameService.hitRandomBee()).to.equal(false);
    });

    it('should return false when the queen gets killed', () => {
      const bee = new Bee();
      const queenBee = new QueenBee();
      queenBee.kill();
      gameService.bees = [queenBee, bee];
      gameService.alive = gameService.bees;

      const getRandomBee = sinon.stub(GameService.prototype, 'getRandomBee');

      getRandomBee.returns(queenBee);

      expect(gameService.hitRandomBee()).to.equal(false);
      expect(gameService.alive.length).to.equal(0);

      getRandomBee.restore();
    });

    it('should return the bee that was hit', () => {
      const bee = new Bee();
      gameService.bees = [bee];
      gameService.alive = gameService.bees;

      const updateAliveBees = sinon.spy(GameService.prototype, 'updateAliveBees');

      expect(gameService.hitRandomBee()).to.eql(bee);
      sinon.assert.calledOnce(updateAliveBees);
      updateAliveBees.restore();
    });
  });

  describe('init', () => {
    it('should be defined', () => {
      expect(gameService.init).to.be.a('function');
    });

    it('should init bees and alive', () => {
      gameService.init();

      const total = gameService.numQueens + gameService.numWorkers + gameService.numDrones;

      expect(gameService.bees.length).to.equal(total);
      expect(gameService.alive.length).to.equal(total);
      expect(gameService.bees).to.eql(gameService.alive);
    });
  });
});
