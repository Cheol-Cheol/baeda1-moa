import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../context/AuthContextProvider";

// 📌 MyChat Style
const MyChatContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  align-self: flex-end;
`;

const MarginView = styled.View`
  margin: 5px;
`;

const CreatedAt = styled.Text`
  color: black;
  font-size: 11px;
  letter-spacing: -1.2px;
`;

const ChatMessageContainer = styled.View`
  min-width: 10%;
  max-width: 80%;
  font-size: 16px;
  border-radius: 10px;
  padding: 8px;
`;

const MyChatMessageContainer = styled(ChatMessageContainer)`
  background-color: #4c80fa;
  margin-vertical: 5px;
`;

const Text = styled.Text`
  color: ${({ color }) => (!color ? "black" : color)};
`;

// 📌 OtherChat Style
const OtherChatContainer = styled.View`
  align-self: flex-start;
  margin: 7px 7px;
`;

const MarginView2 = styled.View`
  margin-vertical: 2px;
`;

const NickName = styled.Text`
  font-size: 12px;
`;

const OtherChatMessageContainer = styled(ChatMessageContainer)`
  background-color: lightgrey;
`;

const RowView = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const ChatMessage = ({ item, formatDate }) => {
  const {
    authState: { userInfo },
  } = useContext(AuthContext);

  return item.userId !== userInfo.userId ? (
    <MyChatContainer>
      <MarginView>
        <CreatedAt>{formatDate(item.createdAt)}</CreatedAt>
      </MarginView>
      <MyChatMessageContainer>
        <Text color="white">{item.content}</Text>
      </MyChatMessageContainer>
    </MyChatContainer>
  ) : (
    <OtherChatContainer>
      <MarginView2>
        <NickName>{item.nickName}</NickName>
      </MarginView2>
      <RowView>
        <OtherChatMessageContainer>
          <Text>{item.content}</Text>
        </OtherChatMessageContainer>

        <MarginView>
          <CreatedAt>{formatDate(item.createdAt)}</CreatedAt>
        </MarginView>
      </RowView>
    </OtherChatContainer>
  );
};

export default ChatMessage;
