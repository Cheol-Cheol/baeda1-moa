import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { FontAwesome5 } from "@expo/vector-icons";
import { RoomsContext } from "../context/RoomsContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import ChatMessage from "../components/ChatMessage";
import DeleteRoomBtn from "../components/DeleteRoomBtn";
import LeaveRoomBtn from "../components/LeaveRoomBtn";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p|am\/pm)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      case "am/pm":
        return d.getHours() < 12 ? "AM" : "PM";
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};

String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const ChatContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const ChatInfo = styled.View`
  margin: 5px;
  border: 1px solid #4c80fa;
  border-radius: 20px;
  padding: 10px 25px;
  background-color: #d1dcf6;
`;

const Text = styled.Text``;

const OrderDate = styled.Text`
  color: tomato;
  font-weight: 700;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ChatMessageList = styled.FlatList`
  flex: 1;
  padding: 10px 20px 0px 20px;
`;

const Keyboard = styled.View`
  flex-direction: row;
  background-color: #ffffff;
`;

const TextInput = styled.TextInput`
  flex: 0.9;
  margin: 5px 0px 40px 8px;
  padding: 8px;
  border: 0.5px solid grey;
  border-radius: 10px;
  background-color: white;
`;

const SendBtn = styled.TouchableOpacity`
  flex: 0.1;
  justify-content: flex-start;
  align-items: center;
  padding-top: 9px;
`;

const ChatPage = ({
  navigation: { setOptions, goBack },
  route: { params },
}) => {
  const {
    leaveRoom,
    deleteRoom,
    chatMsgState,
    getChatMessage,
    initChatMessage,
  } = useContext(RoomsContext);
  const {
    authState: { userInfo, userToken },
  } = useContext(AuthContext);
  const chatData = params.params;

  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const size = 15;

  const formatDate = (original_date) => {
    const date = new Date(original_date);
    return date.format("a/p hh : mm");
  };

  const connect = async () => {
    client.current = new StompJs.Client({
      // brokerURL: "http://3.37.106.173/ws-stomp",
      webSocketFactory: () => new SockJS("http://3.37.106.173/ws-stomp"),
      connectHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        client.current.subscribe(`/sub/rooms/${chatData.roomId}`, (msg) => {
          var recv = JSON.parse(msg.body);
          setChatMessages((prevState) => [...prevState, recv]);
        });
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
    initChatMessage();
  };

  const sendMsg = () => {
    client.current.publish({
      destination: "/pub/messages",
      body: JSON.stringify({
        roomId: chatData.roomId,
        content: message,
        userId: userInfo.userId,
        nickName: userInfo.nickName,
      }),
      headers: { Authorization: userToken },
    });
    getChatMessage(params.params.roomId, size);
    setMessage("");
  };

  const onChangeHandler = (msg) => {
    setMessage(msg);
  };

  const leaveRoomGoToChatListPage = async (roomId) => {
    await leaveRoom(roomId);
    goBack();
  };

  const deleteRoomGoToChatListPage = async (roomId) => {
    await deleteRoom(roomId);
    goBack();
  };

  const timeout = () => {
    setTimeout(() => getChatMessage(params.params.roomId, size), 100);
  };

  useEffect(() => {
    if (chatData.master) {
      setOptions({
        title: params.params.title,
        headerRight: () => (
          <DeleteRoomBtn
            deleteRoomGoToChatListPage={deleteRoomGoToChatListPage}
            roomId={params.params.roomId}
          />
        ),
      });
    } else {
      setOptions({
        title: params.params.title,
        headerRight: () => (
          <LeaveRoomBtn
            leaveRoomGoToChatListPage={leaveRoomGoToChatListPage}
            roomId={params.params.roomId}
          />
        ),
      });
    }
  }, [
    chatData.master,
    params.params,
    deleteRoomGoToChatListPage,
    leaveRoomGoToChatListPage,
  ]);

  useEffect(() => {
    connect();
    getChatMessage(params.params.roomId, size);
    return () => {
      disconnect();
      timeout();
    };
  }, []);

  useEffect(() => {
    timeout();
  });

  return (
    <>
      <ChatContainer>
        <ChatInfo>
          <Text>방 제목: {chatData.title}</Text>
          <Text>상 호 명: {chatData.restaurantName}</Text>
          <OrderDate>주 문 시 간: {formatDate(chatData.orderDate)}</OrderDate>
        </ChatInfo>

        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={55}>
          <ChatMessageList
            data={chatMsgState}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <ChatMessage item={item} formatDate={formatDate} />
            )}
          />

          <Keyboard>
            <TextInput onChangeText={onChangeHandler} value={message} />
            <SendBtn onPress={sendMsg}>
              <FontAwesome5 name="arrow-circle-up" size={24} color="#4c80fa" />
            </SendBtn>
          </Keyboard>
        </KeyboardAvoidingView>
      </ChatContainer>
    </>
  );
};

export default ChatPage;
