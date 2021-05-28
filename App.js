import * as React from 'react';
import WelcomeScreen from "./screens/WelcomeScreen.js";
import {AppTabNavigator } from "./components/AppTabNavigator.js";
import { createAppContainer , createSwitchNavigator } from 'react-navigation';


export default class App extends React.Component{
  render(){
    return(  
      <AppContainer/>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
    WelcomeScreen: {screen: WelcomeScreen},
    BottomTab: {screen: AppTabNavigator},
  });

const AppContainer = createAppContainer(SwitchNavigator);

