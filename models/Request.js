const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
	name: {
		type: String,
		default: '',
		required: true,
	},
	email: {
		type: String,
		default: '',
		required: true,
	},
	message: {
		type: String,
		default: '',
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Request', RequestSchema);
