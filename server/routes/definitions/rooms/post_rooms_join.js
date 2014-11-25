'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room');

module.exports = {
  description: 'Join a Room',
  tags:['rooms'],
  validate: {
    payload: {
      password: Joi.string().min(3).required()
    },
    params: {
      name: Joi.string().min(3).required()
    }
  },
  handler: function(request, reply){
    Room.login({name:request.params.name, password:request.payload.password}, function(roomId){
      reply({roomId:roomId}).code(roomId ? 200 : 400);
    });
  }
};
