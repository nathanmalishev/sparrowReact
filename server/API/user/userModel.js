var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
require('mongoose-type-email');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  /*do no store as plain text must hash first */
  password: {
    type: String,
    required: true,
  },

  email: {
    type: mongoose.SchemaTypes.Email,
  },

  groups: [{ type: Schema.Types.ObjectId, ref: 'groups' }],
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {return next();}

  this.password = this.encryptPassword(this.password);
  next();
});

//TODO: add authentication methods on UserSchema method
UserSchema.methods = {

  //check passwords on sign in
  authenticate: function (plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },

  //hash password
  encryptPassword: function (plainTextPassword) {
    if (!plainTextPassword) {
      return '';
    }else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassword, salt);
    }
  },
  //return user without hashed password
  toJson: function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  },
};

module.exports = mongoose.model('user', UserSchema);
