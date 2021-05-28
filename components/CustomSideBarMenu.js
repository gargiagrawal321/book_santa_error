import * as React from 'react';
import firebase from'firebase';
import { StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
        <View style={{flex:1}}>
            <DrawerItems {...this.props}/>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('WelcomeScreen');
                firebase.auth().signOut()
              }}>
            <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
        )
    }
}