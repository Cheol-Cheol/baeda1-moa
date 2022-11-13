import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
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
  background-color: ${({ theme }) => theme.bgColor};
`;

const Profile = styled.View`
  flex: 0.4;
  padding-horizontal: 15px;
  justify-content: space-evenly;
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
    retireUser,
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
          <Profile>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={{ url: userInfo.image }}
                style={{ width: 80, height: 80, borderRadius: 100 }}
              />

              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontSize: 19 }}>{userInfo.nickName}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={goToProfileEditPage}
              style={{
                backgroundColor: "#729af7",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9,
                height: 30,
              }}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>
                프로필 수정
              </Text>
            </TouchableOpacity>
          </Profile>

          <View
            style={{
              height: 50,
              backgroundColor: "#eee",
            }}
          />

          <TouchableOpacity
            onPress={kakaoSignOut}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <Text style={{ paddingHorizontal: 15, fontSize: 18 }}>
              로 그 아 웃
            </Text>
            <Text style={{ paddingHorizontal: 15, fontSize: 20 }}>＞</Text>
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              backgroundColor: "#dedddd",
            }}
          />

          <TouchableOpacity
            onPress={retireUser}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                paddingHorizontal: 15,
                fontSize: 18,
                fontWeight: "500",
                color: "tomato",
              }}
            >
              회 원 탈 퇴
            </Text>
            <Text
              style={{
                paddingHorizontal: 15,
                fontSize: 20,
                fontWeight: "500",
                color: "tomato",
              }}
            >
              ＞
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: "#dedddd",
            }}
          />
        </Container>
      )}
    </>
  );
};

export default UserPage;
