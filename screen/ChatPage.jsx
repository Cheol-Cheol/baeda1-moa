import React, { useContext, useEffect } from "react";
import { Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { RoomsContext } from "../context/RoomsContextProvider";

const ChatPage = ({
  navigation: { setOptions, goBack },
  route: { params },
}) => {
  const { leaveRoom, deleteRoom } = useContext(RoomsContext);
  const chatData = params.params;
  // TODO: SockJS 코드 넣어야 함

  const leaveRoomGoToChatListPage = async (roomId) => {
    await leaveRoom(roomId);
    goBack();
  };
  // TODO: 이거 두 개 함수 묶을 것!
  const deleteRoomGoToChatListPage = async (roomId) => {
    await deleteRoom(roomId);
    goBack();
  };

  useEffect(() => {
    // FIXME: 여기서는 왜 params.params로 데이터를 추출해야 하는지 파악해야 함
    if (chatData.master) {
      setOptions({
        title: params.params.title,
        headerRight: () => (
          <>
            <TouchableOpacity style={{ marginRight: 5 }}>
              <Feather name="edit" size={22} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteRoomGoToChatListPage(params.params.roomId)}
            >
              <Feather name="log-out" size={22} color="black" />
            </TouchableOpacity>
          </>
        ),
      });
    } else {
      setOptions({
        title: params.params.title,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => leaveRoomGoToChatListPage(params.params.roomId)}
          >
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [
    chatData.isMaster,
    params.params,
    deleteRoomGoToChatListPage,
    leaveRoomGoToChatListPage,
  ]);

  return;
};

export default ChatPage;
