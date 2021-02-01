import axios from "axios";
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_MULTIPLE_REQUEST,
  PRODUCT_CREATE_MULTIPLE_SUCCESS,
  PRODUCT_CREATE_MULTIPLE_FAIL,
} from "../constants/productConstants";
import { uploadFileHandler } from "./uploadHelper";

export const createProduct = (productFormData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    let results = [];
    const result = (
      await uploadFileHandler(productFormData.get("mainImage"))
    ).replace("\\", "/");
    if (productFormData.get("photo1").size !== 0) {
      results.push(
        (await uploadFileHandler(productFormData.get("photo1"))).replace(
          "\\",
          "/"
        )
      );
    }
    if (productFormData.get("photo2").size !== 0) {
      results.push(
        (await uploadFileHandler(productFormData.get("photo2"))).replace(
          "\\",
          "/"
        )
      );
    }
    if (productFormData.get("photo3").size !== 0) {
      results.push(
        (await uploadFileHandler(productFormData.get("photo3"))).replace(
          "\\",
          "/"
        )
      );
    }
    if (productFormData.get("photo4").size !== 0) {
      results.push(
        (await uploadFileHandler(productFormData.get("photo4"))).replace(
          "\\",
          "/"
        )
      );
    }
    if (productFormData.get("photo5").size !== 0) {
      results.push(
        (await uploadFileHandler(productFormData.get("photo5"))).replace(
          "\\",
          "/"
        )
      );
    }
    if (productFormData.get("photo6").size !== 0) {
      results.push(
        (await uploadFileHandler(productFormData.get("photo6"))).replace(
          "\\",
          "/"
        )
      );
    }

    const {
      userLogin: { userInfo },
    } = getState();
    if (results.length !== 0) {
      productFormData.append("secondaryImages", results);
    }
    if (result) {
      productFormData.append("mainImage", result);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/products/",
        productFormData,
        config
      );

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } else {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: "upload file failed",
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products`, config);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductById = (productFormData, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

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
      `/api/products/${id}`,
      productFormData,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
    }, 3000);
  }
};

export const getProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMultipleProducts = (products) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_MULTIPLE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/products/create-multiple",
      products,
      config
    );

    dispatch({ type: PRODUCT_CREATE_MULTIPLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_MULTIPLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
