// // CategoryContext.js
// import React, { createContext, useState, useContext } from 'react';

// const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);

//   const addCategory = (category) => {
//     setCategories((prevCategories) => [...prevCategories, category]);
//   };

//   const editCategory = (editedCategory) => {
//     setCategories((prevCategories) =>
//       prevCategories.map((category) =>
//         category.id === editedCategory.id ? editedCategory : category
//       )
//     );
//   };

//   const deleteCategory = (categoryId) => {
//     setCategories((prevCategories) =>
//       prevCategories.filter((category) => category.id !== categoryId)
//     );
//   };

//   return (
//     <CategoryContext.Provider value={{ categories, addCategory, editCategory, deleteCategory }}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

// export const useCategoryContext = () => {
//   const context = useContext(CategoryContext);
//   if (!context) {
//     throw new Error('useCategoryContext must be used within a CategoryProvider');
//   }
//   return context;
// };


 {/* <ScrollView>
        {List.map((item)=> 
          renderCategories(item)
        )}
        </ScrollView> */}