import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screen/HomePage";
import ChatListPage from "../screen/ChatListPage";
import UserPage from "../screen/UserPage";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={{ unmountOnBlur: true }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="home-sharp"
                size={size}
                color={focused ? "#3772FF" : color}
              />
            );
          },
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ChatListPage"
        component={ChatListPage}
        options={{
          headerTitle: "채팅방 목록",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="chatbox-ellipses"
                size={size}
                color={focused ? "#3772FF" : color}
              />
            );
          },
          tabBarLabel: "Chat",
        }}
      />
      <Tab.Screen
        name="UserPage"
        component={UserPage}
        options={{
          headerTitle: "내 정보",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="person-circle-sharp"
                size={size}
                color={focused ? "#3772FF" : color}
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
