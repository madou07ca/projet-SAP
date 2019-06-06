//import liraries

import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar, Image} from 'react-native';

import RequestUsers from './../RequestUsers'



class Authentification extends Component {

    static navigationOptions = {

        title: "Connexion",

          headerTintColor: '#ffffff',

        headerStyle: {

          backgroundColor: 'green',

        },

      };



      constructor(props) {

        super(props);

        this.state = {

          //Ajouter les autres champs
          username : "",
          password : "",
          messageErreur : "",

        };
        AsyncStorage.setItem('id', "");
    }



    checkLogin = async () => { 
      let user = {
        username : this.state.username,
        password : this.state.password
      }
      if(user.username != "" && user.password != ""){
        let message = ""
        let currentId = ""
        await RequestUsers.postRequestLogin(user).then(function (data){
            //AsyncStorage.setItem('id', data.id); 
            console.log("Identifiant",data.message)
            console.log("Identifiant",data.id)
            message = data.message
            currentId = data.id
            //navigation.navigate("Accueil");
            
          }, function (error ) {
            console.log("error::",error)


          }); 
           if (message == "Authentification réussi"){
            AsyncStorage.setItem('id', currentId); 
            currentId = await AsyncStorage.getItem('id');
             console.log("message::", message)
             console.log("id::", currentId)
            this.props.navigation.navigate("Accueil");
            //user.username = ""
            //user.password= ""
          }else{
            //this.setState({ messageErreur: "Mot de passe/mail Incorrect" })
            this.setState({
                   messageErreur: this.state.messageErreur + "Mot de passe/mail Incorrect"
                
                
              }) 

          }
           //console.log("usernaname : ",currentId);
          // console.log("usernaname : ", user.username)
            //this.props.navigation.navigate("Accueil");
            
      }else{
        this.setState({ messageErreur: "les champs sont obligatoires" })
      }
        this._clear()
      };

      _clear() {

        this.passwordInput.clear()
        this.usernameInput.clear()
      }
      storeData = async () => {
        try {
          await AsyncStorage.setItem('username', this.state.username);
        } catch (error) {
          // Error saving data
        }
      };
      retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('username');
          if (value !== null) {
            // We have data!!
            console.log("Username : ",value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };


    register() {
      
        this.props.navigation.navigate("Enregistrement");

      };



    render() {

        return (

        <View style={styles.container}>
            <Image source={require("../images/authentification.png")}

              />

                <StatusBar barStyle="light-content"/>

                <TextInput style = {styles.input} 

                            autoCapitalize="none" 

                            onSubmitEditing={() => this.passwordInput.focus()} 
                            ref = {input=> this.usernameInput = input}
                            //clearButtonMode = "always"

                            autoCorrect={false} 

                            keyboardType='email-address' 

                            returnKeyType="next" 

                            placeholder='Email@mail.com' 

                            placeholderTextColor='#A6A6A6'
                            Value={this.state.username}
                            onChangeText={text =>

                              this.setState({ username: text })}
                            />





                <TextInput style = {styles.input}   

                           returnKeyType="go" ref={input=> this.passwordInput = input} 

                           placeholder='Password' 

                           placeholderTextColor='#A6A6A6' 

                           secureTextEntry
                           Value={this.state.password}
                            onChangeText={text =>

                              this.setState({ password: text })}
                              />

                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}

                  {/*<TextInput style = {styles.input} 

                        autoCapitalize="none" 
                        autoCorrect={false}
                        shake = {true} 
                        placeholderTextColor='#A6A6A6'
                        Value={this.state.messageErreur}
                        onChangeText={text =>
                        this.setState({ messageErreur: text })}
                    />*/}

                 <TouchableOpacity  onPress={() => this.register()}>

                    <Text style={styles.regButton}> Créer un compte</Text>

                </TouchableOpacity> 



              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.checkLogin()}>

                    <Text  style={styles.buttonText}>LOGIN</Text>

                </TouchableOpacity> 

            </View>

        );

    }

}



// define your styles

const styles = StyleSheet.create({

  container: {

   padding: 20,

   flex: 1,   

  },

  input:{

      height: 40,

      backgroundColor: 'rgba(225,225,225,0.2)',

      marginBottom: 10,

      padding: 10,

      color: 'black'

  },

  buttonContainer:{

      backgroundColor: 'green',

      paddingVertical: 15

  },

  buttonText:{

      color: '#fff',

      textAlign: 'center',

      fontWeight: '700',

    

  },

  regButton:{

   padding: 10,

   color:'green'

  

},  

  loginButton:{

     color: '#fff',

     bottom:0,

     position:'absolute'

  },
   

});



//make this component available to the app

export default Authentification;