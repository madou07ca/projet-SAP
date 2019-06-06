import React, {Component}  from 'react';

import { StyleSheet,Text,View, TouchableHighlight, ListView } from 'react-native';

import TimeFormatter from 'minutes-seconds-milliseconds'



class Chrono extends React.Component {

  static navigationOptions = {

    title: "Chronomètre",

      headerTintColor: '#ffffff',

    headerStyle: {

      backgroundColor: 'green',

    },

  };

  constructor(props) {

    super(props);

    this.state = {

        //passe data seance

        sport: this.props.navigation.state.params.itemSport,

        douleurAvant: this.props.navigation.state.params.itemDouleurAvant,

        zoneDouleurAvant: this.props.navigation.state.params.itemZoneDouleurAvant,

        //data chrono

        isRunning: false,

        mainTimer: null,

        mainTimerStart: null,

    };

  }

  _displayFinSeance() {

    this.props.navigation.navigate("Fin_Seance", {itemSport: this.state.sport, itemDouleurAvant: this.state.douleurAvant, itemZoneDouleurAvant: this.state.zoneDouleurAvant,itemChrono: this.state.mainTimer});

  };

  handleStartStop(){

    let {isRunning, firstTime, mainTimer, lapTimer} = this.state;

    if(isRunning){

      clearInterval(this.interval);

      this.setState({

        isRunning: false

      });

      return ;

    }



    this.setState({

      mainTimerStart: new Date(),

      isRunning: true

    });



    this.interval = setInterval(() => {

      this.setState({

        mainTimer: new Date() - this.state.mainTimerStart + mainTimer

      });

    }, 30);

  }

  handleLapReset(){

    let {isRunning, mainTimerStart} = this.state;

    if(mainTimerStart && !isRunning){

      this.setState({

        mainTimerStart: null,

        mainTimer: 0

      });

    }

  }

  _renderTimers(){

    return (

      <View style={styles.timerWrapper}>

        <View style={styles.timerWrapperInner}>

          <Text styles={styles.mainTimer}>{TimeFormatter(this.state.mainTimer)}</Text>

        </View>

      </View>

    );

  }

  _renderButtons(){

    return (

      <View style={styles.buttonWrapper}>

        <TouchableHighlight underlayColor='#ddd' onPress={this.handleLapReset.bind(this)} style={styles.button}>

          <Text style={styles.startBtn}>Reset</Text>

        </TouchableHighlight>

        <TouchableHighlight underlayColor='#777' onPress={this.handleStartStop.bind(this)} style={styles.button}>

          <Text style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>{this.state.isRunning? 'Stop' : 'Start'}</Text>

        </TouchableHighlight>

        <TouchableHighlight underlayColor='#777' onPress={() => this._displayFinSeance()} style={styles.button}>

          <Text style={styles.startBtn}>Fin</Text>

        </TouchableHighlight>

      </View>

    );

  }

  render(){

    return (

      <View style={styles.container}>

        <View style={styles.top}>

          {this._renderTimers()}

        </View>

        <View style={styles.bottom}>

          {this._renderButtons()}

        </View>

      </View>

    );

  }

}

export default Chrono;

 

const styles = StyleSheet.create({

  container: {

    flex: 1

  },

  header: {

    borderBottomWidth: 0.5,

    paddingTop: 20,

    paddingBottom: 10,

    backgroundColor: '#F9F9F9'

  },

  timerWrapper: {

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    flex: 1

  },

  top: {

    flex: 1

  },

  bottom: {

    flex: 2,

    backgroundColor: '#F0EFF5'

  },

  timerWrapperInner: {

    borderWidth: 0.5,

    alignSelf: 'center'

  },

  mainTimer: {

    fontSize: 60,

    fontWeight: '100',

    alignSelf: 'flex-end'

  },

  buttonWrapper: {

    flexDirection: 'row',

    justifyContent: 'space-around',

    paddingTop: 15,

    paddingBottom: 30

  },

  button: {

    height: 80,

    width: 80,

    borderRadius: 40,

    backgroundColor: '#fff',

    justifyContent: 'center',

    alignItems: 'center'

  },

  startBtn:{

    color: '#00cc00'

  },

  stopBtn: {

    color: 'red'

  }

});