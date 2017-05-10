var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var UserSchema = new Schema(
	{
		name: { type: String, required: true },
		number: { type: Number, required: true },
		email: { type: String},
		created_at: Date,
		updated_at: Date
	}
);

// on every save, add the date
UserSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});	

module.exports = mongoose.model('user', UserSchema);
	
