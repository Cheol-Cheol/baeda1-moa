import React, { useContext, useReducer } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";

const defaultRoomsState = [];

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
    case "CREATE":
      return [action.value, ...prevState];
    case "READ":
      return [...action.value];
    case "FILTER":
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

  const { authState } = useContext(AuthContext);

  const addRoom = (data) => {
    axios
      .post("http://3.37.106.173/api/rooms", data, {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .catch((e) => console.log("addRoomErr: ", e.message));
  };

  const getRooms = () => {
    axios
      .get("http://3.37.106.173/api/rooms", {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .then((response) => {
        dispatchRooms({ type: "READ", value: response.data });
      })
      .catch((e) => console.log("getRoomErr: ", e.message));
  };

  const filterRooms = (categoryId) => {
    if (categoryId === 0) getRooms();
    else {
      axios
        .get(`http://3.37.106.173/api/rooms?categoryId=${categoryId}`, {
          headers: { Authorization: `Bearer ${authState.userToken}` },
        })
        .then((response) => {
          dispatchRooms({ type: "READ", value: response.data });
        })
        .catch((e) => console.log("filterRoomErr: ", e.message));
    }
  };

  const updateChatRoom = () => {
    // 1. Axios PUT
    dispatchRooms({ type: CREATE });
  };

  const deleteChatRoom = () => {
    // 1. Axios DELETE
    dispatchRooms({ type: CREATE });
  };

  const leaveChatRoom = () => {};

  return (
    <RoomsContext.Provider
      value={{
        roomsState,
        chatRoomsState,
        addRoom,
        getRooms,
        filterRooms,
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
