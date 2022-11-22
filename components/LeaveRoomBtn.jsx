import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const BtnContainer = styled.View`
  flex-direction: row;
`;

const Btn = styled.TouchableOpacity`
  margin: 2px;
`;

const LeaveRoomBtn = ({ roomId, leaveRoomGoToChatListPage }) => {
  return (
    <BtnContainer>
      <Btn />
      <Btn onPress={() => leaveRoomGoToChatListPage(roomId)}>
        <Feather name="log-out" size={22} color="black" />
      </Btn>
    </BtnContainer>
  );
};

export default LeaveRoomBtn;
