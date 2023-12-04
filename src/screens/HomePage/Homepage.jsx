import React ,{useState,useEffect}from 'react'
import { Text, View ,Button, TouchableOpacity,StyleSheet,FlatList ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from 'react-native-screens';
import { useTransaction } from '../../context/TransactionContext';

enableScreens(true);
const Stack = createNativeStackNavigator();

const Homepage = () => {
  const { transactions, getTotalAmount ,handleDelete} = useTransaction();
  console.log(transactions);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [transactions]);

  const navigation = useNavigation();

  const handleExpenseEdit = (transaction) => {
    console.log(transaction);
    navigation.navigate('Addexpense', { transaction });
  };

  const months = ['All','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const filteredData = transactions.filter((transaction) => {
      if (currentMonthIndex === 0) {
        // Sare transactions dekhne k liye "All" option
        return true;
      }
      const transactionMonth = new Date(transaction.date).getMonth();
      return transactionMonth === currentMonthIndex-1;
    });
    const totalAmountForMonth = filteredData.reduce((total, transaction) => total + transaction.amount, 0);
    
    setTotalAmount(totalAmountForMonth);
    setFilteredTransactions(filteredData);
  }, [currentMonthIndex, transactions]);

  const navigateToMonth = (step) => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + step + 13) % 13);
  };
 
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{backgroundColor:'blue',borderRadius:10,
        height: 30,flexDirection:'row',width:65,alignSelf:'flex-end',justifyContent:'center',margin:6}}>
          <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:14}}>Sign Out</Text>
        </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigateToMonth(-1)}>
          <Text style={{fontWeight:'bold',fontSize:22}}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{months[currentMonthIndex]}</Text>
        <TouchableOpacity onPress={() => navigateToMonth(1)}>
          <Text style={{fontWeight:'bold',fontSize:22}}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',
    justifyContent:'space-between',padding:10}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Total Amount:</Text>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Rs:{totalAmount}</Text>
      </View>
      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> handleExpenseEdit(item)}>
          <View style={styles.transactionItem}>
            <View>
            <Text style={{fontWeight:'bold',fontSize:14}}>{item.name}</Text>
            <Text style={{fontWeight:'bold',fontSize:14}}>{new Date(item.date).toDateString()}</Text>
            {/* Category Add baki */}
            </View>
            <View>
            <Text style={{fontWeight:'bold',fontSize:14}}>{item.amount}</Text>
            {/* <Text>{item.date.toDateString()}</Text> */}
            <TouchableOpacity style={{height:45,justifyContent:'center', marginLeft:12}} onPress={() => handleDelete(item.id)}>
            <Image source={require("../../../assets/delete.png")}>
           </Image>
           </TouchableOpacity>
            </View>
          </View>
          </TouchableOpacity>
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
    marginRight: 25,
    marginBottom: 100,
  },
  transactionItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
});

export default Homepage;