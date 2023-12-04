import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('transactions',[]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };
  const updateTransaction = (updatedTransaction) => {
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.map((transaction) => {
        if (transaction.id === updatedTransaction.id) {
          return updatedTransaction;
        }
        return transaction;
      });
      return updatedTransactions;
    });
  };
  const handleDelete = (id) => {
    const updatedList = transactions.filter((transact) => transact.id !== id);
    setTransactions(updatedList);
  };
  const getTotalAmount = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  useEffect(() => {
    // To do : add transactions to local storage here
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction,getTotalAmount,handleDelete }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  return useContext(TransactionContext);
};
