const DOMAIN = "http://172.20.10.3:3030"; //Domain:port 
const API_URL = `${DOMAIN}/sport`;

//Headers for PUT and POST requests 
const fetchHeaders = {
	'Accept': 'application/json', 
  'Content-Type': 'application/json'
};
var RequestSport = {

	//GET
	getRequest: () => {
		return fetch(API_URL).then(resp => resp.json());
	},

	//POST
	postRequest: (newSport) => {
		//Convert activites to JSON
		const sportJSON = JSON.stringify(newSport);
		//method, headers et body à envoyer au serveur
		const params = {
			method: 'POST',
			headers: fetchHeaders,
			body: sportJSON
		};
		return fetch(API_URL, params).then(resp => resp.json());
	}

};

export default RequestSport;
