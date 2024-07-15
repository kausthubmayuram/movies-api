const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	poster: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		required: true,
	},
	releaseDate: {
		type: Date,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: false,
	},
	cast: [
		{
			name: {
				type: String,
				required: true,
			},
			profile: {
				type: String,
				required: true,
			},
		},
	],
});

// Duplicate the ID field.

MovieSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MovieSchema.set('toJSON', {
    virtuals: true
})

const Movies = mongoose.model("Movies", MovieSchema);

module.exports = Movies;
