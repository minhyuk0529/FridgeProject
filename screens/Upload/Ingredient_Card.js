import React, {Component} from 'react';
import{View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';

class Ingredient_Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSelected:false
        }
    }
    onPress =()=>{
        this.setState({isSelected: !this.state.isSelected})
    }
    render(){
        return(
            <View style={styles.viewContainer}> 
                <TouchableOpacity
                    style={{alignItems:'center', justifyContent: 'center'}}
                    onPress={this.props.onPress}>
                    {this.state.isSelected? (
                        <ImageBackground style={styles.imageStyleActive} 
                            imageStyle={{borderRadius:15}}
                            source={this.props.imageSource}>
                            <View style={styles.imageStyleInactive}>
                                <Text style={{textAlign:'center', color:'#000000'}}>{this.props.name}</Text>
                            </View>
                        </ImageBackground>
                    ):(
                        <ImageBackground style={styles.imageStyleInactive} 
                            imageStyle={{borderRadius:15}}
                            source={this.props.imageSource}>
                            <View style={styles.imageStyleInactive}>
                                <Text style={{textAlign:'center', color:'#ffffff'}}>{this.props.name}</Text>
                            </View>
                        </ImageBackground>
                    )}
                    
                </TouchableOpacity>
            </View>
        )
    }
}

export default Ingredient_Card;

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContainer:{
        width:screenwidth*0.2,
        height:screenwidth*0.25,
        borderColor:'#a9a9a9',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:5,
        marginVertical:7,
        borderRadius:10
    },
    imageStyleInactive:{
        width:screenwidth*0.18,
        height:screenwidth*0.23,
        justifyContent:'center',
        alignItems:'center'
    },   
    imageStyleActive:{
        width:screenwidth*0.18,
        height:screenwidth*0.23,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.3,
    }  
})