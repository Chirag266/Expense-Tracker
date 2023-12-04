import React, { useState ,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, TouchableOpacity, FlatList ,Image} from 'react-native';
import Fallback from '../../components/Fallback';
import useLocalStorage from '../../utils/useLocalStorage';

const Categories = ({route}) => {
  const { onCategoryAdded, onCategoryUpdated,onCategoryDeleted } = route.params || {};
  const [addCat, setAddcat] = useState('');
  const [edited, setEdit] = useState(null);
  
  // Load data from AsyncStorage when the component mounts
  const [List, setList] = useLocalStorage('categories', []);
  

  //To add the categories.
  const handleAdd = () => {
    if (addCat === '') {
      alert('Add a category');
      return;
    }
    const newCategory = { id: Date.now().toString(), title: addCat };
    setList([...List, newCategory]);
    setAddcat('');
    if (onCategoryAdded) {
      onCategoryAdded(newCategory);
    }
  };


  //To delete the items
  const handleDelete = (id) => {
    const updatedList = List.filter((cat) => cat.id !== id);
    setList(updatedList);
    if (onCategoryDeleted) {
      onCategoryDeleted(id);
    }
  };

  //Handling Edit feature.
  const handleEdit = (cat) => {
    setEdit(cat);
    setAddcat(cat.title);
  };

  //having update feature
  const handleUpdated = () => {
    const updatedCat = List.map((item) => {
      if (item.id === edited.id) {
        const updatedCategory = { ...item, title: addCat };
        if (onCategoryUpdated) {
          onCategoryUpdated(updatedCategory);
        }
        return updatedCategory;
      }
      return item;
    });
    setList(updatedCat);
    setEdit(null);
    setAddcat('');
  };

  // const renderCategories = ({ item, index }) => {
  //   return (
  //     <View
  //       style={{
  //         margin: 3,
  //         backgroundColor: 'blue',
  //         borderRadius: 6,
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //       }}
  //     >
  //       <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, flex: 1 }}>
  //         {item.title}{' '}
  //       </Text>
  //       <IconButton icon="pencil" iconColor="white" onPress={() => handleEdit(item)} />
  //       <IconButton icon="trash-can" iconColor="white" onPress={() => handleDelete(item.id)} />
  //     </View>
  //   );
  // };
  const renderCategories = ({ item, index }) => {
    return (
      <View
        style={{
          marginTop: 4,
          backgroundColor: '#2E8B57',
          borderRadius: 6,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {edited && edited.id === item.id ? (
          <TextInput
            value={addCat}
            onChangeText={(text) => setAddcat(text)}
            onBlur={() => handleUpdated()}
            autoFocus
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              flex: 1,
              padding: 10,
            }}
          />
        ) : (
          <>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, flex: 1 ,margin: 10}}>
              {item.title}{' '}
            </Text>
            <TouchableOpacity style={{height:45,justifyContent:'center'}} onPress={() => handleEdit(item)}>
            <Image source={require("../../../assets/edit.png")}>
           </Image>
           </TouchableOpacity>
           <TouchableOpacity style={{height:45,justifyContent:'center', marginLeft:12}} onPress={() => handleDelete(item.id)}>
            <Image source={require("../../../assets/delete.png")}>
           </Image>
           </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  

  return (
    <View style={{ marginHorizontal: 16 }}>
      <SafeAreaView>
        <TextInput
          placeholder="Add Category"
          value={addCat}
          onChangeText={(text) => setAddcat(text)}
          style={{
            borderColor: 'black',
            borderWidth: 2,
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 16,
            fontSize: 20,
          }}
        />
      </SafeAreaView>
      {edited ? (
        <TouchableOpacity
          onPress={() => handleUpdated()}
          style={{
            backgroundColor: '#2E8B57',
            borderRadius: 6,
            paddingVertical: 12,
            marginTop: 15,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleAdd()}
          style={{
            backgroundColor: '#2E8B57',
            borderRadius: 6,
            paddingVertical: 12,
            marginTop: 15,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add</Text>
        </TouchableOpacity>
      )}
      <FlatList data={List} renderItem={renderCategories} />
      {List.length <= 0 && <Fallback />}
    </View>
  );
};

export default Categories;
