import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import LogoSvg from "../components/UI/LogoSvg";

const Container = styled.View`
  flex: 1;
  padding: 0px 25px;
  padding-top: 60px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const LogoContainer = styled.View`
  flex: 0.9;
  align-items: center;
  padding-top: 50px;
`;

const LogoTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-top: -100px;
`;

const KaKaoBtnContainer = styled.TouchableOpacity`
  background-color: #f9de5a;
  flex: 0.05;
  flex-direction: row;
  align-items: center;
  margin: 50px 0px;
  padding: 10px;
  border-radius: 15px;
`;

const KaKaoBtnLogo = styled.View`
  width: 15%;
  align-items: center;
`;

const KakaoBtnText = styled.View`
  width: 70%;
  align-items: center;
`;

const BtnText = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

const LoginPage = () => {
  return (
    <Container>
      <LogoContainer>
        <LogoSvg width={330} height={300} />
        <LogoTitle>🔔 1/N 배달료 커뮤니티 </LogoTitle>
      </LogoContainer>
      <KaKaoBtnContainer>
        <KaKaoBtnLogo>
          <Ionicons name="chatbubble-sharp" size={25} color="black" />
        </KaKaoBtnLogo>
        <KakaoBtnText>
          <BtnText>카카오계정으로 로그인</BtnText>
        </KakaoBtnText>
      </KaKaoBtnContainer>
    </Container>
  );
};

export default LoginPage;
