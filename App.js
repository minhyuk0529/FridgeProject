import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';

import AuthLoadingScreen from './Authentication/AuthLoadingScreen';
import LoginOrRegister from './Authentication/StartScreen'
//import IntroScreen from './screens/Authentication/IntroScreen
import Login_SignIn from './Authentication/Login_SignIn';
import Register from './Authentication/Register'

import Home from './screens/Home'
import Search from './screens/Search'
import Upload from './screens/Upload/Upload'
import Fridge from './screens/Fridge'
import MyPage from './screens/MyPage'

export default class App extends React.Component {
  constructor(){
    super();
    this.state={

    }
  }
  render(){
      const Navigator = createAppContainer(
        createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppStack,
          Login : Login_Signin,
        },
        {
          initialRouteName: 'AuthLoading',
        }
      ));
      return <Navigator screenProps={this.props}/>;
  }
}

const AppStack = createBottomTabNavigator({
  Home:{screen: Home,navigationOptions:{tabBarLabel:'Home',}},
  Search:{screen: Search,navigationOptions:{tabBarLabel:'Search',}},
  Upload:{screen: Upload,navigationOptions:{tabBarLabel:'Upload',}},
  Fridge:{screen: Fridge,navigationOptions:{tabBarLabel:'Fridge',}},
  MyPage:{screen: MyPage,navigationOptions:{tabBarLabel:'MyPage',}}
})
const Login_Signin = createStackNavigator({ StartScreen : LoginOrRegister ,SignIn_screen: Login_SignIn, Register_screen : Register });

