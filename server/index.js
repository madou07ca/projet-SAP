var express = require('express');
var bodyParser = require('body-parser');
var activiteModel  = require('./database');

var app = express();

const port = 3000; //Port

//Configurez l'application pour utiliser bodyParser et nous permettre à faire POST et PUT
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//API Routes
var router = express.Router();

//Middleware à utiliser pour toutes les requetes
router.use((rep, res, next) => {
	console.log("Requete a été envoyé!");
	next();
});

//Testing route
router.get('/', (req, res) =>{
  res.json({message: "project API."});
});

//Creer une activite (POST)
router.route('/activite').post((req, res) => {
	
	if(Object.keys(req.body).length === 3) {
		//Deconstruct body to get attributes
		const {sport, douleurAvant, douleurApres} = req.body;
		//Create a new activite model
		var activite = new activiteModel({sport, douleurAvant, douleurApres});
		//Save it into the database
		activite.save(err => {
			//Si une erreur est survenue lors de la sauvegarde, envoyez-la. Sinon, envoyez un message de confirmation
			err ? res.send(err) : res.json({message: 'Activite crée!'});
		});	
	} else{
		//Reprendre ici------***----------------------
		res.json({error: "Body is empty in one of the required keys. Required keys: Title, Time, Description, Completed."});
	}
	
})
//GET To-do's from database
.get((req, res) => {
	//Retrieve information from the database
	activiteModel.find((err, activite) => {
		//If there was an error getting the information, send it. Otherwise, send a confirmation message
		err ? res.send(err) : res.json(activite);
	});
});

//UPDATE To-do with ID
router.route('/Activite/:ActiviteID').put((req, res) => {
	//Find To-do identified by ID
	activiteModel.findById(req.params.activiteID, (err, Activites) => {
		//If To-do with especified ID wasn't found, send error.
		if(err){
			res.send(err);
		}
		//Otherwise, add new values to the To-do
		const {sport, douleurAvant, douleurApres} = req.body;
		activites.sport = sport;
		activites.douleurAvant = douleurAvant;
		activites.douleurApres = douleurApres;
		
		//Save it into the database
		activites.save(err => {
			//If there was an error saving it, send it. Otherwise, send a confirmation message
			err ? res.send(err) : res.json({message: 'To-do updated!'});
		});
	});
})
//DELETE To-do by ID
.delete((req,res) => {
	//Delete To-do in database identified by ID
	activiteModel.remove({_id:req.params.activiteID}, (err, activites) => {
		//If there was an error deleting it, send it. Otherwise, send a confirmation message
		err ? res.send(err) : res.json({message: 'To-do successfully deleted!'});
	})
});

//Register routes
app.use('/api', router);



app.listen(port);