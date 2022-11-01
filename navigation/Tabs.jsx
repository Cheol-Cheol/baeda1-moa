import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screen/HomePage";
import ChatListPage from "../screen/ChatListPage";
import UserPage from "../screen/UserPage";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="HomePage">
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          // 📍 나중에 로고 이미지로 대체
          title: "ㅂㄷㅁㅇ",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home-sharp" size={size} color="#3772FF" />;
          },
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ChatListPage"
        component={ChatListPage}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="chatbox-ellipses" size={size} color="#3772FF" />
            );
          },
          tabBarLabel: "Chat",
        }}
      />
      <Tab.Screen
        name="UserPage"
        component={UserPage}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="person-circle-sharp"
                size={size}
                color="#3772FF"
              />
            );
          },
          tabBarLabel: "User",
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
