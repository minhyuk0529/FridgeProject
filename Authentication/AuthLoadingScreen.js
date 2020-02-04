import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, SafeAreaView, StatusBar, AsyncStorage, Dimensions } from 'react-native';
import {Icon} from 'react-native-elements';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
        color : 0,
        jwt:''
    }
  }
  componentDidMount() {
    this.colorTimer = setInterval(
      ()=> this.setColor(),5
    )
    setTimeout(()=>{
      this._bootstrapAsync();
    }, 1500)
  }
  componentWillUnmount(){
    clearInterval(this.colorTimer)
  }
  setColor(){
    this.setState({
      color : this.state.color+2
    })
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('accessToken')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'StartScreen');
  };
  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: 'hsl('+this.state.color+',100%,95%)'}]}>
        <StatusBar barStyle="default" />
        <Icon name='logo-android' type='ionicon' size={100} color= {'hsl('+this.state.color+', 14%, 44%)'}/>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})