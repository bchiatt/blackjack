(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('RoomsListCtrl', ['$rootScope', '$scope', '$state', 'Room', function($rootScope, $scope, $state, Room){
      $scope.message          = {};
      $scope.messages         = [];
      $scope.room             = {};
      $scope.message.username = $rootScope.rootuser.username;
      $scope.message.avatar   = $rootScope.rootuser.avatar;

      Room.all().then(function(response){
        $scope.rooms = response.data;
      });

      $scope.chat = function(){
        socket.emit('globalChat', $scope.message);
        $scope.message.body = '';
      };

      $scope.join = function(room){
        Room.join({name:room.name, password:this.password}).then(function(response){
          var roomId = response.data.roomId;
          $state.go('rooms.detail', {roomId:roomId});
        });
      };

      $scope.addRoom = function(){
        Room.create($scope.room).then(function(){
          $scope.room.creator = $rootScope.rootuser;
          $scope.rooms.unshift($scope.room);
          $scope.room = {};
        }, function(){
          toastr.error('Please make sure the name is unique and at least 3 characters long.');
        });
      };

      socket.on('bGlobalChat', function(data){
        $scope.messages.unshift(data);
        $scope.$apply();
        $('#message').focus();
      });

    }]);
})();
