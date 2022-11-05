import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, FlatList, Dimensions } from "react-native";
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
    title: "얼죽아!",
    businessName: "빽다방",
    orderTime: "2022년 11월 02일 오후 05시 21분",
    category: "카페디저트",
  },
  {
    roomId: "3",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "고기",
  },
];

const CATEGORY = [
  { label: "일식", value: "일식" },
  { label: "중식", value: "중식" },
  { label: "족발/보쌈", value: "족발보쌈" },
  { label: "고기", value: "고기" },
  { label: "분식", value: "분식" },
  { label: "피자", value: "피자" },
  { label: "패스트푸드", value: "패스트푸드" },
  { label: "카페/디저트", value: "카페디저트" },
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
  return (
    <Container>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#3772ff",
            letterSpacing: 6,
          }}
        >
          배달모아
        </Text>
      </View>
      <HSeparator />
      <FlatList
        data={DUMMY_DATA}
        ItemSeparatorComponent={HSeparator}
        renderItem={({ item }) => <List fullData={item} />}
      />

      {/* 📍 이건 FlatList ListHeaderComponent로 연결하기 */}
      {/* {CATEGORY.map((el, index) => (
        <View key={index}>
          <Text>{el.label}</Text>
        </View>
      ))} */}

      <Btn onPress={() => navigate("Stack", { screen: "WritePage" })}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
};

export default HomePage;
