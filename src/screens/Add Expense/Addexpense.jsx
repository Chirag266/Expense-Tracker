import React, { useState ,useEffect} from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, StyleSheet, Platform, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useLocalStorage from '../../utils/useLocalStorage';
import CustomButton from '../../components/CustomButton';
import { useTransaction } from '../../context/TransactionContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Addexpense = ({ route }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [List, setList] = useLocalStorage('categories', []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imgUrl, setimgUrl] = useState("https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=");
  const [note, setNote] = useState('');
  const { addTransaction, updateTransaction } = useTransaction();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const navigation = useNavigation();

  const onChangeDate = (event, selected) => {
    const currentDate = selected || selectedDate;
    console.log(typeof(selectedDate));
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };
  
  // const [List, setList] = useState([]);

  const handleCategoryAdded = (category) => {
    setList([...List, category]);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    const updatedList = List.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setList(updatedList);
  };
  const handleCategoryDeleted = (deletedCategoryId) => {
    const updatedList = List.filter((category) => category.id !== deletedCategoryId);
    setList(updatedList);
  };

  const setCategory=()=>{
    console.log("cate")
  }

  const openCameraLib=async()=>{
    console.log("Press")
    const result=await launchCamera();
    setimgUrl(result?.assets[0]?.uri);
    console.log("result",result);
  }
  const openLibrary=async()=>{
    console.log("Press")
    const result=await launchImageLibrary();
    setimgUrl(result?.assets[0]?.uri);
    console.log("result",result);
  }
  const transaction = route.params?.transaction;

  useEffect(() => {
    if (transaction) {
      setName(transaction.name);
      setAmount(transaction.amount.toString());
      setSelectedDate(new Date(transaction.date));
      setNote(transaction.note);
      setimgUrl(transaction.imgUrl);
      // Category is left to add
    }
  }, [transaction]);

  const saveTransaction = () => {
    if(name==='') {
      alert("enter the name")
      return;
    }
    if(amount===''){
      alert("enter the amonut");
      return;
    }
   const newTransaction = {
      id: transaction ? transaction.id : Date.now().toString(),
      name,
      amount: parseFloat(amount),
      date: selectedDate,
      imgUrl,
      note,
      // Add other fields as needed
    };
    if (transaction) {
      updateTransaction(newTransaction);
    } else{
      addTransaction(newTransaction);
    }

    navigation.goBack();
  };
  const renderCategories = ({ item, index ,onPress}) => {

    return (
      <TouchableOpacity onPress={setCategory} style={{
        margin: 5,
        backgroundColor:"#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor:"blue",
        padding: 10,
        flexDirection: 'row',
      }}>
        <Text style={{color: "black", fontWeight:'bold', fontSize: 17, flex: 1, justifyContent: 'space-evenly' }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const storedList = await AsyncStorage.getItem('categories');
  //       if (storedList) {
  //         setList(JSON.parse(storedList));
  //       }
  //     } catch (error) {
  //       console.error('Error loading data from AsyncStorage:', error);
  //     }
  //   };

  //   loadData();
  // }, []);

  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       await AsyncStorage.setItem('categories', JSON.stringify(List));
  //     } catch (error) {
  //       console.error('Error saving data to AsyncStorage:', error);
  //     }
  //   };

  //   saveData();
  // }, [List]);
  console.log(selectedDate);
  return (
    <ScrollView>
    <View>
      <Text style={styles.text}>Name</Text>
      <TextInput placeholder='Name of Expense' value={name} onChangeText={(text)=>setName(text)} style={ styles.input } />
        <TextInput style={styles.input} value={amount} onChangeText={(text)=>setAmount(text)} keyboardType='numeric' placeholder='Enter Amount:' />
      <Text style={styles.text}>Categories</Text>
      <FlatList
        data={List}
        onPress={selectedCategory}
        renderItem={renderCategories}
        horizontal={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <CustomButton title='+ Category' color='grey' onPress={() =>
            navigation.navigate('Categories', {
              onCategoryAdded: handleCategoryAdded,
              onCategoryUpdated: handleCategoryUpdated,
              onCategoryDeleted:handleCategoryDeleted
            })
          }  />
      <Text style={styles.text}>Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.input}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {/* <Text style={styles.text}>Picture(Optional):</Text> */}
      <Text style={styles.text}>Camera</Text>
      <View>
        <Image resizeMode='contain' style={styles.img} source={{uri:imgUrl}}></Image>
      <TouchableOpacity style={styles.btnCam} onPress={openCameraLib}>
        <Text style={styles.textBtn}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCam} onPress={openLibrary}>
        <Text style={styles.textBtn}>Open Gallery</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.text}>Note</Text>
      <TextInput value={note} placeholder='Note(Optional)'onChangeText={(text)=>setNote(text)} style={styles.input} />
        <TouchableOpacity onPress={saveTransaction} style={{margin:20,borderRadius:16,backgroundColor:"black",paddingVertical:7,marginBottom:90}}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#FFF"}}>
            Save
          </Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  input:{
    fontSize: 22, backgroundColor: "white", borderRadius: 6, borderWidth: 0.5, margin:12
  },  
  text:{
    color: "black", fontSize: 22, fontWeight:'bold', margin:5
  },
  img:{
    width:'50%',
    height:150,
    alignSelf:'center'
  },
  btnCam:{
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    width:100,
    height:40,
    borderRadius:6,
    backgroundColor:'green',
    margin:2
  },
  textBtn:{
    color:'#fff'
  }
})
export default Addexpense;