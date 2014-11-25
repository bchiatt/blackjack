(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('RoomsListCtrl', ['$scope', function($scope){

      $scope.chat = function(msg){
        socket.emit('globalChat', msg);
      };

      socket.on('bGlobalChat', function(data){
        $('#messages').append('<div>' + data + '</div>');
      });

    }]);
})();
