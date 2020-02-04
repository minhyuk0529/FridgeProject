import React, {useState} from 'react';
import{
    View, Text, StyleSheet,SafeAreaView, 
    StatusBar, Dimensions, FlatList, TouchableOpacity, 
    ScrollView, Animated
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import SearchBar from 'react-native-dynamic-search-bar';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

import Ingredient_Card from './Ingredient_Card';
import Selected_Ing_Cards from './Selected_Ing_Cards';
import Recipe_Steps from './Recipe_Steps';
import staticData from "../../data/staticData";
import firstRecipe from "../../data/firstRecipe";

export default () => {
    const [name, onChangeText1] = useState("");
    const [description, onChangeText2] = useState("");
    const [search_word, onChangeText3] = useState("")

    const dataBackup = staticData
    const [dataSource, onChangeData] = useState(staticData) 
    const [selectedData, onSelectData] = useState([])   
    const [recipeData, addRecipeData] = useState(firstRecipe)
    const [photo, setPhoto] = useState(null)
    const [thereisPhoto, setThereisPhoto] = useState(false)

    const [isIngRendered, renderIng] = useState(false)
    const [IngCount, increaseIngCount] = useState(0)
    const [scrollAllowed, enableScroll] = useState(false)
    const ScrollY = new Animated.Value(0)

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
    function onPressSearchBar(){
        renderIng(true)
        enableScroll(true)
    }
    function onPressCancel(){
        if (isIngRendered == true){
            if (IngCount == 0){
                var num = IngCount + 1
                increaseIngCount(num)
                filterList("")
            }
            else if (IngCount == 1){
                var num = IngCount + 1
                increaseIngCount(num)
                renderIng(false)
            }else{
                increaseIngCount(0)
            }
        }        
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
        function removeSelectedItem(i){
            var index = selectedData.indexOf(i)
            if( index !== -1 ){
                var data = [...selectedData]
                data.splice(index,1)
                onSelectData(data)
            }
        }
        return(
            <Selected_Ing_Cards
                item_={item}
                name={item.name}
                imageSource={item.image}   
                tags={item.value} 
                removeSelected={()=>removeSelectedItem(item)}           
            />
        )
    }
    const renderRecipe=(item)=>{
        function removeRecipeStep(i){
            var index = recipeData.indexOf(i)
            if(index!==-1){
                var data = [...recipeData]
                data.splice(index, 1)
                addRecipeData(data)
            }
        }
        return(
            <Recipe_Steps
                item={item}
                index={item.index}
                description={item.description}
                image={item.image_uri}
                removeRecipe={()=>removeRecipeStep(item)}
            />
        )
    }
    const onPressAddPhoto=()=>{
        const options ={
            noData : true,
        }
        ImagePicker.showImagePicker(options, response =>{
            if (response.uri){
                setPhoto(response)
                setThereisPhoto(true)
            }
        })
    }
    const onPressAddRecipeStep=()=>{
        var index = recipeData.length + 1;
        var data = recipeData.concat(
            {
                index: index,
                date_created: new Date().getDate(),
                date_last_modified: new Date().getMonth(),
                description: "예) 피망을 썰어주세요",
                image_uri: require('../../data/food_pic.jpg')
            }
        )
        addRecipeData(data)
    }

    const onPressSubmit=()=>{
        alert("Submitted")
    }
    return(
        <>
        <SafeAreaView style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.ScrollView}
                scrollEnabled={scrollAllowed}
                onScroll={Animated.event(
                    [{nativeEvent : {contentOffset : {y : ScrollY}}}]
                )}
                onContentSizeChange={()=>enableScroll(true)}>

                <Animated.View style={{width: screenwidth, height: screenheight*0.3,justifyContent:'center',alignItems:'center',
                    opacity: ScrollY.interpolate({inputRange:[0,80,250], outputRange:[1,0.5,0]})}}>
                    {thereisPhoto ? (
                        <TouchableOpacity
                            style={styles.picture}
                            onPress={onPressAddPhoto}>
                                <FastImage
                                    style={{width:screenwidth, height:screenheight*0.3}}
                                    source={{uri :photo.uri}}/>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                            style={styles.picture}
                            onPress={onPressAddPhoto}>
                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <Icon name='md-add' type='ionicon' size={25} color='#c9c9c9'/>
                                    <Text> </Text>
                                    <Icon name='md-camera' type='ionicon' size={40} color='#c9c9c9'/>
                                </View>
                                
                        </TouchableOpacity>
                    )}
                </Animated.View>

                <View style={{backgroundColor:'#fff', shadowColor: '#a9a9a9', shadowOpacity:10, elevation:3}}>
                    
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        <TextInput
                            placeholder='이름'
                            style={styles.name}
                            onChangeText={(text)=>onChangeText1(text)}
                            value={name}
                        />
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
                        <View style={{flexDirection:'row', marginLeft:20}}>
                            <Text style={{fontSize:23}}>Ingredients</Text>
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
                                onPress={onPressSearchBar}
                                onPressCancel={onPressCancel}
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
                                    nestedScrollEnabled={true}
                                    numColumns={4}
                                />
                            </View>
                        ):(null)}
                    </View>

                    <View style={styles.recipe_box}>
                        <View style={{flexDirection:'row', marginLeft:20}}>
                            <Text style={{fontSize:23}}>Recipe</Text>
                        </View>
                        <View style={{flexDirection:'column', marginHorizontal:15, marginTop:5}}>
                            <FlatList
                                data={recipeData}
                                renderItem={({item})=>renderRecipe(item)}
                                nestedScrollEnabled={true}
                            />                        
                        </View>

                        <View style={{flexDirection:'column', marginHorizontal:15, marginTop:5}}>
                            <TouchableOpacity
                                    onPress={onPressAddRecipeStep}>
                                    <View style={styles.add_Recipe}>
                                        <Icon name='md-add' type='ionicon' color="#a9a9a9"/>
                                    </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                    <View style={{alignItems:'center', marginBottom:20}}>
                        <TouchableOpacity 
                            style={styles.submit_Botton}
                            onPress={onPressSubmit}>
                            <Text style={{fontSize:20, textAlign:'center', textAlignVertical:'center', paddingVertical:10}}>Submit!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                

            </ScrollView>
        </SafeAreaView>
        </>
    );
}

const screenheight = Dimensions.get('window').height;
const screenwidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    backgroundImage:{
        width: screenwidth, 
        height: screenheight*0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    ScrollView:{
        flexGrow:1
    },
    header:{
        marginTop: 18,
        fontSize: 23,
        alignItems:'center'
    },
    picture:{
        width: screenwidth,
        height: screenwidth*0.2,
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        marginLeft:15,
        width:screenwidth*0.7,
        textAlign:'center',
        fontSize: 20,
        borderColor: '#a9a9a9',
        borderBottomWidth: 0.5,
        borderTopWidth:0.5,
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
        flexDirection:'column',
        marginTop:20
    },
    ingredient_items:{
        marginTop:15,
        marginHorizontal:10,
        height:screenheight*0.3,
        borderWidth:0.5,
        borderColor:'#a9a9a9',
        borderWidth: 0.5,
        borderRadius: 3,
    },
    recipe_box:{
        minHeight:screenheight*0.225,
        flexDirection:'column',
        marginTop:20
    },
    add_Recipe:{
        width:screenwidth-30, 
        height: 40,
        marginTop:7, 
        justifyContent:'center', 
        alignItems:'center',
        borderWidth:0.5, 
        borderColor:'#59bfff',
        borderRadius:15, 
    },
    submit_Botton:{
        marginTop: 20,
        justifyContent:'center', 
        alignItems:'center',
        borderWidth:0.5, 
        borderColor:'#a9a9a9',
        borderRadius:3, 
        width:screenwidth*0.5, 
    }
})