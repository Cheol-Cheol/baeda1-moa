import React, { useState } from "react";
import styled from "styled-components/native";
import ChatRoom from "../components/ChatRoom";

const DUMMY_DATA = [
  {
    roomId: "1",
    admin: "1de1dxz01011",
    title: "밥 먹자 애들아!",
    dialog: "지금 시키죠ㅋㅋ",
    time: "오후 8:12",
  },
  {
    roomId: "2",
    admin: "1de1dxz01012",
    title: "족발 땡긴다!",
    dialog: "2인분 더 시켜도 될까요?",
    time: "오후 10:30",
  },
  {
    roomId: "3",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    dialog: "돈 개많이 아꼈네~",
    time: "오후 3:00",
  },
];

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
  return (
    <Container>
      <FlatList
        data={DUMMY_DATA}
        ItemSeparatorComponent={HSeparator}
        keyExtractor={(item) => item.roomId}
        renderItem={({ item }) => <ChatRoom fullData={item} />}
      />
    </Container>
  );
};

export default ChatListPage;
