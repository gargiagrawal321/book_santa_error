import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from "../config.js";
import firebase from "firebase";

export default class WelcomeScreen extends React.Component{
    constructor()
    {
        super();
        this.state={ 
            emailId:"",
            password:"",
            firstName:"",
            lastName:"",
            address:"",
            mobileNo:"",
            confirmPassword:"",
            isModalVisible:false,
        }
    }
    showModal=()=>{
        return(
            <Modal 
            animationType="fade"
            transparent={true}
            visible= {this.state.isModalVisible}>
                <View >
                    <ScrollView>
                        <KeyboardAvoidingView>
                        <Text> Registration Form  </Text>
                            <TextInput
                            placeholder="First Name"
                            maxLength={20}
                            onChangeText={(text)=>
                                {
                                    this.setState({firstName: text})
                                }
                            }/>
                              <TextInput
                            placeholder="Last Name"
                            maxLength={20}
                            onChangeText={(text)=>
                                {
                                    this.setState({lastName: text})
                                }
                            }/>
                             <TextInput
                            placeholder="Address"
                            multiline={true}
                            onChangeText={(text)=>
                                {
                                    this.setState({address: text})
                                }
                            }/>
                             <TextInput
                            placeholder="Mobile No"
                            maxLength={20}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>
                                {
                                    this.setState({mobileNo: text})
                                }
                            }/>
                            <TextInput
                            placeholder="Email"
                            maxLength={20}
                            keyboardType={'email-address'}
                            onChangeText={(text)=>
                                {
                                    this.setState({emailId: text})
                                }
                            }/>
                             <TextInput
                                placeholder="password"
                                placeholderTextColor='black'
                                secureTextEntry= {true}
                                onChangeText={(text)=>
                                    {
                                        this.setState({
                                            password: text
                                        })
                                    }} />
                             <TextInput
                                  placeholder="Confirm password"
                                  placeholderTextColor="black"
                                  secureTextEntry= {true}
                                  onChangeText={(text)=>
                                       {
                                         this.setState({
                                         confirmPassword: text
                                       })
                                  }} />
                            <View>
                            <TouchableOpacity onPress={()=>{this.userSignUp(this.state.emailId,this.state.password,this.confirmPassword)}}>
                            <Text>Register</Text>
                            </TouchableOpacity>
                           </View>
                           <View>
                            <TouchableOpacity onPress={()=>{this.setState({isModalVisible: false})   }}>
                            <Text>Cancel</Text>
                            </TouchableOpacity>
                                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    userlogin=(emailId,password)=>
    {
        console.log(emailId);
        firebase.auth().signInWithEmailAndPassword(emailId,password).then((response)=>
            {
               this.props.navigation.navigate("BottomTab");
            }
        ).catch((error)=>{
                var errorcode=error.message;
                alert(errorcode+"!!");
        })
    }

    userSignUp=(emailId,password,confirmPassword)=>
    {
        if(password!==confirmPassword)
        {
            return alert("Password does not match. Please enter again");
        }
        else{
        console.log(emailId);
        firebase.auth().createUserWithEmailAndPassword(emailId,password).then((response)=>
            {
                db.collection("users").add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    address: this.state.address,
                    user_name:this.state.mailId,
                    mobile_no:this.state.mobileNo, 
                  et

                })
                
            }
        ).catch((error)=>{
                var errorcode=error.message;
                alert(errorcode+"!!");
        })
    }
    }


render()
{
    return(
        <View>
            <View>
                {
                    this.showModal()
                } 
            </View>
            <TextInput
            placeholder="abc123@gmail.com"
            placeholderTextColor='#'
            keyboardType= 'email-address'
            onChangeText={(text)=>
            {
                this.setState({
                    emailId: text
                })
            }}
            />
            <TextInput
            placeholder="password"
            placeholderTextColor='#'
            secureTextEntry= {true}
            onChangeText={(text)=>
                {
                    this.setState({
                        password: text
                    })
                }}

            />
           <TouchableOpacity onPress={()=>{this.userlogin(this.state.emailId,this.state.password)}}>
               <Text>Login</Text>
               </TouchableOpacity>

              
            </View>
    )
}
}
const styles=StyleSheet.create({

})

