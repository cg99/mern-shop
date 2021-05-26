import ICartProduct from "../interfaces/ICartProduct";

const totalPriceCalculator = (cart: Array<ICartProduct>) => {
  let total: number = 0;
  if (cart.length > 0) {
    cart.forEach((product: ICartProduct) => {
      if (product.quantity) {
        total += product.price * product.quantity;
      }
    }, 0);
  }
  return total;
};

export default totalPriceCalculator;
