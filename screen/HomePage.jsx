import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import List from "../components/List";
import CategoryItem from "../components/CategoryItem";
import { ActivityIndicator } from "react-native";
import axios from "axios";

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
  {
    roomId: "4",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
  {
    roomId: "5",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
  {
    roomId: "6",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
  {
    roomId: "7",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
  {
    roomId: "8",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
];

// const CATEGORY = [
//   { label: "전체", value: "전체" },
//   { label: "한식", value: "한식" },
//   { label: "중식", value: "중식" },
//   { label: "일식", value: "일식" },
//   { label: "분식", value: "분식" },
//   { label: "피자", value: "피자" },
//   { label: "족발/보쌈", value: "족발보쌈" },
// ];

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 25px;
  padding-top: 60px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Header = styled.View``;

const LogoText = styled.Text`
  font-family: "black-han-sans-regular";
  font-size: 30px;
  font-weight: bold;
  color: #3772ff;
`;

const Category = styled.View`
  flex-direction: row;
`;

const FlatList = styled.FlatList``;

const AddBtn = styled.TouchableOpacity`
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

const HomePage = ({ navigation: { navigate } }) => {
  // TODO: DUMMY_DATA 는 나중에 전역 state가 생성되면 바꿀 예정
  const [rooms, setRooms] = useState(DUMMY_DATA);
  const [category, setCategory] = useState([{ categoryId: 0, name: "전체" }]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onFilterRooms = (value) => {
    if (value !== "전체") {
      const filteredData = DUMMY_DATA.filter((room) => room.category === value);
      setRooms(filteredData);
    } else {
      setRooms(DUMMY_DATA);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // 1. 새로고침 시 api GET 통신
    setTimeout(() => setRefreshing(false), 1000);
    // 2. setRooms(res.data);
    // 3. setRefreshing(false);
  };

  const getCategory = () => {
    axios({
      method: "get",
      url: "http://3.37.106.173/api/categories",
    })
      .then(function (response) {
        setCategory((prevState) => [...prevState, ...response.data]);
      })
      .catch((e) => console.log("[HP]getCategoryErr: ", e));

    setLoading(false);
  };

  useEffect(() => {
    getCategory();
    // TODO: WritePage에서 생성 후 전역 state에 추가하고 dep에 설정해서 다시 전역 state을 갖고오도록 한다.
  }, []);

  return (
    <Container>
      <Header>
        <LogoText>배달모아</LogoText>
      </Header>
      <HSeparator />

      {loading ? (
        <Loader>
          <ActivityIndicator />
        </Loader>
      ) : (
        <>
          <Category>
            {category.map((el, index) => (
              <CategoryItem
                key={index}
                name={el.name}
                onFilterRooms={onFilterRooms}
              />
            ))}
          </Category>
          <HSeparator />
          <FlatList
            data={rooms}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ItemSeparatorComponent={HSeparator}
            keyExtractor={(item) => item.roomId}
            renderItem={({ item }) => <List fullData={item} />}
          />
        </>
      )}

      <AddBtn onPress={() => navigate("Stack", { screen: "WritePage" })}>
        <Ionicons name="add" color="white" size={40} />
      </AddBtn>
    </Container>
  );
};

export default HomePage;
