'use strict';

var mongoose   = require('mongoose'),
    bcrypt     = require('bcrypt'),
    RoomSchema = null,
    Room       = null;

RoomSchema = new mongoose.Schema({
  name:      {type: String, required: true, unique: true},
  password:  {type: String, required: true},
  creator:   {type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
  createdAt: {type: Date,  required: true, default: Date.now}
});

RoomSchema.methods.encrypt = function(){
  this.password = bcrypt.hashSync(this.password, 10);
};

Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
