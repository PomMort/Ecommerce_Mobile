import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouriteList from '../components/FavouriteList';
import HomePage from '../components/HomePage';
import ItemDetail from '../components/ItemDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: true }} component={HomePage} />
            <Stack.Screen name="Detail" options={{cardShadowEnabled: true}} component={ItemDetail} />
        </Stack.Navigator>
    );
}



const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    showLabel: false,
                    style: {
                        position: "absolute",
                        bottom: 25,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroungColor: '#ffffff',
                        borderRadius: 15,
                        height: 90,
                        ...Styles.shadow
                    }
                }}
            >
                <Tab.Screen name='Home Page' component={HomeStack} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 1.5 }}>
                            <Image
                                source={require('../assets/Home_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#rff0000' : '#ffe6e6'
                                }}
                            />
                        </View>
                    )
                }} />
                <Tab.Screen name='Favourite List' component={FavouriteList} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 1.7 }}>
                            <Image
                                source={require('../assets/Heart_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#rff0000' : '#ffe6e6'
                                }}
                            />
                        </View>
                    )
                }} />
                {/* <Tab.Screen name='Detail' component={ItemDetail} options={{ tabBarButton: () => null }}></Tab.Screen> */}
            </Tab.Navigator>
        </NavigationContainer>


    )
}
const Styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs;



