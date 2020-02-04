import React, {Component} from 'react';
import{View, Button, StyleSheet, AsyncStorage} from 'react-native';

class Search extends Component {
    render() {
        return (
            <View style={styles.container}> 
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    };
}

export default Search;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})