import React from "react";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ListContainer = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  padding-vertical: 15px;
  border: 1px solid #eee;
  border-radius: 30px;
`;

const ListLogo = styled.View`
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const ListContent = styled.View``;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 8px;
`;

const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextLeft = styled.Text`
  color: grey;
`;

const TextRight = styled.Text`
  color: tomato;
  font-weight: 700;
`;

const List = ({ fullData }) => {
  return (
    <ListContainer>
      <ListLogo>
        <Ionicons name="person" size={45} />
      </ListLogo>

      <ListContent style={{ width: SCREEN_WIDTH / 1.5 }}>
        <Title>{fullData.title}</Title>
        <RowView>
          <TextLeft>{fullData.businessName}</TextLeft>
          <TextRight>{fullData.orderTime.substring(14)}</TextRight>
        </RowView>
      </ListContent>
    </ListContainer>
  );
};

export default List;
