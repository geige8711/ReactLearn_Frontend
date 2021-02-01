import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { submenuHandleReducer } from "./reducers/submenuReducers";
import {
  avatarmenuHandleReducer,
  notificationMenuHandleReducer,
} from "./reducers/avatarmenuReducers";
import {
  adminSidebarHandleReducer,
  adminSidebarSlideHandleReducer,
} from "./reducers/adminSidebarReducers";
import {
  userLoginReducer,
  userPreRegisterReducer,
  userRegisterReducer,
  userListReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  userCreateReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
  userDeleteReducer,
  userCreateMultipleReducer,
} from "./reducers/userReducers";
import {
  bannerCreateReducer,
  bannerListReducer,
  bannerDeleteReducer,
  bannerUpdateReducer,
} from "./reducers/bannerReducers";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  categoryUpdateOpenReducer,
} from "./reducers/categoryReducers";
import {
  productCreateReducer,
  productListReducer,
  productDeleteReducer,
  productUpdateReducer,
  productDetailsReducer,
  productCreateMultipleReducer,
} from "./reducers/productReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  submenuHandle: submenuHandleReducer,
  avatarmenuHandle: avatarmenuHandleReducer,
  notificationMenuHandle: notificationMenuHandleReducer,
  adminSidebarHandle: adminSidebarHandleReducer,
  adminSidebarSlideHandle: adminSidebarSlideHandleReducer,
  userLogin: userLoginReducer,
  userPreRegister: userPreRegisterReducer,
  userRegister: userRegisterReducer,
  userCreate: userCreateReducer,
  userCreateMultiple: userCreateMultipleReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  bannerCreate: bannerCreateReducer,
  bannerList: bannerListReducer,
  bannerDelete: bannerDeleteReducer,
  bannerUpdate: bannerUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryUpdateOpen: categoryUpdateOpenReducer,
  productCreate: productCreateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailsReducer,
  productCreateMultiple: productCreateMultipleReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
