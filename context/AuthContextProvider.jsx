import React, { useReducer } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";

const defaultAuthState = { isLoading: true, isSignout: false, userToken: null };

const authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return { ...prevState, isLoading: false, userToken: action.token };
    case "SIGN_IN":
      return { ...prevState, isSignout: false, userToken: action.token };
    case "SIGN_OUT":
      return { ...prevState, isSignout: true, userToken: null };
  }
};

const AuthContext = React.createContext({});

// FIXME: 만약에 여기서 로직이 이상하다? useMemo을 안 적어서 그런걸수도?
const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

  const kakaoSignIn = async () => {
    // 1. kakao login 요청하는 API 부분
    const token = await login();
    // 2. 서버에 토큰 전송하기
    // body: kakaoToken
    axios
      .post("http://3.37.106.173/api/users", {
        kakaoToken: token.accessToken,
      })
      .then(async function (response) {
        // 3. 토큰을 secure-storage에 저장한 다음, reducer(SIGN_IN)를 통해서 상태값을 바꿔준다.
        await SecureStore.setItemAsync(
          "userToken",
          JSON.stringify(response.headers.accesstoken)
        );
        dispatchAuth({ type: "SIGN_IN", token: response.headers.accesstoken });
        console.log("카카오_로그인 성공!");
      })
      .catch(function (error) {
        console.log("KakaoLoginERR: ", error.response);
      });
  };

  const kakaoSignOut = async () => {
    const message = await logout();
    await SecureStore.deleteItemAsync("userToken");
    dispatchAuth({ type: "SIGN_OUT" });
    console.log(`카카오_로그아웃 성공! (MSG: ${message})`);
  };

  const restoreToken = async () => {
    let userToken;
    try {
      userToken = await SecureStore.getItemAsync("userToken");
    } catch (e) {
      console.log("RestoreTokenErr: ", e.message);
    }
    dispatchAuth({ type: "RESTORE_TOKEN", token: userToken });
  };

  // const getProfile = async () => {
  //   const profile = await getKakaoProfile();
  //   console.log(profile);
  // };

  return (
    <AuthContext.Provider
      value={{ authState, kakaoSignIn, kakaoSignOut, restoreToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
