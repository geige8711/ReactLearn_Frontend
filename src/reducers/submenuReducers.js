import { OPEN_SUBMENU, CLOSE_SUBMENU } from "../constants/submenuConstants";
import sublinks from "./data";

export const submenuHandleReducer = (
  state = { isOpen: false, pages: { page: "", links: [] }, menuLocation: {} },
  action
) => {
  switch (action.type) {
    case OPEN_SUBMENU:
      const page = sublinks.find((link) => link.page === action.payload.text);
      return {
        isOpen: true,
        menuLocation: action.payload.coordinates,
        pages: page,
      };
    case CLOSE_SUBMENU:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
