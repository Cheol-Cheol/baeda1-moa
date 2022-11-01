import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WritePage from "../screen/WritePage";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="WritePage" component={WritePage} />
    </NativeStack.Navigator>
  );
};

export default Stack;
