import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import List from "../components/List";

const DUMMY_DATA = [
  {
    roomId: "1",
    admin: "1de1dxz01011",
    title: "밥 먹자 애들아!",
    businessName: "청년피자",
    orderTime: "2022년 11월 02일 오후 01시 51분",
    category: "피자",
  },
  {
    roomId: "2",
    admin: "1de1dxz01012",
    title: "족발 땡긴다!",
    businessName: "대왕족발",
    orderTime: "2022년 11월 02일 오후 05시 21분",
    category: "족발보쌈",
  },
  {
    roomId: "3",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
];

const CATEGORY = [
  { label: "전체", value: "전체" },
  { label: "한식", value: "한식" },
  { label: "중식", value: "중식" },
  { label: "일식", value: "일식" },
  { label: "분식", value: "분식" },
  { label: "피자", value: "피자" },
  { label: "족발/보쌈", value: "족발보쌈" },
];

const Container = styled.View`
  flex: 1;
  padding: 0px 25px;
  padding-top: 60px;
  background-color: ${({ theme }) => theme.bgColor};
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

const HSeparator = styled.View`
  height: 20px;
`;

const ListContainer = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  padding-vertical: 15px;
  border: 1px solid #eee;
  border-radius: 30px;
`;

const HomePage = ({ navigation: { navigate } }) => {
  // TODO: DUMMY_DATA 는 나중에 전역 state가 생성되면 바꿀 예정
  const [rooms, setRooms] = useState(DUMMY_DATA);

  const onFilterRooms = (value) => {
    if (value !== "전체") {
      const filteredData = DUMMY_DATA.filter((room) => room.category === value);
      setRooms(filteredData);
    } else {
      setRooms(DUMMY_DATA);
    }
  };

  return (
    <Container>
      <View>
        <Text
          style={{
            fontFamily: "black-han-sans-regular",
            fontSize: 30,
            fontWeight: "bold",
            color: "#3772ff",
          }}
        >
          배달모아
        </Text>
      </View>
      <HSeparator />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {CATEGORY.map((el, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onFilterRooms(el.value)}
            style={{
              backgroundColor: "#9bb6f7",
              justifyContent: "center",
              alignItems: "center",
              padding: 6,
              borderRadius: 10,
            }}
          >
            <Text>{el.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <HSeparator />
      <FlatList
        data={rooms}
        ItemSeparatorComponent={HSeparator}
        keyExtractor={(item) => item.roomId}
        renderItem={({ item }) => <List fullData={item} />}
      />

      <Btn onPress={() => navigate("Stack", { screen: "WritePage" })}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
};

export default HomePage;
