import React, { useCallback, useRef, useMemo ,useState ,useEffect} from "react";
import { StyleSheet, View, Text, Button ,TextInput, TouchableOpacity ,Image,FlatList} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { SafeAreaView } from 'react-native-safe-area-context';
import Fallback from '../../components/Fallback';
import useLocalStorage from '../../utils/useLocalStorage';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Sbottom = ({route}) => {
  // hooks
  const sheetRef = useRef(null);

  // variables
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
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderCategories = ({ item, index }) => {
    return (
      <View
        style={styles.itemContainer}
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
    
    <View style={styles.container}>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
      <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
    <SafeAreaView style={{flex:1}}> 
     
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
      <FlatList
          data={List}
          renderItem={renderCategories}
          contentContainerStyle={styles.contentContainer}
        />
      {List.length <= 0 && <Fallback />}
    
    </SafeAreaView> 
       
    </BottomSheet>
    </GestureHandlerRootView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    height:'100%'
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
        marginTop: 4,
        backgroundColor: '#2E8B57',
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
      
  },
});

export default Sbottom; 