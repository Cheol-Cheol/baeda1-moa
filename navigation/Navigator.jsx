import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "../navigation/Tabs";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

const navigator = () => (
  <Nav.Navigator screenOptions={{ headerShown: false, presentation: "modal" }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default navigator;
