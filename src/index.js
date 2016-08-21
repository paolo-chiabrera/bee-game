import angular from 'angular';

import {main} from './app/main';
import {header} from './app/header/header';

import {game} from './app/game/game';
import GameService from './app/game/game.service';

import './index.scss';

angular
  .module('app', [])
  .service('GameService', GameService)
  .component('app', main)
  .component('gameCmp', game)
  .component('headerCmp', header);
