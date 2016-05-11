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
    flights: [{
      users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      date: {
        type: Date,
      },
      data: { type: Schema.Types.Mixed },
    }, ],
    hotels: [{
      users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      dateFrom: {
        type: Date,
      },
      dateTo: {
        type: Date,
      },
      data: { type: Schema.Types.Mixed },
    }, ],
  }, ],
  //chat
  expenses: [
  {
    lender: {
      _id: {type: Schema.Types.ObjectId, ref: 'user' },
      username: {type: String},
    },
    lendee: {
      _id: {type: Schema.Types.ObjectId, ref: 'user' },
      username: {type: String},
    },
    amount: { type: Number },
    note: {type:String}
  },
  ],
});

module.exports = mongoose.model('group', GroupSchema);
