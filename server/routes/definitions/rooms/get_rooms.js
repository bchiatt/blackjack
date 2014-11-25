'use strict';

var Room = require('../../../models/room');

module.exports = {
  description: 'Get all Rooms',
  tags:['rooms'],
  handler: function(request, reply){
    Room.find().populate('creator').exec(function(err, rooms){
      rooms.forEach(function(item){
        item.creator.password = null;
        item.password = null;
      });
      reply(rooms);
    });
  }
};
