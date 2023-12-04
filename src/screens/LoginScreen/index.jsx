import React, { useState } from 'react';
import {Text,Button,Image,View,StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';
const LoginPage = ({ navigation }) => {

  return (
    <View>
      <View style={{alignItems:'center'}}>
        <Image source={require("../../../assets/6.png")} 
        style={{height:450,width:450}}>
        </Image>
        </View>
    <View style={{}}>
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom:20  }}>Expense Tracker</Text>
        <CustomButton title="Login" color={'#2E8B57'} onPress={() => navigation.navigate('Home')}/>
        <View style={{marginTop:20}}>
        <CustomButton title="SignUp with Google" color={'#2E8B57'}  />
        </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
})

export default LoginPage;
