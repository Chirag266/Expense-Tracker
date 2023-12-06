import React, { useState ,useEffect, useRef, useCallback} from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity,KeyboardAvoidingView, StyleSheet, Platform, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useLocalStorage from '../../utils/useLocalStorage';
import CustomButton from '../../components/CustomButton';
import { useTransaction } from '../../context/TransactionContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sheet from '../bottomSheet/Bottom';
const Addexpense = ({ route }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [List, setList] = useLocalStorage('categories', []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imgUrl, setimgUrl] = useState(null);
  const [note, setNote] = useState('');
  const { addTransaction, updateTransaction } = useTransaction();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null)

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

  const setCategory = (item) => {
    setSelectedCategory(item.title);
    console.log('Selected category:',item.title);
  };

  const openCameraLib=async()=>{
    console.log("Press")
    const result=await launchCamera({includeBase64:true});
    setimgUrl(result?.assets[0]?.base64);
    console.log("result",result);
  }
  const openLibrary=async()=>{
    console.log("Press")
    const result=await launchImageLibrary({includeBase64:true});
    setimgUrl(result?.assets[0]?.base64);
    console.log("result",result);
  }
  const encodedBase64 = imgUrl;
  const transaction = route.params?.transaction;

  useEffect(() => {
    if (transaction) {
      setName(transaction.name);
      setAmount(transaction.amount.toString());
      setSelectedCategory(transaction.selectedCategory)
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
    if(selectedCategory===null){
      alert("enter the category");
      return;
    }
   const newTransaction = {
      id: transaction ? transaction.id : Date.now().toString(),
      name,
      amount: parseFloat(amount),
      selectedCategory,
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
      <TouchableOpacity
        onPress={() => setCategory(item)}
        style={{
          margin: 5,
          backgroundColor: selectedCategory === item.title ? 'green' : '#fff',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'green',
          padding: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={{ color: selectedCategory === item.title ? 'white' : 'black', fontWeight: 'bold', fontSize: 17, flex: 1, justifyContent: 'space-evenly' }}>
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

  console.log(List);
  
    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

  return (
    <Sheet ref={bottomSheetModalRef} handleCategoryAdded={handleCategoryAdded} handleCategoryUpdated={handleCategoryUpdated} handleCategoryDeleted={handleCategoryDeleted} >
    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={{ flex: 1 }}>
      <Text style={styles.text}>Name</Text>
      <TextInput placeholder='Name of Expense' value={name} onChangeText={(text)=>setName(text)} style={ styles.input } />
        <TextInput style={styles.input} value={amount} onChangeText={(text)=>setAmount(text)} keyboardType='numeric' placeholder='Enter Amount:' />
      <Text style={styles.text}>Categories</Text>
      <FlatList
        data={List}
        renderItem={renderCategories}
        horizontal={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      />
      <CustomButton title='+ Category' color='grey' onPress={
            handlePresentModalPress
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
        
        {imgUrl ? <Image resizeMode='contain' style={styles.img} source={{uri: `data:image/png;base64,${encodedBase64}`}} /> : null}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
    </Sheet>
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
    width:250,
    height:200,
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