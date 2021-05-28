import * as React from 'react';
import MyHeader from '../components/MyHeader.js';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView , FlatList} from 'react-native';
import { render } from 'react-dom';

export default class SettingScreens extends React.Component{
    constructor(){
        super()
        this.state={
             emailId:"",
             firstName:"",
             lastName:"",
             address:"",
             mobileNo:"",
             docId:"",
        }
    }
    getUserDetails=()=>{
        var emailId=firebase.auth().currentUser.email;
        db.collection("users").where('email_id','==',emailId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    address:data.address,
                    mobileNo:data.mobile_no,
                    docId:doc.id
                })
            })
        })
        }
updateUserDetails=()=>{
    db.collection('users').doc(this.state.docId).update({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        address:this.state.address,
        mobile_no:this.state.mobileNo
    })
}
componentDidMount=()=>{
    this.getUserDetails()
}
    render(){
        return(
            <View>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View>
                <Text> Registration Form  </Text>
                            <TextInput
                            placeholder="First Name"
                            maxLength={20}
                            onChangeText={(text)=>
                                {
                                    this.setState({firstName: text})
                                }
                            } 
                            value={this.state.firstName}/>
                              <TextInput
                            placeholder="Last Name"
                            maxLength={20}
                            onChangeText={(text)=>
                                {
                                    this.setState({lastName: text})
                                }
                            }
                            value={this.state.lastName}/>
                             <TextInput
                            placeholder="Address"
                            multiline={true}
                            onChangeText={(text)=>
                                {
                                    this.setState({address: text})
                                }
                            }
                            value={this.state.address}/>
                             <TextInput
                            placeholder="Mobile No"
                            maxLength={20}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>
                                {
                                    this.setState({mobileNo: text})
                                }
                            }
                            value={this.state.mobileNo}/>
                            <TouchableOpacity onPress={()=>{
                                this.updateUserDetails()
                            }}>
                                <Text>Update Details</Text>
                            </TouchableOpacity>
                </View>
             </View>
        )
    }
}