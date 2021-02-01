import {
  OPEN_AVATAR_SUBMENU,
  CLOSE_AVATAR_SUBMENU,
  OPEN_NOTIFICATION_SUBMENU,
  CLOSE_NOTIFICATION_SUBMENU,
} from "../constants/avatarMenuConstants";

export const avatarmenuHandleReducer = (
  state = { isOpen: false, menuLocation: {} },
  action
) => {
  switch (action.type) {
    case OPEN_AVATAR_SUBMENU:
      return {
        isOpen: true,
        menuLocation: action.payload.coordinates,
      };
    case CLOSE_AVATAR_SUBMENU:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export const notificationMenuHandleReducer = (
  state = { isOpen: false, menuLocation: {} },
  action
) => {
  switch (action.type) {
    case OPEN_NOTIFICATION_SUBMENU:
      return {
        isOpen: true,
        menuLocation: action.payload.coordinates,
      };
    case CLOSE_NOTIFICATION_SUBMENU:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
