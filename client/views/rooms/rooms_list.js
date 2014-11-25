(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('RoomsListCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
      $scope.message          = {};
      $scope.message.username = $rootScope.rootuser.username;
      $scope.message.avatar   = $rootScope.rootuser.avatar;

      $scope.chat = function(){
        socket.emit('globalChat', $scope.message);
        $scope.message.body = null;
      };

      socket.on('bGlobalChat', function(data){
        var chatWindow = $('#messages');
        chatWindow.append('<img class="avatar" src=' + data.avatar + '></img>');
        chatWindow.append('<div class="chat-name">' + data.username + ': </div>');
        chatWindow.append('<div class="chat-text">' + data.body + '</div>');
      });

    }]);
})();
