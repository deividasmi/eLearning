var mongoose = require('mongoose');

//Student schema
var studentSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address: [{
        street_address:{type: String},
        city:{type: String},
        zip:{type: String}
    }],
    username: {
        type: String
    },
    email: {
        type: String
    },
    classes: [{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }]

});

var Student = module.exports = mongoose.model('Student', studentSchema);

module.exports.getStudentByUsername = function (username, callback) {
    var query = {username: username};
    Student.findOne(query,callback);
}


module.exports.register = function(info, callback){

    student_username = info['student_username'];
    class_id = info['class_id'];
    class_title = info['class_title'];

    var query = {username: student_username};

    Student.findOneAndUpdate(
        query,
        {$push: {"classes":
                    {
                        class_id: class_id,
                        class_title: class_title
                    }}},
        {save: true, upsert: true},
        callback
    );
};