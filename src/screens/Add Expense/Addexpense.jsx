import React from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const dummyData = [
  { id: "01", title: 'Food' },
  { id: "02", title: 'Loan' },
  { id: "03", title: 'Travel' },
  { id: "04", title: 'Studies' },
  { id: "05", title: 'Movie' },
  { id: "06", title: 'Party' },
];

const renderCategories = ({ item, index }) => {
  const backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#ffffff';
  const borderColor = index % 2 === 0 ? '#dddddd' : '#cccccc';

  return (
    <TouchableOpacity style={{
      margin: 5,
      backgroundColor,
      borderRadius: 10,
      borderWidth: 1,
      borderColor,
      padding: 10,
      flexDirection: 'row',
    }}>
      <Text style={{color: "black", fontSize: 17, flex: 1, justifyContent: 'space-evenly' }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const Addexpense = ({ navigation }) => {
  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <TextInput style={{ backgroundColor: "#fff", width: 100, marginTop: 10, fontSize: 20 }} placeholder='Amount' />
      </View>
      <Text style={{ color: "black", fontSize: 22, fontWeight: 'bold', padding: 5 }}>Categories</Text>
      <FlatList
        data={dummyData}
        renderItem={renderCategories}
        horizontal={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <View style={{ borderRadius: 6, borderWidth: 0.5, margin: 5 }}>
        <Button title='+ Category' color='grey' onPress={() => navigation.navigate('Categories')} />
      </View>
      <Text style={{ color: "black", fontSize: 22, fontWeight: 'bold', padding: 5 }}>Date</Text>
      <Text style={{ color: "black", fontSize: 22, fontWeight: 'bold', padding: 5 }}>Note</Text>
      <TextInput placeholder='Name of Expense' style={{ fontSize: 22, backgroundColor: "white", borderRadius: 6, borderWidth: 0.5, margin: 5 }} />
      <View style={{ borderRadius: 6, borderWidth: 0.5, margin: 5 }}>
        <TouchableOpacity>
          <Text style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "black", textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: "#FFF" }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Addexpense;
