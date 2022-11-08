import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

const ListContainer = styled.TouchableOpacity`
  padding: 15px 17px;
  border: 1px solid #eee;
  border-radius: 20px;
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

const ChatRoom = ({ fullData, fullData: { title, time, dialog } }) => {
  const navigation = useNavigation();

  const goToChatPage = () => {
    navigation.navigate("ChatPage", {
      params: { ...fullData },
    });
  };

  return (
    <ListContainer onPress={goToChatPage}>
      <RowView>
        <Title>{title}</Title>
        <TimeView>
          <Time>{time}</Time>
        </TimeView>
      </RowView>
      <DialogView>
        <Dialog>{dialog}</Dialog>
      </DialogView>
    </ListContainer>
  );
};

export default ChatRoom;
