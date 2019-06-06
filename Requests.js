const DOMAIN = "http://172.20.10.3:3030"; //Domain:port 
//const API_URL = `${DOMAIN}/api/activite`;
const API_URL = `${DOMAIN}/activite`;

//Headers for PUT and POST requests 
const fetchHeaders = {
	'Accept': 'application/json', 
  'Content-Type': 'application/json'
};

var Requests = {

	//GET
	getRequest: () => {
		return fetch(API_URL).then(resp => resp.json());
	},

	//POST
	postRequest: (newActivites) => {
		//Convertir activites to JSON
		const activitesJSON = JSON.stringify(newActivites);
		//method, headers et body à envoyer au serveur
		const params = {
			method: 'POST',
			headers: fetchHeaders,
			body: activitesJSON
		};
		return fetch(API_URL, params).then(resp => resp.json());
	},

	//PUT
	putRequest: (activitesID, updatedActivites) => {
		//URL pour la requete PUT
		const requestURL = `${API_URL}/${activitesID}`;
		//Convertir data en JSON
		const activitesJSON = JSON.stringify(updatedActivites);
		//method, headers et body à envoyer au serveur
		const params = {
			method: 'PUT',
			headers: fetchHeaders,
			body: activitesJSON
		};
		return fetch(requestURL, params).then(resp => resp.json());
	},
	//DELETE
	deleteRequest: (activitesID) => {
		// URL pour la requete DELETE
		const requestURL = `${API_URL}/${activitesID}`;
		// method
		const params = {
			method: 'DELETE'
		};
		return fetch(requestURL, params).then(resp => resp.json());
	}

};

export default Requests;
