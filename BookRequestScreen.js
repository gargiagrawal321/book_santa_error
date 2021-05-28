import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from "../config.js";
import firebase from 'firebase';
import MyHeader from '../components/MyHeader.js';

export default class BookRequestScreen extends React.Component{
    constructor()
    {
      super();
      this.state={
          userId: firebase.auth().currentUser.email,
          bookName: "",
          reasonToRequest:"",
          bookStatus:"",
          requestId:"",
          userDocId:"",
          docId:"",
          IsbookRequestActive:"",     
         }
        
    }

    createUniqueId()
    {
        return Math.random().toString(36).substring(7);
    }

    addRequest=async (bookName,reasonToRequest)=>
    {
        var userId=this.state.userId;
        var randomRequestId=this.createUniqueId();
        db.collection("requested_books").add({
            "user_id": userId,
            "book_name": bookName,
            "reason_to_request": reasonToRequest,
            "request_id": randomRequestId,
            "book_status": "requested",
            "date": firebase.firestore.FieldValue.serverTimestamp(),
        }
        )
  
        await db.collection("users").where("email_id","==",this.state.userId).get().then()
        .then(snapshot=>
            {
                snapshot.forEach((doc)=>
                {
                    db.collection("users").doc(doc.id).update(
                        {
                            IsBookRequestActive:true
                        }
                    )
                })
            })
            this.setState({
                bookName:"",
                reasonToRequest:"",
                requestId: randomRequestedId
            })
        return alert("Book Request Submitted");

    }

    receivedBooks=(bookName)=>
        {
           db.collection("received_books").add({
               "user_id":this.state.userId,
               "book_name": bookName,
               "request_id": this.state.requestId,
               "book_status":"received",
           })
           
        }  

         getIsBookRequestActive()
        {
        db.collection("users").where("email_id","==",this.state.userId).onSnapshot((snapshot=>{
            snapshot.forEach(doc=>
                {
                    this.setState({
                        IsBookRequestActive:doc.data().IsBookRequestActive,
                        userDocId: doc.id,
                    })
                })
        }))
    }


    render(){
     return(  
         
         <View>
               <MyHeader title= "YOU CAN RQUEST THE BOOK HERE"  navigation={this.props.navigation}/>
                   <KeyboardAvoidingView>
                       <TextInput
                       placeholder="Enter the name of the book"
                       onChangeText={(text)=>
                        {
                            this.setState({bookName: text})
                        }}
                       >
                        </TextInput>
                       <TextInput
                       placeholder="Why do you want the book"
                       multiline
                       numberOfLines={8}
                       onChangeText={(text)=>
                        {
                            this.setState({reasonToRequest: text})
                        }}
                       >
                       </TextInput>

                      <TouchableOpacity onPress={()=>
                       {
                           this.addRequest(this.state.bookName, this.state.reasonToRequest);
                       }}>
                           <Text>Request</Text> 
                       </TouchableOpacity>
                       </KeyboardAvoidingView>
               
         </View>
         )
      }
    }