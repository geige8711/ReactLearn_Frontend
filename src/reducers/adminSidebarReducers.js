import {
  OPEN_ADMIN_SIDEBAR,
  CLOSE_ADMIN_SIDEBAR,
  ADMIN_SIDEBAR_SLIDE_IN,
  ADMIN_SIDEBAR_SLIDE_OUT,
} from "../constants/adminSidebarConstants";

export const adminSidebarHandleReducer = (
  state = { isCollapse: false },
  action
) => {
  switch (action.type) {
    case OPEN_ADMIN_SIDEBAR:
      return {
        isCollapse: false,
      };
    case CLOSE_ADMIN_SIDEBAR:
      return { isCollapse: true };
    default:
      return state;
  }
};

export const adminSidebarSlideHandleReducer = (
  state = { isSlideIn: false },
  action
) => {
  switch (action.type) {
    case ADMIN_SIDEBAR_SLIDE_IN:
      return {
        isSlideIn: true,
      };
    case ADMIN_SIDEBAR_SLIDE_OUT:
      return { isSlideIn: false };
    default:
      return state;
  }
};
