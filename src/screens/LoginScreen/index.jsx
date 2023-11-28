import React, { useState } from 'react';
import {Text,Button,View,StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';
const LoginPage = ({ navigation }) => {

  return (
    <View style={{marginTop:300}}>
      <Text style={{ margin: 30, fontSize: 30, textAlign: 'center' }}>Expense Tracker</Text>
        <CustomButton title="Login" color={'red'} onPress={() => navigation.navigate('Home')}/>
        <CustomButton title="SignUp with Google" color={'red'}  />
    </View>
  )
}
const styles = StyleSheet.create({
})

export default LoginPage;
