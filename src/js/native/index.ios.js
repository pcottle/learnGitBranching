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
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} = React;

var LearnGitBranching = React.createClass({
  render: function() {
    return (
      <ScrollView>
        <View style={styles.headerSpacer} />
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Yo Whatup Peter
          </Text>
          {Object.keys(levelSequences).map(function(sequence) {
            return (
              <View style={styles.cardContainer}>
                <TouchableHighlight>
                  <Image
                    key={sequence}
                    source={require('image!test')}
                    style={styles.logo}>
                    <View style={styles.levelLabel}>
                      <Text style={styles.sequenceName}>
                        {sequence}
                      </Text>
                    </View>
                  </Image>
                </TouchableHighlight>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  headerSpacer: {
    height: 40
  },
  logo: {
    width: 300,
    borderRadius: 2,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 100
  },
  cardContainer: {
    shadowColor: '#666',
    shadowOpacity: 0.7,
    marginBottom: 16,
    shadowOffset: {
      x: 100,
      y: 100
    },
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  levelLabel: {
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  sequenceName: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('LearnGitBranching', () => LearnGitBranching);
