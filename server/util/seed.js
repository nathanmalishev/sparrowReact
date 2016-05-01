var User = require('../api/user/userModel');
var Group = require('../api/group/groupModel');
var _ = require('lodash');
var auth = require('../api/auth/auth');

var users = [
  { username: 'nathan', password: 'test', email: 'nathan@gmail.com' },
  { username: 'john', password: 'test', email: 'john@gmail.com' },
  { username: 'fred', password: 'test', email: 'fred@gmail.com' },
  { username: 'tim', password: 'test', email: 'tim@gmail.com' },
  { username: 'sam', password: 'test', email: 'sam@gmail.com' },
  { username: 'alfred', password: 'test', email: 'alfred@gmail.com' },
];

var group1 = {
    name: 'Europe Trip',
    destinations: [
        {
            name: 'barcelona',
            flights: [{
                data: {
                    data: 'rome2rio',
                  },
              }, ],
            hotels: [{
                data: {
                    data: 'zwillio',
                  },
              }, ],
          },
          {
            name: 'mexico',
            flights: [{
                data: {
                    data: 'rome2rio',
                  },
              }, ],
            hotels: [{
                data: {
                    data: 'zwillio',
                  },
              }, ],
          },
    ],
  };
var group2 = {
    name: 'Asia Trip',
    destinations: [
        {
            name: 'China',
            flights: [{
                data: {
                    data: 'rome2rio',
                  },
              }, ],
            hotels: [{
                data: {
                    data: 'zwillio',
                  },
              }, ],
          },
    ],
  };

var cleanDB = function () {
  console.log('cleaning db');
  var cleanPromises = [User, Group]
    .map(function (model) {
      return model.remove().exec();
    });

  return Promise.all(cleanPromises);
};

var createDoc = function (model, doc) {
  return new Promise(function (resolve, reject) {
    new model(doc).save(function (err, saved) {
      return err ? reject(err) : resolve(saved);
    });
  });
};

var createUsers = function (data) {
  console.log('creating users...');
  var createUsersPromises = users.map(function (user) {
      return createDoc(User, user);
    });

  return Promise.all(createUsersPromises)
    .then(function (users) {
      return _.merge({ users: users }, data || {});
    });
};

var createGroups = function (data) {
  console.log('creating groups...');
  var usergroup1 = _.concat(data.users[0]._id, data.users[1]._id, data.users[2]._id, data.users[3]._id);
  var usergroup2 = _.concat(data.users[0]._id, data.users[1]._id, data.users[4]._id, data.users[5]._id);

  var createGroup = function (group, users) {
    group.users = users;
    return createDoc(Group, group);
  };

  return Promise.all([
      createGroup(group1, usergroup1),
      createGroup(group2, usergroup2),
    ])
    .then(function (groups) {
      return _.merge({ groups: groups }, data || {});
    });
};

var addGroupToUsers = function (data) {
  console.log('adding users to groups...');

  var updateUsers = data.groups.map(function (group) {
      return Promise.all(group.users.map(function (userId) {
        return User.findByIdAndUpdate(userId, { $push: { groups: group._id } });
      }));
    });

  //FIX: doesn't properly add users and their new groups to the data object
  // but it does add it properly to db
  return Promise.all(updateUsers)
    .then(function (users) {
      return _.merge({ users: users }, data || {});
    });

};

var displayData = function (data) {
  //console.log(data);
  console.log('Data base seeded, 6 users added and 2 groups');

  //create token for users
  console.log('***  USER TOKEN FOR ' + data.users[0].username + ' ****');
  console.log(auth.signToken(data.users[0]._id));
  console.log('*** END ***');
};

cleanDB()
  .then(createUsers)
  .then(createGroups)
  .then(addGroupToUsers)
  .then(displayData)
  .catch(console.log);
