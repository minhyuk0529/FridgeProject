import React, {Component} from 'react';
import{View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';

class Selected_Ing_Cards extends Component {
    constructor(props){
        super(props)
    }
    onPress=()=>{
        this.props.removeSelected()
    }
    render(){
        return(
            <View style={styles.viewContainer}> 
                <TouchableOpacity
                    onPress={this.onPress}>
                    <ImageBackground style={styles.imageStyle} 
                        imageStyle={{borderRadius:15, opacity:0.45}}
                        source={this.props.imageSource}>
                        <View style={styles.imageStyle}>
                            <Text style={{textAlign:'center', color:'#000000', fontSize:10}}>{this.props.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Selected_Ing_Cards;

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContainer:{
        width:screenwidth*0.13,
        height:screenwidth*0.08,
        borderColor:'#a9a9a9',
        borderWidth:0.5,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:2.5,
        borderRadius:5
    },
    imageStyle:{
        width:screenwidth*0.12,
        height:screenwidth*0.07,
        justifyContent:'center',
        alignItems:'center',
    }  
})