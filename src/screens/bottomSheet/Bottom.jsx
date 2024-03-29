import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import useLocalStorage from '../../utils/useLocalStorage';
import CustomButton from '../../components/CustomButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Categories from '../Categories/Categories';
const Sheet = React.forwardRef(({children, handleCategoryAdded, handleCategoryUpdated, handleCategoryDeleted}, bottomSheetModalRef) => {
  // const [List, setList] = useLocalStorage('categories', []);

  // variables
  const snapPoints = useMemo(() => ['40%','60%', '80%'], []);


  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  // const handleCategoryAdded = (category) => {
  //   setList([...List, category]);
  // };

  // const handleCategoryUpdated = (updatedCategory) => {
  //   const updatedList = List.map((category) =>
  //     category.id === updatedCategory.id ? updatedCategory : category
  //   );
  //   setList(updatedList);
  // };
  // const handleCategoryDeleted = (deletedCategoryId) => {
  //   const updatedList = List.filter((category) => category.id !== deletedCategoryId);
  //   setList(updatedList);
  // };
  // renders
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={false}
           
        >
          <View style={styles.contentContainer}>
            <Categories route={{
              params: {
                onCategoryAdded: handleCategoryAdded,
                onCategoryUpdated: handleCategoryUpdated,
                onCategoryDeleted:handleCategoryDeleted,
                isBottomSheet: true
              }
            }} />
          </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
});

export default Sheet;