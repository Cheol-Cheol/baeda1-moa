import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const ProfileEditPage = ({ route: { params } }) => {
  const [enteredName, setEnteredName] = useState(params.params.nickName);
  const { editProfile } = useContext(AuthContext);
  const navigation = useNavigation();

  const onChangeHandler = (name) => {
    let trimedName = name.trim();
    setEnteredName(trimedName);
  };

  const updatedName = (enteredName) => {
    editProfile(enteredName);
    navigation.goBack();
  };

  return (
    <Container>
      <View
        style={{
          flex: 0.25,
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              marginVertical: 10,
              fontWeight: "500",
              paddingLeft: 4,
            }}
          >
            닉네임
          </Text>
          <TextInput
            value={enteredName}
            onChangeText={onChangeHandler}
            style={{
              padding: 15,
              borderColor: "grey",
              backgroundColor: "white",
              borderWidth: 0.5,
              borderRadius: 10,
              fontSize: 20,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => updatedName(enteredName)}
          style={{
            backgroundColor: "tomato",
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            borderRadius: 10,
            marginTop: 12,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ProfileEditPage;
