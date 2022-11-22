import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const BtnContainer = styled.View`
  flex-direction: row;
`;

const Btn = styled.TouchableOpacity`
  margin: 3px;
`;

const DeleteRoomBtn = ({ roomId, deleteRoomGoToChatListPage }) => {
  return (
    <>
      <BtnContainer>
        <Btn>
          <Feather name="edit" size={22} color="black" />
        </Btn>

        <Btn onPress={() => deleteRoomGoToChatListPage(roomId)}>
          <Feather name="log-out" size={22} color="black" />
        </Btn>
      </BtnContainer>
    </>
  );
};

export default DeleteRoomBtn;
