// import IProduct from '../interfaces/IProduct';
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
    case "SET_CART":
      return {
        products: action.cart,
      };
    default:
      return state;
  }
};

export default cartReducer;
