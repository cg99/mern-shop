import { Dispatch } from "redux";
import {
  PRODUCT_FAIL,
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  ProductDispatchTypes,
} from "./ProductActionTypes";
import axios from "axios";

export const GetProducts =
  () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
    try {
      dispatch({
        type: PRODUCT_LOADING,
      });

      const res = await axios.get("api/products");

      dispatch({
        type: PRODUCT_SUCCESS,
        payload: res.data?.products,
      });
    } catch (e) {
      dispatch({
        type: PRODUCT_FAIL,
      });
    }
  };
