import React, { useReducer } from "react";
import * as SecureStore from "expo-secure-store";

const defaultAuthState = { isLoading: true, isSignout: false, userToken: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return { ...state, isLoading: false, userToken: action.token };
    case "SIGN_IN":
      return { ...state, isSignout: false, userToken: action.token };
    case "SIGN_OUT":
      return { ...state, isSignout: true, userToken: null };
  }
};

const AuthContext = React.createContext({});

// 📍 만약에 여기서 로직이 이상하다? useMemo을 안 적어서 그런걸수도? 또는 signIn: 이런 이상한 표기법?
const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

  const kakaoSignIn = async () => {
    // 1. kakao login 요청하는 API 부분

    // 2. kakao로부터 받은 웹뷰를 통해 서버에 토큰을 전송하고, 서버는 프론트에 고유한 토큰을 보내준다.

    // 3. 여기서 token을 secure-storage에 저장한 다음, reducer(SIGN_IN)를 통해서 상태값을 바꿔준다.
    await SecureStore.setItemAsync("userToken", true);
    dispatchAuth({ type: "SIGN_IN", token: true });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("userToken");
    dispatchAuth({ type: "SIGN_OUT" });
  };

  const restoreToken = async () => {
    // 1. SecureStorage에서 Token 가져오기
    let userToken;
    try {
      userToken = await SecureStore.getItemAsync("userToken");
    } catch (e) {
      console.log("RestoreTokenErr: ", e.message);
    }
    // 2. Token 상태값 최신화하기
    dispatchAuth({ type: "RESTORE_TOKEN", token: userToken });
  };

  return (
    <AuthContext.Provider value={{ authState, kakaoSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
