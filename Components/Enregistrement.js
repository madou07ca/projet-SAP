//import liraries

import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';

import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';

import RequestUsers from './../RequestUsers'
//import console = require('console');
//import { timingSafeEqual } from 'crypto';



class Profil extends Component {

    static navigationOptions = {

        title: "S'enregistrer",

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
          confirmPassword : ""

        };
       // AsyncStorage.setItem('id', "");
    }

   validateEmail(email){
      var emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
      var valid = emailReg.test(email);
  
      if(!valid) {
          return false;
      } else {
          return true;
      }
  }



    enregistrement= async () => { 
      const user = {
        username : this.state.username,
        password : this.state.password
      }
      if(user.username != "" && user.password != "" && this.state.confirmPassword != ""){
        if(this.validateEmail(user.username) === true){
          if(user.password == this.state.confirmPassword ){
                let message = ""
                let currentId = ""
                await RequestUsers.postRequestSignup(user).then(function (data){
                  console.log("Identifiant",data.message)
                    message = data.message
                    currentId = data.id

                  }, function (error ) {
                    console.log("error",error)


                  });
                  if (message == "Utilisateur ajouté"){
                   // AsyncStorage.setItem('id', currentId); 
                    //currentId = await AsyncStorage.getItem('id');
                    this.props.navigation.navigate("Accueil");
                  }else{
                        console.log("Vérifier les infos!!")
                  }
          }else{
            console.log("Mot de passe different dans les 2 champs")
          }

        }else{
          console.log("Le mail est invalide");
        }
        }else{
          console.log("les champs sont obligatoires")
        }
       
      this._clear()
      };

      _clear() {

        this.passwordInput.clear()
        this.usernameInput.clear()
        this.confirmInput.clear()
      }


    render() {

        return (

            <View style={styles.container}>

                <StatusBar barStyle="light-content"/>

                <TextInput style = {styles.input} 

                            autoCapitalize="none" 

                            onSubmitEditing={() => this.passwordInput.focus()} 
                            ref = {input=> this.usernameInput = input}
                            autoCorrect={false} 

                            keyboardType='email-address' 

                            returnKeyType="next" 

                            placeholder='Email@mail.com' 
                            placeholderTextColor='#A6A6A6'
                            value={this.state.username}
                            onChangeText={text =>

                              this.setState({ username: text })}
                              />



                <TextInput style = {styles.input}   

                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 

                           placeholder='Password' 
                          placeholderTextColor='#A6A6A6' 
                          secureTextEntry
                           Value={this.state.password}
                            onChangeText={text =>
                            this.setState({ password: text })}
                              />



                <TextInput style = {styles.input}   

                           returnKeyType="go" ref={input=> this.confirmInput = input} 

                           placeholder='Verifier Password' 

                           placeholderTextColor='#A6A6A6' 

                           secureTextEntry
                           Value={this.state.confirmPassword}
                            onChangeText={text =>
                            this.setState({ confirmPassword: text })}
                           />

                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}

              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.enregistrement()}>

                    <Text  style={styles.buttonText}>Créer un compte</Text>

                </TouchableOpacity> 

            </View>

        );

    }

}



// define your styles

const styles = StyleSheet.create({

    container: {

     padding: 20,

     

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

    loginButton:{

       color: '#fff',

       bottom:0,

       position:'absolute'

    }

   

});



//make this component available to the app

export default Profil;