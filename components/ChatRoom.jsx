import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import MasterIcon from "./UI/MasterIcon";

const ListContainer = styled.TouchableOpacity`
  padding: 15px 17px;
  border: 1px solid #eee;
  border-radius: 20px;
  margin: 5px 0px;
`;

const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const TimeView = styled.View`
  width: 65px;
`;

const Time = styled.Text``;

const DialogView = styled.View``;

const Dialog = styled.Text`
  color: grey;
`;

const ChatRoom = ({ fullData }) => {
  const navigation = useNavigation();

  const goToChatPage = () => {
    navigation.navigate("ChatPage", {
      params: { ...fullData },
    });
  };

  return (
    <ListContainer onPress={goToChatPage}>
      {fullData.master ? <MasterIcon /> : null}

      <RowView>
        <Title>{fullData.title}</Title>
        {/* <TimeView>
          <Time>{time}</Time>
        </TimeView> */}
      </RowView>
      <DialogView>
        {/* <Dialog>{dialog}</Dialog> */}
        <Dialog>안녕ㅋㅋ</Dialog>
      </DialogView>
    </ListContainer>
  );
};

export default ChatRoom;
