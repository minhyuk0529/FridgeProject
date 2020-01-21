import React, {useState} from 'react';
import{View, Text, StyleSheet,SafeAreaView, StatusBar, Dimensions, FlatList, ScrollView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import SearchBar from 'react-native-dynamic-search-bar';
import Ingredient_Card from './Ingredient_Card';
import Selected_Ing_Cards from './Selected_Ing_Cards';
import staticData from "../data/staticData";

export default () => {
    const [name, onChangeText1] = useState("");
    const [description, onChangeText2] = useState("");
    const [search_word, onChangeText3] = useState("")
    const dataBackup = staticData
    const [dataSource, onChangeData] = useState(staticData) 
    const [selectedData, onSelectData] = useState([])   
    const [isIngRendered, renderIng] = useState(false)
    const [scrollAllowed, enableScroll] = useState(true)

    filterList=(text)=>{
        renderIng(true)
        onChangeText3(text)
        var newData = dataBackup
        newData = dataBackup.filter(item => {
            const itemData = item.name.toLowerCase()
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        onChangeData(newData)
    }
    
    renderItem=(item)=>{
        function handlePress(list_item) {
            if (selectedData.indexOf(item)<0){
                var data = selectedData.concat(list_item)
                onSelectData(data)
            }            
        }
        return(
            <Ingredient_Card
                name={item.name}
                imageSource={item.image}   
                tags={item.value}
                onPress={()=>handlePress(item)}             
            />
        )
    }

    renderSelectedItem=(item)=>{
        return(
            <Selected_Ing_Cards
                name={item.name}
                imageSource={item.image}   
                tags={item.value}            
            />
        )
    }

    return(
        <>
        <StatusBar/>
        <SafeAreaView style={styles.container} onStartShouldSetResponderCapture={()=>enableScroll(true)}>
            <ScrollView 
                contentContainerStyle={styles.ScrollView}
                scrollEnabled={scrollAllowed}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.header}>자신만의 레시피를 등록해보세요!</Text>
                </View>

                <View style={{alignItems:'center'}}>
                    <View style={styles.picture}>
                        <Icon name='md-camera' type='ionicon'/>
                    </View>
                </View>

                <View style={{marginTop: 20, flexDirection: 'row', height:screenheight*0.05}}>
                    <View style={{flex:1}}></View>
                    <TextInput
                        placeholder='이름'
                        style={styles.name}
                        onChangeText={(text)=>onChangeText1(text)}
                        value={name}
                    />
                    <View style={{flex:1}}></View>
                </View>

                <View style={{alignItems:'center'}}>
                    <View style={styles.description_box}>
                        <TextInput
                            placeholder='음식 설명'
                            style={styles.description}
                            onChangeText={(text)=>onChangeText2(text)}
                            value={description}
                        />
                    </View>
                </View>
                
                <View style={styles.ingredient_box}>
                    <View style={{flexDirection:'row', marginLeft:10}}>
                        <Text style={{fontSize:20}}>Ingredients</Text>
                    </View>
                    
                    {(selectedData.length) ? (
                        <View style={{marginHorizontal:15, marginTop:5}}>
                            <FlatList
                                data={selectedData}
                                renderItem={({ item }) => renderSelectedItem(item)}
                                horizontal={true}
                            />
                        </View>
                    ):(null)}
                    
                    <View>
                        <SearchBar
                            fontColor="#999999"
                            iconColor="#999999"
                            shadowColor="#282828"
                            cancelIconColor="#999999"
                            backgroundColor="#d1edf2"
                            placeholder="Search here"
                            onPress={()=>renderIng(true)}
                            onPressCancel={()=>filterList("")}
                            placeholder="검색"
                            onChangeText={(text)=>filterList(text)}
                            value={search_word}
                        />
                    </View>
                    {isIngRendered ? (
                        <View style={styles.ingredient_items}>
                            <FlatList
                                data={dataSource}
                                renderItem={({ item }) => renderItem(item)}
                                onTouchStart={()=>enableScroll(false)}
                                onMomentumScrollEnd={()=>enableScroll(true)}
                                numColumns={4}
                            />
                        </View>
                    ):(null)}
                    <View style={styles.recipe_box}>
                        <View style={{flexDirection:'row', marginLeft:10}}>
                            <Text style={{fontSize:20}}>Recipe</Text>
                        </View>

                    </View>

                    <View style={{marginTop: 20, flexDirection:'row', borderWidth:1, borderColor:'#a9a9a9', width:screenwidth*0.5, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity>
                            <Text>Submit!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
}

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    ScrollView:{
        flexGrow:1,
        justifyContent:'space-between',
        width:screenwidth,
        flexDirection: 'column',
    },
    header:{
        marginTop: 20,
        fontSize: 20,
        alignItems:'center'
    },
    picture:{
        width: screenwidth*0.2,
        height: screenwidth*0.2,
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderColor: '#a9a9a9',
        borderWidth: 0.5,
        borderRadius: 3,
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        flex:3,
        textAlign:'center',
        fontSize: 20,
        borderColor: '#a9a9a9',
        borderWidth: 0.5,
        borderRadius: 3,
    },
    description_box:{
        marginTop: 10, 
        width: screenwidth-30,
        borderColor: '#a9a9a9',
        borderWidth: 0.5,
        borderRadius: 3,
    },
    description:{
        marginHorizontal:10,
        fontSize: 10,
        textAlignVertical: 'top',
        height: 100
    },
    ingredient_box:{
        height:screenheight*0.8,
        flexDirection:'column',
        marginTop:20
    },
    ingredient_items:{
        marginTop:10,
        marginHorizontal:10,
        height:screenheight*0.25,
        borderWidth:1,
        borderColor:'#a9a9a9',
        borderWidth: 0.5,
        borderRadius: 3,
    },
    recipe_box:{
        height:screenheight*0.3,
        flexDirection:'column',
        marginTop:20
    }
})