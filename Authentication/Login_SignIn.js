import React, { useState, cloneElement } from 'react';
import { 
  View, Text, StyleSheet, Button, 
  SafeAreaView, AsyncStorage, TextInput, 
  Dimensions, TouchableOpacity, Keyboard
} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

export default class Login_SignIn extends React.Component {
  static navigationOptions = {
    headerShown : false
  };
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      error:'',

      hidePassword:true,
      loginFailed : false,
      isLoading : true,

      kakao: require('../data/kakao.jpg'),
      fb: require('../data/fb.jpg')
    }
  }
  showPassword=()=>{
    this.setState({hidePassword: !this.state.hidePassword})
  }
  _signInAsync = async () => {
    fetch('http://192.168.43.75:2000/user/account/auth',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((res)=>{
      if (res.status == 400 || res.status == 401){
        console.log(res.status)
        throw new Error('Login_Failed'); //Short Password does not need checking here
      }else{
        return res.json()
      }
    }).then( async (resJSON)=>{
      console.log(resJSON)
      try{
        await AsyncStorage.setItem('accessToken', resJSON.accessToken)
        await AsyncStorage.setItem('refreshToken', resJSON.refreshToken)
        const accessToken = await AsyncStorage.getItem('accessToken')
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        {(accessToken && refreshToken) ? (
          this.setState({loginFailed : false}),
          this.props.navigation.navigate('App')
        ):(
          this.setState({loginFailed : true})
        )}
      }catch(e){
        console.log('AsyncStorage Error : '+e.msg)
      }
    }).catch((e)=>{
      this.setState({loginFailed : true})
    })
  };
  render() {
    return (
      <SafeAreaView style={styles.container} onStartShouldSetResponder={Keyboard.dismiss}>
        <LinearGradient 
          colors={['#de6560','#e06763']}
          style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <View style={styles.logo}>
            <Icon name='md-ice-cream' type='ionicon' size={100} color='#ffffff'/>
          </View>
          <View style={{flex:5}}>
            {this.state.loginFailed ? 
              (<Text style={{color:'#e65353'}}>아이디 혹은 비밀번호가 틀렸습니다</Text>)
            :(null)}
            <View style={styles.textinput}>
              <TextInput
                style={{flex:1,fontSize:15, color:'#ffffff', letterSpacing:1.2}}
                placeholder='아이디'
                placeholderTextColor='#ffffff'
                onChangeText={(text)=>this.setState({username : text})}
                value={this.state.username}
              />
            </View>
            <View style={styles.textinput}>
              <TextInput
                style={{flex:9, fontSize:15, color:'#ffffff', letterSpacing:1.2}}
                placeholder='비밀번호'
                placeholderTextColor='#ffffff'
                onChangeText={(text)=>this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={this.state.hidePassword}
              />
              <TouchableOpacity
                style={{flex:1}}
                onPress={this.showPassword}>
                {this.state.hidePassword ? (
                        <Icon name='md-eye' type='ionicon' size={30} color='#ffffff'/>
                ):(
                        <Icon name='md-eye-off' type='ionicon' size={30} color='#ffffff'/>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{alignItems:'center'}}
              activeOpacity={0.7}
              onPress={this._signInAsync}>
              <LinearGradient
                colors={['#ffffff', '#ffffff']} 
                style={styles.login_button}>
                <Text style={{color:'#000000', fontSize:16}}>로그인</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{alignItems:'center'}}
              activeOpacity={0.7}
              onPress={this._register}>
                <LinearGradient 
                  colors={['#ffffff','#ffffff']} 
                  style={styles.register_button}>
                  <Text style={{color:'#000000', fontSize:16}}>회원가입</Text>
                </LinearGradient>
            </TouchableOpacity> */}
            <View style={styles.alternate_login}>
              <Text style={{color:'#ffffff', fontSize:13, marginRight:20}}>다른 방법으로 로그인...</Text>
              <FastImage
                style={{height:36, width:36, marginHorizontal:10, borderRadius:5}}
                source={this.state.kakao}/>
              <FastImage
                style={{height:36, width:36, marginHorizontal:10, borderRadius:5}}
                source={this.state.fb}/>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
  
const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container:{ 
    flex:1
  },
  logo:{
    flex:5,
    justifyContent:'center',
    alignItems:'center',
    // borderWidth:0.5,
    // borderColor: '#a9a9a9',
  },
  textinput:{
    flexDirection:'row',
    height: screenheight*0.07,
    width:screenwidth*0.8,
    borderBottomWidth:1,
    borderColor: '#de8460',
    alignItems:'center',
    paddingHorizontal:10,
    marginBottom:20
  },
  login_button:{
    alignItems:'center',
    justifyContent: 'center',
    height:screenheight*0.05,
    width:screenwidth*0.4,
    marginTop:40,
    borderRadius:15,
    elevation:2
  },
  // register_button:{
  //   alignItems:'center',
  //   justifyContent: 'center',
  //   height:screenheight*0.05,
  //   width:screenwidth*0.4,
  //   marginTop:20,
  //   borderRadius:15,
  //   elevation:2
  // },
  alternate_login:{
    height:screenheight*0.08,
    width:screenwidth*0.8,
    marginTop:40, 
    flexDirection:'row',
    justifyContent:'flex-end'
  }
})