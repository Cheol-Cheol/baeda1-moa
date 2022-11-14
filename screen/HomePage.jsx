import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import List from "../components/List";
import CategoryItem from "../components/CategoryItem";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { RoomsContext } from "../context/RoomsContextProvider";
import { AuthContext } from "../context/AuthContextProvider";

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
  const { roomsState, getRooms } = useContext(RoomsContext);
  const { getProfile } = useContext(AuthContext);
  const [category, setCategory] = useState([{ categoryId: 0, name: "전체" }]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    getRooms();
    setTimeout(() => setRefreshing(false), 900);
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

  const getInitData = async () => {
    Promise.all([getCategory(), getRooms(), getProfile()]);
  };

  useEffect(() => {
    getInitData();
  }, []);

  // FIXME: 무한 호출 발생...
  // useEffect(() => {
  //   getRooms();
  // }, [roomsState]);

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
                categoryId={el.categoryId}
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
