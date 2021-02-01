import axios from "axios";
import {
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_CREATE_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_RESET,
} from "../constants/bannerConstants";
import { uploadFileHandler } from "./uploadHelper";

export const createBanner = (bannerFormData) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_CREATE_REQUEST });
    const result = await uploadFileHandler(bannerFormData.get("photo"));
    const {
      userLogin: { userInfo },
    } = getState();

    if (result) {
      bannerFormData.append("imageUrl", result.replace("\\", "/"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/banners/create",
        bannerFormData,
        config
      );

      dispatch({ type: BANNER_CREATE_SUCCESS, payload: data });
    } else {
      dispatch({
        type: BANNER_CREATE_FAIL,
        payload: "upload file failed",
      });
    }
  } catch (error) {
    dispatch({
      type: BANNER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBanners = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/banners`, config);

    dispatch({ type: BANNER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBanner = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/banners/${id}`, config);

    dispatch({ type: BANNER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BANNER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBannerById = (bannerFormData, id) => async (
  dispatch,
  getState
) => {
  try {
    let result;
    if (bannerFormData.get("photo").size !== 0) {
      result = await uploadFileHandler(bannerFormData.get("photo"));
    }
    if (result) {
      bannerFormData.append("imageUrl", result.replace("\\", "/"));
    }
    dispatch({ type: BANNER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/banners/${id}`,
      bannerFormData,
      config
    );

    dispatch({ type: BANNER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: BANNER_UPDATE_RESET,
      });
    }, 3000);
  }
};
