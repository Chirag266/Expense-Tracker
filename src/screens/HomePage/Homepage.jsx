import React from 'react'
import { Text, View ,Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from 'react-native-screens';
import { StyleSheet } from 'react-native';
enableScreens(true);
const Stack = createNativeStackNavigator();

const Homepage = ({navigation}) => {
  return (
    <View>
      <Text>THis is homepage</Text>
      <View style={styles.input}>
      <TouchableOpacity onPress={() => navigation.navigate('Addexpense')} >
        <Text style={{fontSize:20,fontWeight:'bold'}}> + </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    borderColor: 'blue',width:50, borderWidth: 2, borderRadius:50, marginBottom: 20,
    fontSize:20,paddingVertical:20,backgroundColor:"blue",marginLeft:300,marginTop:650,
    alignItems:'center'
  }
})
export default Homepage;