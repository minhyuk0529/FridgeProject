import React from 'react';
import{View, Text, StyleSheet, Dimensions, TouchableOpacity, PanResponder, Animated} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


export default class Recipe_Steps extends React.Component {
    constructor(props){
        super(props)
        this.state={
            description : "",
            thereisPhoto : false,
            photo : null,
        }
        this.position = new Animated.ValueXY()
        
        this.onPressGetPhoto = this.onPressGetPhoto.bind(this)
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) =>{
                if (gestureState.dx > 180){
                    this.position.setValue({x:180, y:0})
                }else{
                    this.position.setValue({ x: gestureState.dx, y: 0 })
                }
            },
            onPanResponderRelease: (evt, gestureState) =>{
                if (gestureState.dx < 180){
                    this.position.setValue({x:0, y:0})
                }else{
                    this.props.removeRecipe()
                    this.position.setValue({x:0,y:0})
                }
            }
        });
    }

    onChangeText=(t)=>{
        this.setState({description: t})
    }

    onPressGetPhoto(){
        const options ={
            noData : true,
        }
        ImagePicker.showImagePicker(options, response =>{
            if (response.uri){
                this.setState({photo : response})
                this.setState({thereisPhoto : true})
            }
        })

    }
    render(){
        return(
            <Animated.View 
                {...this._panResponder.panHandlers}
                style={[styles.step, {transform: this.position.getTranslateTransform()}]} 
                >
                <View style={styles.index}>
                    <Text style={{fontSize:19, textAlignVertical:'center'}}>{this.props.index}</Text>
                </View>
                <TextInput
                    style={styles.description}
                    placeholder={this.props.description}
                    onChangeText={(text)=>onChangeText(text)}
                    value={this.state.description}
                    multiline={true}
                />
                {this.state.thereisPhoto ? (
                    <TouchableOpacity
                        style={styles.photo}
                        onPress={this.onPressGetPhoto}>
                        <View>
                            <FastImage
                                style={{width:40, height:40, borderRadius:15}}
                                source={{uri : this.state.photo.uri}}/>
                        </View>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity
                        style={styles.photo}
                        onPress={this.onPressGetPhoto}>
                        <View>
                            <Icon name='md-camera' type='ionicon' color="#a9a9a9"/>
                        </View>
                    </TouchableOpacity>
                    
                )}
            
            </Animated.View>
        )
    }
}

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    step:{
        width:screenwidth-30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        marginVertical:2,
        borderColor:'#a9a9a9',
        borderWidth:0.5,
        borderRadius:15
    },
    index:{
        height:40,
        width:40,
        flex:0.8,
        justifyContent:'center',
        alignItems:'center',    
    },
    description:{
        flex:6,
    },
    photo:{
        flex:0.9,
        height:40,
        width:40,
        alignItems:'center',
        justifyContent: 'center',
    }
})