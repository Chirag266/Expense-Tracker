import { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocalStorage = (key, initialState) => {
  useEffect(() => {
    console.log("LoadDataCalled")
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData) {
          setState(JSON.parse(storedData));
        }
      } catch (error) {
        console.error(`Error loading data from AsyncStorage (${key}):`, error);
      }
    };
    loadData();
  }, [key]);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log("SaveDataCalled")
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Error saving data to AsyncStorage (${key}):`, error);
      }
    };
   
    saveData();
  }, [key, state]);

  return [state, setState];
  
};
export default useLocalStorage;

// import { useEffect,useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function getStoredData(key,initialValue){
//   const saveData=JSON.parse(AsyncStorage.getItem(key))
//   if(saveData) return saveData;

//   if(initialValue instanceof Function )return initialValue()
//   return initialValue
// }
// export default function __useLocalStorage(key,initialValue){
//   const[value,setValue]=useState(()=>{

//     return getStoredData[key,initialValue];
//   })
//   useEffect(()=>{
//     AsyncStorage.setItem(key,JSON.stringify(value))
//   },[value]);
//   return [value,setValue];
// }