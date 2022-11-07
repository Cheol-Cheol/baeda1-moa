import React, { useEffect, useState } from "react";
import { getUniqueId } from "react-native-device-info";
import { Text, View } from "react-native";

// Device ID
let userId = getUniqueId();

// TODO: 여기서는 왜 params.params로 데이터를 추출해야 하는지 파악해야 함
const ChatPage = ({ navigation: { setOptions }, route: { params } }) => {
  // 서버의 상태를 저장
  const [serverState, setServerState] = useState("loading...");
  // 인풋창에 입력되는 메세지의 상태를 저장
  const [messageText, setMessageText] = useState("");
  // 서버에서 받아온 메세지들의 상태를 저장
  const [serverMessages, setServerMessages] = useState([]);
  const serverMessagesList = [];

  useEffect(() => {
    setOptions({ title: params.params.title });
  }, []);
  // TODO: 서버와 연결 후, useEffect로 params를 통해 받은 정보를 가지고 API를 호출해서 채팅방 데이터를 가져온다.

  return;
};

export default ChatPage;
