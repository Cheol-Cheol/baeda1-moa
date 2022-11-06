import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "../navigation/Tabs";
import Stack from "./Stack";
import LoginPage from "../screen/LoginPage";
import { AuthContext } from "../context/AuthContextProvider";
import ChatPage from "../screen/ChatPage";

const Nav = createNativeStackNavigator();

const navigator = () => {
  const {
    authState: { userToken },
    restoreToken,
  } = useContext(AuthContext);

  // TODO: 전역 state값을 관리해야 할 듯 (isSignedIn이랑 isLoading, userToken을 갖고와야됨)
  // if (state.isLoading) {
  //   // isLoading 데이터를 SecureStore에서 갖고오지 못했다면, 다시 스플래쉬 스크린으로 전환
  //   return <SplashScreen />;
  // }

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Nav.Screen name="LoginPage" component={LoginPage} />
      ) : (
        <>
          <Nav.Group screenOptions={{ presentation: "modal" }}>
            <Nav.Screen name="Tabs" component={Tabs} />
            <Nav.Screen name="Stack" component={Stack} />
          </Nav.Group>
          <Nav.Screen name="ChatPage" component={ChatPage} />
        </>
      )}
    </Nav.Navigator>
  );
};

export default navigator;
