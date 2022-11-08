import React from "react";
import styled from "styled-components/native";

const TouchableOpacity = styled.TouchableOpacity`
  background-color: #9bb6f7;
  justify-content: center;
  align-items: center;
  padding: 6px;
  margin: 1.5px;
  border-radius: 10px;
`;

const Text = styled.Text``;

const CategoryItem = ({ value, name, onFilterRooms }) => {
  return (
    <TouchableOpacity onPress={() => onFilterRooms(value)}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
