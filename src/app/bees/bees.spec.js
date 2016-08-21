import {expect} from 'chai';

import {Bee, QueenBee, WorkerBee, DroneBee} from './bees';

describe('Bees', () => {
  let bee;
  let queenBee;
  let workerBee;
  let droneBee;

  describe('Bee', () => {
    beforeEach(() => {
      bee = new Bee();
    });

    it('should be defined', () => {
      expect(bee).to.be.an('object');
    });

    it('should all the properties set', () => {
      expect(bee.id).to.be.a('string');
      expect(bee.id).to.equal('basic_0');

      expect(bee.type).to.be.a('string');
      expect(bee.type).to.equal('basic');

      expect(bee.life).to.be.a('number');
      expect(bee.life).to.equal(10);

      expect(bee.lifeMax).to.be.a('number');
      expect(bee.lifeMax).to.equal(10);

      expect(bee.hitPoints).to.be.a('number');
      expect(bee.hitPoints).to.equal(2);
    });

    describe('getLife', () => {
      it('should be defined', () => {
        expect(bee.getLife).to.be.a('function');
      });

      it('should return the life', () => {
        expect(bee.getLife()).to.equal(10);
      });
    });

    describe('getType', () => {
      it('should be defined', () => {
        expect(bee.getType).to.be.a('function');
      });

      it('should return the type', () => {
        expect(bee.getType()).to.equal('basic');
      });
    });

    describe('getLifePercentage', () => {
      it('should be defined', () => {
        expect(bee.getLifePercentage).to.be.a('function');
      });

      it('should return the life percentage', () => {
        expect(bee.getLifePercentage()).to.equal(100);
      });

      it('should return the life percentage lowered', () => {
        bee.life = 8;
        expect(bee.getLifePercentage()).to.equal(80);
      });
    });

    describe('isAlive', () => {
      it('should be defined', () => {
        expect(bee.isAlive).to.be.a('function');
      });

      it('should be alive', () => {
        expect(bee.isAlive()).to.equal(true);
      });

      it('should be not alive', () => {
        bee.life = 0;
        expect(bee.isAlive()).to.equal(false);
      });
    });

    describe('kill', () => {
      it('should be defined', () => {
        expect(bee.kill).to.be.a('function');
      });

      it('should kill the bee', () => {
        expect(bee.kill()).to.equal(0);
        expect(bee.getLife()).to.equal(0);
        expect(bee.getLifePercentage()).to.equal(0);
        expect(bee.isAlive()).to.equal(false);
      });
    });

    describe('hit', () => {
      it('should be defined', () => {
        expect(bee.hit).to.be.a('function');
      });

      it('should hit the bee', () => {
        expect(bee.hit()).to.equal(8);
        expect(bee.getLife()).to.equal(8);
        expect(bee.getLifePercentage()).to.equal(80);
        expect(bee.isAlive()).to.equal(true);
      });

      it('should hit the bee with low life and kill it', () => {
        bee.life = 1;
        expect(bee.hit()).to.equal(0);
        expect(bee.getLife()).to.equal(0);
        expect(bee.getLifePercentage()).to.equal(0);
        expect(bee.isAlive()).to.equal(false);
      });

      it('should hit a dead bee', () => {
        bee.life = 0;
        expect(bee.hit()).to.equal(0);
        expect(bee.getLife()).to.equal(0);
        expect(bee.getLifePercentage()).to.equal(0);
        expect(bee.isAlive()).to.equal(false);
      });
    });
  });

  describe('QueenBee', () => {
    beforeEach(() => {
      queenBee = new QueenBee();
    });

    it('should be defined', () => {
      expect(queenBee).to.be.an('object');
    });

    it('should all the properties set', () => {
      expect(queenBee.id).to.be.a('string');
      expect(queenBee.id).to.equal('queen_0');

      expect(queenBee.type).to.be.a('string');
      expect(queenBee.type).to.equal('queen');

      expect(queenBee.life).to.be.a('number');
      expect(queenBee.life).to.equal(100);

      expect(queenBee.lifeMax).to.be.a('number');
      expect(queenBee.lifeMax).to.equal(100);

      expect(queenBee.hitPoints).to.be.a('number');
      expect(queenBee.hitPoints).to.equal(8);
    });
  });

  describe('WorkerBee', () => {
    beforeEach(() => {
      workerBee = new WorkerBee();
    });

    it('should be defined', () => {
      expect(workerBee).to.be.an('object');
    });

    it('should all the properties set', () => {
      expect(workerBee.id).to.be.a('string');
      expect(workerBee.id).to.equal('worker_0');

      expect(workerBee.type).to.be.a('string');
      expect(workerBee.type).to.equal('worker');

      expect(workerBee.life).to.be.a('number');
      expect(workerBee.life).to.equal(75);

      expect(workerBee.lifeMax).to.be.a('number');
      expect(workerBee.lifeMax).to.equal(75);

      expect(workerBee.hitPoints).to.be.a('number');
      expect(workerBee.hitPoints).to.equal(10);
    });
  });

  describe('DroneBee', () => {
    beforeEach(() => {
      droneBee = new DroneBee();
    });

    it('should be defined', () => {
      expect(droneBee).to.be.an('object');
    });

    it('should all the properties set', () => {
      expect(droneBee.id).to.be.a('string');
      expect(droneBee.id).to.equal('drone_0');

      expect(droneBee.type).to.be.a('string');
      expect(droneBee.type).to.equal('drone');

      expect(droneBee.life).to.be.a('number');
      expect(droneBee.life).to.equal(50);

      expect(droneBee.lifeMax).to.be.a('number');
      expect(droneBee.lifeMax).to.equal(50);

      expect(droneBee.hitPoints).to.be.a('number');
      expect(droneBee.hitPoints).to.equal(12);
    });
  });
});
