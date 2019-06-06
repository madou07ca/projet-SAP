const DOMAIN = "http://172.20.10.3:3030"; //Domain:port 
const API_URL = `${DOMAIN}/users`;
//import {AsyncStorage} from 'react-native';
requestURL = `${DOMAIN}/users/login`;

//Headers for PUT and POST requests 
const fetchHeaders = {
	'Accept': 'application/json', 
  'Content-Type': 'application/json'
};
var RequestUsers = {

	//GET
	getRequest: () => {
		return fetch(API_URL).then(resp => resp.json());
	},

	//Post
	postRequestSignup: (newUsers) => {
		//Convert activites to JSON
		const UsersJSON = JSON.stringify(newUsers);
		//method, headers et body à envoyer au serveur
		const params = {
			method: 'POST',
			headers: fetchHeaders,
			body: UsersJSON
		};
		return fetch(API_URL, params).then(resp => resp.json());
    },
    
    postRequestLogin: (Users) => {
        //Convert activites to JSON
		const UsersJSON = JSON.stringify(Users);
		//method, headers et body à envoyer au serveur
		const params = {
			method: 'POST',
			headers: fetchHeaders,
			body: UsersJSON
		};
		return fetch(requestURL, params).then(resp => resp.json());
    },

};

export default RequestUsers;
