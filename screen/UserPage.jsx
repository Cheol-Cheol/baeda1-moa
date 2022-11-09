import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { AuthContext } from "../context/AuthContextProvider";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

// TODO: 재빌드 시 프로필 렌더링 실패
const UserPage = () => {
  const navigation = useNavigation();
  const {
    authState: { userInfo },
    kakaoSignOut,
    getProfile,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const goToProfileEditPage = () => {
    navigation.navigate("ProfileEditPage", {
      params: { ...userInfo },
    });
  };

  useEffect(() => {
    getProfile();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader>
          <ActivityIndicator />
        </Loader>
      ) : (
        <Container>
          <View style={{ flex: 0.5 }}>
            <Image
              source={{ url: userInfo.image }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
            <TextInput editable={false}>{userInfo.nickName}</TextInput>
            <TouchableOpacity
              onPress={goToProfileEditPage}
              style={{ backgroundColor: "grey", width: "70%" }}
            >
              <Text>프로필 편집</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={kakaoSignOut}
            style={{ backgroundColor: "yellow", width: "70%" }}
          >
            <Text>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "tomato", width: "70%" }}>
            <Text>회원탈퇴</Text>
          </TouchableOpacity>
        </Container>
      )}
    </>
  );
};

export default UserPage;
