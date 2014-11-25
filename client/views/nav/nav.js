(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('NavCtrl', ['$rootscope', '$scope', '$state', 'User', function($rootscope, $scope, $state, User){
      $scope.$on('username', function(e, username){
        $scope.username = username;
        $scope.init = true;
      });

      $scope.$on('avatar', function(e, avatar){
        console.log(avatar);
        $scope.avatar = avatar;
      });

      $scope.$on('online', function(){
        $scope.online = true;
        $scope.$digest();
      });

      $scope.logout = function(){
        User.logout().then(function(){
          $rootscope.rootuser = null;
          toastr.success('User successfully logged out.');
          $state.go('home');
        });
      };
    }]);
})();
