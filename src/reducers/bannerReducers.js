import {
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAIL,
  BANNER_CREATE_RESET,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_RESET,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_RESET,
} from "../constants/bannerConstants";

export const bannerCreateReducer = (
  state = { loading: false, error: "", banner: "", success: false },
  action
) => {
  switch (action.type) {
    case BANNER_CREATE_REQUEST:
      return { ...state, loading: true };
    case BANNER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: action.payload,
        success: true,
      };
    case BANNER_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case BANNER_CREATE_RESET:
      return { loading: false, error: "", banner: "", success: false };
    default:
      return state;
  }
};

export const bannerListReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return { loading: true };
    case BANNER_LIST_SUCCESS:
      return { loading: false, banners: action.payload };
    case BANNER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_LIST_RESET:
      return { banners: [] };
    default:
      return state;
  }
};

export const bannerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return { loading: true };
    case BANNER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BANNER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bannerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST:
      return { loading: true };
    case BANNER_UPDATE_SUCCESS:
      return { loading: false, success: true, banner: action.payload };
    case BANNER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
