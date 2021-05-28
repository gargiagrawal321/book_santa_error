import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator.js';
import CustomSideBarMenu from './CustomSideBarMenu.js';
import SettingScreens from '../screens/SettingScreens.js';


export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Setting:{screen:SettingScreens},
    },
    {
    contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName:'Home'
    }
)
