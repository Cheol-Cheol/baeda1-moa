import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const FormContainer = styled.View`
  flex: 0.25;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  justify-content: space-between;
`;

const Form = styled.View``;

const Label = styled.Text`
  font-size: 16px;
  margin: 10px 0px;
  font-weight: 500;
  padding-left: 4px;
`;

const TextInput = styled.TextInput`
  padding: 15px;
  border: 0.5px solid grey;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
`;

const Btn = styled.TouchableOpacity`
  background-color: tomato;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  margin-top: 12px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
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
      <FormContainer>
        <Form>
          <Label>닉네임</Label>
          <TextInput value={enteredName} onChangeText={onChangeHandler} />
        </Form>
        <Btn onPress={() => updatedName(enteredName)}>
          <BtnText>완료</BtnText>
        </Btn>
      </FormContainer>
    </Container>
  );
};

export default ProfileEditPage;
