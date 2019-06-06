const mongoose = require('mongoose'); //Library for MongoDB
//BDD ocale
mongoose.connect('mongodb://localhost:27017/projet', {useNewUrlParser: true});

//Model
const Activite = mongoose.model('Activite', {
	sport: String,
	douleurAvant: String,
	douleurApres: String
});

module.exports = Activite;