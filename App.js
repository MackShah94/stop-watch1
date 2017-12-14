import React from 'react';
import {AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        timeElapsed:null,
        running:false,
        startTime:null,
        laps:[]
      };
      }


    startPress = () =>{
      if (this.state.running) {
        clearInterval(this.interval);
        this.setState({
          running:false
        });
        return;
      }


        this.setState({startTime : new Date()});
        this.interval = setInterval(() =>this.setState({
          timeElapsed: new Date() - this.state.startTime,
          running:true
        }),30);
    }

    lapPress = () =>{
      var lap = this.state.timeElapsed;
      this.setState({
        startTime:new Date(),
        laps: this.state.laps.concat([lap])
      })
    }

      laps = () =>{
        return this.state.laps.map(function(time,index){
          return (
            <View>
              <Text>
                Lap #{index + 1}
              </Text>
              <Text>
                time
              </Text>
            </View>
          )
        })
      }

  render() {



    return (
      <View style={styles.container}>

        <View style={styles.header}>

            <View style={styles.timeWrapper}>
              <Text style={styles.timer}>
                {this.state.timeElapsed}
              </Text>
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableHighlight  underlayColor="red" style={[styles.btn]} onPress={() => {this.startPress()}} >
                <Text >
                    {this.state.running ? 'Stop' : 'Start'  }
                </Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.btn]} onPress={() => this.lapPress()} >
                <Text>
                  Lap
                </Text>
              </TouchableHighlight>

            </View>

        </View>

        <View style={styles.footer}>
          {this.laps()}
        </View>

      </View>
    )};
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },

  button: {
    backgroundColor: '#DDDDDD',
    padding: 10
  },

  header:{
    flex:1,
  },

  footer:{
    flex:1,
  },

  timeWrapper:{
    flex:5,
    justifyContent:'center',
    alignItems: 'center',
  },

  buttonWrapper:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },

  timer:{
    fontSize:60,
  },

  btn:{
    borderWidth:2,
    height:100,
    width:100,
    borderRadius:50,
    justifyContent:'center',
    alignItems: 'center',
  },

  startBtn:{
    borderColor:'#00CC00'
  },

  stopBtn:{
    borderColor:'#FF0000'
  },


});


AppRegistry.registerComponent('stop-watch', () => App)
