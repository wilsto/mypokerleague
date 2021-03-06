'use strict';
 
angular.module('Mypokerleague')

.factory('Auth',  ['$firebaseSimpleLogin', '$rootScope', function ($firebaseSimpleLogin, $rootScope) {

  var ref = new Firebase('https://mypokerleague.firebaseio.com/');

  var auth = $firebaseSimpleLogin(ref, function(error, user) {
  });

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    signedIn: function () {
      return auth.user !== null;
    },
    getUser: function () {
      return auth.user;
    },
    login: function (user) {
      return auth.$login('password', user);
    },
    loginGoogle: function () {
      return auth.$login('google');
    },
    logout: function () {
      auth.$logout();
    }
  };

  $rootScope.signedIn = function () {
    return Auth.signedIn();
  };

  return Auth;
}])

.factory('User', ['$firebase', 'FIREBASE_URL', 'Auth', function ($firebase, FIREBASE_URL, Auth) {
  var ref = new Firebase('https://mypokerleague.firebaseio.com/users');
 
  var users = $firebase(ref);
 
  var User = {
    create: function (authUser, username) {
      users[username] = {
        md5_hash: authUser.md5_hash,
        username: username,
        $priority: authUser.uid
      };
 
      users.$save(username);
    }
  };
 
  return User;
}])

.factory('ChatService', ['$firebase', function($firebase) {
  var ref = new Firebase(FIREBASE_URL + 'chat');
  return $firebase(ref);
}])


.directive( 'goClick', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'goClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        console.log(path);
        $location.path( path );
      });
    });
  };
});