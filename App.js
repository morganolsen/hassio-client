import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Home from './components/Home';
import Lights from './components/Lights';
import Scenes from './components/Scenes';
import Options from './components/Options';
import Navbar from './components/Navbar';

export default function App() {

  return (
    <>
      <Navbar />
      <Router>
          <Scene key="root" hideNavBar={true}>
              <Scene key="home" component={Home} title="Home" initial={true} />
              <Scene key="lights" component={Lights} title="Lights" />
              <Scene key="scenes" component={Scenes} title="Scenes" />
              <Scene key="options" component={Options} title="Options" />
          </Scene>
      </Router>
    </>
  );
}
