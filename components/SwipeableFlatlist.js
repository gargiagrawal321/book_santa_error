import * as React from 'react';
import { Animated, View , Text, StyleSheet , TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem,Icon } from 'react-native-elements';

import db from "../config.js"
export default class SwipableFlatlist extends React.Component{
constructor(props){
    super(props)
    this.state={
    allNotifications: this.props.allNotifications
    }
}

updateMarkAsRead=(notification)=>
{
    db.collection("all_notifications").doc(notification.doc_id).this.updateMarkAsRead({
        notification_status: "read"
    })
}

onSwipeValueChange=(swipeData)=>
{
var allNotifications=this.state.allNotifications;
const {key,value}=swipeData;
if(value<-Dimensions.get("window").width)
{
    const newData=[...allNotifications];
    this.updateMarkAsRead(allnotifications[key]);
    newData.splice(key,1);
    this.setState({allNotifications: newData})

}
}
renderHiddenItem=()=>
{

}

renderItem=(data)=>{
<Animated.View>
    <ListItem bottomDivider>
        <ListItem.Content>
            <ListItem.Title>Title: {data.item.book_name}</ListItem.Title>
            <ListItem.Subtitle>Message: {data.item.message}</ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>

</Animated.View>

}
render()
{
    return(
        <View>
        <SwipeListView
        disableRightSwipe
        data={this.state.allNotifications}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        rightOpenValue={-Dimensions.get("window").width}
        onSwipeValueChange={this.onSwipeValueChange}
        keyExtractor={(item,index)=>index.toString()}
        />
            
        </View>

    )
}
}