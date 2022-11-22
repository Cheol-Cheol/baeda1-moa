import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const View = styled.View`
  position: absolute;
  left: -3px;
  top: -7px;
`;

const MasterIcon = () => {
  return (
    <View>
      <MaterialCommunityIcons name="crown-circle" size={24} color="#f9d55d" />
    </View>
  );
};

export default MasterIcon;
