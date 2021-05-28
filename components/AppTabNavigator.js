import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BookDonationScreen from "../screens/BookDonationScreen.js";
import BookRequestScreen from "../screens/BookRequestScreen.js";


export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{screen: BookDonationScreen,
        navigationOptions:{
         
            tabBarLabel: "Donate Books",
        }
    },
    BookRequest:{screen: BookRequestScreen,
        navigationOptions:{
 
            tabBarLabel: "Request Books",
        }}
});

