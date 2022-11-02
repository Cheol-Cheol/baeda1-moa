import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

const ChatListPage = () => {
  return (
    <Container>
      <Text>ChatListPage</Text>
    </Container>
  );
};

export default ChatListPage;
