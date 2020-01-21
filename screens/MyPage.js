import React, {Component} from 'react';
import{View, Text, StyleSheet} from 'react-native';

class MyPage extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>MyPage</Text>
            </View>
        )
    }
}

export default MyPage;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})