import React ,{useState,useEffect}from 'react'
import { Text, View ,Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from 'react-native-screens';
import { StyleSheet } from 'react-native';
import { useTransaction } from '../../context/TransactionContext';
import { FlatList } from 'react-native';
enableScreens(true);
const Stack = createNativeStackNavigator();

const Homepage = () => {
  const { transactions, getTotalAmount } = useTransaction();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [transactions]);

  const navigation = useNavigation();

 
  return (
    <View style={{ flex: 1 }}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Total Amount:Rs:{totalAmount}</Text>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.name}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.date.toDateString()}</Text>
            {/* Category Add baki */}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Addexpense')}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    borderColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 50,
    fontSize: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginBottom: 40,
  },
  transactionItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
  },
});

export default Homepage;