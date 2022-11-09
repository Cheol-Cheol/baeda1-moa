import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import List from "../components/List";
import CategoryItem from "../components/CategoryItem";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { RoomsContext } from "../context/RoomsContextProvider";

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
  const { roomsState } = useContext(RoomsContext);
  const [category, setCategory] = useState([{ categoryId: 0, name: "전체" }]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // FIXME: 서버에서 Filter API 생성 시 삭제할 예정
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

  // TODO: 전역 state값이 바뀔 때 마다 dispatch READ를 할 것
  useEffect(() => {
    console.log("[HP] context state 변경!");
    // dispatch({ type: READ });
  }, [roomsState]);

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
            data={roomsState}
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
