import React, {Component} from 'react';
import{View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';

class Selected_Ing_Cards extends Component {
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
                <ImageBackground style={styles.imageStyle} 
                    imageStyle={{borderRadius:15, opacity:0.45}}
                    source={this.props.imageSource}>
                    <View style={styles.imageStyle}>
                        <Text style={{textAlign:'center', color:'#000000'}}>{this.props.name}</Text>
                    </View>
                </ImageBackground>
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
        width:screenwidth*0.15,
        height:screenwidth*0.125,
        borderColor:'#a9a9a9',
        borderWidth:0.5,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:2.5,
        marginVertical:3.5,
        borderRadius:5
    },
    imageStyle:{
        width:screenwidth*0.14,
        height:screenwidth*0.115,
        justifyContent:'center',
        alignItems:'center',
    }  
})