import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import ChatRoom from "../components/ChatRoom";
import { RoomsContext } from "../context/RoomsContextProvider";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

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
  const [loading, setLoading] = useState(true);
  const { roomsState, getMyRooms, initRoom } = useContext(RoomsContext);

  useEffect(() => {
    setLoading(true);
    initRoom();
    getMyRooms();
    setLoading(false);
    return () => initRoom();
  }, []);

  return (
    <>
      {loading ? (
        <Loader>
          <ActivityIndicator></ActivityIndicator>
        </Loader>
      ) : (
        <Container>
          <FlatList
            data={roomsState}
            ItemSeparatorComponent={HSeparator}
            keyExtractor={(item) => item.roomId}
            renderItem={({ item }) => <ChatRoom fullData={item} />}
          />
        </Container>
      )}
    </>
  );
};

export default ChatListPage;
