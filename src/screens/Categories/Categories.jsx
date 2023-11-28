import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useState } from 'react';
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

  const renderCategories = ({ item, index }) => {
    return (
      <View
        style={{
          margin: 3,
          backgroundColor: 'blue',
          borderRadius: 6,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, flex: 1 }}>
          {item.title}{' '}
        </Text>
        <IconButton icon="pencil" iconColor="white" onPress={() => handleEdit(item)} />
        <IconButton icon="trash-can" iconColor="white" onPress={() => handleDelete(item.id)} />
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
            backgroundColor: 'black',
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
            backgroundColor: 'black',
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
