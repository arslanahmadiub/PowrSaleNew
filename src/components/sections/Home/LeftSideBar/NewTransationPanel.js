import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { PlusOutlined } from "@ant-design/icons";

const NewTransactionPanel = (props) => {
  const theme = React.useContext(ThemeContext);
  const history = useHistory();

  const style = {
    background: theme.primaryGreen,
    height: "40px",
    width: "40px",
    borderRadius: "10px",
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        background: theme.lightGrey,
        height: "50px",
        lineHeight: "50px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          lineHeight: "15px",
        }}
      >
        <div
          style={{
            color: theme.darkGrey,
            fontSize: "14px",
            overflow: "wrap",
            padding: 0,
            margin: " auto auto",
            height: "50px",
          }}
        >
          Create new transaction
        </div>

        <div
          style={{ position: "relative", width: "50px", bottom: "05px" }}
          onClick={() => history.push("/create-transaction")}
        >
          <Button
            style={style}
            icon={
              <PlusOutlined
                style={{ color: "#FFF", fontSize: "24px", fontWeight: 900 }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewTransactionPanel;
