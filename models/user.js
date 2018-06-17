var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//user schema
var userSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    },
    type: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', userSchema);

//Fetching all users
module.exports.getUser = function (callback, limit) {
    User.find(callback).limit(limit);
}

//fetch single user
module.exports.getUserById = function (id, callback) {
    User.findById(id,callback);
}

module.exports.getUserByUserName = function (username, callback) {
    var query = {username: username};
    User.findOne(query,callback);
}

// Save student
module.exports.saveStudent = function(newUser, newStudent, callBack) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        console.log('Student is being saved');
        async.parallel(newUser.save(callBack), newStudent.save(callBack));
    });
}

module.exports.saveInstructor = function(newUser, newInstructor, callBack){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if (err) throw err;
        newUser.password = hash;
        console.log('Instructor is being saved');
        async.parallel(newUser.save(callBack), newInstructor.save(callBack));
    });
}

// Compare passwords
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}