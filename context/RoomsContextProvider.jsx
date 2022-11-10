import React, { useContext, useReducer } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextProvider";

const defaultRoomsState = [];

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
    case "MYROOMS":
      return [...action.value];
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

  const { authState } = useContext(AuthContext);

  const addRoom = async (data) => {
    axios
      .post("http://3.37.106.173/api/rooms", data, {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .catch((e) => console.log("addRoomErr: ", e.message));
  };

  const getRooms = async () => {
    axios
      .get("http://3.37.106.173/api/rooms", {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .then((response) => {
        dispatchRooms({ type: "READ", value: response.data });
      })
      .catch((e) => console.log("getRoomErr: ", e.message));
  };

  const filterRooms = async (categoryId) => {
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

  const getMyRooms = async () => {
    axios
      .get("http://3.37.106.173/api/users/rooms", {
        headers: { Authorization: `Bearer ${authState.userToken}` },
      })
      .then((response) =>
        dispatchRooms({ type: "MYROOMS", value: response.data })
      )
      .catch((e) => console.log("getMyChatRoomErr: ", e.message));
  };

  const enterRoom = async (roomId) => {
    axios
      .post(
        `http://3.37.106.173/api/rooms/${roomId}/users`,
        {},
        {
          headers: { Authorization: `Bearer ${authState.userToken}` },
        }
      )
      .catch((e) => console.log("enterRoomErr: ", e.message));
  };

  const updateRoom = async () => {
    // 1. Axios PUT
    dispatchRooms({ type: CREATE });
  };

  const deleteRoom = async () => {
    // 1. Axios DELETE
    dispatchRooms({ type: CREATE });
  };

  const leaveRoom = async () => {};

  return (
    <RoomsContext.Provider
      value={{
        roomsState,
        addRoom,
        getRooms,
        filterRooms,
        getMyRooms,
        enterRoom,
        updateRoom,
        deleteRoom,
        leaveRoom,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

export { RoomsContext, RoomsContextProvider };
