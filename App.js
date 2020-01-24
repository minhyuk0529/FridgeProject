import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from './screens/Home'
import Search from './screens/Search'
import Upload from './screens/Upload/Upload'
import Fridge from './screens/Fridge'
import MyPage from './screens/MyPage'

const MainNavigator = createBottomTabNavigator({
  Home:{
    screen: Home,
    navigationOptions:{
      tabBarLabel:'Home',
    }
  },
  Search:{
    screen: Search,
    navigationOptions:{
      tabBarLabel:'Search',
    }
  },
  Upload:{
    screen: Upload,
    navigationOptions:{
      tabBarLabel:'Upload',
    }
  },
  Fridge:{
    screen: Fridge,
    navigationOptions:{
      tabBarLabel:'Fridge',
    }
  },
  MyPage:{
    screen: MyPage,
    navigationOptions:{
      tabBarLabel:'MyPage',
    }
  }
})

const App = createAppContainer(MainNavigator);

export default App;
