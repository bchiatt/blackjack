'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room');

module.exports = {
  description: 'Create a Room',
  tags:['rooms'],
  validate: {
    payload: {
      name: Joi.string().min(3).max(12).required(),
      password: Joi.string().min(3).required()
    }
  },
  handler: function(request, reply){
    request.payload.creator = request.auth.credentials._id;
    var room = new Room(request.payload);
    room.encrypt();
    room.save(function(err){
      reply().code(err ? 401 : 200);
    });
  }
};
