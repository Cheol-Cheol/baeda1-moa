import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 35px;
  right: 35px;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
  background-color: ${({ theme }) => theme.mainColor};
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const HomePage = ({ navigation: { navigate } }) => {
  return (
    <Container>
      <Text>HomePage</Text>

      <Btn onPress={() => navigate("Stack", { screen: "WritePage" })}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
};

export default HomePage;
