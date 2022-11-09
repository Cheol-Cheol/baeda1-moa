import React from "react";
import styled from "styled-components/native";
import { Text, TextInput, View } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const ProfileEditPage = ({ route: { params } }) => {
  console.log(params);
  return (
    <Container>
      <TextInput>{params.params.nickName}</TextInput>
    </Container>
  );
};

export default ProfileEditPage;
