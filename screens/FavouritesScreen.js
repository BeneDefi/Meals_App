import { View, StyleSheet, Text } from "react-native";
import MealsList from "../components/MealsList/MealsList";
// import { useContext } from "react";
// import { FavouriteContext } from "../store/context/favourites-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavouritesScreen() {
    // const favouriteMealsCtx = useContext(FavouriteContext);

    const  favouriteMealIds = useSelector(state => state.favouriteMeals.ids);
    
    const favouriteMeals = MEALS.filter(meal =>
        favouriteMealIds.includes(meal.id)
    );

    if(favouriteMeals.length === 0){

        return(
            <View style={styles.rootContainer}>
                <Text style={styles.msg}>You Have no Favourites yet!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {favouriteMeals.length === 0 ? (
                <Text style={styles.message}>
                    You have no favourite meals yet. Start adding some!
                </Text>
            ) : (
                <MealsList items={favouriteMeals} />
            )}
        </View>
    );
}

export default FavouritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3f2f25',
    },
    message: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 32,
    },
    rootContainer: {
        flex: 1,
        backgroundColor: '#3f2f25',
        justifyContent: 'center',
        alignItems: 'center'
    },
    msg: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
});