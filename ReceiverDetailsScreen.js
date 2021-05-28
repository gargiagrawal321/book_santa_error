import * as React from 'react';
import firebase from'firebase';
import { StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import {Header,Card, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context'
export default class ReceiverDetailsScreen extends React.Component
{
    constructor(props)
    {
    super(props);
        this.state={
            userId: firebase.auth().currentUser.email,
            userName:"",
            receiverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            bookName: this.props.navigation.getParam('details')["book_name"],
            raeasonForRequest: this.props.navigation.getParam('details')["reason_for_request"],
            receiverName:"",
            receiverContact:"",
            receiverAddress: "",
            receiverRequestDocId:"",
        }
    }
   getReceiverDetails()
   {
       db.collection('users').where('email_id',"==",this.state.receiverId).get()
       .then(snapshot=>
        {
            snapshot.forEach(doc=>
                {
                    var data=doc.data()
                  this.setState({
                    receiverName:data.first_name,
                    receiverContact:data.mobileNo,
                    receiverAddress:data.address,
                  })  
                })
        })
        db.collection("requested_books").where('requested_id',"==",this.state.requestId).get()
        .the(snapshot=>
            {
                snapshot.forEach(doc=>
                    {
                        this.setState({
                            receiverRequestDocId: doc.id
                        })
                    })
            })
 }

    getUserDetails(userId){
        db.collection("users").where("email_id","==","userId",userId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data();
                this.setState({
                     userName: data.first_name+ " "+ data.last_name
                })
            })
        })

    }

    componentDidMount()
    {
        this.getReceiverDetails();
        this.getUserDetails(this.state.userId);
    }
    
    updateBookStatus=()=>
    {
        db.collection("all_donations").add({
            "book_name": this.state.bookName,
            "request_id" : this.state.requestId,
            "requested_by" : this.state.receiver_Name,
            "donor_id" : this.state.userId,
            "request_status": "Donor Interested",
        })
    }

    addNotification=()=>{
        var message = this.state.userName + " has shown interest in donating the book"
        db.collection("all_notifications").add({
          "targeted_user_id"    : this.state.recieverId,
          "donor_id"            : this.state.userId,
          "request_id"          : this.state.requestId,
          "book_name"           : this.state.bookName,
          "date"                : firebase.firestore.FieldValue.serverTimestamp(),
          "notification_status" : "unread",
          "message"             : message
        })
      }

    render()
    {
        return(
            <View>
            <View>
                <SafeAreaProvider>
                <Header leftComponent={<Icon name='arrow-left' type='feather' color="#b83b5e"/>}
                centerComponent={{text: "Donate Books", style:{ color: "black"}}}
                backgroundColor="#0FFF5B"/>
                 </SafeAreaProvider>
            </View>
            <View>
                <Card title={"Book Information"}
                titleStyle={{color:"#00adb5",fontSize:"bold"}}>
                    <Card>
                            <Text>Name:{this.state.bookName}</Text> 
                        </Card>
                        <Card>
                        <Text>Name:{this.state.reasonForRequest}</Text> 
                        </Card>
                    </Card>
                     <Card title={"Receiver Information"}>
                        <Card>
                        <Text>Name:{this.state.receiverName}</Text> 
                        </Card>
                        <Card>
                        <Text>Name:{this.state.receiverContact}</Text> 
                        </Card>
                        <Card>
                        <Text>Name:{this.state.receiverAddress}</Text> 
                        </Card>
                    </Card>
                    <View>
                        {
                            this.state.receiverId !== this.state.userId ?
                                (
                                    <TouchableOpacity onPress={()=>{
                                        this.bookBookStatus();
                                        this.addNotification();
                                        this.props.navigation.navigate('MyDonations');
                                    }}><Text>I want to donate</Text> </TouchableOpacity>
                                ):
                                null
                     
                        }
                    </View>
                        

              
                    
            </View>
            </View>
        )
    }
}