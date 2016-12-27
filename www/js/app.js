//KMOL Chat app

angular.module('chat-app', ['ionic', 'firebase', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.factory("FB", function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDlMas97YRjshzuK5nkq0lk0kQfSOTma7k",
      authDomain: "chat-server-af617.firebaseapp.com",
      databaseURL: "https://chat-server-af617.firebaseio.com",
      storageBucket: "chat-server-af617.appspot.com",
      messagingSenderId: "343079792464"
    };
    return firebase.initializeApp(config);
})

.controller("AppCtrl", ['FB', '$firebaseAuth', '$firebaseArray', '$scope', '$ionicScrollDelegate', function(FB, $firebaseAuth, $firebaseArray, $scope, $ionicScrollDelegate) {
    //Init firebaseAuth instance
    var Auth = $firebaseAuth();

    //Watch changes on Auth instance
    Auth.$onAuthStateChanged(function(authData) {
        if (authData) {
            console.log("signed in as:", authData.email);
            $scope.loggedInUser = authData;
        } else {
            console.log("signed out");
            $scope.loggedInUser = null;
        }
    });

    $scope.createUser = function(user) {
        Auth.$createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
                //user created successfully, then log them in
                return Auth.$signInWithEmailAndPassword(user.email, user.password)
            })
            .then(function(authData) {
                console.log("User created with data: ", authData);
            }).catch(function(error) {
                console.log("Error has occured: ", error);
            });
    }

    $scope.loginUser = function(user) {
        Auth.$signInWithEmailAndPassword(user.email, user.password)
            .then(function(authData) {
                console.log("Signed in as:", authData.uid);
                $scope.loggedInUser = authData;
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
    }

    $scope.logout = function() {
        Auth.$signOut();
    }

    //init database location and bind firebase db messages to $scope.messages
    var Messages = FB.database().ref().child("messages");
    $scope.messages = $firebaseArray(Messages);

    $scope.addMessage = function(message) {
        var Today = new Date();
        if ($scope.loggedInUser && message.text!='') {
            $scope.messages.$add({
              uid: $scope.loggedInUser.uid,
              email: $scope.loggedInUser.email,
              time: {
                year: Today.getFullYear(),
                month: (Today.getMonth()+1<10?'0':'')+(Today.getMonth()+1),
                date: (Today.getDate()<10?'0':'')+Today.getDate(),
                hours: (Today.getHours()<10?'0':'')+Today.getHours(),
                minutes: (Today.getMinutes()<10?'0':'')+Today.getMinutes(),
                seconds: (Today.getSeconds()<10?'0':'')+Today.getSeconds(),
              },
              text: message.text,
            });
            //Scroll to bottom when new message entered
            $ionicScrollDelegate.scrollBottom();
            message.text = "";
        }
    }

}])

.run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}])

.config(function($ionicConfigProvider, $sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
})
/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])
/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var place = attrs['hrefInappbrowser'] || '_system';
      element.bind('click', function (event) {

        var href = event.currentTarget.href;

        window.open(href, place, 'location=yes');

        event.preventDefault();
        event.stopPropagation();
      });
    }
  };
});
