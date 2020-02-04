import React, {Component} from 'react';
import{View, TextInput, Text, Dimensions,StyleSheet,TouchableOpacity, Animated, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';


class Register extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            email:'',

            hidePassword:true,
            usernameChecked:false,
            username_exist:false
        }
        this.bounceAnimation = new Animated.ValueXY()
    }
    static navigationOptions = {
        headerShown:false
    };
    onChangeTextUsername(text){
        this.setState({username : text}),
        this.setState({usernameChecked: false})
    }
    check_username= async ()=>{
        fetch('http://192.168.43.75:2000/user/account/check_username/username/'+this.state.username)
        .then((res)=>{
            if (res.status== 404 || res.status== 409){ //CHECK
                console.log(res.status)
                throw new Error('Login_Failed');
            }else{
                this.setState({username_exist : false})
                this.setState({usernameChecked : true})
                return res.json()
            }
        })
        .catch((e)=>{
            this.setState({username_exist : true})
        })
    }
    showPassword=()=>{
        this.setState({hidePassword: !this.state.hidePassword})
    }
    activateCheckUsername=()=>{
        Animated.spring(this.moveAnimation,{
            toValue: {x:0,y:10},
        }).start()
    }
    _submit = async ()=>{
        {this.state.usernameChecked ? (
            fetch('http://192.168.43.75:2000/user/account/signup',{ //61.74.91.12:80
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
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
            }).catch((e)=>{
                this.setState({loginFailed : true})
            })
        ):(
            ()=>this.activateCheckUsername()
        )}
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient 
                    colors={['#de6560','#e06763']}
                    style={{flex:1, alignItems:'center', justifyContent: 'center',}}>
                    <View style={{flex:3, alignItems:'flex-start', justifyContent: 'center', width:screenwidth*0.7}}>
                        <Text style={{color:'#ffffff', fontSize:30, letterSpacing:5, fontFamily:'NanumGothic-Bold'}}>회원가입</Text>
                    </View>
                    <View style={{flex:5}}>
                        {this.state.username_exist ? (
                            <Text style={{color:'#6b0210s', paddingHorizontal:10}}>이미 존재하는 아이디입니다</Text>
                        ):(null)}
                        <View style={styles.textinput}>
                            <TextInput
                                style={{flex:5, fontSize:16, color:'#ffffff', letterSpacing:5, fontFamily:'NanumGothic-Bold'}}
                                placeholder='아이디'
                                placeholderTextColor='#ffffff'
                                onChangeText={(text)=>this.onChangeTextUsername(text)}
                                value={this.state.username}
                            />
                            <TouchableOpacity
                                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                                onPress={this.check_username}>
                                {this.state.usernameChecked ? (
                                    <Animated.View style={this.bounceAnimation.getLayout()}>
                                        <Icon name='md-checkbox-outline' type='ionicon' size={30} color='#ffffff'/>
                                    </Animated.View>
                                ):(
                                    <Text style={{color:'#ffffff', fontSize:13, letterSpacing:1, fontFamily:'NanumGothic-Bold', textAlignVertical:'center'}}>중복확인</Text>
                                        
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textinput}>
                            <TextInput
                                style={{flex:9, fontSize:16, color:'#ffffff', letterSpacing:5, fontFamily:'NanumGothic-Bold'}}
                                placeholder='비번'
                                placeholderTextColor='#ffffff'
                                onChangeText={(text)=>this.setState({password : text})}
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
                        <View style={styles.textinput}>
                            <TextInput
                                style={{flex:1, fontSize:16, color:'#ffffff', letterSpacing:5, fontFamily:'NanumGothic-Bold'}}
                                placeholder='이메일'
                                placeholderTextColor='#ffffff'
                                onChangeText={(text)=>this.setState({email : text})}
                                value={this.state.email}
                            />
                        </View>
                        <View style={{justifyContent: 'center', alignItems:'center', marginTop:55}}>
                            <TouchableOpacity
                                style={styles.signup_button}
                                activeOpacity={0.7}
                                onPress={this._submit}>
                                <Text style={{color:'#ffffff', fontSize:16}}>가입</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }
}

export default Register;

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    textinput:{
        flexDirection:'row',
        height: screenheight*0.07,
        width:screenwidth*0.8,
        borderBottomWidth:1,
        borderColor: '#de8460',
        borderRadius:15,
        alignItems:'center',
        paddingHorizontal:10,
        marginBottom:20
      },
    signup_button:{
        alignItems:'center', 
        width:screenwidth*0.7,
        paddingHorizontal:10,
        paddingVertical:10, 
        borderColor:'#de8460', 
        borderWidth:2
    }
})