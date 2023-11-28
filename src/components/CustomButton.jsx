import React from 'react'
import { View ,Button, StyleSheet} from 'react-native';

const CustomButton = ({title,color,onPress}) => {
  return (
    <View style={styles.input}>
    <Button title={title} color={color} onPress={onPress} />
    </View>
  )
}
const styles=StyleSheet.create({
  input:{
    borderRadius: 6, borderWidth: 0.5, marginLeft:12,marginRight:12
  }
})
export default CustomButton;
