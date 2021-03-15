import React from "react";
import { creditCards, walletBalance } from "../DummyData/DummyData";

export const WalletContext = React.createContext();

export default function WalletContextProvider(props) {
  const [cards, setCards] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [currency, setCurrency] = React.useState("");

  const addNewCard = function (card) {
    /**
     * If needed, you can perform verificaions.
     * then send the data to the backend.
     * When done, updates wallets as follows:
     */

    setCards({ ...cards, card });
  };

  const updateBalance = function (source, amount, type) {
    if (balance === null) return;
    /**
     * source is either 'escrow' or 'main'
     * amount is the amount involved
     * type is either 'debit' or 'credit'
     */

    /**
     * Now make the necessary calls to your backend
     * then when successful make the change locally too
     */

    if (source === "escrow") {
      // update the escrow balence

      const newBalance =
        balance.escrow + type === "debit" ? -Number(amount) : Number(amount);

      setBalance({ ...balance, escrow: newBalance });
    } else if (source === "main") {
      // update the main balence
      const newBalance =
        balance.main + type === "debit" ? -Number(amount) : Number(amount);

      setBalance({ ...balance, main: newBalance });
    }

    return true;
  };

  React.useEffect(() => {
    /**
     * Make api call to pull all wallets
     * then set it below as follows
     */
    setCards(creditCards);
  }, []);

  React.useEffect(() => {
    /**
     * Make api call to pull balace
     * then set it below as follows
     */
    setBalance(walletBalance);
    setCurrency(walletBalance.currency);
  }, []);

  function checkOut(data) {
    /**
     * Data object will contain the ...
     * amount, currrency, and userobject
     * at the end update the balance
     */
    updateBalance("main", data.amount, "debit");
  }

  return (
    <WalletContext.Provider
      value={{ currency, cards, addNewCard, balance, updateBalance, checkOut }}
    >
      {props.children}
    </WalletContext.Provider>
  );
}
