var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  destinations: [
  {
    name: {
      type: String,
    },

  }, ],
  flights: [{
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      segments: [{ lat: {type:Number}, lon: {type:Number} }],
    }, ],
  chat:[{
    username: {type:String},
    msg: {type:String}
  }
  ],
  expenses: [
  {
    lender: {
      _id: {type: Schema.Types.ObjectId, ref: 'user'},
      username: {type: String},
    },
    lendee: {
      _id: {type: Schema.Types.ObjectId, ref: 'user'},
      username: {type: String},
    },
    amount: { type: Number, required:true },
    settled: {type:Boolean, required:true},
    desc: {type:String}
  },
  ],
});

module.exports = mongoose.model('group', GroupSchema);
