import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
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
      </RowView>
      <DialogView>
        <Dialog>반갑습니다.</Dialog>
      </DialogView>
    </ListContainer>
  );
};

export default ChatRoom;
