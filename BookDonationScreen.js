import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView , FlatList} from 'react-native';
import db from "../config.js";
import MyHeader from "../components/MyHeader.js";
import { ListItem } from "react-native-elements";
import firebase from 'firebase';

export default class BookDonationScreen extends React.Component{
  constructor(){
    super();
    this.state={
      userId: firebase.auth().currentUser.email,
      requestedBooksList:[]}
      this.requestRef=null;
  }
  getRequestedBooksList=()=>{
     this.requestRef = db.collection("requested_books").onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map(doc=>doc.data());
      this.setState({ requestedBooksList:requestedBooksList})
    })
    console.log(this.state.requestedBooksList);
  }

  keyExtractor=(item,index)=>index.toString()
   

  renderItem=({item,i})=>{
    return(
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
        <ListItem.Title>{item.book_name}</ListItem.Title>
        <ListItem.Subtitle>{item.reason_to_request}</ListItem.Subtitle>
                <TouchableOpacity style={{backgroundColor:"#ffffd2"}} onPress={()=>
                {
                  this.props.navigation.navigate("ReceiverDetailsScreen", {"details":item})
                }}>
                  <Text>Donate</Text>
                </TouchableOpacity>
                </ListItem.Content>
               </ListItem> 
               
    )
  }
  componentDidMount=()=>{
    this.getRequestedBooksList()
   
  }
  componentWillUnmount=()=>{
    this.requestRef()
  }
    render(){
      
      
      return(  

       <View>
        <MyHeader title="Donate Books" navigation={this.props.navigation} />
          <View style={{flex:1}}>
            {
              this.state.requestedBooksList.length===0 ? 
              (
                <Text>List of all the REQUESTED BOOKS is... </Text>
              ):(
                 <FlatList keyExtractor={this.keyExtractor}
                 data={this.state.requestedBooksList}
                 renderItem={this.renderItem}>

                    
                 </FlatList>
              )
            }
          </View>
       
      </View>
      )
    }
  }