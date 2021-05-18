import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import productReducer from "./ProductReducer";

const RootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

export default RootReducer;
