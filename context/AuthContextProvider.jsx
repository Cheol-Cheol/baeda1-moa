import React, { useReducer } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  getProfile as getKakaoProfile,
  login,
  logout,
} from "@react-native-seoul/kakao-login";

const defaultAuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  userInfo: {},
};

const authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return { ...prevState, isLoading: false, userToken: action.token };
    case "SIGN_IN":
      return { ...prevState, isSignout: false, userToken: action.token };
    case "SIGN_OUT":
      return { ...prevState, isSignout: true, userToken: null };
    case "PROFILE":
      return { ...prevState, userInfo: action.info };
  }
};

const AuthContext = React.createContext({});

const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

  //📍 로그인 (카카오)
  const kakaoSignIn = async () => {
    const token = await login();

    axios
      .post("http://3.37.106.173/api/users", {
        kakaoToken: token.accessToken,
      })
      .then(async function (response) {
        await SecureStore.setItemAsync(
          "userToken",
          response.headers.accesstoken
        );
        dispatchAuth({ type: "SIGN_IN", token: response.headers.accesstoken });
        console.log("카카오_로그인 성공!");
      })
      .catch(function (error) {
        console.log("KakaoLoginERR: ", error.response);
      });
  };

  //📍 로그아웃
  const kakaoSignOut = async () => {
    const message = await logout();

    await SecureStore.deleteItemAsync("userToken");
    dispatchAuth({ type: "SIGN_OUT" });
    console.log(`카카오_로그아웃 성공! (MSG: ${message})`);
  };

  //📍 토큰 가져오기
  const restoreToken = async () => {
    let userToken;

    try {
      userToken = await SecureStore.getItemAsync("userToken");
    } catch (e) {
      console.log("RestoreTokenErr: ", e.message);
    }

    dispatchAuth({ type: "RESTORE_TOKEN", token: userToken });
  };

  //📍 프로필 정보 가져오기
  const getProfile = async () => {
    axios({
      method: "get",
      url: "http://3.37.106.173/api/users",
      headers: { Authorization: `Bearer ${authState.userToken}` },
    })
      .then((response) =>
        dispatchAuth({ type: "PROFILE", info: response.data })
      )
      .catch((e) => console.log("GetProfileErr: ", e.message));
  };

  //📍 프로필 정보 수정
  const editProfile = async (updatedName) => {
    let data = { nickName: updatedName };

    axios
      .patch("http://3.37.106.173/api/users", data, {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .then(() => getProfile())
      .catch((e) => console.log("EditProfileErr: ", e.message));
  };

  //📍 회원탈퇴
  const retireUser = async () => {
    axios
      .delete("http://3.37.106.173/api/users", {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .then(async () => {
        await SecureStore.deleteItemAsync("userToken");
        dispatchAuth({ type: "SIGN_OUT" });
        console.log("회원탈퇴 성공!");
      })
      .catch((e) => console.log("RetireUserErr: ", e.message));
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        kakaoSignIn,
        kakaoSignOut,
        restoreToken,
        getProfile,
        editProfile,
        retireUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
