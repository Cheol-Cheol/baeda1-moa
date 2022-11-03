import React, { useContext } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContextProvider";

const DUMMY_DATA = [
  {
    id: "1",
    admin: "1de1dxz01011",
    title: "밥 먹자 애들아!",
    businessName: "청년피자",
    orderTime: "2022년 11월 02일 오후 01시 51분",
    category: "피자",
  },
  {
    id: "2",
    admin: "1de1dxz01012",
    title: "얼죽아!",
    businessName: "빽다방",
    orderTime: "2022년 11월 02일 오후 05시 21분",
    category: "카페디저트",
  },
  {
    id: "3",
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
  border: 1px solid #eee
  border-radius: 30px;
`;

const HomePage = ({ navigation: { navigate } }) => {
  const { signOut } = useContext(AuthContext);
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
        renderItem={({ item }) => (
          <ListContainer key={item.key}>
            <View
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="person" size={45} />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 20, marginBottom: 8 }}>
                {item.title}
              </Text>
              <View
                style={{
                  backgroundColor: "red",
                }}
              >
                <Text>{item.businessName}</Text>
                <Text>{item.orderTime.substring(6)}</Text>
              </View>
            </View>
          </ListContainer>
        )}
      />

      {/* 📍 이건 FlatList ListHeaderComponent로 연결하기 */}
      {/* {CATEGORY.map((el, index) => (
        <View key={index}>
          <Text>{el.label}</Text>
        </View>
      ))} */}

      {/* FIXME: 잠시 로그아웃 대체품 */}
      <TouchableOpacity onPress={signOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>

      <Btn onPress={() => navigate("Stack", { screen: "WritePage" })}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
};

export default HomePage;
