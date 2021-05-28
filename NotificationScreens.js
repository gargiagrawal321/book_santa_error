import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from "../config.js";
import { ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader.js";
import firebase from "firebase";
;
import SwipeableFlatlist from "../components/SwipeableFlatlist.js";

export default class NotificationScreens extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            userId: firebase.auth().currentUser.email,
            allNotifications:[]
        }
    }
    getNotifications=()=>
    {
        db.collection("all_notifications").where("notification_status","==","unread").where("targeted_user_id","==",this.state.userId).onSnapshot(snapshot=>{
                var allNotications=[];
                snapshot.docs.map(doc=>{
                        var notification=doc.data();
                        notification["doc_id"]=doc.id;
                        allNotifications.push(notification);

                    })
                    this.setState({
                        allNotifications: allNotifications
                    })
            })
    }

    componentDidMount()
    {
        this.getNotifications();
    }
    render()
    {
        return(
            <View>
                <View>
                    <MyHeader title={"Notifications"}
                    navigation={this.props.navigation} />                    
                </View>
                <View>
                    {
                        this.state.allNotifications.length===0 ?(
                            <Text>You have no notifications. Please come back later</Text> 
                        ):
                        (
                         <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
                        )
                    }
                </View>
                    
            </View>

        )
    }
}