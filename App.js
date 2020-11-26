import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet, NativeModules, Platform } from 'react-native';
import styled from 'styled-components';
import Home from './components/Home';
import Lights from './components/Lights';
import Scenes from './components/Scenes';
import Options from './components/Options';

export default function App() {

  return (
      <Router>
          <Scene key="root" hideNavBar={true}>
              <Scene key="home" component={Home} title="Home" initial={true} />
              <Scene key="lights" component={Lights} title="Lights" />
              <Scene key="scenes" component={Scenes} title="Scenes" />
              <Scene key="options" component={Options} title="Options" />
          </Scene>
      </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
