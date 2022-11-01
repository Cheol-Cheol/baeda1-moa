import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "../navigation/Tabs";

const Nav = createNativeStackNavigator();

const navigator = () => (
  <Nav.Navigator screenOptions={{ headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
  </Nav.Navigator>
);

export default navigator;
