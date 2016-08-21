import angular from 'angular';
import 'angular-mocks';
import {game} from './game';

import GameService from './game.service';

describe('game component', () => {
  beforeEach(() => {
    angular
      .module('game', ['app/game/game.html'])
      .service('GameService', GameService)
      .component('gameCmp', game);
    angular.mock.module('game');
  });

  it('should render game', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<game-cmp></game-cmp>')($rootScope);
    $rootScope.$digest();
    const bees = element.find('li');
    expect(bees.length).toEqual(17);
  }));
});
