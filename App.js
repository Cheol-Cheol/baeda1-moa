import React from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Navigator from "./navigation/Navigator";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./theme";
import { useColorScheme } from "react-native";
import { AuthContextProvider } from "./context/AuthContextProvider";
import useCachedResources from "./hooks/useCachedResources";
import { RoomsContextProvider } from "./context/RoomsContextProvider";
import * as encoding from "text-encoding";

export default function App() {
  const isDark = useColorScheme() === "dark";
  const isLoadedAssets = useCachedResources();

  if (isLoadedAssets) {
    return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <AuthContextProvider>
          <RoomsContextProvider>
            <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
              <Navigator />
            </NavigationContainer>
          </RoomsContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    );
  } else {
    return null;
  }
}
