import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native";

const ProfileHeaderBtn = () => {
  const navigation = useNavigation();

  const updateProfile = () => {
    // 1. Axios PUT 프로필 수정 통신 (with Context [updateProfile])
    navigation.goBack();
  };

  return <Button title="완료" color="grey" onPress={updateProfile} />;
};

export default ProfileHeaderBtn;
