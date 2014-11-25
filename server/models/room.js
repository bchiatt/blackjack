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

RoomSchema.statics.login = function(obj, cb){
  Room.findOne({name: obj.name}, function(err, room){
    if(!room){
      return cb();
    }

    var isGood = bcrypt.compareSync(obj.password, room.password);

    if(!isGood){
      return cb();
    }

    cb(room._id);
  });
};

Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
