angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('rooms.logIn', {
    url: '/loginPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/logIn.html',
        controller: 'logInCtrl'
      }
    }
  })

  .state('rooms.lobby', {
    url: '/lobbyPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/lobby.html',
        controller: 'lobbyCtrl'
      }
    }
  })

  .state('rooms.sport', {
    url: '/sportPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sport.html',
        controller: 'sportCtrl'
      }
    }
  })

  .state('rooms.program', {
    url: '/programPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/program.html',
        controller: 'programCtrl'
      }
    }
  })

  .state('rooms.cook', {
    url: '/cookPage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cook.html',
        controller: 'cookCtrl'
      }
    }
  })

  .state('rooms.private', {
    url: '/privatePage',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myroom.html',
        controller: 'privateCtrl'
      }
    }
  })

  .state('rooms', {
    url: '/roomMenu',
    templateUrl: 'templates/rooms.html',
    controller: 'roomsCtrl'
  })

$urlRouterProvider.otherwise('/roomMenu/loginPage')
});
