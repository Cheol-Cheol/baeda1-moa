import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AuthContext } from "../context/AuthContextProvider";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

const UserPage = () => {
  const { kakaoSignOut, getProfile } = useContext(AuthContext);

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <Container>
      <Text>UserPage</Text>
      {/* FIXME: 잠시 로그아웃 대체품 */}
      <TouchableOpacity onPress={kakaoSignOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default UserPage;
