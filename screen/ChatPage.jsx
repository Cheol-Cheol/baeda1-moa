import React from "react";
import { Text, View } from "react-native";

// TODO: 여기서는 왜 params.params로 데이터를 추출해야 하는지 파악해야 함
const ChatPage = ({ route: { params } }) => {
  // TODO: 서버와 연결 후, useEffect로 params를 통해 받은 정보를 가지고 API를 호출해서 채팅방 데이터를 가져온다.
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      {/* <Text style={{ color: "red" }}>{params.title}</Text> */}
      <Text>{params.title}</Text>
    </View>
  );
};

export default ChatPage;
