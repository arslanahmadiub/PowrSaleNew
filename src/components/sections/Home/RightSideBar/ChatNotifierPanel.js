import React from "react";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import Button from "../../../CustomComponents/Button";
import Styled from "styled-components";

const Container = Styled.div`
    border-radius: 10px;
    background: #E7EEFA;
    height: 50px;
    padding: 10px;
`;

const Flex = Styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    line-height: 50px;
`;

const ChatNotifierPanel = (props) => {
  return (
    <Container>
      <Flex>
        {/* <div>
          <Button secondary>
            <ChatBubbleOutline />
          </Button>
        </div> */}
        <div
          style={{
            fontSize: "12px",
            color: "#01010",
            float: "left",
            lineHeight: "12px",
            textAlign: "center",
          }}
        >
          Chat Now
        </div>
        <div
          style={{
            opacity: "0.2",
            fontSize: "18px",
            fontWeight: "100",
            lineHeight: "12px",
          }}
        >
          |
        </div>
        <div
          style={{
            color: "#979FAA",
            fontSize: "14px",
            overflowWrap: "normal",
            lineHeight: "12px",
            textAlign: "center",
          }}
        >
          11 new messages
        </div>
      </Flex>
    </Container>
  );
};

export default ChatNotifierPanel;
