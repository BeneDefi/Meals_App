import { useLayoutEffect } from "react";
import { Image, Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { MEALS } from "../data/dummy-data";

import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/redux/favourite";
// import { FavouriteContext } from "../store/context/favourites-context";


function MealDetailScreen({ route, navigation }) {

    // const favouriteMealsCtx = useContext(FavouriteContext);

    const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;

    const selectMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavourite = favouriteMealIds.includes(mealId);

    function changeFavouriteStatusHandler() {
        if(mealIsFavourite) {
            // favouriteMealsCtx.removeFavourite(mealId);
            dispatch(removeFavourite({ id: mealId}));
        } else {
            // favouriteMealsCtx.addFavourite(mealId);
            dispatch(addFavourite({ id: mealId}));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (<IconButton
                    icon={mealIsFavourite ? 'star' : 'star-outline'}
                    color="white"
                    onPress={changeFavouriteStatusHandler} />)
            }
        });
    }, [navigation, changeFavouriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectMeal.imageUrl }} />
            <Text style={styles.title}>{selectMeal.title}</Text>
            <MealDetails
                duration={selectMeal.duration}
                complexity={selectMeal.complexity}
                affordability={selectMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 358,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white',
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%'
    },
});
