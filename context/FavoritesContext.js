import { View,  Text, ToastAndroid } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();
export const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const jsonValue = await AsyncStorage.getItem('favorites');
            setFavorites(jsonValue != null ? JSON.parse(jsonValue) : []);
        };
        loadFavorites();
    }, []);

    const addFavorites = async (item) => {
        const alreadyItem = favorites.some(favoriteItem => favoriteItem.id === item.id);
        if (alreadyItem) {
            ToastAndroid.show('Item has already in favorites', ToastAndroid.SHORT);
            return;
        }

        const updateFavorites = [...favorites, item];
        setFavorites(updateFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updateFavorites));
        ToastAndroid.show('Adding successfully !!!', ToastAndroid.SHORT);
    }

    const removeFavorites = async (id) => {
        const updateFavorites = favorites.filter(item => item.id !== id);
        setFavorites(updateFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updateFavorites));
        ToastAndroid.show('Removing item successfully !!!', ToastAndroid.SHORT);
    }

    const removeMultipleFavorites = async (ids) => {
        // const updateFavorites = favorites.filter(item => !ids.include(item.id));
        // setFavorites(updateFavorites);
        setFavorites([]);
        await AsyncStorage.setItem('favorites', JSON.stringify(updateFavorites));
        ToastAndroid.show('Removing all item successfully !!!', ToastAndroid.SHORT);
    }


    return (
        <FavoritesContext.Provider value={{favorites, addFavorites, removeFavorites, removeMultipleFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContext