import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { Alert } from "react-native";
import axios from "axios";
import { RoomsContext } from "../context/RoomsContextProvider.jsx";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p|am\/pm)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      case "am/pm":
        return d.getHours() < 12 ? "AM" : "PM";
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};

String.prototype.zf = function (len) {
  return "0".string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const Container = styled.View`
  flex: 1;
  padding: 0px 25px;
  background-color: ${({ theme }) => theme.bgColor};
`;

const InputGroup = styled.View`
  margin: 20px 0px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-size: 18px;
  font-weight: 400;
  margin: 10px 10px;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dad8d8;
  border-radius: 20px;
  padding: 10px 20px;
  /* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3); */
`;

const OrderTimePicker = styled.TouchableOpacity``;

const CategoryPicker = styled.View`
  border: 1px solid #dad8d8;
  border-radius: 20px;
  padding: 10px 20px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 30px;
  background-color: ${({ theme }) => theme.mainColor};
  width: 100%;
  padding: 15px 20px;
  align-items: center;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const WritePage = ({ navigation: { goBack } }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredBusinessName, setEnteredBusinessName] = useState("");
  const [enteredOrderTime, setEnteredOrderTime] = useState("");
  const [dpOrderTime, setDpOrderTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [enteredCategory, setEnteredCategory] = useState("");
  const [categoryFormat, setCategoryFormat] = useState([]);

  const { addRoom, getRooms } = useContext(RoomsContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onChangeTitle = (title) => {
    setEnteredTitle(title);
  };

  const onChangeBusinessName = (businessName) => {
    setEnteredBusinessName(businessName);
  };

  const onChangeOrderTime = (orderTime) => {
    hideDatePicker();

    const date = new Date(orderTime);
    const formatDate = new Date(+date + 3240 * 10000)
      .toISOString()
      .replace(/\..*/, "");

    setDpOrderTime(orderTime.format("yyyy년 MM월 dd일 a/p hh시 mm분"));
    setEnteredOrderTime(formatDate);
  };

  const onChangeCategory = (category) => {
    setEnteredCategory(category);
  };

  const formatedCategory = (data) => {
    const formatedData = data.map((el) => {
      return { label: el.name, value: el.categoryId, key: el.categoryId };
    });

    setCategoryFormat(formatedData);
  };

  const onSubmitHandler = async () => {
    if (
      enteredTitle &&
      enteredBusinessName &&
      enteredOrderTime &&
      enteredCategory
    ) {
      const data = {
        title: enteredTitle,
        restaurantName: enteredBusinessName,
        orderDate: enteredOrderTime,
        categoryId: enteredCategory,
      };
      addRoom(data);
      goBack();
    } else {
      Alert.alert("모든 값을 입력해주세요.");
      return;
    }
  };

  const getCategory = () => {
    axios({
      method: "get",
      url: "http://3.37.106.173/api/categories",
    })
      .then(function (response) {
        formatedCategory(response.data);
      })
      .catch((e) => console.log("[WP]getCategoryErr: ", e));
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container>
      <InputGroup>
        <Label>제 목</Label>
        <TextInput
          value={enteredTitle}
          onChangeText={onChangeTitle}
          returnKeyType="done"
          placeholder="방 제목을 입력해주세요."
        />
      </InputGroup>

      <InputGroup>
        <Label>상 호 명</Label>
        <TextInput
          value={enteredBusinessName}
          onChangeText={onChangeBusinessName}
          returnKeyType="done"
          placeholder="상호명을 입력해주세요."
        />
      </InputGroup>

      <InputGroup>
        <Label>주 문 시 간</Label>
        <OrderTimePicker onPress={showDatePicker}>
          <TextInput
            pointerEvents="none"
            placeholder="주문시간을 입력해주세요"
            underlineColorAndroid="transparent"
            editable={false}
            value={dpOrderTime}
          />
          <DateTimePickerModal
            headerTextIOS="주문시간을 입력해주세요"
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={onChangeOrderTime}
            onCancel={hideDatePicker}
          />
        </OrderTimePicker>
      </InputGroup>

      <InputGroup>
        <Label>카 테 고 리</Label>
        <CategoryPicker>
          <RNPickerSelect
            onValueChange={onChangeCategory}
            textInputProps={{ underlineColorAndroid: "transparent" }}
            fixAndroidTouchableBug={true}
            items={categoryFormat}
          />
        </CategoryPicker>
      </InputGroup>

      <Btn onPress={onSubmitHandler}>
        <BtnText>작 성 완 료</BtnText>
      </Btn>
    </Container>
  );
};

export default WritePage;
