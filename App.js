import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState("")
  const [recipes, setRecipes] = useState(null)

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      const data = await response.json()
      setRecipes(data.meals)
      setIngredient("")
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
      <TextInput placeholder="ingredient" style={{ fontSize: 18, width: 200 }} onChangeText={text => setIngredient(text)} value={ingredient} />
      <Button onPress={() => getRecipes()} title="Search" />
      </View>
      <View style={styles.line} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <View style={styles.recipeContainer}>
            <Text>{item.strMeal}</Text>
            <Image style={styles.imageStyle} source={{uri: item.strMealThumb}} />
          </View>
        }} 
        data={recipes}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  formContainer: {
    alignSelf: "center",
    marginTop: "20%",
    paddingBottom: 10
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  recipeContainer: {
    padding: 5,
    alignItems: 'center',
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});
