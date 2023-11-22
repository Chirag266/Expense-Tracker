import React from 'react'
import { Text,View,Image } from 'react-native';
const Fallback = () => {
  return (
    <View style={{alignItems:'center'}}>
        <Image source={require("../../assets/category.png")} 
        style={{height:300,margin:30}}>
        </Image>
            <Text>Add categories here..</Text>
    </View>
  )
}
export default Fallback;
