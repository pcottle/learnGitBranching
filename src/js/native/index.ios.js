/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var levels = require('../../levels/index.js');
var LevelStore = require('../stores/LevelStore.js');
var levelSequences = require('../../levels').levelSequences;

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
} = React;

var LearnGitBranching = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Yo Whatup Peter
        </Text>
        {Object.keys(levelSequences).map(function(sequence) {
          return (
            <View key={sequence} style={styles.levelCard}>
              <Text style={styles.levleCardText}>
                {sequence}
              </Text>
            </View>
          );
        })}
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  levelCardText: {
    justifyContent: 'center',
    flex: 1,
  },
  levelCard: {
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 200,
    shadowOffset: {
      x: 80,
      y: 80
    },
    borderRadius: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LearnGitBranching', () => LearnGitBranching);
