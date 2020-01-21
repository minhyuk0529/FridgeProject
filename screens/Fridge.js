import React, {Component} from 'react';
import{View, Text, StyleSheet} from 'react-native';

class Fridge extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Fridge
                
                </Text>
            </View>
        )
    }
}

export default Fridge;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})