import * as React from 'react';
import {createStackNavigator}  from "react-navigation-stack";
import BookDonationScreen from "../screens/BookDonationScreen.js"
import ReceiverDetailsScreen from "../screens/ReceiverDetailsScreen.js"

export const AppStackNavigator =createStackNavigator({
    BookDonateList:
    {
        screen:BookDonationScreen,
        navigationOptions:{
        headerShown:false
        }
    },
    ReceiverDetails:{
        screen:ReceiverDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    },
},
{ initialRouteName: 'BookDonateList'}
)  