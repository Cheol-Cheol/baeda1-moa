import React, { useReducer } from "react";
import axios from "axios";

const defaultRoomsState = [
  {
    roomId: "1",
    admin: "1de1dxz01011",
    title: "밥 먹자 애들아!",
    businessName: "청년피자",
    orderTime: "2022년 11월 02일 오후 01시 51분",
    category: "피자",
  },
  {
    roomId: "2",
    admin: "1de1dxz01012",
    title: "족발 땡긴다!",
    businessName: "대왕족발",
    orderTime: "2022년 11월 02일 오후 05시 21분",
    category: "족발보쌈",
  },
  {
    roomId: "3",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    businessName: "명륜진사갈비",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
  {
    roomId: "4",
    admin: "1de1dxz01013",
    title: "안녕!",
    businessName: "오스시",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "일식",
  },
  {
    roomId: "5",
    admin: "1de1dxz01013",
    title: "밥 먹자",
    businessName: "집밥백선생",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "한식",
  },
  {
    roomId: "6",
    admin: "1de1dxz01013",
    title: "쭹꿔드실분",
    businessName: "백반점",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "중식",
  },
  {
    roomId: "7",
    admin: "1de1dxz01013",
    title: "대왕족발 드실 분",
    businessName: "대왕족발",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "족발/보쌈",
  },
  {
    roomId: "8",
    admin: "1de1dxz01013",
    title: "야식 드실 분",
    businessName: "홍콩반점",
    orderTime: "2022년 11월 02일 오후 04시 21분",
    category: "중식",
  },
];

const defaultChatRoomsState = [
  {
    roomId: "1",
    admin: "1de1dxz01011",
    title: "밥 먹자 애들아!",
    dialog: "지금 시키죠ㅋㅋ",
    time: "오후 8:12",
  },
  {
    roomId: "2",
    admin: "1de1dxz01012",
    title: "족발 땡긴다!",
    dialog: "2인분 더 시켜도 될까요?",
    time: "오후 10:30",
  },
  {
    roomId: "3",
    admin: "1de1dxz01013",
    title: "1/N 개이득!",
    dialog: "돈 개많이 아꼈네~",
    time: "오후 3:00",
  },
];

const roomsReducer = (prevState, action) => {
  // TODO: state 어떻게 관리할지 생각하자. defaultState도 [rooms:[{...},{...}], 다른 값]
  // -> 근데 안해될듯? 왜? 여기는 room만 관리하니깐!
  switch (action.type) {
    case CREATE:
      return [action.value, ...prevState];
    case READ:
      return [action.value];
    case FILTER:
      return [action.value];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const chatRoomsReducer = (prevState, action) => {
  switch (action.type) {
    case UPDATE:
      return;
    case DELETE:
      return;
    case LEAVE:
      return;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const RoomsContext = React.createContext({});

const RoomsContextProvider = ({ children }) => {
  const [roomsState, dispatchRooms] = useReducer(
    roomsReducer,
    defaultRoomsState
  );
  const [chatRoomsState, dispatchChatRooms] = useReducer(
    chatRoomsReducer,
    defaultChatRoomsState
  );

  const addRoom = (data) => {
    // 1. Axios POST
    dispatchRoom({ type: CREATE });
  };

  const getRooms = () => {
    // 1. Axios GET
    dispatchRoom({ type: CREATE });
  };

  const updateChatRoom = () => {
    // 1. Axios PUT
    dispatchRoom({ type: CREATE });
  };

  const deleteChatRoom = () => {
    // 1. Axios DELETE
    dispatchRoom({ type: CREATE });
  };

  const leaveChatRoom = () => {};

  return (
    <RoomsContext.Provider
      value={{
        roomsState,
        chatRoomsState,
        addRoom,
        getRooms,
        updateChatRoom,
        deleteChatRoom,
        leaveChatRoom,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext, RoomsContextProvider };
