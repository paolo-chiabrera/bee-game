import angular from 'angular';
import 'angular-mocks';
import {header} from './header';

describe('header component', () => {
  beforeEach(() => {
    angular
      .module('header', ['app/header/header.html'])
      .component('headerCmp', header);
    angular.mock.module('header');
  });

  it('should render header', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<header-cmp></header-cmp>')($rootScope);
    $rootScope.$digest();
    const header = element.find('a');
    expect(header.html().trim()).toEqual('Bee Game');
  }));
});
