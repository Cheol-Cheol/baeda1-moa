import React, { useState } from "react";
import { Dimensions, Modal, View, Alert, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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

const ModalContainer = styled.View``;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const ModalBtns = styled.View`
  width: 220px;
  margin-top: 50px;
  flex-direction: row;
  justify-content: space-between;
`;

const Btn = styled.Pressable`
  background-color: ${({ color }) => color};
  width: 100px;
  padding: 15px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 15px;
`;

const List = ({ fullData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const goToChatPage = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("ChatPage", {
      params: { ...fullData },
    });
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer
          style={{
            backgroundColor: "white",
            margin: 25,
            marginTop: SCREEN_HEIGHT / 2.8,
            padding: 50,
            borderRadius: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <ModalTitle>채팅방에 참가하시겠습니까?</ModalTitle>
          <ModalBtns>
            <Btn color={"grey"} onPress={() => setModalVisible(!modalVisible)}>
              <BtnText>취소</BtnText>
            </Btn>
            <Btn color={"#3772ff"} onPress={goToChatPage}>
              <BtnText>확인</BtnText>
            </Btn>
          </ModalBtns>
        </ModalContainer>
      </Modal>

      <ListContainer onPress={() => setModalVisible(!modalVisible)}>
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
    </>
  );
};

export default List;
