import React, { useContext } from "react";
import styled from "styled-components/native";
import { RoomsContext } from "../context/RoomsContextProvider";

const TouchableOpacity = styled.TouchableOpacity`
  background-color: #9bb6f7;
  justify-content: center;
  align-items: center;
  padding: 6px;
  margin: 0px 4px;
  border-radius: 10px;
`;

const Text = styled.Text``;

const CategoryItem = ({ name, categoryId }) => {
  const { filterRooms } = useContext(RoomsContext);
  return (
    <TouchableOpacity onPress={() => filterRooms(categoryId)}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
