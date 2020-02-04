import React, {Component} from 'react';
import{View, Text, Dimensions,StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';



class LoginOrRegister extends Component {
    static navigationOptions = {
        headerShown:false
    };
    login=()=>{
        this.props.navigation.navigate('SignIn_screen')
    }
    register=()=>{
        this.props.navigation.navigate('Register_screen')
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient 
                    colors={['#de6560','#e06763']}
                    style={{flex:1}}>
                <View style={{flex:2, justifyContent:'center',alignItems:'center'}}>
                    <Icon name='md-ice-cream' type='ionicon' size={100} color='#ffffff'/>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
                        activeOpacity={0.7}
                        onPress={this.login}>
                        <LinearGradient
                            colors={['#ffffff', '#ffffff']} 
                            style={styles.login_button}>
                        <   Text style={{color:'#de6560', fontSize:22, letterSpacing:5, fontFamily:'NanumGothic-Bold'}}>로그인</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
                        activeOpacity={0.7}
                        onPress={this.register}>
                        <LinearGradient 
                            colors={['#ffffff','#ffffff']} 
                            style={styles.register_button}>
                            <Text style={{color:'#de6560', fontSize:22, letterSpacing:5,fontFamily:'NanumGothic-Bold'}}>회원가입</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

export default LoginOrRegister;

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    login_button:{
    alignItems:'center',
    justifyContent: 'center',
    height:screenheight*0.065,
    width:screenwidth*0.7,
    marginTop:40,
    borderRadius:30,
    elevation:5,
    shadowColor:'#de8460'
    },
    register_button:{
    alignItems:'center',
    justifyContent: 'center',
    height:screenheight*0.065,
    width:screenwidth*0.7,
    marginTop:25,
    borderRadius:30,
    elevation:5,
    shadowColor:'#de8460'
    },
})