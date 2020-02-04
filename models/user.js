const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true},
},{timestamps: true});


// remove password when convertion the user into json
userSchema.set('toJSON',{
    transform: function(doc, ret) {
        delete ret.password;
    }
});

// userSchema.set('toObject',{
//     transform: function(doc, ret) {
//         delete ret.password;
//     }
// });

userSchema.methods.comparePasswords = function (userPassword, callback) {
    bcrypt.compare(userPassword, this.password, callback);
};

// also before saving we should hash our password we want the hash to be saved
// not the user password
userSchema.pre('save', function(next){

    // if the password has not changed no need to hash it.
    if(!this.isModified('password')) return next();

    // if new user or password changed hash it.
    bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});


module.exports = mongoose.model('User', userSchema);