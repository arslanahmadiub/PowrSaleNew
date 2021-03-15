import React, { useState, useEffect } from "react";
import { transactions as transactionsData } from "../DummyData/DummyData";
import { getProgressTransistion } from "../services/transistionServices";
import moment from "moment";

export const TransactionsContext = React.createContext();

export default function TransactionsContextProvider(props) {
  const [transactions, setTransactions] = React.useState([]);
  let userToken = localStorage.getItem("token");

  function updateTransactionStatus(transaction, status) {
    let newTransactionsList = transactions;
    newTransactionsList[
      newTransactionsList
        .map((item, index) => [index, item])
        .filter((item) => item[1].id === transaction.id)[0][0]
    ] = { ...transaction, status };
    setTransactions(newTransactionsList);
    return true;
  }
  function deleteTransaction(transactionId) {
    // make the api call to delete Transaction
    // then update the local
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        updateTransactionStatus,
        deleteTransaction,
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}
