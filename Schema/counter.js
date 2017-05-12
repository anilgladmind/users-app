var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var CounterSchema = new Schema(
	{
		_id: {type: String, required:true},
		seq: {type: Number, default:0}
	}
);

CounterSchema.statics.getNextSequence = function(counter,callback){
	return this.findByIdAndUpdate(counter, { $inc: { seq: 1 } }, {new: true, upsert: true, select: {seq: 1}}, callback);
}

module.exports = mongoose.model('counter', CounterSchema);