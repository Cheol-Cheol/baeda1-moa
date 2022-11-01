import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WritePage from "../screen/WritePage";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="WritePage"
        component={WritePage}
        options={{
          headerTitle: "방 만들기",
          headerTintColor: "#3772ff",
        }}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
