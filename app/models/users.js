/*
	1. Create a Schema
		- username, must be unique
		- password, {select: false} stops db queries from returning password
	2. .pre callback is called before 'save' is called for password hashing
		- important as we cannot store un hashed passwords
	3. .comparePasswords method added to Schema for authentication
	4. module.exports will be returned as a module for importing in other 	
		files
*/

// grab packages
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

// user schema
var UserSchema = new Schema({
	name: String,
	username: {
		type: String, required: true, index: { unique: true }
	},
	password: {
		type: String, required: true, select: false
	}
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	// hash the password only if the password has been changed or new
	if (!user.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);