import React, { useContext } from "react";
import styled from "styled-components/native";
import ChatRoom from "../components/ChatRoom";
import { RoomsContext } from "../context/RoomsContextProvider";

const Container = styled.View`
  flex: 1;
  padding: 0px 15px;
  padding-top: 10px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const FlatList = styled.FlatList``;

const HSeparator = styled.View`
  height: 5px;
`;

const ChatListPage = () => {
  const { chatRoomsState } = useContext(RoomsContext);
  return (
    <Container>
      <FlatList
        data={chatRoomsState}
        ItemSeparatorComponent={HSeparator}
        keyExtractor={(item) => item.roomId}
        renderItem={({ item }) => <ChatRoom fullData={item} />}
      />
    </Container>
  );
};

export default ChatListPage;
