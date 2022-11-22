import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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
  padding: 0px 15px;
  justify-content: space-evenly;
`;

const RowView = styled.View`
  flex-direction: row;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const FlexEndView = styled.View`
  width: 20%;
  justify-content: center;
  align-items: flex-end;
`;

const NickName = styled.Text`
  font-size: 19px;
`;

const ProfileEditBtn = styled.TouchableOpacity`
  background-color: #729af7;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  height: 30px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 500;
`;

const BgView = styled.View`
  height: 50px;
  background-color: #eee;
`;

const BtnCell = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0px;
  border: 1px solid #eee;
  align-items: center;
`;

const BtnCellText = styled.Text`
  padding: 0px 15px;
  font-size: 18px;
  color: ${({ color }) => (!color ? "black" : color)};
`;

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
            <RowView>
              <ProfileImage source={{ url: userInfo.image }} />
              <FlexEndView>
                <NickName>{userInfo.nickName}</NickName>
              </FlexEndView>
            </RowView>
            <ProfileEditBtn onPress={goToProfileEditPage}>
              <BtnText>프로필 수정</BtnText>
            </ProfileEditBtn>
          </Profile>
          <BgView />
          <BtnCell onPress={kakaoSignOut}>
            <BtnCellText>로 그 아 웃</BtnCellText>
            <BtnCellText>＞</BtnCellText>
          </BtnCell>

          <BtnCell onPress={retireUser}>
            <BtnCellText color="tomato">회 원 탈 퇴</BtnCellText>
            <BtnCellText color="tomato">＞</BtnCellText>
          </BtnCell>
        </Container>
      )}
    </>
  );
};

export default UserPage;
