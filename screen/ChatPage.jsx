import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RoomsContext } from "../context/RoomsContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

// chatData: {"master": false, "orderDate": "2022-11-11T00:11:20", "restaurantName": "좐", "roomId": 29, "title": "좌니방", "userCount": 2}
// userInfo: {"image": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg", "nickName": "황철원2", "userId": 3}

const ChatPage = ({
  navigation: { setOptions, goBack },
  route: { params },
}) => {
  const { leaveRoom, deleteRoom } = useContext(RoomsContext);
  const {
    authState: { userInfo, userToken },
  } = useContext(AuthContext);
  const chatData = params.params;

  const client = useRef({});
  // TODO: chatMessages로 상태관리중인데, 비효율적이니 useQuery를 적용하자.
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

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
      reconnectDelay: 5000, //자동 재 연결
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
    setMessage("");
  };

  const onChangeHandler = (msg) => {
    setMessage(msg);
  };

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

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <Text>방 제목: {chatData.title}</Text>
          <Text>상 호 명: {chatData.restaurantName}</Text>
          <Text>주 문 시 간: {chatData.orderDate}</Text>
        </View>
        <View style={{ height: 4, backgroundColor: "red" }}></View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={55}
        >
          <FlatList
            data={chatMessages}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
              item.userId === userInfo.userId ? (
                <View>
                  <Text style={{ color: "red" }}>{item.content}</Text>
                </View>
              ) : (
                <View>
                  <Text style={{ color: "black" }}>{item.content}</Text>
                </View>
              )
            }
          />
          {/* <FlatList
            data={roomsState}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ItemSeparatorComponent={HSeparator}
            keyExtractor={(item) => item.roomId}
            renderItem={({ item }) => <List fullData={item} />}
          /> */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#eee",
            }}
          >
            <TextInput
              onChangeText={onChangeHandler}
              value={message}
              style={{
                flex: 0.9,
                marginTop: 5,
                marginLeft: 8,
                padding: 8,
                borderColor: "grey",
                backgroundColor: "white",
                borderWidth: 0.5,
                borderRadius: 10,
                marginBottom: 40,
              }}
            />
            <TouchableOpacity
              onPress={sendMsg}
              style={{
                flex: 0.1,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 9,
              }}
            >
              <FontAwesome5 name="arrow-circle-up" size={24} color="#3772ff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ChatPage;
