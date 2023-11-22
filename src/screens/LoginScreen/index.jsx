import React, { useState } from 'react';
import {
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
const LoginPage = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [display, setdisplay] = useState(false);
  const resetdetails=()=>{
    setdisplay(false);
    setemail('');
    setpassword('');
  }
  return (
    <View style={{marginTop:300}}>
      <Text style={{ margin: 30, fontSize: 30, textAlign: 'center' }}>Expense Tracker</Text>
      <TextInput placeholder='Email'
        style={styles.input}
        value={email}
        onChangeText={(text) => setemail(text)} />
      <TextInput placeholder='Password'
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setpassword(text)} />
        <View style={{marginBottom:20}}>
        <Button color={'red'} title='Login' onPress={() => navigation.navigate('Home')} />
        </View>
       <Button color={'red'} title='Sign-Up' onPress={resetdetails} />
       <View style={{marginTop:20}}><Button color={'red'} title='SignUp with google' /></View>
        <View>
        {
          display ?
          <View>
            <Text style={{fontSize:20}}>{email}</Text>
            <Text style={{fontSize:20}}>{password}</Text>
          </View> :
          null
        }
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    borderColor: 'blue', borderWidth: 2, borderRadius:20, marginBottom: 20,
    fontSize:20
  }
})

export default LoginPage;
