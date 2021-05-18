import {
    PRODUCT_FAIL,
    PRODUCT_LOADING,
    PRODUCT_SUCCESS,
    ProductDispatchTypes,
  } from "../actions/ProductActionTypes";
import IProduct from '../interfaces/IProduct';
  
  interface DefaultStateI {
    loading: boolean,
    products?: Array<IProduct>
  }
  
  const defaultState: DefaultStateI = {
    loading: false
  };
  
  const productReducer = (state: DefaultStateI = defaultState, action: ProductDispatchTypes) : DefaultStateI => {
    switch (action.type) {
      case PRODUCT_FAIL:
        return {
          loading: false,
        }
      case PRODUCT_LOADING:
        return {
          loading: true,
        }
      case PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload
        }
      default:
        return state
    }
  };
  
  
  export default productReducer