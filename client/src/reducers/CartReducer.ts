// import IProduct from '../interfaces/IProduct';
import { Dispatch } from "redux";
import ICartProduct from "../interfaces/ICartProduct";

interface DefaultStateI {
  products: Array<ICartProduct>;
}

const defaultState: DefaultStateI = {
  products: [],
};

// reducer
const cartReducer = (
  state: DefaultStateI = defaultState,
  action: any
): DefaultStateI => {
  switch (action.type) {
    case "GET_CART":
      return {
        products: action.cart,
      };
    case "SET_CART":
      return {
        products: action.cart,
      };
    case "REMOVE_FROM_CART":
      return {
        products: action.cart,
      };
    default:
      return state;
  }
};

export default cartReducer;
