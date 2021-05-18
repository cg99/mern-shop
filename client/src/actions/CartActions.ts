import { Dispatch } from "redux";
import ICartProduct from "../interfaces/ICartProduct";

const token: string | null = localStorage.getItem("ecomAccessToken");

const getLocalCart = () => {
  if (token) {
    const localCart: string | null = localStorage.getItem(JSON.parse(token)); // cart of user
    if (localCart) {
      return JSON.parse(localCart);
    }

    return [];
  }
};

const saveCart = (cart: Array<ICartProduct>) => {
  const stringified = JSON.stringify(cart);
  if (token) localStorage.setItem(JSON.parse(token), stringified);
};

// action - GetCart
export const GetCart = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "GET_CART",
      cart: getLocalCart(),
    });
  } catch (e) {
    dispatch({
      type: "NO_CART",
    });
  }
};

// action - AddToCart
export const AddToCart =
  (product: ICartProduct) => async (dispatch: Dispatch) => {
    try {
      let currentCart: Array<ICartProduct> = getLocalCart();

      if (token) {
        const cartSize = currentCart.length;

        let alreadyExists = false;
        for (let i = 0; i < cartSize; i++) {
          if (currentCart[i].id === product.id) {
            const { name, quantity, price, stock } = product;
            currentCart[i].name = name;
            currentCart[i].quantity = quantity;
            currentCart[i].price = price;
            currentCart[i].stock = stock;
            alreadyExists = true;
            break;
          }
        }

        if (!alreadyExists) currentCart.push(product);

        saveCart(currentCart);
      }

      dispatch({
        type: "REMOVE_FROM_CART",
        cart: currentCart,
      });
    } catch (e) {
      dispatch({
        type: "NO_CART",
      });
    }
  };

//action - RemoveFromCart
export const RemoveFromCart = (id: string) => async (dispatch: Dispatch) => {
  const c: Array<ICartProduct> = getLocalCart();
  const CART = c.filter((cartItem: ICartProduct) => cartItem.id !== id);

  saveCart(CART);
  dispatch({
    type: "REMOVE_FROM_CART",
    cart: CART,
  });
};

//action - SetCart
export const SetCart =
  (cart: Array<ICartProduct>) => async (dispatch: Dispatch) => {
    saveCart(cart);
    dispatch({
      type: "REMOVE_FROM_CART",
      cart,
    });
  };
