import React ,{useState,useEffect}from 'react'
import { Text, View ,Button, TouchableOpacity,StyleSheet,FlatList ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { enableScreens } from 'react-native-screens';
import { useTransaction } from '../../context/TransactionContext';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

enableScreens(true);
const Stack = createNativeStackNavigator();

const Homepage = ({ route }) => {
  const { transactions, getTotalAmount ,handleDelete} = useTransaction();
  console.log(transactions);
  const [totalAmount, setTotalAmount] = useState(0);
  const { userInfo } = route.params;

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
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const filteredData = transactions.filter((transaction) => {
      if (currentMonthIndex === 0 && currentYear === 'All') {
        // Sare transactions dekhne k liye "All" option
        return true;
      }
      const transactionMonth = new Date(transaction.date).getMonth();
      const transactionYear = new Date(transaction.date).getFullYear();
      return (
        (currentMonthIndex === 0 || transactionMonth === currentMonthIndex - 1) &&
        (currentYear === 'All' || transactionYear === currentYear)
      );
    });
    const totalAmountForMonth = filteredData.reduce((total, transaction) => total + transaction.amount, 0);
    
    setTotalAmount(totalAmountForMonth);
    setFilteredTransactions(filteredData);
  }, [currentMonthIndex,currentYear, transactions]);

  const navigateToMonth = (step) => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + step + 13) % 13);
  };
  const navigateToYear = (step) => {
    setCurrentYear((prevYear) => (prevYear === 'All' ? 'All' : prevYear + step));
  };
  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      await GoogleSignin.signOut();
      // setuserInfo(null);
      navigation.navigate("Login");

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1,paddingBottom:100}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{margin:10,fontSize:16}}>{userInfo.name}</Text>
      <TouchableOpacity  onPress={() =>{signOut()}} style={{backgroundColor:'#2E8B57',borderRadius:10,
        height: 30,flexDirection:'row',width:75,justifyContent:'center',margin:6}}>
          <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:16,color:"white"}}>Sign Out</Text>
        </TouchableOpacity>
        </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => navigateToMonth(-1)}>
          <Text style={{fontWeight:'bold',fontSize:22,marginLeft: 12}}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{months[currentMonthIndex]}</Text>
        <TouchableOpacity onPress={() => navigateToMonth(1)}>
          <Text style={{fontWeight:'bold',fontSize:22}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToYear(-1)}>
          <Text style={{ fontWeight: 'bold', fontSize: 22}}>{'<<'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentYear}</Text>
        <TouchableOpacity onPress={() => navigateToYear(1)}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 12 }}>{'>>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',
    justifyContent:'space-between',padding:10}}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Total Amount:</Text>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Rs:{totalAmount}</Text>
      </View>
      <FlatList style={{flex:1}}
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> handleExpenseEdit(item)}>
          <View style={styles.transactionItem}>
            <View>
            <Text style={{fontWeight:'bold',fontSize:15}}>{item.name}</Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>{item.selectedCategory}</Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>{new Date(item.date).toDateString()}</Text>
            {/* Category Add baki */}
            </View>
            <View style={{ alignItems: 'center' }}>
            <Text style={{fontWeight:'bold',fontSize:14}}>{item.amount}</Text>
            {/* <Text>{item.date.toDateString()}</Text> */}
            <TouchableOpacity style={{height:40,justifyContent:'center',paddingTop:2}} onPress={() => handleDelete(item.id)}>
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
        <Text style={{ fontSize: 40,color:"#fff", lineHeight: 50 }}>+</Text>
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
    backgroundColor: '#2E8B57',
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
    borderColor: '#2E8B57',
    borderRadius: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
});

export default Homepage;