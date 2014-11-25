(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('RoomsListCtrl', ['$rootScope', '$scope', 'Room', function($rootScope, $scope, Room){
      $scope.message          = {};
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
        console.log(room);
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
        var chatWindow = $('#messages');
        chatWindow.append('<img class="avatar" src=' + data.avatar + '></img>');
        chatWindow.append('<div class="chat-name">' + data.username + ': </div>');
        chatWindow.append('<div class="chat-text">' + data.body + '</div>');
        $('#message').focus();
      });

    }]);
})();
