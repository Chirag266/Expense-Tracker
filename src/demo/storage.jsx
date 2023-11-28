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