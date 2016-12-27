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

  .state('rooms', {
    url: '/roomMenu',
    templateUrl: 'templates/rooms.html',
    controller: 'roomsCtrl'
  })

$urlRouterProvider.otherwise('/roomMenu/loginPage')

  

});