import React, { useContext, useState } from "react";
import { Dimensions, Modal, Alert } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RoomsContext } from "../context/RoomsContextProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p|am\/pm)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      case "am/pm":
        return d.getHours() < 12 ? "AM" : "PM";
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};

String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const ListContainer = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  justify-content: center;
  padding-vertical: 15px;
  border: 1px solid #eee;
  border-radius: 30px;
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

const Text = styled.Text``;

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
  const { enterRoom } = useContext(RoomsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const formatDate = (original_date) => {
    const date = new Date(original_date);
    return date.format("am/pm hh시 mm분");
  };

  const goToChatPage = () => {
    setModalVisible(!modalVisible);
    enterRoom(fullData.roomId);
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
        <ListContent style={{ width: SCREEN_WIDTH / 1.5 }}>
          <RowView>
            <Title>{fullData.title}</Title>
            <Text>
              <FontAwesome5 name="user-friends" size={13} color="black" />{" "}
              {fullData.userCount}/5
            </Text>
          </RowView>
          <RowView>
            <TextLeft>{fullData.restaurantName}</TextLeft>
            <TextRight>{formatDate(fullData.orderDate)} 주문</TextRight>
          </RowView>
        </ListContent>
      </ListContainer>
    </>
  );
};

export default List;
